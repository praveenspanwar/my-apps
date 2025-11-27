'use client';

import { useEffect, useState } from 'react';
import { useXmc } from '@/components/providers';
import SitesManager from '@/components/sites-manager';
import LoadingSpinner from '@/components/loading-spinner';

export default function Home() {
  const { isInitialized } = useXmc();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isInitialized) {
      setIsReady(true);
    }
  }, [isInitialized]);

  if (!isReady) {
    return <LoadingSpinner />;
  }

  if (!isInitialized) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Sitecore Sites Manager
          </h1>
          <p className="text-xl text-slate-300">
            Failed to initialize. Please check your configuration.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen">
      <SitesManager />
    </main>
  );
}
