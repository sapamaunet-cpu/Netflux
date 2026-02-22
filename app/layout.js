import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }) {
  const genres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 35, name: 'Comedy' },
    { id: 27, name: 'Horror' },
    { id: 878, name: 'Sci-Fi' },
    { id: 18, name: 'Drama' },
    { id: 53, name: 'Thriller' },
    { id: 16, name: 'Animation' },
    { id: 10751, name: 'Family' },
  ];

  return (
    <html lang="id">
      <body className="bg-black text-white">
        {/* Header / Navbar */}
        <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="text-2xl font-black text-red-600 tracking-tighter">
                NETFLUX
              </Link>
              
              {/* Tambahkan Search Icon/Button di sini nanti */}
              <div className="text-zinc-400 hover:text-white cursor-pointer">
                🔍
              </div>
            </div>

            {/* List Genre Horizontal */}
            <nav className="flex gap-6 overflow-x-auto py-3 no-scrollbar text-sm font-medium border-t border-zinc-900">
              {genres.map((genre) => (
                <Link 
                  key={genre.id} 
                  href={`/genre/${genre.id}?name=${genre.name}`}
                  className="whitespace-nowrap hover:text-red-500 transition-colors"
                >
                  {genre.name}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="py-10 text-center text-zinc-500 text-xs border-t border-zinc-900 mt-20">
          <p>© 2026 NETFLUX - Power by TMDB API</p>
        </footer>
      </body>
    </html>
  );
}
