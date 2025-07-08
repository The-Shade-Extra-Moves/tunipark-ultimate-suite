import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Settings, Camera, Zap, DollarSign } from 'lucide-react';

interface ParkingSpace {
  id: string;
  name: string;
  zone: string;
  type: 'regular' | 'ev' | 'handicap' | 'xl';
  status: 'active' | 'maintenance' | 'offline';
  hasCamera: boolean;
  hasSensor: boolean;
  currentVehicle?: string;
  revenue24h: number;
  hourlyRate?: number;
}

interface ConfigureSpaceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  space: ParkingSpace | null;
  onSpaceUpdated: (space: ParkingSpace) => void;
}

export const ConfigureSpaceModal = ({ open, onOpenChange, space, onSpaceUpdated }: ConfigureSpaceModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ParkingSpace | null>(null);

  useEffect(() => {
    if (space) {
      setFormData({ ...space, hourlyRate: space.hourlyRate || 5.00 });
    }
  }, [space]);

  if (!formData) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSpaceUpdated(formData);
    onOpenChange(false);
    
    toast({
      title: "Success",
      description: `Configuration for ${formData.name} has been updated`
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Configure {formData.name}</span>
            </DialogTitle>
            <Badge className={getStatusColor(formData.status)}>
              {formData.status}
            </Badge>
          </div>
        </DialogHeader>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="hardware">Hardware</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit}>
            <TabsContent value="general" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-name">Display Name</Label>
                  <Input
                    id="edit-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="edit-zone">Zone</Label>
                  <Select value={formData.zone} onValueChange={(value) => setFormData({ ...formData, zone: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Zone A">Zone A</SelectItem>
                      <SelectItem value="Zone B">Zone B</SelectItem>
                      <SelectItem value="Zone C">Zone C</SelectItem>
                      <SelectItem value="Zone D">Zone D</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-type">Space Type</Label>
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
                  <Label htmlFor="edit-status">Status</Label>
                  <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="offline">Offline</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="hardware" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Camera className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Camera System</p>
                      <p className="text-sm text-gray-600">License plate recognition and monitoring</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={formData.hasCamera}
                    onCheckedChange={(checked) => setFormData({ ...formData, hasCamera: !!checked })}
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">Occupancy Sensor</p>
                      <p className="text-sm text-gray-600">Real-time space availability detection</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={formData.hasSensor}
                    onCheckedChange={(checked) => setFormData({ ...formData, hasSensor: !!checked })}
                  />
                </div>
              </div>

              {formData.hasCamera && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium mb-2">Camera Configuration</h4>
                  <div className="space-y-2">
                    <Input placeholder="Camera IP Address (e.g., 192.168.1.100)" />
                    <Input placeholder="RTSP Stream URL" />
                    <Button variant="outline" size="sm">Test Connection</Button>
                  </div>
                </div>
              )}

              {formData.hasSensor && (
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium mb-2">Sensor Configuration</h4>
                  <div className="space-y-2">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Sensor Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ultrasonic">Ultrasonic</SelectItem>
                        <SelectItem value="magnetic">Magnetic</SelectItem>
                        <SelectItem value="infrared">Infrared</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">Calibrate Sensor</Button>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="pricing" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <Input
                      id="hourlyRate"
                      type="number"
                      step="0.25"
                      value={formData.hourlyRate}
                      onChange={(e) => setFormData({ ...formData, hourlyRate: parseFloat(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Revenue Statistics</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">24h Revenue</p>
                      <p className="font-medium text-green-600">${formData.revenue24h.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Weekly Estimate</p>
                      <p className="font-medium">${(formData.revenue24h * 7).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label>Access Control</Label>
                  <Select defaultValue="public">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public Access</SelectItem>
                      <SelectItem value="restricted">Restricted Access</SelectItem>
                      <SelectItem value="private">Private Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Maximum Stay (hours)</Label>
                  <Input type="number" placeholder="24" />
                </div>

                <div>
                  <Label>Grace Period (minutes)</Label>
                  <Input type="number" placeholder="15" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="reservable" />
                    <Label htmlFor="reservable">Allow Reservations</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="notifications" />
                    <Label htmlFor="notifications">Send Overstay Notifications</Label>
                  </div>
                </div>
              </div>
            </TabsContent>

            <div className="flex space-x-2 pt-6 border-t">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1">
                Save Configuration
              </Button>
            </div>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};