import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, Zap, Car, Clock, DollarSign, Activity, TrendingUp } from 'lucide-react';

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

interface ViewSpaceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  space: ParkingSpace | null;
}

export const ViewSpaceModal = ({ open, onOpenChange, space }: ViewSpaceModalProps) => {
  if (!space) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ev': return <Zap className="w-4 h-4" />;
      case 'handicap': return <span className="text-sm">♿</span>;
      case 'xl': return <span className="text-sm">🚛</span>;
      default: return <Car className="w-4 h-4" />;
    }
  };

  const isOccupied = !!space.currentVehicle;
  const occupancyHistory = [
    { time: '09:00', occupied: true },
    { time: '10:00', occupied: false },
    { time: '11:00', occupied: true },
    { time: '12:00', occupied: true },
    { time: '13:00', occupied: false },
    { time: '14:00', occupied: true },
    { time: '15:00', occupied: true },
    { time: '16:00', occupied: false }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center space-x-2">
              {getTypeIcon(space.type)}
              <span>{space.name}</span>
            </DialogTitle>
            <Badge className={getStatusColor(space.status)}>
              {space.status}
            </Badge>
          </div>
          <p className="text-gray-600">{space.zone} • Space ID: {space.id}</p>
        </DialogHeader>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="hardware">Hardware</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Current Status</CardTitle>
                </CardHeader>
                <CardContent>
                  {isOccupied ? (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="font-medium text-red-600">Occupied</span>
                      </div>
                      <p className="text-sm text-gray-600">Vehicle: {space.currentVehicle}</p>
                      <p className="text-sm text-gray-600">Duration: 2h 15m</p>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-medium text-green-600">Available</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Today's Usage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Sessions:</span>
                      <span className="font-medium">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Occupancy:</span>
                      <span className="font-medium">67%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Avg Duration:</span>
                      <span className="font-medium">1h 45m</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">24h Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-green-600">
                      ${space.revenue24h.toFixed(2)}
                    </div>
                    <div className="flex items-center space-x-1 text-sm">
                      <TrendingUp className="w-3 h-3 text-green-600" />
                      <span className="text-green-600">+12% vs yesterday</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {space.hasCamera && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Camera className="w-4 h-4" />
                    <span>Live Camera Feed</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Live camera feed would appear here</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        View Full Screen
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { time: '14:30', action: 'Vehicle ABC123 parked', type: 'arrival' },
                    { time: '12:45', action: 'Vehicle XYZ789 departed', type: 'departure' },
                    { time: '11:20', action: 'Vehicle XYZ789 parked', type: 'arrival' },
                    { time: '09:15', action: 'Vehicle DEF456 departed', type: 'departure' },
                    { time: '07:30', action: 'Vehicle DEF456 parked', type: 'arrival' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 rounded border">
                      <div className={`w-2 h-2 rounded-full ${activity.type === 'arrival' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-gray-600">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Occupancy Pattern</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-8 gap-1">
                  {occupancyHistory.map((hour, index) => (
                    <div key={index} className="text-center">
                      <div className={`h-8 rounded mb-1 ${hour.occupied ? 'bg-red-200' : 'bg-green-200'}`}></div>
                      <span className="text-xs text-gray-600">{hour.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4" />
                    <span>Revenue Breakdown</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Today:</span>
                    <span className="font-medium">${space.revenue24h.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">This Week:</span>
                    <span className="font-medium">${(space.revenue24h * 7).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">This Month:</span>
                    <span className="font-medium">${(space.revenue24h * 30).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-sm font-medium">Hourly Rate:</span>
                    <span className="font-medium">${space.hourlyRate || 5.00}/hr</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Utilization Rate:</span>
                    <span className="font-medium">67%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Avg Session Length:</span>
                    <span className="font-medium">1h 45m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Revenue per Hour:</span>
                    <span className="font-medium">${(space.revenue24h / 24).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Weekly Trend:</span>
                    <span className="font-medium text-green-600">+12%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="hardware" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Camera className="w-4 h-4" />
                    <span>Camera System</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {space.hasCamera ? (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Status: Online</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>Model: IP Camera Pro 4K</p>
                        <p>Resolution: 3840x2160</p>
                        <p>Stream: RTSP enabled</p>
                        <p>Last ping: 2 seconds ago</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Test Camera
                      </Button>
                    </div>
                  ) : (
                    <p className="text-gray-600">No camera installed</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="w-4 h-4" />
                    <span>Occupancy Sensor</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {space.hasSensor ? (
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Status: Active</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>Type: Ultrasonic Sensor</p>
                        <p>Range: 0.3 - 4.5m</p>
                        <p>Accuracy: ±1cm</p>
                        <p>Battery: 87%</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Calibrate Sensor
                      </Button>
                    </div>
                  ) : (
                    <p className="text-gray-600">No sensor installed</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <div className="flex justify-end pt-6 border-t">
            <Button onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};