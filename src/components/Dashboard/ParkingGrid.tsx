
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ParkingSlot {
  id: string;
  status: 'available' | 'occupied' | 'reserved' | 'maintenance';
  type: 'regular' | 'ev' | 'handicap' | 'xl';
  zone: string;
  plateNumber?: string;
}

const mockSlots: ParkingSlot[] = [
  { id: 'A1', status: 'occupied', type: 'regular', zone: 'Zone A', plateNumber: 'ABC123' },
  { id: 'A2', status: 'available', type: 'regular', zone: 'Zone A' },
  { id: 'A3', status: 'reserved', type: 'ev', zone: 'Zone A' },
  { id: 'A4', status: 'available', type: 'regular', zone: 'Zone A' },
  { id: 'B1', status: 'occupied', type: 'handicap', zone: 'Zone B', plateNumber: 'XYZ789' },
  { id: 'B2', status: 'available', type: 'regular', zone: 'Zone B' },
  { id: 'B3', status: 'maintenance', type: 'xl', zone: 'Zone B' },
  { id: 'B4', status: 'available', type: 'regular', zone: 'Zone B' },
  { id: 'C1', status: 'occupied', type: 'regular', zone: 'Zone C', plateNumber: 'DEF456' },
  { id: 'C2', status: 'available', type: 'ev', zone: 'Zone C' },
  { id: 'C3', status: 'available', type: 'regular', zone: 'Zone C' },
  { id: 'C4', status: 'reserved', type: 'regular', zone: 'Zone C' },
];

export const ParkingGrid = () => {
  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null);

  const getSlotColor = (status: ParkingSlot['status']) => {
    switch (status) {
      case 'available': return 'bg-green-500 hover:bg-green-600';
      case 'occupied': return 'bg-red-500 hover:bg-red-600';
      case 'reserved': return 'bg-orange-500 hover:bg-orange-600';
      case 'maintenance': return 'bg-gray-500 hover:bg-gray-600';
      default: return 'bg-gray-300';
    }
  };

  const getTypeIcon = (type: ParkingSlot['type']) => {
    switch (type) {
      case 'ev': return '⚡';
      case 'handicap': return '♿';
      case 'xl': return '🚛';
      default: return '🚗';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Live Parking Status</CardTitle>
        <div className="flex space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>Occupied</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span>Reserved</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <span>Maintenance</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4">
          {mockSlots.map((slot) => (
            <div
              key={slot.id}
              className={`
                aspect-square rounded-lg cursor-pointer transition-all duration-200 
                flex flex-col items-center justify-center text-white font-medium
                ${getSlotColor(slot.status)}
                ${selectedSlot?.id === slot.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
              `}
              onClick={() => setSelectedSlot(slot)}
            >
              <div className="text-lg">{getTypeIcon(slot.type)}</div>
              <div className="text-sm">{slot.id}</div>
              {slot.plateNumber && (
                <div className="text-xs opacity-75">{slot.plateNumber}</div>
              )}
            </div>
          ))}
        </div>

        {selectedSlot && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Slot Details: {selectedSlot.id}</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Status:</span>
                <Badge 
                  className="ml-2"
                  variant={selectedSlot.status === 'available' ? 'default' : 'secondary'}
                >
                  {selectedSlot.status}
                </Badge>
              </div>
              <div>
                <span className="text-gray-600">Type:</span>
                <span className="ml-2 capitalize">{selectedSlot.type}</span>
              </div>
              <div>
                <span className="text-gray-600">Zone:</span>
                <span className="ml-2">{selectedSlot.zone}</span>
              </div>
              {selectedSlot.plateNumber && (
                <div>
                  <span className="text-gray-600">Plate:</span>
                  <span className="ml-2 font-mono">{selectedSlot.plateNumber}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
