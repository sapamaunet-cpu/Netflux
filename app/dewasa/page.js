import { getMoviesAdult } from '../../lib/tmdb';
import MovieList from '../../components/MovieList';

export default async function Home() {
  const data = await getMoviesAdult('with_keywords=155461&include_adult=true&sort_by=popularity.desc', 1);
  return (
    <div className="max-w-7xl mx-auto py-8">
      <h2 className="text-2xl font-bold px-4 mb-8 flex items-center gap-2">
        <span className="w-1 h-8 bg-red-600 rounded-full"></span> Film Baru
      </h2>
      <MovieList initialData={data} endpoint="with_keywords=155461&include_adult=true&sort_by=popularity.desc" limit={100} />
    </div>
  );
}
