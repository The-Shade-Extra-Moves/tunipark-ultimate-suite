
import { MainLayout } from '@/components/Layout/MainLayout';
import { StatsCard } from '@/components/Dashboard/StatsCard';
import { ParkingGrid } from '@/components/Dashboard/ParkingGrid';
import { RevenueChart } from '@/components/Dashboard/RevenueChart';
import { RecentActivity } from '@/components/Dashboard/RecentActivity';
import { 
  ParkingCircle, 
  DollarSign, 
  Users, 
  TrendingUp,
  Car,
  MapPin
} from 'lucide-react';

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's your parking overview.</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <MapPin className="w-4 h-4" />
            <span>Downtown Parking Facility</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Spaces"
            value="48"
            change="+2 this week"
            changeType="positive"
            icon={ParkingCircle}
            color="blue"
          />
          <StatsCard
            title="Occupied"
            value="34"
            change="71% occupancy"
            changeType="neutral"
            icon={Car}
            color="red"
          />
          <StatsCard
            title="Today's Revenue"
            value="$2,845"
            change="+12% from yesterday"
            changeType="positive"
            icon={DollarSign}
            color="green"
          />
          <StatsCard
            title="Active Users"
            value="156"
            change="+8% this month"
            changeType="positive"
            icon={Users}
            color="orange"
          />
        </div>

        {/* Parking Grid */}
        <ParkingGrid />

        {/* Charts */}
        <RevenueChart />

        {/* Recent Activity */}
        <RecentActivity />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
