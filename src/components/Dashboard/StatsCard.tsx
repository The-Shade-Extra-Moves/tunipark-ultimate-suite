
import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  color?: string;
}

export const StatsCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'neutral', 
  icon: Icon,
  color = 'blue' 
}: StatsCardProps) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getIconColor = () => {
    switch (color) {
      case 'green': return 'text-green-600 bg-green-100';
      case 'red': return 'text-red-600 bg-red-100';
      case 'orange': return 'text-orange-600 bg-orange-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <div className={`p-2 rounded-full ${getIconColor()}`}>
          <Icon className="w-4 h-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{value}</div>
        {change && (
          <p className={`text-xs ${getChangeColor()} mt-1`}>
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
