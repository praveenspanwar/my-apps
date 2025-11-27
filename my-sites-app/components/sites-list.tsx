'use client';

import { Package } from 'lucide-react';
import SiteCard from './site-card';

interface Site {
  id: string;
  name: string;
  template: string;
  created: string;
  status: string;
}

interface SitesListProps {
  sites: Site[];
}

export default function SitesList({ sites }: SitesListProps) {
  if (sites.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="mb-4">
            <Package className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              No sites yet
            </h2>
            <p className="text-slate-600">
              Create your first site by clicking the "Create Site" button above
              to get started.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Your Sites ({sites.length})
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sites.map((site) => (
          <SiteCard key={site.id} site={site} />
        ))}
      </div>
    </div>
  );
}
