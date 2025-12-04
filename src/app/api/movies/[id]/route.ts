import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Movie from "@/models/Movie";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    await dbConnect();
    const { id } = await params;
    const movie = await Movie.findById(id);

    if (!movie) {
      return NextResponse.json(
        { error: "Filme não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(movie);
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar filme" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();

    const movie = await Movie.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!movie) {
      return NextResponse.json(
        { error: "Filme não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(movie);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Erro ao atualizar filme" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    await dbConnect();
    const { id } = await params;
    const movie = await Movie.findByIdAndDelete(id);

    if (!movie) {
      return NextResponse.json(
        { error: "Filme não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Filme excluído com sucesso" });
  } catch {
    return NextResponse.json(
      { error: "Erro ao excluir filme" },
      { status: 500 }
    );
  }
}
