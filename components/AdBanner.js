'use client';
import { useEffect, useRef } from 'react';

export default function AdBanner() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Cek apakah script sudah ada untuk menghindari duplikasi
    const scriptId = 'adsterra-native-script';
    let script = document.getElementById(scriptId);

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = 'https://pl28859243.effectivegatecpm.com/42282ddbf82f3b276598eab445336106/invoke.js';
      document.body.appendChild(script);
    }

    return () => {
      // Optional: script biasanya dibiarkan tetap ada agar tidak re-load terus menerus
    };
  }, []);

  return (
    <div className="relative overflow-hidden rounded-xl bg-zinc-900 aspect-[2/3] border border-zinc-800 flex flex-col items-center justify-center p-2">
      <div className="absolute top-2 left-2 bg-red-600/20 text-red-500 text-[8px] font-bold px-1.5 py-0.5 rounded border border-red-600/30 uppercase tracking-tighter">
        Sponsored
      </div>
      
      {/* Container untuk Adsterra */}
      <div 
        id="container-42282ddbf82f3b276598eab445336106" 
        className="w-full h-full flex items-center justify-center scale-90"
      ></div>
      
      <div className="mt-3 text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">
        Promoted Content
      </div>
    </div>
  );
}
