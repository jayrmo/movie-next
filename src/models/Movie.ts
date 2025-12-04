import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMovie {
  title: string;
  releaseDate: string;
  synopsis: string;
  genre: string;
  trailerUrl?: string;
  director: string;
  featured: boolean;
}

export interface IMovieDocument extends IMovie, Document {
  createdAt: Date;
  updatedAt: Date;
}

const MovieSchema = new Schema<IMovieDocument>(
  {
    title: {
      type: String,
      required: [true, "Título é obrigatório"],
      trim: true,
    },
    releaseDate: {
      type: String,
      required: [true, "Data de lançamento é obrigatória"],
    },
    synopsis: {
      type: String,
      required: [true, "Sinopse é obrigatória"],
    },
    genre: {
      type: String,
      required: [true, "Gênero é obrigatório"],
      trim: true,
    },
    trailerUrl: {
      type: String,
      default: "",
    },
    director: {
      type: String,
      required: [true, "Diretor é obrigatório"],
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Movie: Model<IMovieDocument> =
  mongoose.models.Movie || mongoose.model<IMovieDocument>("Movie", MovieSchema);

export default Movie;
