
import { useState } from 'react';
import { MainLayout } from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Search, Settings, Camera, Zap, Car } from 'lucide-react';
import { AddSpaceModal } from '@/components/Modals/AddSpaceModal';
import { ConfigureSpaceModal } from '@/components/Modals/ConfigureSpaceModal';
import { ViewSpaceModal } from '@/components/Modals/ViewSpaceModal';
import { SetupWizardModal } from '@/components/Modals/SetupWizardModal';

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
}

const mockSpaces: ParkingSpace[] = [
  {
    id: 'A1',
    name: 'Space A1',
    zone: 'Zone A',
    type: 'regular',
    status: 'active',
    hasCamera: true,
    hasSensor: true,
    currentVehicle: 'ABC123',
    revenue24h: 24.50
  },
  {
    id: 'A2',
    name: 'Space A2',
    zone: 'Zone A',
    type: 'ev',
    status: 'active',
    hasCamera: true,
    hasSensor: true,
    revenue24h: 32.00
  },
  {
    id: 'A3',
    name: 'Space A3',
    zone: 'Zone A',
    type: 'handicap',
    status: 'active',
    hasCamera: false,
    hasSensor: true,
    revenue24h: 18.75
  },
  {
    id: 'B1',
    name: 'Space B1',
    zone: 'Zone B',
    type: 'xl',
    status: 'maintenance',
    hasCamera: true,
    hasSensor: false,
    revenue24h: 0
  }
];

const ParkingSpaces = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState('all');
  const [spaces, setSpaces] = useState<ParkingSpace[]>(mockSpaces);
  
  // Modal states
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [configureModalOpen, setConfigureModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [wizardModalOpen, setWizardModalOpen] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState<ParkingSpace | null>(null);

  // Handler functions
  const handleAddSpace = (newSpace: ParkingSpace) => {
    setSpaces([...spaces, newSpace]);
  };

  const handleUpdateSpace = (updatedSpace: ParkingSpace) => {
    setSpaces(spaces.map(space => 
      space.id === updatedSpace.id ? updatedSpace : space
    ));
  };

  const handleConfigureClick = (space: ParkingSpace) => {
    setSelectedSpace(space);
    setConfigureModalOpen(true);
  };

  const handleViewClick = (space: ParkingSpace) => {
    setSelectedSpace(space);
    setViewModalOpen(true);
  };

  const filteredSpaces = spaces.filter(space => {
    const matchesSearch = space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         space.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesZone = selectedZone === 'all' || space.zone === selectedZone;
    return matchesSearch && matchesZone;
  });

  const getTypeIcon = (type: ParkingSpace['type']) => {
    switch (type) {
      case 'ev': return <Zap className="w-4 h-4" />;
      case 'handicap': return <span className="text-sm">♿</span>;
      case 'xl': return <span className="text-sm">🚛</span>;
      default: return <Car className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: ParkingSpace['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Parking Spaces</h1>
            <p className="text-gray-600">Manage and configure your parking spaces</p>
          </div>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setAddModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Space
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search spaces..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Zones</option>
                <option value="Zone A">Zone A</option>
                <option value="Zone B">Zone B</option>
                <option value="Zone C">Zone C</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Spaces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpaces.map((space) => (
            <Card key={space.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{space.name}</CardTitle>
                  <Badge className={getStatusColor(space.status)}>
                    {space.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{space.zone}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Type and Features */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(space.type)}
                    <span className="text-sm capitalize">{space.type}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {space.hasCamera && (
                      <div className="p-1 bg-blue-100 rounded">
                        <Camera className="w-3 h-3 text-blue-600" />
                      </div>
                    )}
                    {space.hasSensor && (
                      <div className="p-1 bg-green-100 rounded">
                        <div className="w-3 h-3 bg-green-600 rounded-full" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Current Status */}
                {space.currentVehicle && (
                  <div className="p-2 bg-red-50 rounded-md">
                    <p className="text-sm text-red-800">
                      Occupied: <span className="font-mono">{space.currentVehicle}</span>
                    </p>
                  </div>
                )}

                {/* Revenue */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">24h Revenue:</span>
                  <span className="font-medium text-green-600">${space.revenue24h.toFixed(2)}</span>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleConfigureClick(space)}
                  >
                    <Settings className="w-4 h-4 mr-1" />
                    Configure
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewClick(space)}
                  >
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add Space Wizard Placeholder */}
        <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Add New Parking Space</h3>
              <p className="text-gray-600 mb-4">Configure cameras, sensors, and pricing for new spaces</p>
              <Button 
                variant="outline"
                onClick={() => setWizardModalOpen(true)}
              >
                Start Setup Wizard
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* All Modals */}
        <AddSpaceModal
          open={addModalOpen}
          onOpenChange={setAddModalOpen}
          onSpaceAdded={handleAddSpace}
        />
        
        <ConfigureSpaceModal
          open={configureModalOpen}
          onOpenChange={setConfigureModalOpen}
          space={selectedSpace}
          onSpaceUpdated={handleUpdateSpace}
        />
        
        <ViewSpaceModal
          open={viewModalOpen}
          onOpenChange={setViewModalOpen}
          space={selectedSpace}
        />
        
        <SetupWizardModal
          open={wizardModalOpen}
          onOpenChange={setWizardModalOpen}
          onSpaceCreated={handleAddSpace}
        />
      </div>
    </MainLayout>
  );
};

export default ParkingSpaces;
