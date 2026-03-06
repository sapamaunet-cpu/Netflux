import { NextResponse } from 'next/server';
import { getMovieDetail } from '../../../../lib/tmdb'; // Sesuaikan jumlah ../ dengan struktur folder Anda

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const movie = await getMovieDetail(id);

    if (!movie || !movie.id) {
      return NextResponse.json({ error: 'Film tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json(movie);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Gagal mengambil data film' }, { status: 500 });
  }
}
