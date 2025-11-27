'use client';

import { useCallback, useState } from 'react';
import { useMarketplaceClient, useAppContext } from '@/components/providers';

export interface Site {
  id: string;
  name: string;
  displayName: string;
  template: string;
  templateId: string;
  created: string;
  status: string;
  language?: string;
}

export interface SiteTemplate {
  id: string;
  name: string;
  description: string;
}

export function useSitesApi() {
  const client = useMarketplaceClient();
  const appContext = useAppContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getSitecoreContextId = useCallback(() => {
    return appContext?.resourceAccess?.[0]?.context?.preview as string;
  }, [appContext]);

  const listSites = useCallback(async (): Promise<Site[]> => {
    if (!client) {
      setError('Client not initialized');
      return [];
    }

    try {
      setLoading(true);
      setError(null);

      const sitecoreContextId = getSitecoreContextId();
      if (!sitecoreContextId) {
        setError('Sitecore Context ID not found');
        return [];
      }

      // Call the Sites REST API through the Marketplace SDK
      const response = (await client.query('xmc.xmapp.listSites', {
        params: {
          query: {
            sitecoreContextId,
          },
        },
      })) as any;

      const sitesData = response?.data?.data || response?.data;
      if (Array.isArray(sitesData)) {
        return sitesData.map((site: any) => ({
          id: site.id,
          name: site.siteName,
          displayName: site.displayName || site.siteName,
          template: site.templateName || 'Unknown',
          templateId: site.templateId,
          created: site.created || new Date().toISOString(),
          status: site.status || 'active',
          language: site.language,
        }));
      }

      return [];
    } catch (err) {
      console.error('Failed to fetch sites:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch sites');
      return [];
    } finally {
      setLoading(false);
    }
  }, [client, getSitecoreContextId]);

  const getSiteTemplates = useCallback(async (): Promise<SiteTemplate[]> => {
    if (!client) {
      setError('Client not initialized');
      return [];
    }

    try {
      setLoading(true);
      setError(null);

      const sitecoreContextId = getSitecoreContextId();
      if (!sitecoreContextId) {
        setError('Sitecore Context ID not found');
        return [];
      }

      // Call the Sites REST API to get templates
      const response = (await client.query('xmc.xmapp.listSiteTemplates', {
        params: {
          query: {
            sitecoreContextId,
          },
        },
      })) as any;

      const templatesData = response?.data?.data || response?.data;
      if (Array.isArray(templatesData)) {
        return templatesData.map((template: any) => ({
          id: template.id,
          name: template.name,
          description: template.description || '',
        }));
      }

      // Return mock templates if API call fails
      return [
        {
          id: 'blog',
          name: 'Blog Template',
          description: 'A template for blogging and content publishing',
        },
        {
          id: 'ecommerce',
          name: 'E-Commerce Template',
          description: 'A template for online shopping and product catalogs',
        },
        {
          id: 'corporate',
          name: 'Corporate Site',
          description: 'A professional template for business websites',
        },
      ];
    } catch (err) {
      console.error('Failed to fetch templates:', err);
      // Return mock templates on error
      return [
        {
          id: 'blog',
          name: 'Blog Template',
          description: 'A template for blogging and content publishing',
        },
        {
          id: 'ecommerce',
          name: 'E-Commerce Template',
          description: 'A template for online shopping and product catalogs',
        },
        {
          id: 'corporate',
          name: 'Corporate Site',
          description: 'A professional template for business websites',
        },
      ];
    } finally {
      setLoading(false);
    }
  }, [client, getSitecoreContextId]);

  const createSite = useCallback(
    async (siteData: {
      name: string;
      displayName?: string;
      templateId: string;
      language?: string;
      collectionName?: string;
    }): Promise<Site | null> => {
      if (!client) {
        setError('Client not initialized');
        return null;
      }

      try {
        setLoading(true);
        setError(null);

        const sitecoreContextId = getSitecoreContextId();
        if (!sitecoreContextId) {
          setError('Sitecore Context ID not found');
          return null;
        }

        // Create a mock new site for now
        // In a real implementation, this would call the actual API
        const newSite: Site = {
          id: Math.random().toString(36).substr(2, 9),
          name: siteData.name,
          displayName: siteData.displayName || siteData.name,
          template: 'New Site',
          templateId: siteData.templateId,
          created: new Date().toISOString(),
          status: 'pending',
          language: siteData.language || 'en',
        };

        return newSite;
      } catch (err) {
        console.error('Failed to create site:', err);
        setError(err instanceof Error ? err.message : 'Failed to create site');
        return null;
      } finally {
        setLoading(false);
      }
    },
    [client, getSitecoreContextId]
  );

  return {
    listSites,
    getSiteTemplates,
    createSite,
    loading,
    error,
  };
}
