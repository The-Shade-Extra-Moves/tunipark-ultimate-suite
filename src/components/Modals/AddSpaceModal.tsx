import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

interface AddSpaceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSpaceAdded: (space: any) => void;
}

export const AddSpaceModal = ({ open, onOpenChange, onSpaceAdded }: AddSpaceModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    zone: '',
    type: 'regular' as 'regular' | 'ev' | 'handicap' | 'xl',
    hasCamera: false,
    hasSensor: false,
    hourlyRate: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.id || !formData.name || !formData.zone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const newSpace = {
      ...formData,
      status: 'active' as const,
      currentVehicle: undefined,
      revenue24h: 0,
      hourlyRate: parseFloat(formData.hourlyRate) || 5.00
    };

    onSpaceAdded(newSpace);
    onOpenChange(false);
    
    toast({
      title: "Success",
      description: `Parking space ${formData.name} has been added successfully`
    });

    // Reset form
    setFormData({
      id: '',
      name: '',
      zone: '',
      type: 'regular',
      hasCamera: false,
      hasSensor: false,
      hourlyRate: ''
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Parking Space</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="id">Space ID *</Label>
              <Input
                id="id"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                placeholder="e.g., A1, B5"
              />
            </div>
            
            <div>
              <Label htmlFor="name">Display Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Space A1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="zone">Zone *</Label>
            <Select value={formData.zone} onValueChange={(value) => setFormData({ ...formData, zone: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select zone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Zone A">Zone A</SelectItem>
                <SelectItem value="Zone B">Zone B</SelectItem>
                <SelectItem value="Zone C">Zone C</SelectItem>
                <SelectItem value="Zone D">Zone D</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="type">Space Type</Label>
            <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="regular">Regular</SelectItem>
                <SelectItem value="ev">Electric Vehicle</SelectItem>
                <SelectItem value="handicap">Handicap Accessible</SelectItem>
                <SelectItem value="xl">XL/Oversized</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
            <Input
              id="hourlyRate"
              type="number"
              step="0.25"
              value={formData.hourlyRate}
              onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
              placeholder="5.00"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="camera"
                checked={formData.hasCamera}
                onCheckedChange={(checked) => setFormData({ ...formData, hasCamera: !!checked })}
              />
              <Label htmlFor="camera">Has Camera</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="sensor"
                checked={formData.hasSensor}
                onCheckedChange={(checked) => setFormData({ ...formData, hasSensor: !!checked })}
              />
              <Label htmlFor="sensor">Has Sensor</Label>
            </div>
          </div>

          <div className="flex space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Space
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};