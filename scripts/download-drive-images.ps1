param(
  [string]$RootUrl = 'https://drive.google.com/drive/folders/1cKKrDsUA_h6KpuF61HIIPgiy-nmz_fuz',
  [string]$DestinationRoot = 'd:\FreeLancing\zionarch\public\drive-images'
)

$ErrorActionPreference = 'Stop'

$visited = @{}

function Join-RelativePath {
  param(
    [string]$Base,
    [string]$Child
  )

  if ([string]::IsNullOrWhiteSpace($Base)) {
    return $Child
  }

  return (Join-Path $Base $Child)
}

function Get-DriveItems {
  param([string]$FolderUrl)

  $html = [string]::Join("`n", (& curl.exe -sSL $FolderUrl -H 'User-Agent: Mozilla/5.0'))
  $pattern = '<tr[^>]*data-selectable[^>]*data-id="(?<id>[^"]+)"[\s\S]*?<div class="JxSEve" aria-label="(?<label>[^"]+)"[\s\S]*?<strong[^>]*>(?<name>[^<]+)</strong>'
  $matches = [regex]::Matches($html, $pattern)

  foreach ($match in $matches) {
    [pscustomobject]@{
      Id = $match.Groups['id'].Value
      Label = $match.Groups['label'].Value
      Name = $match.Groups['name'].Value
    }
  }
}

function Download-Image {
  param(
    [pscustomobject]$Item,
    [string]$RelativePath
  )

  $targetDir = if ([string]::IsNullOrWhiteSpace($RelativePath)) { $DestinationRoot } else { Join-Path $DestinationRoot $RelativePath }
  New-Item -ItemType Directory -Force -Path $targetDir | Out-Null

  $safeName = $Item.Name -replace '[<>:"/\\|?*]', '_'
  $outFile = Join-Path $targetDir $safeName
  if (Test-Path $outFile) {
    Write-Host "SKIP  $RelativePath/$($Item.Name)"
    return
  }

  $downloadUrl = "https://drive.google.com/uc?export=download&id=$($Item.Id)"
  Write-Host "GET   $RelativePath/$($Item.Name)"
  & curl.exe -sSL $downloadUrl -H 'User-Agent: Mozilla/5.0' -o $outFile | Out-Null
}

function Crawl-DriveFolder {
  param(
    [string]$FolderUrl,
    [string]$RelativePath
  )

  $folderId = ($FolderUrl -split '/folders/')[-1]
  if ($visited.ContainsKey($folderId)) {
    return
  }

  $visited[$folderId] = $true

  $items = @(Get-DriveItems -FolderUrl $FolderUrl)
  foreach ($item in $items) {
    if ($item.Label -like '*Shared folder') {
      if ($item.Name -ieq 'VIDEOS') {
        continue
      }

      $nextUrl = "https://drive.google.com/drive/folders/$($item.Id)"
      $nextPath = Join-RelativePath -Base $RelativePath -Child $item.Name
      Crawl-DriveFolder -FolderUrl $nextUrl -RelativePath $nextPath
    }
    elseif ($item.Label -like '*Image Shared') {
      Download-Image -Item $item -RelativePath $RelativePath
    }
  }
}

New-Item -ItemType Directory -Force -Path $DestinationRoot | Out-Null
Crawl-DriveFolder -FolderUrl $RootUrl -RelativePath ''
Write-Host 'DONE'