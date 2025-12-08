import { NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0";
import { cookies } from "next/headers"; 
import { upsertHero, getHero } from "@/lib/db"; 

// GET: Fetch Hero Data
export async function GET() {
  try {
    const data = await getHero(); 
    return NextResponse.json({ data });
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT: Update Hero Data
export async function PUT(req) {
  try {
    // 1. Read the JSON body
    const body = await req.json();
    
    // 2. Extract the fields
    const { fullName, shortDescription, longDescription, avatar } = body;

    // 3. ACTUAL FIX: Call your database function to save the data
    const updatedData = await upsertHero({
      fullName,
      shortDescription,
      longDescription,
      avatar
    });

    // 4. Return the result from the DB
    return NextResponse.json({ 
      success: true, 
      data: updatedData 
    });

  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { error: "Failed to update hero section" },
      { status: 500 }
    );
  }
}