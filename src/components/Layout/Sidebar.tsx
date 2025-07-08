
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ParkingCircle, 
  Users, 
  DollarSign, 
  BarChart3, 
  Settings,
  Camera,
  Calendar,
  MapPin,
  CreditCard,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Parking Spaces', href: '/parking-spaces', icon: ParkingCircle },
  { name: 'Live Status', href: '/live-status', icon: MapPin },
  { name: 'Reservations', href: '/reservations', icon: Calendar },
  { name: 'Revenue', href: '/revenue', icon: DollarSign },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'IoT Devices', href: '/iot-devices', icon: Camera },
  { name: 'Users', href: '/users', icon: Users },
  { name: 'Subscription', href: '/subscription', icon: CreditCard },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  return (
    <div className={`fixed inset-y-0 left-0 z-50 bg-white shadow-lg transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b">
          {isOpen && (
            <div className="flex items-center space-x-2">
              <ParkingCircle className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">TuniPark</span>
            </div>
          )}
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? (
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
              {isOpen && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User Profile */}
        <div className="border-t p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white text-sm font-medium">U</span>
            </div>
            {isOpen && (
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">User</p>
                <p className="text-xs text-gray-500">Premium Plan</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
