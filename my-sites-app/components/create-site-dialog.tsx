'use client';

import { useEffect, useState } from 'react';
import { useSitesApi, type SiteTemplate } from '@/lib/useSitesApi';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface CreateSiteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (siteData: { name: string; templateId: string }) => Promise<void>;
}

export default function CreateSiteDialog({
  open,
  onOpenChange,
  onCreate,
}: CreateSiteDialogProps) {
  const { getSiteTemplates, loading: apiLoading } = useSitesApi();
  const [siteName, setSiteName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [templates, setTemplates] = useState<SiteTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (!open) return;

    const fetchTemplates = async () => {
      try {
        setLoading(true);
        const templatesData = await getSiteTemplates();
        setTemplates(templatesData);
        if (templatesData.length > 0) {
          setSelectedTemplate(templatesData[0].id);
        }
      } catch (error) {
        console.error('Failed to fetch templates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, [open, getSiteTemplates]);

  const handleCreate = async () => {
    if (!siteName.trim() || !selectedTemplate) {
      return;
    }

    setCreating(true);
    try {
      await onCreate({
        name: siteName,
        templateId: selectedTemplate,
      });
      setSiteName('');
      setSelectedTemplate('');
      onOpenChange(false);
    } finally {
      setCreating(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setSiteName('');
      setSelectedTemplate('');
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Site</DialogTitle>
          <DialogDescription>
            Fill in the details below to create a new XM Cloud site.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="site-name">Site Name</Label>
            <Input
              id="site-name"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              placeholder="Enter site name"
              disabled={creating || apiLoading}
            />
          </div>

          <div className="space-y-3">
            <Label>Site Template</Label>
            {loading || apiLoading ? (
              <div className="text-center py-4">
                <p className="text-sm text-slate-500">Loading templates...</p>
              </div>
            ) : (
              <RadioGroup value={selectedTemplate} onValueChange={setSelectedTemplate}>
                <div className="space-y-2">
                  {templates.map((template) => (
                    <div key={template.id} className="flex items-start space-x-2">
                      <RadioGroupItem value={template.id} id={template.id} disabled={creating || apiLoading} />
                      <Label
                        htmlFor={template.id}
                        className="flex-1 cursor-pointer font-normal"
                      >
                        <div>
                          <p className="font-medium text-slate-900">{template.name}</p>
                          <p className="text-sm text-slate-500">
                            {template.description}
                          </p>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={creating || apiLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={creating || apiLoading || !siteName.trim() || !selectedTemplate}
          >
            {creating ? 'Creating...' : 'Create'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
