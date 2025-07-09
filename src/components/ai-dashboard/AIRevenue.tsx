import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Download, 
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  Target,
  Zap,
  Clock,
  CreditCard,
  Users,
  MapPin,
  Car,
  Battery,
  Accessibility,
  Truck,
  Filter,
  RefreshCw,
  Eye,
  CheckCircle,
  AlertTriangle,
  XCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface AIRevenueProps {
  isDarkMode: boolean;
  currentLang: string;
  isRTL: boolean;
}

export const AIRevenue = ({ isDarkMode, currentLang, isRTL }: AIRevenueProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedZone, setSelectedZone] = useState('all');

  // Translations
  const translations = {
    en: {
      revenue: 'Revenue Analytics',
      overview: 'AI-powered revenue insights and analytics',
      todaysRevenue: 'Today\'s Revenue',
      weeklyRevenue: 'Weekly Revenue',
      monthlyRevenue: 'Monthly Revenue',
      growth: 'Growth Rate',
      totalTransactions: 'Total Transactions',
      averageTicket: 'Average Ticket',
      peakHours: 'Peak Hours',
      occupancyRate: 'Occupancy Rate',
      overview: 'Overview',
      zones: 'By Zones',
      types: 'By Type',
      transactions: 'Transactions',
      analytics: 'AI Analytics',
      dailyTrend: 'Daily Revenue Trend',
      zoneRevenue: 'Revenue by Zone',
      spaceTypes: 'Revenue by Space Type',
      recentTransactions: 'Recent Transactions',
      aiInsights: 'AI Revenue Insights',
      predictions: 'Revenue Predictions',
      recommendations: 'Optimization Recommendations',
      export: 'Export Report',
      generateReport: 'Generate Report',
      autoRefresh: 'Auto Refresh',
      refreshData: 'Refresh Data',
      filterZone: 'Filter by Zone',
      allZones: 'All Zones',
      regular: 'Regular',
      evCharging: 'EV Charging',
      handicap: 'Handicap',
      xlOversized: 'XL/Oversized',
      completed: 'Completed',
      pending: 'Pending',
      failed: 'Failed',
      customer: 'Customer',
      amount: 'Amount',
      type: 'Type',
      date: 'Date',
      status: 'Status',
      viewDetails: 'View Details',
      peakPrediction: 'Peak revenue expected at 2-4 PM today',
      dynamicPricing: 'Consider dynamic pricing for Zone B',
      zoneBOptimization: 'Zone B shows 23% higher revenue potential',
      evGrowth: 'EV charging revenue increased 45% this month'
    },
    ar: {
      revenue: 'تحليلات الإيرادات',
      overview: 'رؤى الإيرادات المدعومة بالذكاء الاصطناعي والتحليلات',
      todaysRevenue: 'إيرادات اليوم',
      weeklyRevenue: 'الإيرادات الأسبوعية',
      monthlyRevenue: 'الإيرادات الشهرية',
      growth: 'معدل النمو',
      totalTransactions: 'إجمالي المعاملات',
      averageTicket: 'متوسط التذكرة',
      peakHours: 'ساعات الذروة',
      occupancyRate: 'معدل الإشغال',
      overview: 'نظرة عامة',
      zones: 'حسب المناطق',
      types: 'حسب النوع',
      transactions: 'المعاملات',
      analytics: 'تحليلات الذكاء الاصطناعي',
      regular: 'عادي',
      evCharging: 'شحن المركبات الكهربائية',
      handicap: 'ذوي الاحتياجات الخاصة',
      xlOversized: 'كبير الحجم',
      completed: 'مكتمل',
      pending: 'في الانتظار',
      failed: 'فاشل'
    },
    fr: {
      revenue: 'Analyses des Revenus',
      overview: 'Aperçus des revenus alimentés par IA et analyses',
      todaysRevenue: 'Revenus d\'Aujourd\'hui',
      weeklyRevenue: 'Revenus Hebdomadaires',
      monthlyRevenue: 'Revenus Mensuels',
      growth: 'Taux de Croissance',
      totalTransactions: 'Total des Transactions',
      averageTicket: 'Ticket Moyen',
      peakHours: 'Heures de Pointe',
      occupancyRate: 'Taux d\'Occupation',
      overview: 'Aperçu',
      zones: 'Par Zones',
      types: 'Par Type',
      transactions: 'Transactions',
      analytics: 'Analyses IA',
      regular: 'Régulier',
      evCharging: 'Recharge VE',
      handicap: 'Handicapé',
      xlOversized: 'XL/Surdimensionné',
      completed: 'Terminé',
      pending: 'En Attente',
      failed: 'Échoué'
    },
    de: {
      revenue: 'Umsatzanalysen',
      overview: 'KI-gestützte Umsatzeinblicke und Analysen',
      todaysRevenue: 'Heutige Einnahmen',
      weeklyRevenue: 'Wöchentliche Einnahmen',
      monthlyRevenue: 'Monatliche Einnahmen',
      growth: 'Wachstumsrate',
      totalTransactions: 'Gesamttransaktionen',
      averageTicket: 'Durchschnittsticket',
      peakHours: 'Spitzenzeiten',
      occupancyRate: 'Belegungsrate',
      overview: 'Übersicht',
      zones: 'Nach Zonen',
      types: 'Nach Typ',
      transactions: 'Transaktionen',
      analytics: 'KI-Analysen',
      regular: 'Normal',
      evCharging: 'E-Auto Laden',
      handicap: 'Behindert',
      xlOversized: 'XL/Übergroß',
      completed: 'Abgeschlossen',
      pending: 'Ausstehend',
      failed: 'Fehlgeschlagen'
    }
  };

  const t = translations[currentLang as keyof typeof translations] || translations.en;

  // Sample data with AI enhancements
  const revenueStats = [
    {
      title: t.todaysRevenue,
      value: '$847.50',
      change: '+12.3%',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500',
      trend: 'up'
    },
    {
      title: t.weeklyRevenue,
      value: '$5,240.25',
      change: '+8.7%',
      icon: Calendar,
      color: 'from-blue-500 to-cyan-500',
      trend: 'up'
    },
    {
      title: t.monthlyRevenue,
      value: '$22,847.80',
      change: '+15.2%',
      icon: TrendingUp,
      color: 'from-purple-500 to-indigo-500',
      trend: 'up'
    },
    {
      title: t.averageTicket,
      value: '$18.45',
      change: '-2.1%',
      icon: CreditCard,
      color: 'from-orange-500 to-red-500',
      trend: 'down'
    }
  ];

  const dailyRevenue = [
    { date: 'Mon', revenue: 680, occupancy: 85, transactions: 42 },
    { date: 'Tue', revenue: 720, occupancy: 88, transactions: 48 },
    { date: 'Wed', revenue: 590, occupancy: 75, transactions: 38 },
    { date: 'Thu', revenue: 820, occupancy: 92, transactions: 52 },
    { date: 'Fri', revenue: 950, occupancy: 95, transactions: 61 },
    { date: 'Sat', revenue: 1180, occupancy: 98, transactions: 74 },
    { date: 'Sun', revenue: 840, occupancy: 89, transactions: 48 }
  ];

  const zoneRevenue = [
    { 
      zone: 'Zone A', 
      revenue: 3240, 
      percentage: 38, 
      spaces: 45, 
      occupancy: 92,
      growth: '+15%'
    },
    { 
      zone: 'Zone B', 
      revenue: 2890, 
      percentage: 34, 
      spaces: 38, 
      occupancy: 89,
      growth: '+23%'
    },
    { 
      zone: 'Zone C', 
      revenue: 1680, 
      percentage: 20, 
      spaces: 28, 
      occupancy: 76,
      growth: '+8%'
    },
    { 
      zone: 'Zone D', 
      revenue: 680, 
      percentage: 8, 
      spaces: 12, 
      occupancy: 65,
      growth: '+5%'
    }
  ];

  const spaceTypes = [
    { 
      name: t.regular, 
      value: 4850, 
      percentage: 58, 
      icon: Car,
      color: '#3B82F6',
      growth: '+12%'
    },
    { 
      name: t.evCharging, 
      value: 2340, 
      percentage: 28, 
      icon: Battery,
      color: '#10B981',
      growth: '+45%'
    },
    { 
      name: t.handicap, 
      value: 680, 
      percentage: 8, 
      icon: Accessibility,
      color: '#F59E0B',
      growth: '+8%'
    },
    { 
      name: t.xlOversized, 
      value: 510, 
      percentage: 6, 
      icon: Truck,
      color: '#8B5CF6',
      growth: '+18%'
    }
  ];

  const transactions = [
    {
      id: 'T2024001',
      customer: 'Ahmed Ben Ali',
      amount: 28.50,
      type: t.evCharging,
      date: '2 min ago',
      status: 'completed',
      zone: 'Zone A'
    },
    {
      id: 'T2024002',
      customer: 'Sarah Johnson',
      amount: 15.75,
      type: t.regular,
      date: '8 min ago',
      status: 'completed',
      zone: 'Zone B'
    },
    {
      id: 'T2024003',
      customer: 'Mohamed Trabelsi',
      amount: 32.00,
      type: t.xlOversized,
      date: '12 min ago',
      status: 'pending',
      zone: 'Zone C'
    },
    {
      id: 'T2024004',
      customer: 'Emma Wilson',
      amount: 22.25,
      type: t.regular,
      date: '18 min ago',
      status: 'completed',
      zone: 'Zone A'
    },
    {
      id: 'T2024005',
      customer: 'Jean Dupont',
      amount: 19.80,
      type: t.handicap,
      date: '25 min ago',
      status: 'failed',
      zone: 'Zone D'
    }
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-400/10';
      case 'pending': return 'text-yellow-400 bg-yellow-400/10';
      case 'failed': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'pending': return Clock;
      case 'failed': return XCircle;
      default: return AlertTriangle;
    }
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
            text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-500 to-blue-600 
            bg-clip-text text-transparent mb-2
          `}>
            {t.revenue}
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {t.overview}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Label className="text-sm">{t.autoRefresh}</Label>
            <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
          </div>
          
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={refreshing}
            className={`
              ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}
              backdrop-blur-sm
            `}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            {t.refreshData}
          </Button>
          
          <Button
            variant="outline"
            className={`
              ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}
              backdrop-blur-sm
            `}
          >
            <Download className="w-4 h-4 mr-2" />
            {t.export}
          </Button>
          
          <Button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700">
            <BarChart3 className="w-4 h-4 mr-2" />
            {t.generateReport}
          </Button>
        </div>
      </motion.div>

      {/* Revenue Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
      >
        {revenueStats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? ArrowUpRight : ArrowDownRight;
          
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
                hover:shadow-xl hover:shadow-green-500/10
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
                      <div className="flex items-center gap-2">
                        <TrendIcon className={`w-4 h-4 ${
                          stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                        }`} />
                        <span className={`text-sm font-medium ${
                          stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {stat.change}
                        </span>
                      </div>
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

      {/* Analytics Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs defaultValue="overview" className="w-full">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <TabsList className={`
              grid w-full lg:w-auto grid-cols-5
              ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'}
              backdrop-blur-xl
            `}>
              <TabsTrigger value="overview">{t.overview}</TabsTrigger>
              <TabsTrigger value="zones">{t.zones}</TabsTrigger>
              <TabsTrigger value="types">{t.types}</TabsTrigger>
              <TabsTrigger value="transactions">{t.transactions}</TabsTrigger>
              <TabsTrigger value="analytics">{t.analytics}</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-3">
              <Select value={selectedZone} onValueChange={setSelectedZone}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t.filterZone} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.allZones}</SelectItem>
                  <SelectItem value="zone-a">Zone A</SelectItem>
                  <SelectItem value="zone-b">Zone B</SelectItem>
                  <SelectItem value="zone-c">Zone C</SelectItem>
                  <SelectItem value="zone-d">Zone D</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="overview" className="space-y-6">
            {/* Daily Revenue Chart */}
            <Card className={`
              ${isDarkMode 
                ? 'bg-gray-900/50 border-gray-700/50' 
                : 'bg-white/50 border-gray-200/50'
              }
              backdrop-blur-xl
            `}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  {t.dailyTrend}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-end justify-between gap-2">
                  {dailyRevenue.map((day, index) => (
                    <motion.div
                      key={day.date}
                      initial={{ height: 0 }}
                      animate={{ height: `${(day.revenue / 1200) * 100}%` }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="flex-1 bg-gradient-to-t from-green-500 to-blue-600 rounded-t-lg relative group"
                    >
                      <div className={`
                        absolute -top-12 left-1/2 transform -translate-x-1/2
                        ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
                        px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100
                        transition-opacity duration-300 text-xs whitespace-nowrap
                      `}>
                        ${day.revenue}
                      </div>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full text-xs mt-2">
                        {day.date}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="zones" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {zoneRevenue.map((zone, index) => (
                <motion.div
                  key={zone.zone}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
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
                      <div className="text-center space-y-4">
                        <div className={`
                          w-16 h-16 mx-auto rounded-xl 
                          bg-gradient-to-r from-blue-500 to-purple-600
                          flex items-center justify-center
                        `}>
                          <MapPin className="w-8 h-8 text-white" />
                        </div>
                        
                        <div>
                          <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {zone.zone}
                          </h3>
                          <p className="text-2xl font-bold text-blue-600">
                            ${zone.revenue.toLocaleString()}
                          </p>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {zone.percentage}% of total
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Spaces</p>
                            <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {zone.spaces}
                            </p>
                          </div>
                          <div>
                            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Occupancy</p>
                            <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {zone.occupancy}%
                            </p>
                          </div>
                        </div>
                        
                        <Badge className="bg-green-500/20 text-green-400 border-0">
                          {zone.growth} growth
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="types" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {spaceTypes.map((type, index) => {
                const Icon = type.icon;
                
                return (
                  <motion.div
                    key={type.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Card className={`
                      ${isDarkMode 
                        ? 'bg-gray-900/50 border-gray-700/50 hover:bg-gray-800/50' 
                        : 'bg-white/50 border-gray-200/50 hover:bg-white/80'
                      }
                      backdrop-blur-xl transition-all duration-300
                      hover:shadow-xl hover:shadow-purple-500/10
                    `}>
                      <CardContent className="p-6">
                        <div className="text-center space-y-4">
                          <div 
                            className="w-16 h-16 mx-auto rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `${type.color}20` }}
                          >
                            <Icon className="w-8 h-8" style={{ color: type.color }} />
                          </div>
                          
                          <div>
                            <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {type.name}
                            </h3>
                            <p className="text-2xl font-bold" style={{ color: type.color }}>
                              ${type.value.toLocaleString()}
                            </p>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {type.percentage}% of total
                            </p>
                          </div>
                          
                          <Badge className="bg-green-500/20 text-green-400 border-0">
                            {type.growth} growth
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card className={`
              ${isDarkMode 
                ? 'bg-gray-900/50 border-gray-700/50' 
                : 'bg-white/50 border-gray-200/50'
              }
              backdrop-blur-xl
            `}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  {t.recentTransactions}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction, index) => {
                    const StatusIcon = getStatusIcon(transaction.status);
                    
                    return (
                      <motion.div
                        key={transaction.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`
                          flex items-center justify-between p-4 rounded-xl
                          ${isDarkMode ? 'bg-gray-800/30 hover:bg-gray-700/30' : 'bg-gray-50/50 hover:bg-gray-100/50'}
                          backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]
                        `}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`
                            p-2 rounded-lg 
                            ${isDarkMode ? 'bg-green-500/20' : 'bg-green-100'}
                          `}>
                            <DollarSign className="w-5 h-5 text-green-500" />
                          </div>
                          
                          <div>
                            <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {transaction.customer}
                            </h4>
                            <div className="flex items-center gap-2 text-sm">
                              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                                {transaction.type}
                              </span>
                              <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>•</span>
                              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                                {transaction.zone}
                              </span>
                              <span className={isDarkMode ? 'text-gray-500' : 'text-gray-400'}>•</span>
                              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                                {transaction.date}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            ${transaction.amount}
                          </span>
                          
                          <Badge className={getStatusColor(transaction.status)}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {transaction.status}
                          </Badge>
                          
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {/* AI Insights */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
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
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    {t.predictions}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { icon: TrendingUp, text: t.peakPrediction || 'Peak revenue expected at 2-4 PM today', color: 'text-blue-400' },
                    { icon: Zap, text: t.evGrowth || 'EV charging revenue increased 45% this month', color: 'text-green-400' },
                    { icon: MapPin, text: t.zoneBOptimization || 'Zone B shows 23% higher revenue potential', color: 'text-purple-400' }
                  ].map((insight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`
                        flex items-start gap-3 p-4 rounded-xl
                        ${isDarkMode ? 'bg-gray-800/30' : 'bg-white/50'}
                        backdrop-blur-sm
                      `}
                    >
                      <insight.icon className={`w-5 h-5 ${insight.color} mt-0.5`} />
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {insight.text}
                      </p>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

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
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    {t.recommendations}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    'Consider dynamic pricing for Zone B during peak hours',
                    'Expand EV charging infrastructure based on demand',
                    'Optimize space allocation in Zone A for higher revenue',
                    'Implement promotional pricing for off-peak hours'
                  ].map((recommendation, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`
                        flex items-start gap-3 p-4 rounded-xl
                        ${isDarkMode ? 'bg-gray-800/30' : 'bg-gray-50/50'}
                        backdrop-blur-sm
                      `}
                    >
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {recommendation}
                      </p>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};
