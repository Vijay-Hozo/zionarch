import fetch from "node-fetch";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const ROOT_FOLDER = "1cKKrDsUA_h6KpuF61HIIPgiy-nmz_fuz";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const API_KEY = process.env.GOOGLE_API_KEY;

// check if file exists in Supabase
async function fileExists(path) {
  const { data } = await supabase.storage
    .from("media")
    .list(path.split("/").slice(0, -1).join("/"), {
      search: path.split("/").pop(),
    });

  return data && data.length > 0;
}

// list drive folder
async function listFolder(folderId) {
  const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType)&pageSize=1000`;

  const res = await fetch(url);
  const data = await res.json();
  return data.files;
}

// upload file
async function uploadFile(file, path) {
  const fullPath = path + file.name;

  const exists = await fileExists(fullPath);
  if (exists) {
    console.log("⏭ Skipping:", fullPath);
    return;
  }

  const downloadUrl = `https://drive.google.com/uc?export=download&id=${file.id}`;

  console.log("⬇ Download:", fullPath);

  const res = await fetch(downloadUrl);
  const buffer = await res.buffer();

  console.log("⬆ Upload:", fullPath);

  const { error } = await supabase.storage
    .from("media")
    .upload(fullPath, buffer, {
      contentType: file.mimeType,
    });

  if (error) console.log("❌", error.message);
  else console.log("✅ Uploaded:", fullPath);
}

// recursive folder processing
async function processFolder(folderId, path = "") {
  const files = await listFolder(folderId);

  for (const file of files) {
    if (file.mimeType === "application/vnd.google-apps.folder") {
      await processFolder(file.id, path + file.name + "/");
    } else {
      await uploadFile(file, path);
    }
  }
}

async function start() {
  console.log("🚀 Resume migration...");
  await processFolder(ROOT_FOLDER);
  console.log("🎉 DONE");
}

start();
