import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req: Request, res: Response) => {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id)
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  const data = await db.data.findUnique({ where: { id } });
  return NextResponse.json(data);
};
