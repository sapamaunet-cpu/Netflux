"use client"
import { useEffect, useRef } from 'react';

export default function AdBanner({ type = 'banner' }) {
  const adRef = useRef(null);

  useEffect(() => {
    if (adRef.current) {
      adRef.current.innerHTML = '';
    }

    const adConfig = {
      // 1. Iklan Besar untuk Halaman Detail
      detail: {
        key: '881ad5ccb504614c66c5e759f17179c0', // Key 728x90 Anda
        format: 'iframe',
        height: 90,
        width: 728,
        src: 'https://www.highperformanceformat.com/881ad5ccb504614c66c5e759f17179c0/invoke.js'
      },
      // 2. Iklan Banner untuk MovieList
      listBanner: {
        key: '3da41b404358f1fdb8bfb35f0abc2de6', // Key 320x50 (dengan config 300x250 sesuai kode Anda)
        format: 'iframe',
        height: 250,
        width: 300,
        src: 'https://www.highperformanceformat.com/3da41b404358f1fdb8bfb35f0abc2de6/invoke.js'
      },
      // 3. Iklan Native untuk MovieList
      native: {
        key: '42282ddbf82f3b276598eab445336106',
        containerId: 'container-42282ddbf82f3b276598eab445336106',
        src: 'https://pl28859243.effectivegatecpm.com/42282ddbf82f3b276598eab445336106/invoke.js'
      }
    };

    const config = adConfig[type] || adConfig.listBanner;

    // Logika Banner (Detail & List)
    if (type === 'detail' || type === 'listBanner') {
      const scriptOptions = document.createElement('script');
      scriptOptions.type = 'text/javascript';
      scriptOptions.innerHTML = `
        atOptions = {
          'key' : '${config.key}',
          'format' : '${config.format}',
          'height' : ${config.height},
          'width' : ${config.width},
          'params' : {}
        };
      `;
      adRef.current.appendChild(scriptOptions);
    }

    // Logika Native
    if (type === 'native' && config.containerId) {
      const containerDiv = document.createElement('div');
      containerDiv.id = config.containerId;
      adRef.current.appendChild(containerDiv);
    }

    // Load Invoke Script
    const scriptInvoke = document.createElement('script');
    scriptInvoke.type = 'text/javascript';
    scriptInvoke.async = true;
    scriptInvoke.src = config.src;
    if (type === 'native') scriptInvoke.setAttribute('data-cfasync', 'false');

    adRef.current.appendChild(scriptInvoke);

  }, [type]);

  return (
    <div className="w-full flex flex-col items-center justify-center my-4 min-h-[100px] overflow-hidden">
      <div ref={adRef} className="w-full flex justify-center"></div>
    </div>
  );
}
