'use client';

import { useEffect, useState } from 'react';
import { useXmc } from '@/components/providers';
import { useSitesApi, type Site } from '@/lib/useSitesApi';
import SitesList from './sites-list';
import CreateSiteDialog from './create-site-dialog';
import Header from './header';

export default function SitesManager() {
  const { isInitialized } = useXmc();
  const { listSites, createSite, loading: apiLoading } = useSitesApi();
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  useEffect(() => {
    const fetchSites = async () => {
      if (!isInitialized) return;

      try {
        setLoading(true);
        const sitesData = await listSites();
        setSites(sitesData);
      } catch (error) {
        console.error('Failed to fetch sites:', error);
        setSites([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSites();
  }, [isInitialized, listSites]);

  const handleCreateSite = async (siteData: {
    name: string;
    templateId: string;
  }) => {
    try {
      setLoading(true);
      const newSite = await createSite({
        name: siteData.name,
        displayName: siteData.name,
        templateId: siteData.templateId,
        language: 'en',
        collectionName: 'Default',
      });

      if (newSite) {
        setSites([...sites, newSite]);
      }
    } catch (error) {
      console.error('Failed to create site:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col bg-slate-50">
      <Header onCreateClick={() => setShowCreateDialog(true)} />

      <div className="flex-1 overflow-auto">
        {loading || apiLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-400 mx-auto mb-4"></div>
              <p className="text-slate-600">Loading sites...</p>
            </div>
          </div>
        ) : (
          <SitesList sites={sites} />
        )}
      </div>

      <CreateSiteDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onCreate={handleCreateSite}
      />
    </div>
  );
}
