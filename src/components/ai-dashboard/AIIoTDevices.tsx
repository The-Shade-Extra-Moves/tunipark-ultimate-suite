import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
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
  Filter,
  BarChart3,
  Activity,
  Signal,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Upload,
  RefreshCw,
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Brain,
  Shield,
  Radar,
  QrCode,
  Key,
  MapPin,
  Gauge,
  Cpu,
  Database,
  Smartphone,
  Info,
  TrendingUp,
  TrendingDown,
  Layers,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Lightbulb,
  Star,
  Award,
  Bookmark,
  Sparkles
} from 'lucide-react';

interface AIIoTDevicesProps {
  isDarkMode: boolean;
  currentLang: string;
  isRTL: boolean;
}

export const AIIoTDevices = ({ isDarkMode, currentLang, isRTL }: AIIoTDevicesProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deviceFilter, setDeviceFilter] = useState('all');
  const [showStreamModal, setShowStreamModal] = useState<any>(null);
  const [showSettingsModal, setShowSettingsModal] = useState<any>(null);
  const [showAddDeviceModal, setShowAddDeviceModal] = useState(false);
  const [selectedCalibrateDevice, setSelectedCalibrateDevice] = useState<any>(null);
  const [realTimeUpdates, setRealTimeUpdates] = useState(true);
  const [activeTab, setActiveTab] = useState('cameras');
  const [selectedZone, setSelectedZone] = useState('all');
  const [aiInsightsEnabled, setAiInsightsEnabled] = useState(true);

  // Enhanced translations with AI features
  const translations = {
    en: {
      title: "AI IoT Devices",
      subtitle: "Intelligent device management with AI-powered insights",
      addDevice: "Add Device",
      networkSettings: "Network Settings",
      cameras: "AI Cameras",
      sensors: "Smart Sensors", 
      controllers: "Gate Controllers",
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
      viewStream: "Live Stream",
      calibrate: "AI Calibrate",
      settings: "Configure",
      lastSeen: "Last seen",
      monitoring: "Monitoring",
      battery: "Battery",
      lastReading: "Last reading",
      networkHealth: "Network Health",
      stable: "Stable",
      uptime: "uptime",
      bandwidthUsage: "Bandwidth Usage",
      activeStreams: "Active Streams",
      recentActivity: "Recent Activity",
      aiInsights: "AI Insights",
      plateDetection: "License Plate Detection",
      slotDetection: "Parking Slot Detection",
      autoCalibration: "Auto-Calibration",
      prediction: "Predictive Maintenance",
      alerts: "Smart Alerts",
      zones: "Zones",
      allZones: "All Zones",
      zoneA: "Zone A",
      zoneB: "Zone B", 
      zoneC: "Zone C",
      aiEnabled: "AI Enabled",
      confidence: "Confidence",
      detections: "Detections",
      restart: "Restart",
      reconnect: "Reconnect",
      delete: "Delete",
      configure: "Configure",
      bulkActions: "Bulk Actions",
      export: "Export Data",
      import: "Import Devices",
      analytics: "Device Analytics",
      health: "Health Score",
      efficiency: "Efficiency",
      maintenance: "Maintenance Due",
      predictions: "AI Predictions",
      recommendations: "Recommendations"
    },
    ar: {
      title: "أجهزة إنترنت الأشياء الذكية",
      subtitle: "إدارة الأجهزة الذكية مع رؤى مدعومة بالذكاء الاصطناعي",
      addDevice: "إضافة جهاز",
      networkSettings: "إعدادات الشبكة",
      cameras: "كاميرات ذكية",
      sensors: "مستشعرات ذكية",
      controllers: "أجهزة التحكم",
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
      viewStream: "البث المباشر",
      calibrate: "معايرة ذكية",
      settings: "تكوين",
      lastSeen: "آخر ظهور",
      monitoring: "المراقبة",
      battery: "البطارية",
      lastReading: "آخر قراءة",
      networkHealth: "صحة الشبكة",
      stable: "مستقر",
      uptime: "وقت التشغيل",
      bandwidthUsage: "استخدام النطاق الترددي",
      activeStreams: "البث النشط",
      recentActivity: "النشاط الأخير",
      aiInsights: "رؤى الذكاء الاصطناعي",
      plateDetection: "كشف لوحات السيارات",
      slotDetection: "كشف أماكن الوقوف",
      autoCalibration: "المعايرة التلقائية",
      prediction: "الصيانة التنبؤية",
      alerts: "تنبيهات ذكية",
      zones: "المناطق",
      allZones: "جميع المناطق",
      zoneA: "المنطقة أ",
      zoneB: "المنطقة ب",
      zoneC: "المنطقة ج",
      aiEnabled: "الذكاء الاصطناعي مفعل",
      confidence: "الثقة",
      detections: "الاكتشافات",
      restart: "إعادة تشغيل",
      reconnect: "إعادة اتصال",
      delete: "حذف",
      configure: "تكوين",
      bulkActions: "إجراءات مجمعة",
      export: "تصدير البيانات",
      import: "استيراد الأجهزة",
      analytics: "تحليلات الأجهزة",
      health: "نقاط الصحة",
      efficiency: "الكفاءة",
      maintenance: "الصيانة المطلوبة",
      predictions: "تنبؤات الذكاء الاصطناعي",
      recommendations: "التوصيات"
    },
    fr: {
      title: "Appareils IoT IA",
      subtitle: "Gestion intelligente des appareils avec des insights IA",
      addDevice: "Ajouter un appareil",
      networkSettings: "Paramètres réseau",
      cameras: "Caméras IA",
      sensors: "Capteurs intelligents",
      controllers: "Contrôleurs de porte",
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
      viewStream: "Flux en direct",
      calibrate: "Calibrage IA",
      settings: "Configurer",
      lastSeen: "Vu pour la dernière fois",
      monitoring: "Surveillance",
      battery: "Batterie",
      lastReading: "Dernière lecture",
      networkHealth: "Santé du réseau",
      stable: "Stable",
      uptime: "temps de fonctionnement",
      bandwidthUsage: "Utilisation de la bande passante",
      activeStreams: "Flux actifs",
      recentActivity: "Activité récente",
      aiInsights: "Insights IA",
      plateDetection: "Détection des plaques",
      slotDetection: "Détection des places",
      autoCalibration: "Auto-calibrage",
      prediction: "Maintenance prédictive",
      alerts: "Alertes intelligentes",
      zones: "Zones",
      allZones: "Toutes les zones",
      zoneA: "Zone A",
      zoneB: "Zone B",
      zoneC: "Zone C",
      aiEnabled: "IA activée",
      confidence: "Confiance",
      detections: "Détections",
      restart: "Redémarrer",
      reconnect: "Reconnecter",
      delete: "Supprimer",
      configure: "Configurer",
      bulkActions: "Actions groupées",
      export: "Exporter les données",
      import: "Importer des appareils",
      analytics: "Analytiques des appareils",
      health: "Score de santé",
      efficiency: "Efficacité",
      maintenance: "Maintenance due",
      predictions: "Prédictions IA",
      recommendations: "Recommandations"
    },
    de: {
      title: "KI-IoT-Geräte",
      subtitle: "Intelligente Geräteverwaltung mit KI-gestützten Erkenntnissen",
      addDevice: "Gerät hinzufügen",
      networkSettings: "Netzwerkeinstellungen",
      cameras: "KI-Kameras",
      sensors: "Intelligente Sensoren",
      controllers: "Tor-Controller",
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
      viewStream: "Live-Stream",
      calibrate: "KI-Kalibrierung",
      settings: "Konfigurieren",
      lastSeen: "Zuletzt gesehen",
      monitoring: "Überwachung",
      battery: "Batterie",
      lastReading: "Letzte Messung",
      networkHealth: "Netzwerkzustand",
      stable: "Stabil",
      uptime: "Betriebszeit",
      bandwidthUsage: "Bandbreitennutzung",
      activeStreams: "Aktive Streams",
      recentActivity: "Letzte Aktivität",
      aiInsights: "KI-Erkenntnisse",
      plateDetection: "Kennzeichenerkennung",
      slotDetection: "Stellplatzerkennung",
      autoCalibration: "Auto-Kalibrierung",
      prediction: "Vorausschauende Wartung",
      alerts: "Intelligente Warnungen",
      zones: "Zonen",
      allZones: "Alle Zonen",
      zoneA: "Zone A",
      zoneB: "Zone B",
      zoneC: "Zone C",
      aiEnabled: "KI aktiviert",
      confidence: "Vertrauen",
      detections: "Erkennungen",
      restart: "Neustart",
      reconnect: "Wieder verbinden",
      delete: "Löschen",
      configure: "Konfigurieren",
      bulkActions: "Massenaktionen",
      export: "Daten exportieren",
      import: "Geräte importieren",
      analytics: "Geräte-Analytics",
      health: "Gesundheitswert",
      efficiency: "Effizienz",
      maintenance: "Wartung fällig",
      predictions: "KI-Vorhersagen",
      recommendations: "Empfehlungen"
    }
  };

  const t = translations[currentLang as keyof typeof translations] || translations.en;

  // Enhanced data with AI features
  const aiCameras = [
    {
      id: 'CAM001',
      name: 'Zone A - AI Camera 1',
      location: 'Entrance Gate',
      status: 'online',
      ipAddress: '192.168.1.101',
      lastSeen: '2024-01-08 14:30',
      health: 'excellent',
      spaces: ['A1', 'A2', 'A3'],
      aiFeatures: {
        plateDetection: true,
        slotDetection: true,
        confidence: 95,
        detections: 142,
        autoCalibration: true
      },
      analytics: {
        uptime: 99.8,
        efficiency: 94,
        maintenance: false
      }
    },
    {
      id: 'CAM002',
      name: 'Zone A - AI Camera 2',
      location: 'Middle Section',
      status: 'online',
      ipAddress: '192.168.1.102',
      lastSeen: '2024-01-08 14:29',
      health: 'good',
      spaces: ['A4', 'A5', 'A6'],
      aiFeatures: {
        plateDetection: true,
        slotDetection: false,
        confidence: 88,
        detections: 89,
        autoCalibration: true
      },
      analytics: {
        uptime: 98.5,
        efficiency: 89,
        maintenance: false
      }
    },
    {
      id: 'CAM003',
      name: 'Zone B - AI Camera 1',
      location: 'Exit Gate',
      status: 'warning',
      ipAddress: '192.168.1.103',
      lastSeen: '2024-01-08 12:15',
      health: 'poor',
      spaces: ['B1', 'B2'],
      aiFeatures: {
        plateDetection: false,
        slotDetection: true,
        confidence: 65,
        detections: 23,
        autoCalibration: false
      },
      analytics: {
        uptime: 87.2,
        efficiency: 65,
        maintenance: true
      }
    }
  ];

  const smartSensors = [
    {
      id: 'SEN001',
      name: 'Smart Sensor A1',
      type: 'Ultrasonic + AI',
      status: 'online',
      batteryLevel: 85,
      lastReading: '2024-01-08 14:30',
      space: 'A1',
      aiFeatures: {
        predictiveMaintenance: true,
        anomalyDetection: true,
        confidence: 92,
        predictions: 'Optimal'
      },
      analytics: {
        accuracy: 96,
        responseTime: '50ms',
        maintenance: false
      }
    },
    {
      id: 'SEN002',
      name: 'Smart Sensor A2',
      type: 'Magnetic + ML',
      status: 'online',
      batteryLevel: 72,
      lastReading: '2024-01-08 14:29',
      space: 'A2',
      aiFeatures: {
        predictiveMaintenance: true,
        anomalyDetection: false,
        confidence: 87,
        predictions: 'Good'
      },
      analytics: {
        accuracy: 94,
        responseTime: '45ms',
        maintenance: false
      }
    },
    {
      id: 'SEN003',
      name: 'Smart Sensor B1',
      type: 'Infrared + AI',
      status: 'warning',
      batteryLevel: 15,
      lastReading: '2024-01-08 14:25',
      space: 'B1',
      aiFeatures: {
        predictiveMaintenance: true,
        anomalyDetection: true,
        confidence: 45,
        predictions: 'Maintenance Required'
      },
      analytics: {
        accuracy: 78,
        responseTime: '120ms',
        maintenance: true
      }
    }
  ];

  const gateControllers = [
    {
      id: 'GATE001',
      name: 'Main Entrance Gate',
      type: 'AI Access Control',
      status: 'online',
      accessType: 'License Plate + QR',
      direction: 'Entry',
      zone: 'Entrance',
      lastAction: '2024-01-08 14:25',
      aiFeatures: {
        faceRecognition: false,
        plateRecognition: true,
        qrScanning: true,
        smartAccess: true
      },
      analytics: {
        throughput: 95,
        accuracy: 98,
        maintenance: false
      }
    },
    {
      id: 'GATE002',
      name: 'Exit Gate Control',
      type: 'Smart Barrier',
      status: 'online',
      accessType: 'Automatic',
      direction: 'Exit',
      zone: 'Exit',
      lastAction: '2024-01-08 14:28',
      aiFeatures: {
        faceRecognition: false,
        plateRecognition: true,
        qrScanning: false,
        smartAccess: true
      },
      analytics: {
        throughput: 92,
        accuracy: 96,
        maintenance: false
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'offline': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'warning': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'good': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'poor': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getBatteryColor = (level: number) => {
    if (level > 50) return 'text-green-500';
    if (level > 20) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence > 90) return 'text-green-500';
    if (confidence > 70) return 'text-blue-500';
    if (confidence > 50) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div>
          <h1 className={`
            text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 
            bg-clip-text text-transparent mb-2
          `}>
            {t.title}
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {t.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <BarChart3 className="w-4 h-4" />
            {t.analytics}
          </Button>
          <Button variant="outline" className="gap-2">
            <Settings className="w-4 h-4" />
            {t.networkSettings}
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 gap-2">
            <Plus className="w-4 h-4" />
            {t.addDevice}
          </Button>
        </div>
      </motion.div>

      {/* AI Insights Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`
          ${isDarkMode 
            ? 'bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/30' 
            : 'bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200/50'
          }
          backdrop-blur-xl border rounded-2xl p-6
        `}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20">
              <Brain className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {t.aiInsights}
              </h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Enable AI-powered device monitoring and predictions
              </p>
            </div>
          </div>
          <Switch
            checked={aiInsightsEnabled}
            onCheckedChange={setAiInsightsEnabled}
          />
        </div>
      </motion.div>

      {/* Device Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          { 
            icon: Camera, 
            label: t.cameras, 
            value: aiCameras.length, 
            color: 'blue',
            gradient: 'from-blue-500 to-cyan-600',
            aiFeature: 'AI Detection'
          },
          { 
            icon: Zap, 
            label: t.sensors, 
            value: smartSensors.length, 
            color: 'green',
            gradient: 'from-green-500 to-emerald-600',
            aiFeature: 'Predictive ML'
          },
          { 
            icon: Shield, 
            label: t.controllers, 
            value: gateControllers.length, 
            color: 'purple',
            gradient: 'from-purple-500 to-indigo-600',
            aiFeature: 'Smart Access'
          },
          { 
            icon: Brain, 
            label: 'AI Active', 
            value: aiInsightsEnabled ? 'ON' : 'OFF', 
            color: 'pink',
            gradient: 'from-pink-500 to-rose-600',
            aiFeature: 'Neural Network'
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className={`
              ${isDarkMode ? 'bg-white/5' : 'bg-white/20'} 
              backdrop-blur-xl border ${isDarkMode ? 'border-white/10' : 'border-gray-200/20'}
              rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300
            `}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {stat.label}
                </p>
                <motion.p 
                  className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mt-2`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
                >
                  {stat.value}
                </motion.p>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                  {stat.aiFeature}
                </p>
              </div>
              <div className={`p-3 bg-gradient-to-br ${stat.gradient} bg-opacity-20 rounded-2xl`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-500`} />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`
          ${isDarkMode ? 'bg-white/5' : 'bg-white/20'} 
          backdrop-blur-xl border ${isDarkMode ? 'border-white/10' : 'border-gray-200/20'}
          rounded-2xl p-6 shadow-xl
        `}
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
          
          <div className="flex gap-3">
            <select
              value={deviceFilter}
              onChange={(e) => setDeviceFilter(e.target.value)}
              className={`px-4 py-3 ${
                isDarkMode 
                  ? 'bg-gray-900/50 border-gray-600/50 text-white' 
                  : 'bg-white/50 border-gray-300/50 text-gray-900'
              } backdrop-blur-sm rounded-xl border transition-all duration-300 focus:shadow-lg focus:border-blue-400 focus:outline-none min-w-[160px]`}
            >
              <option value="all">{t.allDevices}</option>
              <option value="cameras">{t.cameras}</option>
              <option value="sensors">{t.sensors}</option>
              <option value="controllers">{t.controllers}</option>
              <option value="online">{t.onlineOnly}</option>
              <option value="offline">{t.offlineOnly}</option>
            </select>

            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className={`px-4 py-3 ${
                isDarkMode 
                  ? 'bg-gray-900/50 border-gray-600/50 text-white' 
                  : 'bg-white/50 border-gray-300/50 text-gray-900'
              } backdrop-blur-sm rounded-xl border transition-all duration-300 focus:shadow-lg focus:border-blue-400 focus:outline-none min-w-[140px]`}
            >
              <option value="all">{t.allZones}</option>
              <option value="A">{t.zoneA}</option>
              <option value="B">{t.zoneB}</option>
              <option value="C">{t.zoneC}</option>
            </select>

            <Button variant="outline" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`grid w-full grid-cols-3 ${
            isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'
          } backdrop-blur-xl rounded-2xl p-1 border ${
            isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'
          }`}>
            <TabsTrigger 
              value="cameras"
              className={`rounded-xl transition-all duration-300 gap-2 ${
                isDarkMode 
                  ? 'data-[state=active]:bg-white/10 text-gray-300 data-[state=active]:text-white' 
                  : 'data-[state=active]:bg-white text-gray-600 data-[state=active]:text-gray-900'
              }`}
            >
              <Camera className="w-4 h-4" />
              {t.cameras}
            </TabsTrigger>
            <TabsTrigger 
              value="sensors"
              className={`rounded-xl transition-all duration-300 gap-2 ${
                isDarkMode 
                  ? 'data-[state=active]:bg-white/10 text-gray-300 data-[state=active]:text-white' 
                  : 'data-[state=active]:bg-white text-gray-600 data-[state=active]:text-gray-900'
              }`}
            >
              <Zap className="w-4 h-4" />
              {t.sensors}
            </TabsTrigger>
            <TabsTrigger 
              value="controllers"
              className={`rounded-xl transition-all duration-300 gap-2 ${
                isDarkMode 
                  ? 'data-[state=active]:bg-white/10 text-gray-300 data-[state=active]:text-white' 
                  : 'data-[state=active]:bg-white text-gray-600 data-[state=active]:text-gray-900'
              }`}
            >
              <Shield className="w-4 h-4" />
              {t.controllers}
            </TabsTrigger>
          </TabsList>

          {/* AI Cameras Tab */}
          <TabsContent value="cameras" className="space-y-4 mt-6">
            <AnimatePresence>
              {aiCameras.map((camera, index) => (
                <motion.div
                  key={camera.id}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.01, y: -2 }}
                  className={`
                    ${isDarkMode ? 'bg-white/5' : 'bg-white/20'} 
                    backdrop-blur-xl border ${isDarkMode ? 'border-white/10' : 'border-gray-200/20'}
                    rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300
                  `}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`p-3 ${
                        camera.status === 'online' 
                          ? 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20' 
                          : camera.status === 'warning'
                          ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20'
                          : 'bg-gradient-to-br from-red-500/20 to-pink-500/20'
                      } rounded-2xl relative`}>
                        <Camera className={`w-6 h-6 ${
                          camera.status === 'online' ? 'text-blue-500' : 
                          camera.status === 'warning' ? 'text-yellow-500' : 'text-red-500'
                        }`} />
                        {camera.aiFeatures.plateDetection && (
                          <div className="absolute -top-1 -right-1">
                            <Brain className="w-4 h-4 text-purple-500" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {camera.name}
                          </h3>
                          {camera.aiFeatures.autoCalibration && (
                            <Badge className="bg-purple-500/20 text-purple-400 border-0 px-2 py-1 text-xs">
                              <Sparkles className="w-3 h-3 mr-1" />
                              Auto-Calibration
                            </Badge>
                          )}
                        </div>
                        
                        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                          {camera.location} • {camera.ipAddress}
                        </p>
                        
                        <div className="flex items-center gap-4 mb-3">
                          <Badge className={`${getStatusColor(camera.status)} border-0 px-3 py-1`}>
                            {camera.status === 'online' ? 
                              <Wifi className="w-3 h-3 mr-1" /> : 
                              <WifiOff className="w-3 h-3 mr-1" />
                            }
                            {camera.status === 'online' ? t.online : 
                             camera.status === 'warning' ? t.warning : t.offline}
                          </Badge>
                          <Badge className={`${getHealthColor(camera.health)} border-0 px-3 py-1`}>
                            {camera.health === 'excellent' ? t.excellent : 
                             camera.health === 'good' ? t.good : t.poor}
                          </Badge>
                        </div>

                        {/* AI Features */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                          <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'}`}>
                            <div className="flex items-center gap-1 mb-1">
                              <Eye className="w-3 h-3 text-blue-500" />
                              <span className="text-xs font-medium">{t.plateDetection}</span>
                            </div>
                            <p className={`text-xs ${camera.aiFeatures.plateDetection ? 'text-green-500' : 'text-gray-500'}`}>
                              {camera.aiFeatures.plateDetection ? 'Active' : 'Inactive'}
                            </p>
                          </div>
                          
                          <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'}`}>
                            <div className="flex items-center gap-1 mb-1">
                              <Target className="w-3 h-3 text-purple-500" />
                              <span className="text-xs font-medium">{t.slotDetection}</span>
                            </div>
                            <p className={`text-xs ${camera.aiFeatures.slotDetection ? 'text-green-500' : 'text-gray-500'}`}>
                              {camera.aiFeatures.slotDetection ? 'Active' : 'Inactive'}
                            </p>
                          </div>
                          
                          <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'}`}>
                            <div className="flex items-center gap-1 mb-1">
                              <Gauge className="w-3 h-3 text-yellow-500" />
                              <span className="text-xs font-medium">{t.confidence}</span>
                            </div>
                            <p className={`text-xs font-semibold ${getConfidenceColor(camera.aiFeatures.confidence)}`}>
                              {camera.aiFeatures.confidence}%
                            </p>
                          </div>
                          
                          <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'}`}>
                            <div className="flex items-center gap-1 mb-1">
                              <Activity className="w-3 h-3 text-green-500" />
                              <span className="text-xs font-medium">{t.detections}</span>
                            </div>
                            <p className="text-xs font-semibold text-green-500">
                              {camera.aiFeatures.detections}
                            </p>
                          </div>
                        </div>

                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {t.monitoring}: {camera.spaces.join(', ')} • {t.lastSeen}: {camera.lastSeen}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button size="sm" variant="outline" className="gap-2">
                        <Eye className="w-4 h-4" />
                        {t.viewStream}
                      </Button>
                      <Button size="sm" variant="outline" className="gap-2">
                        <Brain className="w-4 h-4" />
                        {t.calibrate}
                      </Button>
                      <Button size="sm" variant="outline" className="gap-2">
                        <Settings className="w-4 h-4" />
                        {t.configure}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </TabsContent>

          {/* Smart Sensors Tab */}
          <TabsContent value="sensors" className="space-y-4 mt-6">
            <AnimatePresence>
              {smartSensors.map((sensor, index) => (
                <motion.div
                  key={sensor.id}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.01, y: -2 }}
                  className={`
                    ${isDarkMode ? 'bg-white/5' : 'bg-white/20'} 
                    backdrop-blur-xl border ${isDarkMode ? 'border-white/10' : 'border-gray-200/20'}
                    rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300
                  `}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`p-3 ${
                        sensor.status === 'online' 
                          ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20' 
                          : sensor.status === 'warning'
                          ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20'
                          : 'bg-gradient-to-br from-red-500/20 to-pink-500/20'
                      } rounded-2xl relative`}>
                        <Zap className={`w-6 h-6 ${
                          sensor.status === 'online' ? 'text-green-500' : 
                          sensor.status === 'warning' ? 'text-yellow-500' : 'text-red-500'
                        }`} />
                        {sensor.aiFeatures.predictiveMaintenance && (
                          <div className="absolute -top-1 -right-1">
                            <Brain className="w-4 h-4 text-purple-500" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {sensor.name}
                          </h3>
                          {sensor.aiFeatures.anomalyDetection && (
                            <Badge className="bg-blue-500/20 text-blue-400 border-0 px-2 py-1 text-xs">
                              <Shield className="w-3 h-3 mr-1" />
                              Anomaly Detection
                            </Badge>
                          )}
                        </div>
                        
                        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                          {sensor.type} • Space {sensor.space}
                        </p>
                        
                        <div className="flex items-center gap-4 mb-3">
                          <Badge className={`${getStatusColor(sensor.status)} border-0 px-3 py-1`}>
                            {sensor.status === 'online' ? 
                              <Wifi className="w-3 h-3 mr-1" /> : 
                              <WifiOff className="w-3 h-3 mr-1" />
                            }
                            {sensor.status === 'online' ? t.online : 
                             sensor.status === 'warning' ? t.warning : t.offline}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Battery className={`w-4 h-4 ${getBatteryColor(sensor.batteryLevel)}`} />
                            <span className={`text-sm font-medium ${getBatteryColor(sensor.batteryLevel)}`}>
                              {sensor.batteryLevel}%
                            </span>
                          </div>
                        </div>

                        {/* AI Analytics */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                          <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'}`}>
                            <div className="flex items-center gap-1 mb-1">
                              <Gauge className="w-3 h-3 text-blue-500" />
                              <span className="text-xs font-medium">Accuracy</span>
                            </div>
                            <p className="text-xs font-semibold text-blue-500">
                              {sensor.analytics.accuracy}%
                            </p>
                          </div>
                          
                          <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'}`}>
                            <div className="flex items-center gap-1 mb-1">
                              <Clock className="w-3 h-3 text-green-500" />
                              <span className="text-xs font-medium">Response</span>
                            </div>
                            <p className="text-xs font-semibold text-green-500">
                              {sensor.analytics.responseTime}
                            </p>
                          </div>
                          
                          <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'}`}>
                            <div className="flex items-center gap-1 mb-1">
                              <Brain className="w-3 h-3 text-purple-500" />
                              <span className="text-xs font-medium">{t.confidence}</span>
                            </div>
                            <p className={`text-xs font-semibold ${getConfidenceColor(sensor.aiFeatures.confidence)}`}>
                              {sensor.aiFeatures.confidence}%
                            </p>
                          </div>
                          
                          <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'}`}>
                            <div className="flex items-center gap-1 mb-1">
                              <TrendingUp className="w-3 h-3 text-yellow-500" />
                              <span className="text-xs font-medium">{t.predictions}</span>
                            </div>
                            <p className={`text-xs font-semibold ${
                              sensor.aiFeatures.predictions === 'Optimal' ? 'text-green-500' :
                              sensor.aiFeatures.predictions === 'Good' ? 'text-blue-500' :
                              'text-red-500'
                            }`}>
                              {sensor.aiFeatures.predictions}
                            </p>
                          </div>
                        </div>

                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {t.lastReading}: {sensor.lastReading}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button size="sm" variant="outline" className="gap-2">
                        <Brain className="w-4 h-4" />
                        {t.calibrate}
                      </Button>
                      <Button size="sm" variant="outline" className="gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Analytics
                      </Button>
                      <Button size="sm" variant="outline" className="gap-2">
                        <Settings className="w-4 h-4" />
                        {t.configure}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </TabsContent>

          {/* Gate Controllers Tab */}
          <TabsContent value="controllers" className="space-y-4 mt-6">
            <AnimatePresence>
              {gateControllers.map((controller, index) => (
                <motion.div
                  key={controller.id}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.01, y: -2 }}
                  className={`
                    ${isDarkMode ? 'bg-white/5' : 'bg-white/20'} 
                    backdrop-blur-xl border ${isDarkMode ? 'border-white/10' : 'border-gray-200/20'}
                    rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300
                  `}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`p-3 ${
                        controller.status === 'online' 
                          ? 'bg-gradient-to-br from-purple-500/20 to-indigo-500/20' 
                          : 'bg-gradient-to-br from-red-500/20 to-pink-500/20'
                      } rounded-2xl relative`}>
                        <Shield className={`w-6 h-6 ${
                          controller.status === 'online' ? 'text-purple-500' : 'text-red-500'
                        }`} />
                        {controller.aiFeatures.smartAccess && (
                          <div className="absolute -top-1 -right-1">
                            <Brain className="w-4 h-4 text-purple-500" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {controller.name}
                          </h3>
                          {controller.aiFeatures.plateRecognition && (
                            <Badge className="bg-green-500/20 text-green-400 border-0 px-2 py-1 text-xs">
                              <Eye className="w-3 h-3 mr-1" />
                              Plate Recognition
                            </Badge>
                          )}
                        </div>
                        
                        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                          {controller.type} • {controller.zone} • {controller.direction}
                        </p>
                        
                        <div className="flex items-center gap-4 mb-3">
                          <Badge className={`${getStatusColor(controller.status)} border-0 px-3 py-1`}>
                            {controller.status === 'online' ? 
                              <CheckCircle className="w-3 h-3 mr-1" /> : 
                              <XCircle className="w-3 h-3 mr-1" />
                            }
                            {controller.status === 'online' ? t.online : t.offline}
                          </Badge>
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-0 px-3 py-1">
                            {controller.accessType}
                          </Badge>
                        </div>

                        {/* AI Features */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                          <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'}`}>
                            <div className="flex items-center gap-1 mb-1">
                              <Eye className="w-3 h-3 text-green-500" />
                              <span className="text-xs font-medium">Plate Recognition</span>
                            </div>
                            <p className={`text-xs ${controller.aiFeatures.plateRecognition ? 'text-green-500' : 'text-gray-500'}`}>
                              {controller.aiFeatures.plateRecognition ? 'Active' : 'Inactive'}
                            </p>
                          </div>
                          
                          <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'}`}>
                            <div className="flex items-center gap-1 mb-1">
                              <QrCode className="w-3 h-3 text-blue-500" />
                              <span className="text-xs font-medium">QR Scanning</span>
                            </div>
                            <p className={`text-xs ${controller.aiFeatures.qrScanning ? 'text-green-500' : 'text-gray-500'}`}>
                              {controller.aiFeatures.qrScanning ? 'Active' : 'Inactive'}
                            </p>
                          </div>
                          
                          <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'}`}>
                            <div className="flex items-center gap-1 mb-1">
                              <Gauge className="w-3 h-3 text-purple-500" />
                              <span className="text-xs font-medium">Throughput</span>
                            </div>
                            <p className="text-xs font-semibold text-purple-500">
                              {controller.analytics.throughput}%
                            </p>
                          </div>
                          
                          <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'}`}>
                            <div className="flex items-center gap-1 mb-1">
                              <Target className="w-3 h-3 text-yellow-500" />
                              <span className="text-xs font-medium">Accuracy</span>
                            </div>
                            <p className="text-xs font-semibold text-yellow-500">
                              {controller.analytics.accuracy}%
                            </p>
                          </div>
                        </div>

                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Last Action: {controller.lastAction}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button size="sm" variant="outline" className="gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Analytics
                      </Button>
                      <Button size="sm" variant="outline" className="gap-2">
                        <Settings className="w-4 h-4" />
                        {t.configure}
                      </Button>
                      <Button size="sm" variant="outline" className="gap-2">
                        <RefreshCw className="w-4 h-4" />
                        Test
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default AIIoTDevices;
