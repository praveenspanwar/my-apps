'use client';

import React, {
  useEffect,
  useState,
  ReactNode,
  createContext,
  useContext,
} from 'react';
import {
  ApplicationContext,
  ClientSDK,
} from '@sitecore-marketplace-sdk/client';
import { XMC } from '@sitecore-marketplace-sdk/xmc';

interface ClientSDKProviderProps {
  children: ReactNode;
}

const ClientSDKContext = createContext<ClientSDK | null>(null);
const AppContextContext = createContext<ApplicationContext | null>(null);
const InitializedContext = createContext<boolean>(false);

export const XmcProviderWrapper: React.FC<ClientSDKProviderProps> = ({
  children,
}) => {
  const [client, setClient] = useState<ClientSDK | null>(null);
  const [appContext, setAppContext] = useState<ApplicationContext | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    if (client) {
      client
        .query('application.context')
        .then((res) => {
          if (res && res.data) {
            setAppContext(res.data);
            setIsInitialized(true);
          }
        })
        .catch((err) => {
          console.error('Error fetching application context:', err);
          setError('Failed to fetch application context');
        });
    }
  }, [client]);

  useEffect(() => {
    const init = async () => {
      const config = {
        target: window.parent,
        modules: [XMC],
      };
      try {
        setLoading(true);
        const clientSDK = await ClientSDK.init(config);
        setClient(clientSDK);
      } catch (error) {
        console.error('Error initializing client SDK', error);
        setError('Error initializing client SDK');
        setLoading(false);
      }
    };

    init();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Initializing Sitecore Sites Manager
          </h1>
          <p className="text-blue-200">Please wait...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Error</h1>
          <p className="text-xl text-slate-300 mb-4">{error}</p>
          <p className="text-blue-200 max-w-md">
            Please check if this app is loaded inside Sitecore XM Cloud
            Marketplace and you have properly configured the extension points.
          </p>
        </div>
      </div>
    );
  }

  if (!client) {
    return null;
  }

  return (
    <ClientSDKContext.Provider value={client}>
      <AppContextContext.Provider value={appContext}>
        <InitializedContext.Provider value={isInitialized}>
          {children}
        </InitializedContext.Provider>
      </AppContextContext.Provider>
    </ClientSDKContext.Provider>
  );
};

export const useMarketplaceClient = () => {
  const context = useContext(ClientSDKContext);
  if (!context) {
    throw new Error(
      'useMarketplaceClient must be used within an XmcProviderWrapper'
    );
  }
  return context;
};

export const useAppContext = () => {
  const context = useContext(AppContextContext);
  if (!context) {
    throw new Error(
      'useAppContext must be used within an XmcProviderWrapper'
    );
  }
  return context;
};

export const useXmc = () => {
  const client = useContext(ClientSDKContext);
  const appContext = useContext(AppContextContext);
  const isInitialized = useContext(InitializedContext);

  return {
    client,
    appContext,
    isInitialized,
  };
};
