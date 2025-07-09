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
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-950 to-purple-950 text-white' 
        : 'bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 text-gray-900'
    } ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Language and Theme Controls */}
      <div className={`fixed top-6 ${isRTL ? 'left-6' : 'right-6'} z-50 flex items-center gap-3`}>
        {/* Language Selector */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowLangDropdown(!showLangDropdown)}
            className={`${
              isDarkMode 
                ? 'bg-white/10 hover:bg-white/20 text-white border-white/20' 
                : 'bg-black/10 hover:bg-black/20 text-black border-black/20'
            } backdrop-blur-lg rounded-xl border transition-all duration-300`}
          >
            <Globe className="w-4 h-4" />
            <span className="ml-2">{languages.find(l => l.code === currentLang)?.flag}</span>
            <ChevronDown className="w-3 h-3 ml-1" />
          </Button>

          <AnimatePresence>
            {showLangDropdown && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className={`absolute top-full mt-2 ${isRTL ? 'left-0' : 'right-0'} ${
                  isDarkMode 
                    ? 'bg-gray-800/90 border-gray-700/50' 
                    : 'bg-white/90 border-gray-200/50'
                } backdrop-blur-xl rounded-xl border shadow-xl min-w-[140px] overflow-hidden z-50`}
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setCurrentLang(lang.code);
                      setShowLangDropdown(false);
                    }}
                    className={`w-full px-4 py-3 text-sm flex items-center gap-3 transition-colors ${
                      currentLang === lang.code
                        ? isDarkMode ? 'bg-purple-600/30 text-purple-200' : 'bg-blue-100 text-blue-800'
                        : isDarkMode ? 'hover:bg-gray-700/50 text-gray-200' : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className={isRTL ? 'text-right' : 'text-left'}>{lang.name}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`${
            isDarkMode 
              ? 'bg-white/10 hover:bg-white/20 text-white border-white/20' 
              : 'bg-black/10 hover:bg-black/20 text-black border-black/20'
          } backdrop-blur-lg rounded-xl border transition-all duration-300`}
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>
      </div>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className={`absolute top-1/4 ${isRTL ? 'right-1/4' : 'left-1/4'} w-96 h-96 ${
            isDarkMode ? 'bg-purple-500/20' : 'bg-blue-400/20'
          } rounded-full blur-3xl`}
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, -5, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className={`absolute bottom-1/4 ${isRTL ? 'left-1/4' : 'right-1/4'} w-72 h-72 ${
            isDarkMode ? 'bg-blue-500/20' : 'bg-purple-400/20'
          } rounded-full blur-3xl`}
        />
      </div>

      <MainLayout>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8 relative z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {t.title}
              </h1>
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
                {t.subtitle}
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3"
            >
              <Button 
                variant="outline"
                className={`${
                  isDarkMode 
                    ? 'bg-white/5 border-white/20 hover:bg-white/10 text-white' 
                    : 'bg-gray-900/5 border-gray-300/30 hover:bg-gray-100 text-gray-900'
                } backdrop-blur-xl transition-all duration-300 shadow-lg hover:shadow-xl`}
              >
                <Settings className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t.networkSettings}
              </Button>
              
              <Button 
                onClick={() => setShowAddDeviceModal(true)}
                className={`${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                } text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
              >
                <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t.addDevice}
              </Button>
            </motion.div>
          </div>

          {/* Device Stats Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { 
                icon: Camera, 
                label: t.cameras, 
                value: cameras.length, 
                color: 'blue',
                bgFrom: 'from-blue-500/20',
                bgTo: 'to-cyan-500/20'
              },
              { 
                icon: Zap, 
                label: t.sensors, 
                value: sensors.length, 
                color: 'green',
                bgFrom: 'from-green-500/20',
                bgTo: 'to-emerald-500/20'
              },
              { 
                icon: Wifi, 
                label: t.online, 
                value: [...cameras, ...sensors].filter(d => d.status === 'online').length, 
                color: 'emerald',
                bgFrom: 'from-emerald-500/20',
                bgTo: 'to-green-500/20'
              },
              { 
                icon: AlertTriangle, 
                label: 'Issues', 
                value: [...cameras, ...sensors].filter(d => d.status !== 'online').length, 
                color: 'red',
                bgFrom: 'from-red-500/20',
                bgTo: 'to-pink-500/20'
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className={`${
                  isDarkMode ? 'bg-white/5' : 'bg-white/20'
                } backdrop-blur-xl border ${
                  isDarkMode ? 'border-white/10' : 'border-gray-200/20'
                } rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      {stat.label}
                    </p>
                    <motion.p 
                      className={`text-3xl font-bold text-${stat.color}-500 mt-2`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.1, type: "spring", stiffness: 200 }}
                    >
                      {stat.value}
                    </motion.p>
                  </div>
                  <div className={`p-3 bg-gradient-to-br ${stat.bgFrom} ${stat.bgTo} rounded-2xl`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-500`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className={`${
              isDarkMode ? 'bg-white/5' : 'bg-white/20'
            } backdrop-blur-xl border ${
              isDarkMode ? 'border-white/10' : 'border-gray-200/20'
            } rounded-2xl p-6 shadow-xl`}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <Input
                  placeholder={t.searchDevices}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`${isRTL ? 'pr-12 text-right' : 'pl-12'} ${
                    isDarkMode 
                      ? 'bg-gray-900/50 border-gray-600/50 text-white placeholder:text-gray-400' 
                      : 'bg-white/50 border-gray-300/50 text-gray-900 placeholder:text-gray-500'
                  } backdrop-blur-sm rounded-xl border transition-all duration-300 focus:shadow-lg focus:border-blue-400`}
                />
              </div>
              
              <div className="relative">
                <Filter className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <select
                  value={deviceFilter}
                  onChange={(e) => setDeviceFilter(e.target.value)}
                  className={`${isRTL ? 'pr-12 text-right' : 'pl-12'} py-3 px-4 ${
                    isDarkMode 
                      ? 'bg-gray-900/50 border-gray-600/50 text-white' 
                      : 'bg-white/50 border-gray-300/50 text-gray-900'
                  } backdrop-blur-sm rounded-xl border transition-all duration-300 focus:shadow-lg focus:border-blue-400 focus:outline-none min-w-[160px]`}
                >
                  <option value="all">{t.allDevices}</option>
                  <option value="cameras">{t.cameras}</option>
                  <option value="sensors">{t.sensors}</option>
                  <option value="online">{t.onlineOnly}</option>
                  <option value="offline">{t.offlineOnly}</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Tabs defaultValue="cameras" className="w-full">
              <TabsList className={`grid w-full grid-cols-3 ${
                isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'
              } backdrop-blur-xl rounded-2xl p-1 border ${
                isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'
              }`}>
                <TabsTrigger 
                  value="cameras"
                  className={`rounded-xl transition-all duration-300 ${
                    isDarkMode 
                      ? 'data-[state=active]:bg-white/10 text-gray-300 data-[state=active]:text-white' 
                      : 'data-[state=active]:bg-white text-gray-600 data-[state=active]:text-gray-900'
                  }`}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  {t.cameras}
                </TabsTrigger>
                <TabsTrigger 
                  value="sensors"
                  className={`rounded-xl transition-all duration-300 ${
                    isDarkMode 
                      ? 'data-[state=active]:bg-white/10 text-gray-300 data-[state=active]:text-white' 
                      : 'data-[state=active]:bg-white text-gray-600 data-[state=active]:text-gray-900'
                  }`}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  {t.sensors}
                </TabsTrigger>
                <TabsTrigger 
                  value="network"
                  className={`rounded-xl transition-all duration-300 ${
                    isDarkMode 
                      ? 'data-[state=active]:bg-white/10 text-gray-300 data-[state=active]:text-white' 
                      : 'data-[state=active]:bg-white text-gray-600 data-[state=active]:text-gray-900'
                  }`}
                >
                  <Router className="w-4 h-4 mr-2" />
                  {t.networkStatus}
                </TabsTrigger>
              </TabsList>

              {/* Cameras Tab */}
              <TabsContent value="cameras" className="space-y-4 mt-6">
                <AnimatePresence>
                  {cameras.map((camera, index) => (
                    <motion.div
                      key={camera.id}
                      initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.01, y: -2 }}
                      className={`${
                        isDarkMode ? 'bg-white/5' : 'bg-white/20'
                      } backdrop-blur-xl border ${
                        isDarkMode ? 'border-white/10' : 'border-gray-200/20'
                      } rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300`}
                    >
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center space-x-4 min-w-0 flex-1">
                          <div className={`p-3 ${
                            camera.status === 'online' 
                              ? 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20' 
                              : 'bg-gradient-to-br from-red-500/20 to-pink-500/20'
                          } rounded-2xl`}>
                            <Camera className={`w-6 h-6 ${
                              camera.status === 'online' ? 'text-blue-500' : 'text-red-500'
                            }`} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className={`font-semibold text-lg ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                              {camera.name}
                            </h3>
                            <p className={`text-sm ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-600'
                            } mt-1`}>
                              {camera.location} • {camera.ipAddress}
                            </p>
                            <p className={`text-xs ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            } mt-1`}>
                              {t.monitoring}: {camera.spaces.join(', ')}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="flex items-center space-x-2 mb-2">
                              <motion.div
                                animate={camera.status === 'online' ? { scale: [1, 1.1, 1] } : {}}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                <Badge className={`${getStatusColor(camera.status)} border-0 px-3 py-1`}>
                                  {camera.status === 'online' ? 
                                    <Wifi className="w-3 h-3 mr-1" /> : 
                                    <WifiOff className="w-3 h-3 mr-1" />
                                  }
                                  {camera.status === 'online' ? t.online : t.offline}
                                </Badge>
                              </motion.div>
                              <Badge className={`${getHealthColor(camera.health)} border-0 px-3 py-1`}>
                                {camera.health === 'excellent' ? t.excellent : 
                                 camera.health === 'good' ? t.good : t.poor}
                              </Badge>
                            </div>
                            <p className={`text-xs ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              {t.lastSeen}: {camera.lastSeen}
                            </p>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setShowStreamModal(camera)}
                              className={`${
                                isDarkMode 
                                  ? 'bg-white/5 border-white/20 hover:bg-white/10 text-white' 
                                  : 'bg-gray-900/5 border-gray-300/30 hover:bg-gray-100 text-gray-900'
                              } backdrop-blur-sm transition-all duration-300`}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              {t.viewStream}
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setShowSettingsModal(camera)}
                              className={`${
                                isDarkMode 
                                  ? 'bg-white/5 border-white/20 hover:bg-white/10 text-white' 
                                  : 'bg-gray-900/5 border-gray-300/30 hover:bg-gray-100 text-gray-900'
                              } backdrop-blur-sm transition-all duration-300`}
                            >
                              <Settings className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </TabsContent>

              {/* Sensors Tab */}
              <TabsContent value="sensors" className="space-y-4 mt-6">
                <AnimatePresence>
                  {sensors.map((sensor, index) => (
                    <motion.div
                      key={sensor.id}
                      initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.01, y: -2 }}
                      className={`${
                        isDarkMode ? 'bg-white/5' : 'bg-white/20'
                      } backdrop-blur-xl border ${
                        isDarkMode ? 'border-white/10' : 'border-gray-200/20'
                      } rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300`}
                    >
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center space-x-4 min-w-0 flex-1">
                          <div className={`p-3 ${
                            sensor.status === 'online' 
                              ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20' 
                              : sensor.status === 'warning'
                              ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20'
                              : 'bg-gradient-to-br from-red-500/20 to-pink-500/20'
                          } rounded-2xl`}>
                            <Zap className={`w-6 h-6 ${
                              sensor.status === 'online' ? 'text-green-500' : 
                              sensor.status === 'warning' ? 'text-yellow-500' : 'text-red-500'
                            }`} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className={`font-semibold text-lg ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                              {sensor.name}
                            </h3>
                            <p className={`text-sm ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-600'
                            } mt-1`}>
                              {sensor.type} • Space {sensor.space}
                            </p>
                            <p className={`text-xs ${
                              isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            } mt-1`}>
                              {t.lastReading}: {sensor.lastReading}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="flex items-center space-x-2 mb-2">
                              <motion.div
                                animate={sensor.status === 'warning' ? { scale: [1, 1.1, 1] } : {}}
                                transition={{ duration: 1, repeat: Infinity }}
                              >
                                <Badge className={`${getStatusColor(sensor.status)} border-0 px-3 py-1`}>
                                  {sensor.status === 'online' ? 
                                    <Wifi className="w-3 h-3 mr-1" /> : 
                                    <WifiOff className="w-3 h-3 mr-1" />
                                  }
                                  {sensor.status === 'online' ? t.online : 
                                   sensor.status === 'warning' ? t.warning : t.offline}
                                </Badge>
                              </motion.div>
                            </div>
                            <p className={`text-sm font-medium ${getBatteryColor(sensor.batteryLevel)} flex items-center`}>
                              <Battery className="w-4 h-4 mr-1" />
                              {t.battery}: {sensor.batteryLevel}%
                            </p>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedCalibrateDevice(sensor)}
                              className={`${
                                isDarkMode 
                                  ? 'bg-white/5 border-white/20 hover:bg-white/10 text-white' 
                                  : 'bg-gray-900/5 border-gray-300/30 hover:bg-gray-100 text-gray-900'
                              } backdrop-blur-sm transition-all duration-300`}
                            >
                              <Wrench className="w-4 h-4 mr-1" />
                              {t.calibrate}
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setShowSettingsModal(sensor)}
                              className={`${
                                isDarkMode 
                                  ? 'bg-white/5 border-white/20 hover:bg-white/10 text-white' 
                                  : 'bg-gray-900/5 border-gray-300/30 hover:bg-gray-100 text-gray-900'
                              } backdrop-blur-sm transition-all duration-300`}
                            >
                              <Settings className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </TabsContent>

              {/* Network Status Tab */}
              <TabsContent value="network" className="space-y-6 mt-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`${
                    isDarkMode ? 'bg-white/5' : 'bg-white/20'
                  } backdrop-blur-xl border ${
                    isDarkMode ? 'border-white/10' : 'border-gray-200/20'
                  } rounded-2xl p-6 shadow-xl`}
                >
                  <h3 className={`text-xl font-semibold mb-6 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {t.networkHealth}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        icon: Router,
                        title: t.networkStatus,
                        value: t.stable,
                        subtitle: '99.9% ' + t.uptime,
                        color: 'green'
                      },
                      {
                        icon: BarChart3,
                        title: t.bandwidthUsage,
                        value: '42%',
                        subtitle: 'of 100 Mbps',
                        color: 'blue'
                      },
                      {
                        icon: Monitor,
                        title: t.activeStreams,
                        value: '2',
                        subtitle: 'of 3 cameras',
                        color: 'purple'
                      }
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-center"
                      >
                        <div className={`p-4 bg-gradient-to-br from-${stat.color}-500/20 to-${stat.color}-600/20 rounded-2xl w-20 h-20 mx-auto mb-4 flex items-center justify-center`}>
                          <stat.icon className={`w-8 h-8 text-${stat.color}-500`} />
                        </div>
                        <h4 className={`font-medium ${
                          isDarkMode ? 'text-gray-200' : 'text-gray-800'
                        }`}>
                          {stat.title}
                        </h4>
                        <p className={`text-2xl font-bold text-${stat.color}-500 mt-2`}>
                          {stat.value}
                        </p>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {stat.subtitle}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`${
                    isDarkMode ? 'bg-white/5' : 'bg-white/20'
                  } backdrop-blur-xl border ${
                    isDarkMode ? 'border-white/10' : 'border-gray-200/20'
                  } rounded-2xl p-6 shadow-xl`}
                >
                  <h3 className={`text-xl font-semibold mb-6 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {t.recentActivity}
                  </h3>
                  
                  <div className="space-y-3">
                    {[
                      { event: 'CAM003 went offline', time: '2 hours ago', type: 'error' },
                      { event: 'SEN003 battery low warning', time: '3 hours ago', type: 'warning' },
                      { event: 'Network maintenance completed', time: '1 day ago', type: 'success' }
                    ].map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-center justify-between p-4 ${
                          isDarkMode ? 'bg-gray-800/30' : 'bg-gray-100/50'
                        } rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full ${
                            activity.type === 'error' ? 'bg-red-500' :
                            activity.type === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                          }`} />
                          <span className={`text-sm ${
                            isDarkMode ? 'text-gray-200' : 'text-gray-800'
                          }`}>
                            {activity.event}
                          </span>
                        </div>
                        <span className={`text-xs ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          {activity.time}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </MainLayout>
    </div>
  );
};

export default IoTDevices;