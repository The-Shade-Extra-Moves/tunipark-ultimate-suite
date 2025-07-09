
import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/Layout/MainLayout';
import { StatsCard } from '@/components/Dashboard/StatsCard';
import { ParkingGrid } from '@/components/Dashboard/ParkingGrid';
import { RevenueChart } from '@/components/Dashboard/RevenueChart';
import { RecentActivity } from '@/components/Dashboard/RecentActivity';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  ParkingCircle, 
  DollarSign, 
  Users, 
  TrendingUp,
  Car,
  MapPin,
  Globe,
  Moon,
  Sun,
  Languages,
  ChevronDown,
  Settings,
  Bell,
  Zap,
  Activity,
  CheckCircle,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Dashboard = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentLang, setCurrentLang] = useState('en');
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [isRTL, setIsRTL] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
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
      title: "Dashboard",
      subtitle: "Welcome back! Here's your parking overview",
      location: "Downtown Parking Facility",
      totalSpaces: "Total Spaces",
      occupied: "Occupied",
      todayRevenue: "Today's Revenue",
      activeUsers: "Active Users",
      occupancy: "occupancy",
      fromYesterday: "from yesterday",
      thisMonth: "this month",
      thisWeek: "this week",
      excellent: "Excellent",
      good: "Good",
      warning: "Warning",
      systemStatus: "System Status",
      realTimeUpdates: "Real-time Updates",
      refresh: "Refresh",
      networkHealth: "Network Health",
      stable: "Stable",
      allSystems: "All Systems Operational"
    },
    ar: {
      title: "لوحة التحكم",
      subtitle: "مرحباً بعودتك! إليك نظرة عامة على موقف السيارات",
      location: "مرفق وقوف السيارات وسط المدينة",
      totalSpaces: "إجمالي الأماكن",
      occupied: "مشغول",
      todayRevenue: "إيرادات اليوم",
      activeUsers: "المستخدمون النشطون",
      occupancy: "الإشغال",
      fromYesterday: "من أمس",
      thisMonth: "هذا الشهر",
      thisWeek: "هذا الأسبوع",
      excellent: "ممتاز",
      good: "جيد",
      warning: "تحذير",
      systemStatus: "حالة النظام",
      realTimeUpdates: "التحديثات في الوقت الفعلي",
      refresh: "تحديث",
      networkHealth: "صحة الشبكة",
      stable: "مستقر",
      allSystems: "جميع الأنظمة تعمل بصورة طبيعية"
    },
    fr: {
      title: "Tableau de bord",
      subtitle: "Bon retour! Voici votre aperçu de stationnement",
      location: "Parking du centre-ville",
      totalSpaces: "Espaces totaux",
      occupied: "Occupé",
      todayRevenue: "Revenus d'aujourd'hui",
      activeUsers: "Utilisateurs actifs",
      occupancy: "occupation",
      fromYesterday: "d'hier",
      thisMonth: "ce mois",
      thisWeek: "cette semaine",
      excellent: "Excellent",
      good: "Bon",
      warning: "Attention",
      systemStatus: "État du système",
      realTimeUpdates: "Mises à jour en temps réel",
      refresh: "Actualiser",
      networkHealth: "Santé du réseau",
      stable: "Stable",
      allSystems: "Tous les systèmes opérationnels"
    },
    de: {
      title: "Dashboard",
      subtitle: "Willkommen zurück! Hier ist Ihre Parkplatz-Übersicht",
      location: "Innenstadt Parkplatz",
      totalSpaces: "Gesamte Plätze",
      occupied: "Belegt",
      todayRevenue: "Heutige Einnahmen",
      activeUsers: "Aktive Benutzer",
      occupancy: "Belegung",
      fromYesterday: "von gestern",
      thisMonth: "diesen Monat",
      thisWeek: "diese Woche",
      excellent: "Ausgezeichnet",
      good: "Gut",
      warning: "Warnung",
      systemStatus: "Systemstatus",
      realTimeUpdates: "Echtzeit-Updates",
      refresh: "Aktualisieren",
      networkHealth: "Netzwerk-Gesundheit",
      stable: "Stabil",
      allSystems: "Alle Systeme betriebsbereit"
    }
  };

  const t = translations[currentLang];

  useEffect(() => {
    setIsRTL(currentLang === 'ar');
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    } ${isRTL ? 'rtl' : 'ltr'}`}>
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className={`absolute -top-40 -right-40 w-80 h-80 rounded-full ${
            isDarkMode ? 'bg-purple-500/10' : 'bg-blue-400/10'
          } blur-3xl`}
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full ${
            isDarkMode ? 'bg-blue-500/10' : 'bg-purple-400/10'
          } blur-3xl`}
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <MainLayout>
        <motion.div 
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header with Controls */}
          <motion.div 
            className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
            variants={itemVariants}
          >
            <div className="flex items-center gap-4">
              <div>
                <h1 className={`text-2xl lg:text-3xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-slate-900'
                } flex items-center gap-3`}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className={`p-2 rounded-xl ${
                      isDarkMode 
                        ? 'bg-white/10 backdrop-blur-md border border-white/20' 
                        : 'bg-white/80 backdrop-blur-md border border-white/40 shadow-lg'
                    }`}
                  >
                    <BarChart3 className="w-6 h-6" />
                  </motion.div>
                  {t.title}
                </h1>
                <p className={`${isDarkMode ? 'text-slate-300' : 'text-slate-600'} mt-1`}>
                  {t.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowLangDropdown(!showLangDropdown)}
                  className={`flex items-center gap-2 ${
                    isDarkMode 
                      ? 'text-white/90 hover:bg-white/10 backdrop-blur-md border border-white/20' 
                      : 'text-slate-700 hover:bg-white/80 backdrop-blur-md border border-white/40'
                  }`}
                >
                  <Languages className="w-4 h-4" />
                  <span>{languages.find(l => l.code === currentLang)?.flag}</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
                <AnimatePresence>
                  {showLangDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`absolute top-full mt-2 ${isRTL ? 'left-0' : 'right-0'} min-w-48 ${
                        isDarkMode 
                          ? 'bg-slate-800/90 backdrop-blur-md border border-white/20' 
                          : 'bg-white/90 backdrop-blur-md border border-white/40'
                      } rounded-xl shadow-lg z-50`}
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setCurrentLang(lang.code);
                            setShowLangDropdown(false);
                          }}
                          className={`w-full px-4 py-3 text-left hover:${
                            isDarkMode ? 'bg-white/10' : 'bg-slate-50'
                          } flex items-center gap-3 first:rounded-t-xl last:rounded-b-xl transition-colors ${
                            currentLang === lang.code ? (isDarkMode ? 'bg-white/20' : 'bg-blue-50') : ''
                          }`}
                        >
                          <span className="text-lg">{lang.flag}</span>
                          <span className={isDarkMode ? 'text-white' : 'text-slate-900'}>{lang.name}</span>
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
                    ? 'text-white/90 hover:bg-white/10 backdrop-blur-md border border-white/20' 
                    : 'text-slate-700 hover:bg-white/80 backdrop-blur-md border border-white/40'
                }`}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>

              {/* Real-time Updates Toggle */}
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                isDarkMode 
                  ? 'bg-white/10 backdrop-blur-md border border-white/20' 
                  : 'bg-white/80 backdrop-blur-md border border-white/40'
              }`}>
                <Activity className={`w-4 h-4 ${realTimeUpdates ? 'text-green-500' : isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                <span className={`text-sm ${isDarkMode ? 'text-white/90' : 'text-slate-700'}`}>
                  {t.realTimeUpdates}
                </span>
                <Switch 
                  checked={realTimeUpdates}
                  onCheckedChange={setRealTimeUpdates}
                  size="sm"
                />
              </div>

              {/* Refresh Button */}
              <Button
                onClick={handleRefresh}
                disabled={refreshing}
                size="sm"
                className={`${
                  isDarkMode 
                    ? 'bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white' 
                    : 'bg-white/80 hover:bg-white backdrop-blur-md border border-white/40 text-slate-700'
                }`}
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                {t.refresh}
              </Button>
            </div>
          </motion.div>

          {/* Location & Status */}
          <motion.div 
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            variants={itemVariants}
          >
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <span className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>
                {t.location}
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge 
                variant="secondary"
                className={`flex items-center gap-2 ${
                  isDarkMode 
                    ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                    : 'bg-green-100 text-green-700 border-green-200'
                }`}
              >
                <CheckCircle className="w-3 h-3" />
                {t.allSystems}
              </Badge>
              
              <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                {t.networkHealth}: <span className="text-green-500 font-medium">{t.stable}</span>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className={`${
                isDarkMode 
                  ? 'bg-slate-800/40 backdrop-blur-md border-white/10 hover:bg-slate-800/60' 
                  : 'bg-white/60 backdrop-blur-md border-white/60 hover:bg-white/80'
              } transition-all duration-300 shadow-xl`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        {t.totalSpaces}
                      </p>
                      <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        48
                      </p>
                      <p className="text-xs text-green-600 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        +2 {t.thisWeek}
                      </p>
                    </div>
                    <div className={`p-3 rounded-full ${
                      isDarkMode ? 'bg-blue-500/20' : 'bg-blue-100'
                    }`}>
                      <ParkingCircle className={`w-6 h-6 ${
                        isDarkMode ? 'text-blue-400' : 'text-blue-600'
                      }`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className={`${
                isDarkMode 
                  ? 'bg-slate-800/40 backdrop-blur-md border-white/10 hover:bg-slate-800/60' 
                  : 'bg-white/60 backdrop-blur-md border-white/60 hover:bg-white/80'
              } transition-all duration-300 shadow-xl`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        {t.occupied}
                      </p>
                      <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        34
                      </p>
                      <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        71% {t.occupancy}
                      </p>
                    </div>
                    <div className={`p-3 rounded-full ${
                      isDarkMode ? 'bg-red-500/20' : 'bg-red-100'
                    }`}>
                      <Car className={`w-6 h-6 ${
                        isDarkMode ? 'text-red-400' : 'text-red-600'
                      }`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className={`${
                isDarkMode 
                  ? 'bg-slate-800/40 backdrop-blur-md border-white/10 hover:bg-slate-800/60' 
                  : 'bg-white/60 backdrop-blur-md border-white/60 hover:bg-white/80'
              } transition-all duration-300 shadow-xl`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        {t.todayRevenue}
                      </p>
                      <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        $2,845
                      </p>
                      <p className="text-xs text-green-600 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        +12% {t.fromYesterday}
                      </p>
                    </div>
                    <div className={`p-3 rounded-full ${
                      isDarkMode ? 'bg-green-500/20' : 'bg-green-100'
                    }`}>
                      <DollarSign className={`w-6 h-6 ${
                        isDarkMode ? 'text-green-400' : 'text-green-600'
                      }`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className={`${
                isDarkMode 
                  ? 'bg-slate-800/40 backdrop-blur-md border-white/10 hover:bg-slate-800/60' 
                  : 'bg-white/60 backdrop-blur-md border-white/60 hover:bg-white/80'
              } transition-all duration-300 shadow-xl`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                        {t.activeUsers}
                      </p>
                      <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                        156
                      </p>
                      <p className="text-xs text-green-600 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        +8% {t.thisMonth}
                      </p>
                    </div>
                    <div className={`p-3 rounded-full ${
                      isDarkMode ? 'bg-orange-500/20' : 'bg-orange-100'
                    }`}>
                      <Users className={`w-6 h-6 ${
                        isDarkMode ? 'text-orange-400' : 'text-orange-600'
                      }`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Parking Grid */}
          <motion.div variants={itemVariants}>
            <ParkingGrid />
          </motion.div>

          {/* Charts */}
          <motion.div variants={itemVariants}>
            <RevenueChart />
          </motion.div>

          {/* Recent Activity */}
          <motion.div variants={itemVariants}>
            <RecentActivity />
          </motion.div>
        </motion.div>
      </MainLayout>
    </div>
  );
};

export default Dashboard;
