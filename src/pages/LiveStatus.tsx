import { MainLayout } from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Car, Zap, Camera } from 'lucide-react';

const LiveStatus = () => {
  const zones = [
    {
      id: 'zone-a',
      name: 'Zone A',
      occupied: 8,
      total: 12,
      spaces: [
        { id: 'A1', status: 'occupied', vehicle: 'ABC123', type: 'regular' },
        { id: 'A2', status: 'available', type: 'ev' },
        { id: 'A3', status: 'occupied', vehicle: 'XYZ789', type: 'handicap' },
        { id: 'A4', status: 'available', type: 'regular' },
      ]
    },
    {
      id: 'zone-b',
      name: 'Zone B',
      occupied: 15,
      total: 20,
      spaces: [
        { id: 'B1', status: 'occupied', vehicle: 'DEF456', type: 'xl' },
        { id: 'B2', status: 'available', type: 'regular' },
        { id: 'B3', status: 'maintenance', type: 'regular' },
        { id: 'B4', status: 'occupied', vehicle: 'GHI321', type: 'ev' },
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'occupied': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
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

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Live Status</h1>
          <p className="text-gray-600">Real-time parking availability and occupancy</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-full">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Available</p>
                  <p className="text-2xl font-bold text-green-600">9</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-full">
                  <Car className="w-6 h-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Occupied</p>
                  <p className="text-2xl font-bold text-red-600">23</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-full">
                  <Camera className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Maintenance</p>
                  <p className="text-2xl font-bold text-yellow-600">1</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-full">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Occupancy</p>
                  <p className="text-2xl font-bold text-blue-600">72%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Zone Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {zones.map((zone) => (
            <Card key={zone.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{zone.name}</span>
                  <Badge variant="outline">
                    {zone.occupied}/{zone.total} occupied
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {zone.spaces.map((space) => (
                    <div
                      key={space.id}
                      className="p-3 border rounded-lg flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(space.type)}
                        <span className="font-medium">{space.id}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <Badge className={getStatusColor(space.status)}>
                          {space.status}
                        </Badge>
                        {space.vehicle && (
                          <span className="text-xs text-gray-500 mt-1">
                            {space.vehicle}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default LiveStatus;