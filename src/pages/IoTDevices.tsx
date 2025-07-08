import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { 
  Camera, 
  Zap, 
  Wifi, 
  WifiOff, 
  Plus, 
  Search, 
  Settings, 
  AlertTriangle,
  Monitor,
  Battery,
  Router,
  Eye,
  Wrench,
  Calendar,
  Globe,
  Moon,
  Sun,
  Languages,
  ChevronDown,
  Play,
  Filter,
  BarChart3,
  Activity,
  Signal,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Upload
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const IoTDevices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deviceFilter, setDeviceFilter] = useState('all');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentLang, setCurrentLang] = useState('en');
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [isRTL, setIsRTL] = useState(false);
  const [showStreamModal, setShowStreamModal] = useState(null);
  const [showSettingsModal, setShowSettingsModal] = useState(null);
  const [showAddDeviceModal, setShowAddDeviceModal] = useState(false);
  const [selectedCalibrateDevice, setSelectedCalibrateDevice] = useState(null);
  const [realTimeUpdates, setRealTimeUpdates] = useState(true);

  // Languages and translations
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇹🇳' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  const translations = {
    en: {
      title: "IoT Devices",
      subtitle: "Manage cameras, sensors, and connected devices",
      addDevice: "Add Device",
      networkSettings: "Network Settings",
      cameras: "Cameras",
      sensors: "Sensors", 
      networkStatus: "Network Status",
      online: "Online",
      offline: "Offline",
      warning: "Warning",
      excellent: "Excellent",
      good: "Good",
      poor: "Poor",
      searchDevices: "Search devices...",
      allDevices: "All Devices",
      onlineOnly: "Online Only",
      offlineOnly: "Offline Only",
      viewStream: "View Stream",
      calibrate: "Calibrate",
      settings: "Settings",
      lastSeen: "Last seen",
      monitoring: "Monitoring",
      battery: "Battery",
      lastReading: "Last reading",
      networkHealth: "Network Health",
      stable: "Stable",
      uptime: "uptime",
      bandwidthUsage: "Bandwidth Usage",
      activeStreams: "Active Streams",
      recentActivity: "Recent Activity"
    },
    ar: {
      title: "أجهزة إنترنت الأشياء",
      subtitle: "إدارة الكاميرات والمستشعرات والأجهزة المتصلة",
      addDevice: "إضافة جهاز",
      networkSettings: "إعدادات الشبكة", 
      cameras: "الكاميرات",
      sensors: "المستشعرات",
      networkStatus: "حالة الشبكة",
      online: "متصل",
      offline: "غير متصل",
      warning: "تحذير",
      excellent: "ممتاز",
      good: "جيد",
      poor: "ضعيف",
      searchDevices: "البحث عن الأجهزة...",
      allDevices: "جميع الأجهزة",
      onlineOnly: "المتصلة فقط",
      offlineOnly: "غير المتصلة فقط",
      viewStream: "عرض البث",
      calibrate: "معايرة",
      settings: "الإعدادات",
      lastSeen: "آخر ظهور",
      monitoring: "المراقبة",
      battery: "البطارية",
      lastReading: "آخر قراءة",
      networkHealth: "صحة الشبكة",
      stable: "مستقر",
      uptime: "وقت التشغيل",
      bandwidthUsage: "استخدام النطاق الترددي",
      activeStreams: "البث النشط",
      recentActivity: "النشاط الأخير"
    },
    fr: {
      title: "Appareils IoT",
      subtitle: "Gérer les caméras, capteurs et appareils connectés",
      addDevice: "Ajouter un appareil",
      networkSettings: "Paramètres réseau",
      cameras: "Caméras",
      sensors: "Capteurs",
      networkStatus: "État du réseau",
      online: "En ligne",
      offline: "Hors ligne", 
      warning: "Avertissement",
      excellent: "Excellent",
      good: "Bon",
      poor: "Faible",
      searchDevices: "Rechercher des appareils...",
      allDevices: "Tous les appareils",
      onlineOnly: "En ligne seulement",
      offlineOnly: "Hors ligne seulement",
      viewStream: "Voir le flux",
      calibrate: "Calibrer",
      settings: "Paramètres",
      lastSeen: "Vu pour la dernière fois",
      monitoring: "Surveillance",
      battery: "Batterie",
      lastReading: "Dernière lecture",
      networkHealth: "Santé du réseau",
      stable: "Stable",
      uptime: "temps de fonctionnement",
      bandwidthUsage: "Utilisation de la bande passante",
      activeStreams: "Flux actifs",
      recentActivity: "Activité récente"
    },
    de: {
      title: "IoT-Geräte",
      subtitle: "Kameras, Sensoren und verbundene Geräte verwalten",
      addDevice: "Gerät hinzufügen",
      networkSettings: "Netzwerkeinstellungen",
      cameras: "Kameras",
      sensors: "Sensoren",
      networkStatus: "Netzwerkstatus",
      online: "Online",
      offline: "Offline",
      warning: "Warnung",
      excellent: "Ausgezeichnet",
      good: "Gut",
      poor: "Schlecht",
      searchDevices: "Geräte suchen...",
      allDevices: "Alle Geräte",
      onlineOnly: "Nur online",
      offlineOnly: "Nur offline",
      viewStream: "Stream anzeigen",
      calibrate: "Kalibrieren",
      settings: "Einstellungen",
      lastSeen: "Zuletzt gesehen",
      monitoring: "Überwachung",
      battery: "Batterie",
      lastReading: "Letzte Messung",
      networkHealth: "Netzwerkzustand",
      stable: "Stabil",
      uptime: "Betriebszeit",
      bandwidthUsage: "Bandbreitennutzung",
      activeStreams: "Aktive Streams",
      recentActivity: "Letzte Aktivität"
    }
  };

  const t = translations[currentLang] || translations.en;

  // Theme and language management
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    setIsRTL(currentLang === 'ar');
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  // Real-time status updates simulation
  useEffect(() => {
    if (realTimeUpdates) {
      const interval = setInterval(() => {
        // Simulate real-time updates
        console.log('Updating device statuses...');
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [realTimeUpdates]);

  const cameras = [
    {
      id: 'CAM001',
      name: 'Zone A - Camera 1',
      location: 'Entrance Gate',
      status: 'online',
      ipAddress: '192.168.1.101',
      lastSeen: '2024-01-08 14:30',
      health: 'good',
      spaces: ['A1', 'A2', 'A3']
    },
    {
      id: 'CAM002',
      name: 'Zone A - Camera 2',
      location: 'Middle Section',
      status: 'online',
      ipAddress: '192.168.1.102',
      lastSeen: '2024-01-08 14:29',
      health: 'excellent',
      spaces: ['A4', 'A5', 'A6']
    },
    {
      id: 'CAM003',
      name: 'Zone B - Camera 1',
      location: 'Exit Gate',
      status: 'offline',
      ipAddress: '192.168.1.103',
      lastSeen: '2024-01-08 12:15',
      health: 'poor',
      spaces: ['B1', 'B2']
    }
  ];

  const sensors = [
    {
      id: 'SEN001',
      name: 'Space A1 Sensor',
      type: 'Ultrasonic',
      status: 'online',
      batteryLevel: 85,
      lastReading: '2024-01-08 14:30',
      space: 'A1'
    },
    {
      id: 'SEN002',
      name: 'Space A2 Sensor',
      type: 'Magnetic',
      status: 'online',
      batteryLevel: 72,
      lastReading: '2024-01-08 14:29',
      space: 'A2'
    },
    {
      id: 'SEN003',
      name: 'Space B1 Sensor',
      type: 'Infrared',
      status: 'warning',
      batteryLevel: 15,
      lastReading: '2024-01-08 14:25',
      space: 'B1'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800';
      case 'offline': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBatteryColor = (level: number) => {
    if (level > 50) return 'text-green-600';
    if (level > 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">IoT Devices</h1>
            <p className="text-gray-600">Manage cameras, sensors, and connected devices</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Network Settings
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Device
            </Button>
          </div>
        </div>

        {/* Device Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Camera className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Cameras</p>
                  <p className="text-2xl font-bold text-blue-600">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-full">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Sensors</p>
                  <p className="text-2xl font-bold text-green-600">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-full">
                  <Wifi className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Online</p>
                  <p className="text-2xl font-bold text-green-600">5</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-full">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Issues</p>
                  <p className="text-2xl font-bold text-red-600">2</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search devices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={deviceFilter}
                onChange={(e) => setDeviceFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Devices</option>
                <option value="cameras">Cameras</option>
                <option value="sensors">Sensors</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="cameras" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="cameras">Cameras</TabsTrigger>
            <TabsTrigger value="sensors">Sensors</TabsTrigger>
            <TabsTrigger value="network">Network Status</TabsTrigger>
          </TabsList>

          <TabsContent value="cameras" className="space-y-4">
            {cameras.map((camera) => (
              <Card key={camera.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Camera className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{camera.name}</h3>
                        <p className="text-sm text-gray-600">{camera.location} • {camera.ipAddress}</p>
                        <p className="text-xs text-gray-500">
                          Monitoring: {camera.spaces.join(', ')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(camera.status)}>
                            {camera.status === 'online' ? <Wifi className="w-3 h-3 mr-1" /> : <WifiOff className="w-3 h-3 mr-1" />}
                            {camera.status}
                          </Badge>
                          <Badge className={getHealthColor(camera.health)}>
                            {camera.health}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          Last seen: {camera.lastSeen}
                        </p>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View Stream
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="sensors" className="space-y-4">
            {sensors.map((sensor) => (
              <Card key={sensor.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-green-100 rounded-full">
                        <Zap className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{sensor.name}</h3>
                        <p className="text-sm text-gray-600">{sensor.type} • Space {sensor.space}</p>
                        <p className="text-xs text-gray-500">
                          Last reading: {sensor.lastReading}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(sensor.status)}>
                            {sensor.status === 'online' ? <Wifi className="w-3 h-3 mr-1" /> : <WifiOff className="w-3 h-3 mr-1" />}
                            {sensor.status}
                          </Badge>
                        </div>
                        <p className={`text-sm font-medium ${getBatteryColor(sensor.batteryLevel)}`}>
                          Battery: {sensor.batteryLevel}%
                        </p>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Calibrate
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="network" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Network Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="p-3 bg-green-100 rounded-full w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                      <Wifi className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-medium text-gray-900">Network Status</h3>
                    <p className="text-2xl font-bold text-green-600">Stable</p>
                    <p className="text-sm text-gray-500">99.9% uptime</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="p-3 bg-blue-100 rounded-full w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                      <Zap className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="font-medium text-gray-900">Bandwidth Usage</h3>
                    <p className="text-2xl font-bold text-blue-600">42%</p>
                    <p className="text-sm text-gray-500">of 100 Mbps</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="p-3 bg-purple-100 rounded-full w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                      <Camera className="w-8 h-8 text-purple-600" />
                    </div>
                    <h3 className="font-medium text-gray-900">Active Streams</h3>
                    <p className="text-2xl font-bold text-purple-600">2</p>
                    <p className="text-sm text-gray-500">of 3 cameras</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">CAM003 went offline</span>
                    <span className="text-xs text-gray-500">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">SEN003 battery low warning</span>
                    <span className="text-xs text-gray-500">3 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm">Network maintenance completed</span>
                    <span className="text-xs text-gray-500">1 day ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default IoTDevices;