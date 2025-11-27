'use client';

import { MoreVertical } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Site {
  id: string;
  name: string;
  template: string;
  created: string;
  status: string;
}

interface SiteCardProps {
  site: Site;
}

export default function SiteCard({ site }: SiteCardProps) {
  const getStatusVariant = (status: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'default';
      case 'inactive':
        return 'secondary';
      case 'pending':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900">{site.name}</h3>
            <p className="text-sm text-slate-500 mt-1">{site.template}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-400 hover:text-slate-600"
          >
            <MoreVertical size={18} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Status</span>
            <Badge variant={getStatusVariant(site.status)}>
              {site.status}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Created</span>
            <span className="text-sm text-slate-900">
              {new Date(site.created).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex gap-2 pt-2 border-t border-slate-200">
          <Button variant="default" size="sm" className="flex-1">
            View
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
