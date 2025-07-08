
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Car, CreditCard, AlertTriangle } from 'lucide-react';

interface Activity {
  id: string;
  type: 'entry' | 'exit' | 'payment' | 'alert';
  description: string;
  time: string;
  details?: string;
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'entry',
    description: 'Vehicle ABC123 entered slot A1',
    time: '2 mins ago',
    details: 'Zone A'
  },
  {
    id: '2',
    type: 'payment',
    description: 'Payment received $12.50',
    time: '5 mins ago',
    details: 'Slot B3 - 2.5 hours'
  },
  {
    id: '3',
    type: 'exit',
    description: 'Vehicle XYZ789 left slot C2',
    time: '8 mins ago',
    details: 'Duration: 3.2 hours'
  },
  {
    id: '4',
    type: 'alert',
    description: 'Camera offline in Zone B',
    time: '12 mins ago',
    details: 'Camera B-02'
  },
  {
    id: '5',
    type: 'entry',
    description: 'Vehicle DEF456 entered slot A3',
    time: '15 mins ago',
    details: 'EV Charging slot'
  },
];

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'entry': return <Car className="w-4 h-4 text-green-600" />;
    case 'exit': return <Car className="w-4 h-4 text-blue-600" />;
    case 'payment': return <CreditCard className="w-4 h-4 text-emerald-600" />;
    case 'alert': return <AlertTriangle className="w-4 h-4 text-red-600" />;
    default: return <Clock className="w-4 h-4 text-gray-600" />;
  }
};

const getActivityBadge = (type: Activity['type']) => {
  switch (type) {
    case 'entry': return <Badge variant="outline" className="text-green-700 border-green-200">Entry</Badge>;
    case 'exit': return <Badge variant="outline" className="text-blue-700 border-blue-200">Exit</Badge>;
    case 'payment': return <Badge variant="outline" className="text-emerald-700 border-emerald-200">Payment</Badge>;
    case 'alert': return <Badge variant="destructive">Alert</Badge>;
    default: return <Badge variant="secondary">Activity</Badge>;
  }
};

export const RecentActivity = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-shrink-0 mt-1">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                  {getActivityBadge(activity.type)}
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <p className="text-xs text-gray-500">{activity.time}</p>
                  {activity.details && (
                    <>
                      <span className="text-xs text-gray-400">•</span>
                      <p className="text-xs text-gray-600">{activity.details}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
