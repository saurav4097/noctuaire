// src/app/api/dress/route.ts
import { NextResponse } from "next/server";
import {connectDB} from "@/lib/mongodb";
import Dress from "@/models/Dress";

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const groupName = searchParams.get("group_name");
  const filter = groupName ? { group_name: groupName } : {};
  const dresses = await Dress.find(filter);
  return NextResponse.json(dresses);
}
