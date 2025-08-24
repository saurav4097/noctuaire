import { NextResponse } from "next/server";
import {connectDB} from "@/lib/mongodb";
import Group from "@/models/Group";
import Dress from "@/models/Dress";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    const series = await Group.findById(params.id);
    if (!series) {
      return NextResponse.json({ error: "Series not found" }, { status: 404 });
    }

    const dresses = await Dress.find({ group_name: series.name });

    return NextResponse.json({ series, dresses });
  } catch (err: any) {
    console.error("Error in GET /api/series/[id]:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
