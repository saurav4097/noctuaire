import { NextResponse } from "next/server";
import {connectDB} from "@/lib/mongodb";
import Dress from "@/models/Dress";
import Group from "@/models/Group";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    const dress = await Dress.findById(params.id);
    if (!dress) {
      return NextResponse.json({ error: "Dress not found" }, { status: 404 });
    }

    // 🔑 Find the parent group by group_name
    const group = await Group.findOne({ name: dress.group_name });

    return NextResponse.json({
      ...dress.toObject(),
      groupId: group?._id || null, // add groupId
    });
  } catch (err) {
    console.error("Error in GET /api/dress/[id]:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
