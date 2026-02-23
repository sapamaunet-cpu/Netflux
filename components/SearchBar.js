'use client'; // Wajib karena menggunakan navigasi & state

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault(); // Mencegah reload halaman
    if (!query.trim()) return;
    
    // Arahkan user ke halaman hasil pencarian
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-sm">
      <input
        type="text"
        placeholder="Cari film..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-zinc-900 text-white px-4 py-2 rounded-full border border-zinc-700 focus:outline-none focus:border-red-600 text-sm"
      />
      <button 
        type="submit" 
        className="absolute right-3 top-2 text-zinc-400 hover:text-white"
      >
        🔍
      </button>
    </form>
  );
      }
          
