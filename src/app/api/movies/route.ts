import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Movie from "@/models/Movie";

export async function GET() {
  try {
    await dbConnect();
    const movies = await Movie.find({}).sort({ createdAt: -1 });
    return NextResponse.json(movies);
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar filmes" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const movie = await Movie.create(body);
    return NextResponse.json(movie, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Erro ao criar filme" }, { status: 500 });
  }
}
