import './globals.css';
import Link from 'next/link';

export default function RootLayout({ children }) {
  const genres = [
    { id: 28, name: 'Action' }, { id: 27, name: 'Horror' },
    { id: 35, name: 'Comedy' }, { id: 18, name: 'Drama' }, { id: 878, name: 'Sci-Fi' }
  ];

  return (
    <html lang="id">
      <body className="bg-black text-white selection:bg-red-600">
        <nav className="p-4 bg-zinc-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-zinc-800">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <Link href="/" className="text-red-600 font-black text-3xl tracking-tighter">BLOKMOVIES</Link>
            
            <div className="flex gap-5 overflow-x-auto w-full md:w-auto no-scrollbar py-2">
              {genres.map(g => (
                <Link key={g.id} href={`/genre/${g.id}?name=${g.name}`} className="text-sm font-medium text-zinc-400 hover:text-white transition">
                  {g.name}
                </Link>
              ))}
            </div>

            <form action="/search" method="GET" className="w-full md:w-64">
              <input name="q" placeholder="Cari film favorit..." className="bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-full text-sm w-full focus:ring-2 focus:ring-red-600 outline-none" />
            </form>
          </div>
        </nav>
        {children}
        <footer className="p-10 text-center text-zinc-600 text-sm border-t border-zinc-900 mt-20">
          © 2026 NETFLUX - Power by TMDB API
        </footer>
      </body>
    </html>
  );
}
