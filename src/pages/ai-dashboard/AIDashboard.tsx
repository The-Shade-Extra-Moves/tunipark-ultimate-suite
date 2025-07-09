import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AISidebar } from '@/components/ai-dashboard/AISidebar';
import { UsersStaffManagement } from '@/components/ai-dashboard/UsersStaffManagement';
import { AIParkingSpaces } from '@/components/ai-dashboard/AIParkingSpaces';
import { AISettings } from '@/components/ai-dashboard/AISettings';
import { AIRevenue } from '@/components/ai-dashboard/AIRevenue';
import { AIAnalytics } from '@/components/ai-dashboard/AIAnalytics';
import AIIoTDevices from '@/components/ai-dashboard/AIIoTDevices';
import { 
  LayoutDashboard, 
  Users, 
  Car, 
  BarChart3, 
  Zap, 
  Settings,
  Brain,
  Activity,
  TrendingUp,
  MapPin,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Wifi,
  WifiOff
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const AIDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentLang, setCurrentLang] = useState('en');
  const [isRTL, setIsRTL] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  // Update RTL based on language
  useEffect(() => {
    setIsRTL(currentLang === 'ar');
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  // Apply theme
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Check online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Translations
  const translations = {
    en: {
      aiDashboard: 'AI Dashboard',
      overview: 'Smart Parking Overview',
      totalSpaces: 'Total Parking Spaces',
      occupiedSpaces: 'Occupied Spaces',
      availableSpaces: 'Available Spaces',
      revenue: 'Today\'s Revenue',
      activeUsers: 'Active Users',
      iotDevices: 'IoT Devices',
      systemStatus: 'System Status',
      operational: 'Operational',
      aiInsights: 'AI Insights',
      prediction: 'Peak hours predicted at 2-4 PM',
      recommendation: 'Consider dynamic pricing for maximum revenue',
      realtimeData: 'Real-time Data',
      lastUpdated: 'Last updated',
      viewDetails: 'View Details',
      optimize: 'AI Optimize',
      online: 'Online',
      offline: 'Offline'
    },
    ar: {
      aiDashboard: 'لوحة التحكم بالذكاء الاصطناعي',
      overview: 'نظرة عامة على الانتظار الذكي',
      totalSpaces: 'إجمالي أماكن الانتظار',
      occupiedSpaces: 'الأماكن المشغولة',
      availableSpaces: 'الأماكن المتاحة',
      revenue: 'إيرادات اليوم',
      activeUsers: 'المستخدمون النشطون',
      iotDevices: 'أجهزة إنترنت الأشياء',
      systemStatus: 'حالة النظام',
      operational: 'يعمل',
      aiInsights: 'رؤى الذكاء الاصطناعي',
      prediction: 'توقع ساعات الذروة من 2-4 مساءً',
      recommendation: 'فكر في التسعير الديناميكي لأقصى إيراد',
      realtimeData: 'البيانات في الوقت الفعلي',
      lastUpdated: 'آخر تحديث',
      viewDetails: 'عرض التفاصيل',
      optimize: 'تحسين بالذكاء الاصطناعي',
      online: 'متصل',
      offline: 'غير متصل'
    },
    fr: {
      aiDashboard: 'Tableau de Bord IA',
      overview: 'Aperçu du Parking Intelligent',
      totalSpaces: 'Total des Places de Parking',
      occupiedSpaces: 'Places Occupées',
      availableSpaces: 'Places Disponibles',
      revenue: 'Revenus d\'Aujourd\'hui',
      activeUsers: 'Utilisateurs Actifs',
      iotDevices: 'Appareils IoT',
      systemStatus: 'État du Système',
      operational: 'Opérationnel',
      aiInsights: 'Insights IA',
      prediction: 'Heures de pointe prévues de 14h à 16h',
      recommendation: 'Considérez la tarification dynamique pour un revenu maximal',
      realtimeData: 'Données en Temps Réel',
      lastUpdated: 'Dernière mise à jour',
      viewDetails: 'Voir les Détails',
      optimize: 'Optimiser par IA',
      online: 'En ligne',
      offline: 'Hors ligne'
    },
    de: {
      aiDashboard: 'KI-Dashboard',
      overview: 'Intelligente Parkplatz-Übersicht',
      totalSpaces: 'Gesamte Parkplätze',
      occupiedSpaces: 'Belegte Plätze',
      availableSpaces: 'Verfügbare Plätze',
      revenue: 'Heutige Einnahmen',
      activeUsers: 'Aktive Benutzer',
      iotDevices: 'IoT-Geräte',
      systemStatus: 'Systemstatus',
      operational: 'Betriebsbereit',
      aiInsights: 'KI-Erkenntnisse',
      prediction: 'Spitzenzeiten vorhergesagt für 14-16 Uhr',
      recommendation: 'Erwägen Sie dynamische Preisgestaltung für maximalen Umsatz',
      realtimeData: 'Echtzeitdaten',
      lastUpdated: 'Zuletzt aktualisiert',
      viewDetails: 'Details anzeigen',
      optimize: 'KI-Optimierung',
      online: 'Online',
      offline: 'Offline'
    }
  };

  const t = translations[currentLang as keyof typeof translations] || translations.en;

  // Sample data
  const stats = [
    {
      title: t.totalSpaces,
      value: '1,250',
      change: '+5%',
      icon: MapPin,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: t.occupiedSpaces,
      value: '847',
      change: '+12%',
      icon: Car,
      color: 'from-red-500 to-pink-500'
    },
    {
      title: t.availableSpaces,
      value: '403',
      change: '-8%',
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: t.revenue,
      value: '$2,847',
      change: '+18%',
      icon: DollarSign,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: t.activeUsers,
      value: '1,024',
      change: '+7%',
      icon: Users,
      color: 'from-purple-500 to-indigo-500'
    },
    {
      title: t.iotDevices,
      value: '156',
      change: '+2%',
      icon: Zap,
      color: 'from-cyan-500 to-blue-500'
    }
  ];

  const renderDashboardContent = () => (
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
            {t.aiDashboard}
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {t.overview}
          </p>
        </div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`
            flex items-center gap-3 px-4 py-2 rounded-xl
            ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'}
            backdrop-blur-sm border border-gray-200/10
          `}
        >
          {isOnline ? (
            <>
              <Wifi className="w-5 h-5 text-green-400" />
              <span className={`text-sm font-medium ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
                {t.online}
              </span>
            </>
          ) : (
            <>
              <WifiOff className="w-5 h-5 text-red-400" />
              <span className={`text-sm font-medium ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                {t.offline}
              </span>
            </>
          )}
          <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
        </motion.div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {stat.title}
                      </p>
                      <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {stat.value}
                      </p>
                      <Badge 
                        variant={stat.change.startsWith('+') ? 'default' : 'destructive'}
                        className="text-xs"
                      >
                        {stat.change}
                      </Badge>
                    </div>
                    
                    <div className={`
                      p-3 rounded-xl bg-gradient-to-r ${stat.color}
                      shadow-lg group-hover:shadow-xl transition-all duration-300
                      group-hover:scale-110
                    `}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 xl:grid-cols-2 gap-6"
      >
        {/* AI Predictions */}
        <Card className={`
          ${isDarkMode 
            ? 'bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/30' 
            : 'bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200/50'
          }
          backdrop-blur-xl
        `}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-600">
                <Brain className="w-5 h-5 text-white" />
              </div>
              {t.aiInsights}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className={`
              p-4 rounded-xl 
              ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'}
              backdrop-blur-sm
            `}>
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Prediction
                  </h4>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t.prediction}
                  </p>
                </div>
              </div>
            </div>
            
            <div className={`
              p-4 rounded-xl 
              ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'}
              backdrop-blur-sm
            `}>
              <div className="flex items-start gap-3">
                <Activity className="w-5 h-5 text-green-400 mt-0.5" />
                <div>
                  <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Recommendation
                  </h4>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {t.recommendation}
                  </p>
                </div>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700">
              <Brain className="w-4 h-4 mr-2" />
              {t.optimize}
            </Button>
          </CardContent>
        </Card>

        {/* Real-time Activity */}
        <Card className={`
          ${isDarkMode 
            ? 'bg-gray-900/50 border-gray-700/50' 
            : 'bg-white/50 border-gray-200/50'
          }
          backdrop-blur-xl
        `}>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600">
                <Activity className="w-5 h-5 text-white" />
              </div>
              {t.realtimeData}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: '2 min ago', action: 'Vehicle entered Space A-15', status: 'success' },
                { time: '5 min ago', action: 'Payment processed - $12.50', status: 'success' },
                { time: '8 min ago', action: 'Vehicle exited Space B-03', status: 'info' },
                { time: '12 min ago', action: 'IoT sensor maintenance alert', status: 'warning' }
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`
                    flex items-center gap-3 p-3 rounded-lg
                    ${isDarkMode ? 'bg-gray-800/30' : 'bg-gray-50/50'}
                    backdrop-blur-sm
                  `}
                >
                  <div className={`
                    w-2 h-2 rounded-full 
                    ${activity.status === 'success' ? 'bg-green-400' : 
                      activity.status === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
                    }
                    animate-pulse
                  `} />
                  <div className="flex-1">
                    <p className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {activity.action}
                    </p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {activity.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'users-staff':
        return (
          <UsersStaffManagement 
            isDarkMode={isDarkMode}
            currentLang={currentLang}
            isRTL={isRTL}
          />
        );
      case 'parking-spaces':
        return (
          <AIParkingSpaces 
            isDarkMode={isDarkMode}
            currentLang={currentLang}
            isRTL={isRTL}
          />
        );
      case 'revenue':
        return (
          <AIRevenue 
            isDarkMode={isDarkMode}
            currentLang={currentLang}
            isRTL={isRTL}
          />
        );
      case 'analytics':
        return (
          <AIAnalytics 
            isDarkMode={isDarkMode}
            currentLang={currentLang}
            isRTL={isRTL}
          />
        );
      case 'iot-devices':
        return (
          <AIIoTDevices 
            isDarkMode={isDarkMode}
            currentLang={currentLang}
            isRTL={isRTL}
          />
        );
      case 'settings':
        return (
          <AISettings 
            isDarkMode={isDarkMode}
            currentLang={currentLang}
            isRTL={isRTL}
            onLanguageChange={setCurrentLang}
            onThemeToggle={() => setIsDarkMode(!isDarkMode)}
          />
        );
      default:
        return renderDashboardContent();
    }
  };

  return (
    <div className={`
      min-h-screen transition-colors duration-300
      ${isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-50'
      }
    `}>
      <AISidebar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isDarkMode={isDarkMode}
        onThemeToggle={() => setIsDarkMode(!isDarkMode)}
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        isRTL={isRTL}
      />
      
      <div className={`
        transition-all duration-300 lg:ml-80 min-h-screen
        ${isRTL ? 'lg:mr-80 lg:ml-0' : ''}
      `}>
        <div className="p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AIDashboard;
