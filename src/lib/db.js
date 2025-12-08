"use server";
import { neon } from "@neondatabase/serverless";

// Ensure the env var exists to prevent runtime crashes later
if (!process.env.NEON_DB_URL) {
  throw new Error("Missing NEON_DB_URL environment variable");
}

const sql = neon(process.env.NEON_DB_URL);

/**
 * Maps database rows to the application data model.
 */
function mapProject(row) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    image: row.image,
    link: row.link,
    // Handle cases where keywords might be null in the DB
    keywords: row.keywords ?? [], 
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function ensureProjectsTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        title text NOT NULL,
        description text NOT NULL,
        image text NOT NULL,
        link text NOT NULL,
        keywords jsonb NOT NULL DEFAULT '[]'::jsonb,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now()
      )
    `;
    console.log("Projects table ensured.");
  } catch (error) {
    console.error("Failed to create table:", error);
    throw error;
  }
}

export async function fetchProjects() {
  try {
    const rows = await sql`select * from projects order by created_at desc`;
    return rows.map(mapProject);
  } catch (error) {
    console.error("Database Error:", error);
    // Return empty array instead of crashing UI
    return []; 
  }
}

export async function getProjectById(id) {
  try {
    const [row] = await sql`select * from projects where id = ${id} limit 1`;
    return row ? mapProject(row) : null;
  } catch (error) {
    console.error(`Failed to fetch project ${id}:`, error);
    return null;
  }
}

export async function insertProject(data) {
  try {
    const [row] = await sql`
      insert into projects (title, description, image, link, keywords)
      values (
        ${data.title}, 
        ${data.description}, 
        ${data.image}, 
        ${data.link}, 
        ${JSON.stringify(data.keywords || [])}
      )
      returning *;
    `;
    return mapProject(row);
  } catch (error) {
    console.error("Failed to insert project:", error);
    throw error; // Re-throw for the form handler to catch
  }
}

export async function updateProject(id, updates) {
  try {
    // We check if updates.keywords exists before stringifying
    const keywordsJson = updates.keywords ? JSON.stringify(updates.keywords) : null;

    const [row] = await sql`
      update projects
      set title = coalesce(${updates.title}, title),
          description = coalesce(${updates.description}, description),
          image = coalesce(${updates.image}, image),
          link = coalesce(${updates.link}, link),
          keywords = coalesce(${keywordsJson}, keywords),
          updated_at = now()
      where id = ${id}
      returning *;
    `;
    return row ? mapProject(row) : null;
  } catch (error) {
    console.error(`Failed to update project ${id}:`, error);
    throw error;
  }
}

export async function deleteProject(id) {
  try {
    const [row] = await sql`delete from projects where id = ${id} returning *;`;
    return row ? mapProject(row) : null;
  } catch (error) {
    console.error(`Failed to delete project ${id}:`, error);
    throw error;
  }
}