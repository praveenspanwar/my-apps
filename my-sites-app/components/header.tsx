'use client';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onCreateClick: () => void;
}

export default function Header({ onCreateClick }: HeaderProps) {
  return (
    <header className="border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Sitecore Sites Manager</h1>
          <p className="text-slate-500 text-sm mt-1">
            Create and manage your XM Cloud sites
          </p>
        </div>
        <Button
          onClick={onCreateClick}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          Create Site
        </Button>
      </div>
    </header>
  );
}
