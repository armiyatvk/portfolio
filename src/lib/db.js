"use server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.NEON_DB_URL);

function mapProject(row) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    image: row.image, // Ensure your DB column matches this
    link: row.link,
    keywords: row.keywords ?? [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// Run this once (e.g., via a temp route or script) to set up the DB
export async function ensureProjectsTable() {
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
}

export async function fetchProjects() {
  const rows = await sql`select * from projects order by created_at desc`;
  return rows.map(mapProject);
}

export async function getProjectById(id) {
  const [row] = await sql`select * from projects where id = ${id} limit 1`;
  return row ? mapProject(row) : null;
}

export async function insertProject(data) {
  const [row] = await sql`
    insert into projects (title, description, image, link, keywords)
    values (${data.title}, ${data.description}, ${data.image}, ${data.link}, ${JSON.stringify(data.keywords)})
    returning *;
  `;
  return mapProject(row);
}

export async function updateProject(id, updates) {
  const [row] = await sql`
    update projects
    set title = coalesce(${updates.title}, title),
        description = coalesce(${updates.description}, description),
        image = coalesce(${updates.image}, image),
        link = coalesce(${updates.link}, link),
        keywords = coalesce(${JSON.stringify(updates.keywords)}, keywords),
        updated_at = now()
    where id = ${id}
    returning *;
  `;
  return row ? mapProject(row) : null;
}

export async function deleteProject(id) {
  const [row] = await sql`delete from projects where id = ${id} returning *;`;
  return row ? mapProject(row) : null;
}