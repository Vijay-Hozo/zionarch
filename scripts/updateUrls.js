import { createClient } from "@supabase/supabase-js";
import fs from "fs/promises";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const PROJECTS_FILE = "src/lib/Projects.json";

// Map category names to Supabase folder names
const CATEGORY_MAP = {
  "Hospitality": "HOSPITALITY",
  "Apartments": "APARTMENTS",
  "Residential": "RESIDENTIAL",
  "Institutional": "INSTITUTIONAL",
  "Interiors": "INTERIORS",
  "Commercial": "COMMERCIAL",
};

// Build a map of project folders in Supabase
async function buildProjectFolderMap() {
  const projectFolders = {};

  async function scanFolder(folderPath = "", depth = 0) {
    try {
      const { data, error } = await supabase.storage
        .from("media")
        .list(folderPath, { limit: 1000 });

      if (error) {
        console.error(`⚠️  Error scanning ${folderPath || "root"}:`, error.message);
        return;
      }

      for (const item of data) {
        const fullPath = folderPath ? `${folderPath}/${item.name}` : item.name;

        // Check if it's a folder (folders have undefined size or no metadata)
        if (!item.metadata?.size) {
          // It's likely a folder
          projectFolders[item.name] = fullPath;
          
          // If we're at level 1 (category), scan further for project folders
          if (depth === 0) {
            await scanFolder(fullPath, depth + 1);
          }
        }
      }
    } catch (error) {
      console.error(`⚠️  Error in scanFolder(${folderPath}):`, error.message);
    }
  }

  console.log("🔍 Scanning Supabase folder structure...");
  await scanFolder();
  console.log(`✅ Found ${Object.keys(projectFolders).length} folders\n`);
  return projectFolders;
}

// Build sorted list of images in project folder
async function getProjectImages(projectFolder) {
  const images = [];

  async function scanFolder(folderPath) {
    try {
      const { data, error } = await supabase.storage
        .from("media")
        .list(folderPath, { limit: 1000 });

      if (error) return;

      for (const item of data) {
        const fullPath = folderPath ? `${folderPath}/${item.name}` : item.name;

        if (!item.metadata?.size) {
          await scanFolder(fullPath);
        } else {
          // Only include image files
          if (/\.(jpg|jpeg|png|gif|webp)$/i.test(item.name)) {
            images.push(fullPath);
          }
        }
      }
    } catch (error) {}
  }

  await scanFolder(projectFolder);
  
  // Sort images by number prefix if available
  images.sort((a, b) => {
    const aMatch = a.match(/\/(\d+)/);
    const bMatch = b.match(/\/(\d+)/);
    
    if (aMatch && bMatch) {
      return parseInt(aMatch[1]) - parseInt(bMatch[1]);
    }
    return a.localeCompare(b);
  });
  
  return images;
}

// Fuzzy match project title with folder name
function fuzzyMatch(projectTitle, folderName) {
  const title = projectTitle.toUpperCase().replace(/[^A-Z0-9]/g, "");
  const folder = folderName.toUpperCase().replace(/[^A-Z0-9]/g, "");
  
  // Remove MAIN- prefix from folder names
  const folderClean = folder.replace("MAIN", "");
  
  // Check if folder contains most of the title words
  return title.length > 0 && (folderClean.includes(title) || title.includes(folderClean));
}

async function updateProjectUrls() {
  try {
    const projectFolders = await buildProjectFolderMap();
    const data = await fs.readFile(PROJECTS_FILE, "utf-8");
    const projects = JSON.parse(data);

    console.log(`📂 Processing ${projects.length} projects...\n`);

    let convertedCount = 0;
    let notFoundCount = 0;

    for (const project of projects) {
      const category = CATEGORY_MAP[project.category];
      
      if (!category) {
        console.warn(`⚠️  Unknown category: ${project.category}`);
        notFoundCount += (project.images?.length || 0) + 1;
        continue;
      }

      // Find the matching project folder
      let projectFolderPath = null;
      for (const [folderName, folderPath] of Object.entries(projectFolders)) {
        if (folderPath.startsWith(category) && fuzzyMatch(project.title, folderName)) {
          projectFolderPath = folderPath;
          break;
        }
      }

      if (!projectFolderPath) {
        console.warn(`⚠️  Folder not found for: ${project.category}/${project.title}`);
        notFoundCount += (project.images?.length || 0) + 1;
        continue;
      }

      // Get all images from this project's folder
      const supabaseImages = await getProjectImages(projectFolderPath);
      
      if (supabaseImages.length === 0) {
        console.warn(`⚠️  No images found in: ${projectFolderPath}`);
        notFoundCount += (project.images?.length || 0) + 1;
        continue;
      }

      console.log(`✓ ${project.title} (${supabaseImages.length} images)`);

      // Update main image with first image from folder
      if (project.image && supabaseImages.length > 0) {
        const { data: urlData } = supabase.storage.from("media").getPublicUrl(supabaseImages[0]);
        project.image = urlData.publicUrl;
        convertedCount++;
      }

      // Update all images in array with images from Supabase folder
      if (project.images && Array.isArray(project.images)) {
        project.images = supabaseImages.map((imagePath) => {
          const { data: urlData } = supabase.storage.from("media").getPublicUrl(imagePath);
          convertedCount++;
          return urlData.publicUrl;
        });
      }
    }

    await fs.writeFile(PROJECTS_FILE, JSON.stringify(projects, null, 2));
    console.log(`\n✅ Update complete!`);
    console.log(`   ✓ Converted: ${convertedCount}`);
    console.log(`   ⚠️  Not found: ${notFoundCount}`);
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

updateProjectUrls();
