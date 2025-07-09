import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Settings, 
  Camera, 
  Zap, 
  Car, 
  MapPin,
  DollarSign,
  TrendingUp,
  Activity,
  Eye,
  Edit,
  Power,
  Wifi,
  WifiOff,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  Grid3X3,
  List,
  Download,
  Upload,
  RefreshCw,
  Brain,
  Sparkles,
  BarChart3,
  Users,
  Calendar,
  Globe,
  Moon,
  Sun,
  Languages,
  ChevronDown,
  X,
  MoreVertical,
  Crown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ParkingSpace {
  id: string;
  name: string;
  zone: string;
  type: 'regular' | 'ev' | 'handicap' | 'xl' | 'vip';
  status: 'active' | 'maintenance' | 'offline' | 'reserved';
  hasCamera: boolean;
  hasSensor: boolean;
  currentVehicle?: {
    plate: string;
    entryTime: string;
    duration: string;
    estimatedExit?: string;
  };
  revenue24h: number;
  occupancyRate: number;
  avgSessionTime: string;
  totalSessions: number;
  pricing: {
    hourly: number;
    daily: number;
  };
  aiPrediction?: {
    nextOccupancy: string;
    confidence: number;
    peakHours: string[];
  };
  devices: {
    camera: { status: 'online' | 'offline'; lastPing: string };
    sensor: { status: 'online' | 'offline'; lastPing: string; accuracy: number };
  };
}

interface AIParkingSpacesProps {
  isDarkMode: boolean;
  currentLang: string;
  isRTL: boolean;
}

export const AIParkingSpaces = ({ isDarkMode, currentLang, isRTL }: AIParkingSpacesProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showConfigureModal, setShowConfigureModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showWizardModal, setShowWizardModal] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState<ParkingSpace | null>(null);

  // Real-time updates
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Translations
  const translations = {
    en: {
      title: 'AI Parking Spaces',
      subtitle: 'Intelligent parking space management with AI insights',
      addSpace: 'Add Space',
      searchPlaceholder: 'Search spaces...',
      filters: 'Filters',
      zone: 'Zone',
      type: 'Type',
      status: 'Status',
      sortBy: 'Sort by',
      viewMode: 'View Mode',
      grid: 'Grid',
      list: 'List',
      refresh: 'Refresh',
      export: 'Export',
      totalSpaces: 'Total Spaces',
      occupied: 'Occupied',
      available: 'Available',
      revenue: 'Revenue',
      occupancyRate: 'Occupancy Rate',
      aiPrediction: 'AI Prediction',
      configure: 'Configure',
      view: 'View Details',
      startWizard: 'Start Setup Wizard',
      addNewSpace: 'Add New Parking Space',
      wizardDescription: 'Configure cameras, sensors, and AI pricing for new spaces',
      // Space types
      regular: 'Regular',
      ev: 'EV Charging',
      handicap: 'Handicap',
      xl: 'XL Vehicle',
      vip: 'VIP',
      // Status
      active: 'Active',
      maintenance: 'Maintenance',
      maintenanceMode: 'Maintenance Mode',
      offline: 'Offline',
      reserved: 'Reserved',
      // Zones
      allZones: 'All Zones',
      allTypes: 'All Types',
      allStatuses: 'All Statuses',
      // AI Insights
      peakTime: 'Peak Time Predicted',
      confidence: 'Confidence',
      nextOccupancy: 'Next Occupancy',
      deviceStatus: 'Device Status',
      lastSeen: 'Last Seen',
      accuracy: 'Accuracy',
      onlineStatus: 'Online',
      offlineStatus: 'Offline',
      // Revenue & Stats
      hourlyRate: 'Hourly Rate',
      dailyRate: 'Daily Rate',
      totalSessions: 'Total Sessions',
      avgDuration: 'Avg Duration',
      currentVehicle: 'Current Vehicle',
      entryTime: 'Entry Time',
      estimatedExit: 'Estimated Exit',
      // Actions
      edit: 'Edit',
      delete: 'Delete',
      enable: 'Enable',
      disable: 'Disable',
      viewHistory: 'View History',
      // Time
      minutesAgo: 'minutes ago',
      hoursAgo: 'hours ago',
      daysAgo: 'days ago',
      now: 'now'
    },
    ar: {
      title: 'أماكن الانتظار الذكية',
      subtitle: 'إدارة أماكن الانتظار الذكية مع رؤى الذكاء الاصطناعي',
      addSpace: 'إضافة مكان',
      searchPlaceholder: 'البحث عن الأماكن...',
      filters: 'المرشحات',
      zone: 'المنطقة',
      type: 'النوع',
      status: 'الحالة',
      sortBy: 'ترتيب حسب',
      viewMode: 'وضع العرض',
      grid: 'شبكة',
      list: 'قائمة',
      refresh: 'تحديث',
      export: 'تصدير',
      totalSpaces: 'إجمالي الأماكن',
      occupied: 'مشغول',
      available: 'متاح',
      revenue: 'الإيرادات',
      occupancyRate: 'معدل الإشغال',
      aiPrediction: 'توقع الذكاء الاصطناعي',
      configure: 'تكوين',
      view: 'عرض التفاصيل',
      startWizard: 'بدء المعالج',
      addNewSpace: 'إضافة مكان انتظار جديد',
      wizardDescription: 'تكوين الكاميرات والحساسات والتسعير الذكي للأماكن الجديدة',
      regular: 'عادي',
      ev: 'شحن كهربائي',
      handicap: 'ذوي الاحتياجات الخاصة',
      xl: 'مركبة كبيرة',
      vip: 'في آي بي',
      active: 'نشط',
      maintenance: 'صيانة',
      maintenanceMode: 'وضع الصيانة',
      offline: 'غير متصل',
      reserved: 'محجوز',
      allZones: 'جميع المناطق',
      allTypes: 'جميع الأنواع',
      allStatuses: 'جميع الحالات',
      confidence: 'الثقة',
      nextOccupancy: 'الإشغال التالي',
      onlineStatus: 'متصل',
      offlineStatus: 'غير متصل',
      totalSessions: 'إجمالي الجلسات',
      avgDuration: 'متوسط المدة',
      currentVehicle: 'المركبة الحالية',
      entryTime: 'وقت الدخول',
      viewHistory: 'عرض التاريخ'
    },
    fr: {
      title: 'Espaces de Parking IA',
      subtitle: 'Gestion intelligente des espaces de parking avec insights IA',
      addSpace: 'Ajouter Espace',
      searchPlaceholder: 'Rechercher espaces...',
      filters: 'Filtres',
      zone: 'Zone',
      type: 'Type',
      status: 'Statut',
      sortBy: 'Trier par',
      viewMode: 'Mode d\'Affichage',
      grid: 'Grille',
      list: 'Liste',
      refresh: 'Actualiser',
      export: 'Exporter',
      totalSpaces: 'Total Espaces',
      occupied: 'Occupé',
      available: 'Disponible',
      revenue: 'Revenus',
      occupancyRate: 'Taux d\'Occupation',
      aiPrediction: 'Prédiction IA',
      configure: 'Configurer',
      view: 'Voir Détails',
      startWizard: 'Démarrer Assistant',
      addNewSpace: 'Ajouter Nouvel Espace',
      wizardDescription: 'Configurer caméras, capteurs et tarification IA pour nouveaux espaces',
      regular: 'Régulier',
      ev: 'Recharge EV',
      handicap: 'Handicapé',
      xl: 'Véhicule XL',
      vip: 'VIP',
      active: 'Actif',
      maintenance: 'Maintenance',
      maintenanceMode: 'Mode Maintenance',
      offline: 'Hors ligne',
      reserved: 'Réservé',
      allZones: 'Toutes Zones',
      allTypes: 'Tous Types',
      allStatuses: 'Tous Statuts',
      confidence: 'Confiance',
      nextOccupancy: 'Prochaine Occupation',
      onlineStatus: 'En ligne',
      offlineStatus: 'Hors ligne',
      totalSessions: 'Total Sessions',
      avgDuration: 'Durée Moyenne',
      currentVehicle: 'Véhicule Actuel',
      entryTime: 'Heure d\'Entrée',
      viewHistory: 'Voir Historique'
    },
    de: {
      title: 'KI Parkplätze',
      subtitle: 'Intelligente Parkplatz-Verwaltung mit KI-Einblicken',
      addSpace: 'Platz Hinzufügen',
      searchPlaceholder: 'Plätze suchen...',
      filters: 'Filter',
      zone: 'Zone',
      type: 'Typ',
      status: 'Status',
      sortBy: 'Sortieren nach',
      viewMode: 'Ansichtsmodus',
      grid: 'Raster',
      list: 'Liste',
      refresh: 'Aktualisieren',
      export: 'Exportieren',
      totalSpaces: 'Gesamte Plätze',
      occupied: 'Belegt',
      available: 'Verfügbar',
      revenue: 'Umsatz',
      occupancyRate: 'Belegungsrate',
      aiPrediction: 'KI-Vorhersage',
      configure: 'Konfigurieren',
      view: 'Details Anzeigen',
      startWizard: 'Assistent Starten',
      addNewSpace: 'Neuen Parkplatz Hinzufügen',
      wizardDescription: 'Kameras, Sensoren und KI-Preisgestaltung für neue Plätze konfigurieren',
      regular: 'Standard',
      ev: 'E-Ladung',
      handicap: 'Behindert',
      xl: 'XL Fahrzeug',
      vip: 'VIP',
      active: 'Aktiv',
      maintenance: 'Wartung',
      maintenanceMode: 'Wartungsmodus',
      offline: 'Offline',
      reserved: 'Reserviert',
      allZones: 'Alle Zonen',
      allTypes: 'Alle Typen',
      allStatuses: 'Alle Status',
      confidence: 'Vertrauen',
      nextOccupancy: 'Nächste Belegung',
      onlineStatus: 'Online',
      offlineStatus: 'Offline',
      totalSessions: 'Gesamte Sitzungen',
      avgDuration: 'Durchschnittsdauer',
      currentVehicle: 'Aktuelles Fahrzeug',
      entryTime: 'Eingangszeit',
      viewHistory: 'Verlauf Anzeigen'
    }
  };

  const t = translations[currentLang as keyof typeof translations] || translations.en;

  // Sample data
  const [spaces, setSpaces] = useState<ParkingSpace[]>([
    {
      id: 'A1',
      name: 'Space A1',
      zone: 'Zone A',
      type: 'regular',
      status: 'active',
      hasCamera: true,
      hasSensor: true,
      currentVehicle: {
        plate: 'ABC-123',
        entryTime: '2h 15m ago',
        duration: '2h 15m',
        estimatedExit: '45m'
      },
      revenue24h: 84.50,
      occupancyRate: 75,
      avgSessionTime: '2h 30m',
      totalSessions: 156,
      pricing: { hourly: 5.00, daily: 35.00 },
      aiPrediction: {
        nextOccupancy: '15 minutes',
        confidence: 85,
        peakHours: ['14:00-16:00', '18:00-20:00']
      },
      devices: {
        camera: { status: 'online', lastPing: '2 min ago' },
        sensor: { status: 'online', lastPing: '1 min ago', accuracy: 98 }
      }
    },
    {
      id: 'A2',
      name: 'Space A2',
      zone: 'Zone A',
      type: 'ev',
      status: 'active',
      hasCamera: true,
      hasSensor: true,
      revenue24h: 120.00,
      occupancyRate: 65,
      avgSessionTime: '3h 15m',
      totalSessions: 89,
      pricing: { hourly: 8.00, daily: 55.00 },
      aiPrediction: {
        nextOccupancy: '30 minutes',
        confidence: 72,
        peakHours: ['08:00-10:00', '17:00-19:00']
      },
      devices: {
        camera: { status: 'online', lastPing: '1 min ago' },
        sensor: { status: 'online', lastPing: '30 sec ago', accuracy: 96 }
      }
    },
    {
      id: 'A3',
      name: 'Space A3',
      zone: 'Zone A',
      type: 'handicap',
      status: 'active',
      hasCamera: false,
      hasSensor: true,
      revenue24h: 42.75,
      occupancyRate: 35,
      avgSessionTime: '1h 45m',
      totalSessions: 67,
      pricing: { hourly: 3.00, daily: 20.00 },
      aiPrediction: {
        nextOccupancy: '2 hours',
        confidence: 60,
        peakHours: ['10:00-12:00', '16:00-18:00']
      },
      devices: {
        camera: { status: 'offline', lastPing: 'Never' },
        sensor: { status: 'online', lastPing: '45 sec ago', accuracy: 94 }
      }
    },
    {
      id: 'B1',
      name: 'Space B1',
      zone: 'Zone B',
      type: 'xl',
      status: 'maintenance',
      hasCamera: true,
      hasSensor: false,
      revenue24h: 0,
      occupancyRate: 0,
      avgSessionTime: '4h 30m',
      totalSessions: 23,
      pricing: { hourly: 12.00, daily: 80.00 },
      devices: {
        camera: { status: 'online', lastPing: '3 min ago' },
        sensor: { status: 'offline', lastPing: '2 days ago', accuracy: 0 }
      }
    },
    {
      id: 'B2',
      name: 'Space B2',
      zone: 'Zone B',
      type: 'vip',
      status: 'reserved',
      hasCamera: true,
      hasSensor: true,
      revenue24h: 200.00,
      occupancyRate: 90,
      avgSessionTime: '5h 15m',
      totalSessions: 45,
      pricing: { hourly: 15.00, daily: 100.00 },
      aiPrediction: {
        nextOccupancy: 'Reserved until 18:00',
        confidence: 100,
        peakHours: ['All day']
      },
      devices: {
        camera: { status: 'online', lastPing: '30 sec ago' },
        sensor: { status: 'online', lastPing: '15 sec ago', accuracy: 99 }
      }
    }
  ]);

  // Filter and sort spaces
  const filteredSpaces = spaces
    .filter(space => {
      const matchesSearch = 
        space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        space.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        space.zone.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesZone = selectedZone === 'all' || space.zone === selectedZone;
      const matchesType = selectedType === 'all' || space.type === selectedType;
      const matchesStatus = selectedStatus === 'all' || space.status === selectedStatus;
      
      return matchesSearch && matchesZone && matchesType && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'revenue':
          return b.revenue24h - a.revenue24h;
        case 'occupancy':
          return b.occupancyRate - a.occupancyRate;
        case 'sessions':
          return b.totalSessions - a.totalSessions;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  // Stats calculations
  const stats = {
    total: spaces.length,
    occupied: spaces.filter(s => s.currentVehicle).length,
    available: spaces.filter(s => s.status === 'active' && !s.currentVehicle).length,
    revenue: spaces.reduce((sum, s) => sum + s.revenue24h, 0),
    avgOccupancy: Math.round(spaces.reduce((sum, s) => sum + s.occupancyRate, 0) / spaces.length)
  };

  // Type configurations
  const typeConfig = {
    regular: { icon: Car, color: 'from-blue-500 to-cyan-500', label: t.regular },
    ev: { icon: Zap, color: 'from-green-500 to-emerald-500', label: t.ev },
    handicap: { icon: Users, color: 'from-purple-500 to-indigo-500', label: t.handicap },
    xl: { icon: Car, color: 'from-orange-500 to-red-500', label: t.xl },
    vip: { icon: Crown, color: 'from-yellow-500 to-orange-500', label: t.vip }
  };

  const statusConfig = {
    active: { color: 'text-green-400 bg-green-400/10', label: t.active },
    maintenance: { color: 'text-yellow-400 bg-yellow-400/10', label: t.maintenance },
    offline: { color: 'text-red-400 bg-red-400/10', label: t.offline },
    reserved: { color: 'text-blue-400 bg-blue-400/10', label: t.reserved }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastUpdate(new Date());
    setRefreshing(false);
  };

  const getTypeIcon = (type: ParkingSpace['type']) => {
    const config = typeConfig[type];
    const IconComponent = config?.icon || Car;
    return <IconComponent className="w-4 h-4" />;
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
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={refreshing}
            className={`
              ${isDarkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-100'}
              backdrop-blur-sm
            `}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            {t.refresh}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className={`
              ${isDarkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-100'}
              backdrop-blur-sm
            `}
          >
            <Filter className="w-4 h-4 mr-2" />
            {t.filters}
          </Button>
          
          <Button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t.addSpace}
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6"
      >
        {[
          { 
            title: t.totalSpaces, 
            value: stats.total, 
            icon: MapPin, 
            color: 'from-blue-500 to-cyan-500' 
          },
          { 
            title: t.occupied, 
            value: stats.occupied, 
            icon: Car, 
            color: 'from-red-500 to-pink-500' 
          },
          { 
            title: t.available, 
            value: stats.available, 
            icon: CheckCircle, 
            color: 'from-green-500 to-emerald-500' 
          },
          { 
            title: t.revenue, 
            value: `$${stats.revenue.toFixed(0)}`, 
            icon: DollarSign, 
            color: 'from-yellow-500 to-orange-500' 
          },
          { 
            title: t.occupancyRate, 
            value: `${stats.avgOccupancy}%`, 
            icon: BarChart3, 
            color: 'from-purple-500 to-indigo-500' 
          }
        ].map((stat, index) => {
          const Icon = stat.icon;
          
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -2 }}
            >
              <Card className={`
                ${isDarkMode 
                  ? 'bg-gray-900/50 border-gray-700/50 hover:bg-gray-800/50' 
                  : 'bg-white/50 border-gray-200/50 hover:bg-white/80'
                }
                backdrop-blur-xl transition-all duration-300
                hover:shadow-xl hover:shadow-blue-500/10
              `}>
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className={`text-xs lg:text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {stat.title}
                      </p>
                      <p className={`text-lg lg:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {stat.value}
                      </p>
                    </div>
                    
                    <div className={`
                      p-2 lg:p-3 rounded-xl bg-gradient-to-r ${stat.color}
                      shadow-lg hover:shadow-xl transition-all duration-300
                      hover:scale-110
                    `}>
                      <Icon className="w-4 h-4 lg:w-6 lg:h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className={`
              ${isDarkMode 
                ? 'bg-gray-900/50 border-gray-700/50' 
                : 'bg-white/50 border-gray-200/50'
              }
              backdrop-blur-xl
            `}>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <Label className="text-sm font-medium mb-2 block">{t.zone}</Label>
                    <Select value={selectedZone} onValueChange={setSelectedZone}>
                      <SelectTrigger>
                        <SelectValue placeholder={t.allZones} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t.allZones}</SelectItem>
                        <SelectItem value="Zone A">Zone A</SelectItem>
                        <SelectItem value="Zone B">Zone B</SelectItem>
                        <SelectItem value="Zone C">Zone C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium mb-2 block">{t.type}</Label>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger>
                        <SelectValue placeholder={t.allTypes} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t.allTypes}</SelectItem>
                        {Object.entries(typeConfig).map(([key, config]) => (
                          <SelectItem key={key} value={key}>
                            <div className="flex items-center gap-2">
                              <config.icon className="w-4 h-4" />
                              {config.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium mb-2 block">{t.status}</Label>
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder={t.allStatuses} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t.allStatuses}</SelectItem>
                        {Object.entries(statusConfig).map(([key, config]) => (
                          <SelectItem key={key} value={key}>{config.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium mb-2 block">{t.sortBy}</Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="revenue">Revenue</SelectItem>
                        <SelectItem value="occupancy">Occupancy</SelectItem>
                        <SelectItem value="sessions">Sessions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search & View Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className={`
            absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 
            w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}
          `} />
          <Input
            placeholder={t.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`
              ${isRTL ? 'pr-12' : 'pl-12'} h-12
              ${isDarkMode 
                ? 'bg-gray-900/50 border-gray-700/50 focus:border-blue-500' 
                : 'bg-white/50 border-gray-200/50 focus:border-blue-500'
              }
              backdrop-blur-xl
            `}
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
            className="h-12 w-12"
          >
            <Grid3X3 className="w-5 h-5" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('list')}
            className="h-12 w-12"
          >
            <List className="w-5 h-5" />
          </Button>
        </div>
      </motion.div>

      {/* Spaces Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredSpaces.map((space, index) => {
              const typeInfo = typeConfig[space.type];
              const statusInfo = statusConfig[space.status];
              
              return (
                <motion.div
                  key={space.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className={`
                    ${isDarkMode 
                      ? 'bg-gray-900/50 border-gray-700/50 hover:bg-gray-800/50' 
                      : 'bg-white/50 border-gray-200/50 hover:bg-white/80'
                    }
                    backdrop-blur-xl transition-all duration-300
                    hover:shadow-xl hover:shadow-blue-500/10
                  `}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`
                            p-2 rounded-lg bg-gradient-to-r ${typeInfo?.color || 'from-gray-500 to-slate-500'}
                            group-hover:scale-110 transition-transform
                          `}>
                            {getTypeIcon(space.type)}
                            <span className="text-white text-xs"></span>
                          </div>
                          <div>
                            <CardTitle className={`text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {space.name}
                            </CardTitle>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {space.zone}
                            </p>
                          </div>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => {
                              setSelectedSpace(space);
                              setShowConfigureModal(true);
                            }}>
                              <Edit className="w-4 h-4 mr-2" />
                              {t.configure}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => {
                              setSelectedSpace(space);
                              setShowViewModal(true);
                            }}>
                              <Eye className="w-4 h-4 mr-2" />
                              {t.view}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Activity className="w-4 h-4 mr-2" />
                              {t.viewHistory}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Status & Type */}
                      <div className="flex items-center gap-2">
                        <Badge className={statusInfo?.color}>
                          {statusInfo?.label}
                        </Badge>
                        <Badge className="bg-gray-500/20 text-gray-400 border-0">
                          {typeInfo?.label}
                        </Badge>
                      </div>

                      {/* Current Vehicle */}
                      {space.currentVehicle && (
                        <div className={`
                          p-3 rounded-lg 
                          ${isDarkMode ? 'bg-red-900/20 border-red-500/30' : 'bg-red-50 border-red-200'}
                          border
                        `}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-red-400">
                              {t.currentVehicle}
                            </span>
                            <span className="font-mono text-sm text-red-400">
                              {space.currentVehicle.plate}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-red-300">
                            <span>{t.entryTime}: {space.currentVehicle.entryTime}</span>
                            {space.currentVehicle.estimatedExit && (
                              <span>Exit in: {space.currentVehicle.estimatedExit}</span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* AI Prediction */}
                      {space.aiPrediction && (
                        <div className={`
                          p-3 rounded-lg 
                          ${isDarkMode ? 'bg-purple-900/20 border-purple-500/30' : 'bg-purple-50 border-purple-200'}
                          border
                        `}>
                          <div className="flex items-center gap-2 mb-2">
                            <Brain className="w-4 h-4 text-purple-400" />
                            <span className="text-sm font-medium text-purple-400">
                              {t.aiPrediction}
                            </span>
                          </div>
                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between text-purple-300">
                              <span>{t.nextOccupancy}:</span>
                              <span>{space.aiPrediction.nextOccupancy}</span>
                            </div>
                            <div className="flex justify-between text-purple-300">
                              <span>{t.confidence}:</span>
                              <span>{space.aiPrediction.confidence}%</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                              {t.revenue}:
                            </span>
                            <span className={`font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                              ${space.revenue24h.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                              {t.occupancyRate}:
                            </span>
                            <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {space.occupancyRate}%
                            </span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                              {t.totalSessions}:
                            </span>
                            <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {space.totalSessions}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                              {t.avgDuration}:
                            </span>
                            <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {space.avgSessionTime}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Device Status */}
                      <div className="flex items-center gap-4 pt-2 border-t border-gray-200/10">
                        <div className="flex items-center gap-2">
                          <Camera className={`w-4 h-4 ${space.devices.camera.status === 'online' ? 'text-green-400' : 'text-red-400'}`} />
                          <span className={`text-xs ${space.devices.camera.status === 'online' ? 'text-green-400' : 'text-red-400'}`}>
                            Camera
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${space.devices.sensor.status === 'online' ? 'bg-green-400' : 'bg-red-400'}`} />
                          <span className={`text-xs ${space.devices.sensor.status === 'online' ? 'text-green-400' : 'text-red-400'}`}>
                            Sensor
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => {
                            setSelectedSpace(space);
                            setShowConfigureModal(true);
                          }}
                        >
                          <Settings className="w-3 h-3 mr-1" />
                          {t.configure}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedSpace(space);
                            setShowViewModal(true);
                          }}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          {t.view}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        ) : (
          // List View (simplified for space)
          <Card className={`
            ${isDarkMode 
              ? 'bg-gray-900/50 border-gray-700/50' 
              : 'bg-white/50 border-gray-200/50'
            }
            backdrop-blur-xl
          `}>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200/10">
                      <th className={`text-left p-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Space
                      </th>
                      <th className={`text-left p-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Status
                      </th>
                      <th className={`text-left p-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Revenue
                      </th>
                      <th className={`text-left p-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Occupancy
                      </th>
                      <th className={`text-left p-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSpaces.map((space) => {
                      const statusInfo = statusConfig[space.status];
                      
                      return (
                        <motion.tr
                          key={space.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="border-b border-gray-200/5 hover:bg-gray-100/5 transition-colors"
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              {getTypeIcon(space.type)}
                              <div>
                                <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                  {space.name}
                                </h3>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  {space.zone}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge className={statusInfo?.color}>
                              {statusInfo?.label}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <span className={`font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                              ${space.revenue24h.toFixed(2)}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {space.occupancyRate}%
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  setSelectedSpace(space);
                                  setShowConfigureModal(true);
                                }}
                              >
                                <Settings className="w-3 h-3 mr-1" />
                                {t.configure}
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  setSelectedSpace(space);
                                  setShowViewModal(true);
                                }}
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                {t.view}
                              </Button>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>

      {/* Add New Space Wizard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className={`
          border-2 border-dashed 
          ${isDarkMode 
            ? 'border-gray-600 hover:border-blue-400 bg-gray-900/30' 
            : 'border-gray-300 hover:border-blue-400 bg-gray-50/30'
          }
          transition-all duration-300 backdrop-blur-sm hover:backdrop-blur-md
          group cursor-pointer
        `}>
          <CardContent className="p-8">
            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={`
                  w-16 h-16 mx-auto mb-4 rounded-2xl 
                  bg-gradient-to-r from-blue-500 to-purple-600
                  flex items-center justify-center
                  group-hover:shadow-xl group-hover:shadow-blue-500/25
                  transition-all duration-300
                `}
              >
                <Plus className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {t.addNewSpace}
              </h3>
              <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {t.wizardDescription}
              </p>
              
              <Button 
                variant="outline"
                size="lg"
                onClick={() => setShowWizardModal(true)}
                className={`
                  ${isDarkMode 
                    ? 'border-gray-600 hover:border-blue-400 hover:bg-blue-400/10' 
                    : 'border-gray-300 hover:border-blue-400 hover:bg-blue-400/10'
                  }
                  backdrop-blur-sm px-8 py-3
                `}
              >
                <Brain className="w-5 h-5 mr-2" />
                {t.startWizard}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Modals would go here - simplified for space */}
      {/* Add Space Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className={`
          max-w-2xl
          ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}
        `}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              {t.addSpace}
            </DialogTitle>
          </DialogHeader>
          
          <div className="p-6 text-center">
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
              Add Space Modal Content (To be implemented)
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Configure Modal */}
      <Dialog open={showConfigureModal} onOpenChange={setShowConfigureModal}>
        <DialogContent className={`
          max-w-3xl max-h-[90vh] overflow-y-auto
          ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}
        `}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              {t.configure} - {selectedSpace?.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="p-6 text-center">
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
              Configure Modal Content (To be implemented)
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Modal */}
      <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
        <DialogContent className={`
          max-w-4xl max-h-[90vh] overflow-y-auto
          ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}
        `}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              {selectedSpace?.name} - {t.view}
            </DialogTitle>
          </DialogHeader>
          
          <div className="p-6 text-center">
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
              View Details Modal Content (To be implemented)
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Setup Wizard Modal */}
      <Dialog open={showWizardModal} onOpenChange={setShowWizardModal}>
        <DialogContent className={`
          max-w-3xl
          ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}
        `}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              AI {t.startWizard}
            </DialogTitle>
          </DialogHeader>
          
          <div className="p-6 text-center">
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
              Setup Wizard Modal Content (To be implemented)
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
