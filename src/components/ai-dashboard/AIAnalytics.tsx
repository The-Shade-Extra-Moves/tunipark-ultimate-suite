import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Clock, 
  Download, 
  Calendar,
  DollarSign,
  Car,
  Zap,
  MapPin,
  Target,
  Brain,
  AlertTriangle,
  Eye,
  Filter,
  RefreshCw,
  FileText,
  Settings,
  Globe,
  Sparkles,
  Activity,
  PieChart,
  LineChart as LineChartIcon,
  BarChart as BarChartIcon,
  TrendingDown,
  Percent,
  Timer,
  Building,
  Navigation,
  Wifi,
  Battery,
  Shield,
  Award,
  Star,
  ThumbsUp,
  Search,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Minus,
  X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  AreaChart, 
  Area,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ComposedChart,
  Scatter,
  ReferenceLine
} from 'recharts';

interface AIAnalyticsProps {
  isDarkMode: boolean;
  currentLang: string;
  isRTL: boolean;
}

export const AIAnalytics = ({ isDarkMode, currentLang, isRTL }: AIAnalyticsProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('7d');
  const [selectedZone, setSelectedZone] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [animateCharts, setAnimateCharts] = useState(true);
  const [aiInsights, setAiInsights] = useState(true);

  // Translations
  const translations = {
    en: {
      analytics: 'AI Analytics',
      subtitle: 'Deep insights into parking performance and user behavior',
      exportData: 'Export Data',
      dateRange: 'Date Range',
      filters: 'Filters',
      today: 'Today',
      yesterday: 'Yesterday',
      last7days: 'Last 7 Days',
      last30days: 'Last 30 Days',
      thisMonth: 'This Month',
      overview: 'Overview',
      occupancy: 'Occupancy',
      revenue: 'Revenue',
      behavior: 'User Behavior',
      predictions: 'AI Predictions',
      performance: 'Performance',
      
      // KPIs
      avgOccupancy: 'Avg. Occupancy',
      efficiency: 'Efficiency',
      dailyVisitors: 'Daily Visitors',
      avgDuration: 'Avg. Duration',
      totalRevenue: 'Total Revenue',
      revenuePerSpace: 'Revenue/Space',
      turnoverRate: 'Turnover Rate',
      customerSatisfaction: 'Satisfaction',
      
      // Charts
      hourlyOccupancy: 'Hourly Occupancy Pattern',
      weeklyTrends: 'Weekly Performance Trends',
      revenueAnalysis: 'Revenue Analysis',
      peakHours: 'Peak Hours Analysis',
      zoneComparison: 'Zone Comparison',
      userSegments: 'User Segments',
      
      // AI Insights
      aiInsights: 'AI Insights',
      recommendations: 'Recommendations',
      anomalies: 'Anomalies Detected',
      forecast: 'Forecast',
      
      // Values
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      excellent: 'Excellent',
      good: 'Good',
      fair: 'Fair',
      poor: 'Poor'
    },
    ar: {
      analytics: 'تحليلات الذكاء الاصطناعي',
      subtitle: 'رؤى عميقة حول أداء الانتظار وسلوك المستخدمين',
      exportData: 'تصدير البيانات',
      dateRange: 'النطاق الزمني',
      filters: 'المرشحات',
      today: 'اليوم',
      yesterday: 'أمس',
      last7days: 'آخر 7 أيام',
      last30days: 'آخر 30 يوماً',
      thisMonth: 'هذا الشهر',
      overview: 'نظرة عامة',
      occupancy: 'الإشغال',
      revenue: 'الإيرادات',
      behavior: 'سلوك المستخدم',
      predictions: 'توقعات الذكاء الاصطناعي',
      performance: 'الأداء',
      avgOccupancy: 'متوسط الإشغال',
      efficiency: 'الكفاءة',
      dailyVisitors: 'الزوار اليوميون',
      avgDuration: 'متوسط المدة',
      totalRevenue: 'إجمالي الإيرادات',
      customerSatisfaction: 'رضا العملاء',
      hourlyOccupancy: 'نمط الإشغال بالساعة',
      revenueAnalysis: 'تحليل الإيرادات',
      zoneComparison: 'مقارنة المناطق',
      userSegments: 'شرائح المستخدمين',
      aiInsights: 'رؤى الذكاء الاصطناعي'
    },
    fr: {
      analytics: 'Analyses IA',
      subtitle: 'Insights approfondis sur les performances de stationnement et le comportement des utilisateurs',
      exportData: 'Exporter les Données',
      dateRange: 'Période',
      filters: 'Filtres',
      today: 'Aujourd\'hui',
      yesterday: 'Hier',
      last7days: '7 derniers jours',
      last30days: '30 derniers jours',
      thisMonth: 'Ce mois',
      overview: 'Vue d\'ensemble',
      occupancy: 'Occupation',
      revenue: 'Revenus',
      behavior: 'Comportement Utilisateur',
      predictions: 'Prédictions IA',
      performance: 'Performance',
      avgOccupancy: 'Occupation Moy.',
      efficiency: 'Efficacité',
      dailyVisitors: 'Visiteurs Quotidiens',
      avgDuration: 'Durée Moy.',
      totalRevenue: 'Revenus Totaux',
      customerSatisfaction: 'Satisfaction',
      hourlyOccupancy: 'Motif d\'Occupation Horaire',
      revenueAnalysis: 'Analyse des Revenus',
      zoneComparison: 'Comparaison des Zones',
      userSegments: 'Segments d\'Utilisateurs',
      aiInsights: 'Insights IA'
    },
    de: {
      analytics: 'KI-Analysen',
      subtitle: 'Tiefe Einblicke in Parkplatz-Performance und Nutzerverhalten',
      exportData: 'Daten Exportieren',
      dateRange: 'Zeitraum',
      filters: 'Filter',
      today: 'Heute',
      yesterday: 'Gestern',
      last7days: 'Letzte 7 Tage',
      last30days: 'Letzte 30 Tage',
      thisMonth: 'Dieser Monat',
      overview: 'Übersicht',
      occupancy: 'Belegung',
      revenue: 'Umsatz',
      behavior: 'Nutzerverhalten',
      predictions: 'KI-Vorhersagen',
      performance: 'Leistung',
      avgOccupancy: 'Durchschn. Belegung',
      efficiency: 'Effizienz',
      dailyVisitors: 'Tägliche Besucher',
      avgDuration: 'Durchschn. Dauer',
      totalRevenue: 'Gesamtumsatz',
      customerSatisfaction: 'Zufriedenheit',
      hourlyOccupancy: 'Stündliches Belegungsmuster',
      revenueAnalysis: 'Umsatzanalyse',
      zoneComparison: 'Zonenvergleich',
      userSegments: 'Nutzersegmente',
      aiInsights: 'KI-Einblicke'
    }
  };

  const t = translations[currentLang as keyof typeof translations] || translations.en;

  // Sample data
  const kpiData = [
    {
      id: 'occupancy',
      title: t.avgOccupancy,
      value: '82.4%',
      change: '+5.2%',
      trend: 'up',
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-500',
      description: 'Above target'
    },
    {
      id: 'efficiency',
      title: t.efficiency,
      value: '94.2%',
      change: '+2.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      description: 'Excellent performance'
    },
    {
      id: 'visitors',
      title: t.dailyVisitors,
      value: '1,247',
      change: '+12.3%',
      trend: 'up',
      icon: Users,
      color: 'from-purple-500 to-indigo-500',
      description: 'Peak season'
    },
    {
      id: 'duration',
      title: t.avgDuration,
      value: '2.4h',
      change: '-8.5%',
      trend: 'down',
      icon: Clock,
      color: 'from-orange-500 to-red-500',
      description: 'Faster turnover'
    },
    {
      id: 'revenue',
      title: t.totalRevenue,
      value: '$12,847',
      change: '+18.7%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-yellow-500 to-orange-500',
      description: 'Record high'
    },
    {
      id: 'satisfaction',
      title: t.customerSatisfaction,
      value: '4.8/5',
      change: '+0.3',
      trend: 'up',
      icon: Star,
      color: 'from-pink-500 to-rose-500',
      description: 'Exceptional rating'
    }
  ];

  const occupancyData = [
    { hour: '06:00', current: 15, predicted: 18, optimal: 25 },
    { hour: '07:00', current: 35, predicted: 32, optimal: 40 },
    { hour: '08:00', current: 65, predicted: 68, optimal: 70 },
    { hour: '09:00', current: 78, predicted: 75, optimal: 80 },
    { hour: '10:00', current: 85, predicted: 88, optimal: 85 },
    { hour: '11:00', current: 92, predicted: 90, optimal: 90 },
    { hour: '12:00', current: 95, predicted: 98, optimal: 95 },
    { hour: '13:00', current: 93, predicted: 95, optimal: 92 },
    { hour: '14:00', current: 88, predicted: 85, optimal: 88 },
    { hour: '15:00', current: 82, predicted: 80, optimal: 85 },
    { hour: '16:00', current: 75, predicted: 78, optimal: 80 },
    { hour: '17:00', current: 68, predicted: 65, optimal: 70 },
    { hour: '18:00', current: 52, predicted: 55, optimal: 60 },
    { hour: '19:00', current: 38, predicted: 40, optimal: 45 },
    { hour: '20:00', current: 25, predicted: 28, optimal: 30 },
    { hour: '21:00', current: 18, predicted: 20, optimal: 25 }
  ];

  const revenueData = [
    { day: 'Mon', hourly: 420, monthly: 380, ev: 120, penalty: 45 },
    { day: 'Tue', hourly: 485, monthly: 420, ev: 135, penalty: 32 },
    { day: 'Wed', hourly: 395, monthly: 390, ev: 110, penalty: 28 },
    { day: 'Thu', hourly: 540, monthly: 445, ev: 165, penalty: 55 },
    { day: 'Fri', hourly: 620, monthly: 580, ev: 185, penalty: 68 },
    { day: 'Sat', hourly: 580, monthly: 520, ev: 175, penalty: 42 },
    { day: 'Sun', hourly: 380, monthly: 360, ev: 98, penalty: 25 }
  ];

  const zoneData = [
    { zone: 'Zone A', occupancy: 92, revenue: 2840, spaces: 45, efficiency: 96 },
    { zone: 'Zone B', occupancy: 87, revenue: 2156, spaces: 32, efficiency: 94 },
    { zone: 'Zone C', occupancy: 78, revenue: 1985, spaces: 38, efficiency: 89 },
    { zone: 'Zone D', occupancy: 83, revenue: 2234, spaces: 40, efficiency: 91 },
    { zone: 'EV Section', occupancy: 95, revenue: 1847, spaces: 25, efficiency: 98 }
  ];

  const userSegments = [
    { name: 'Regular Users', value: 45, color: '#3B82F6' },
    { name: 'Monthly Pass', value: 28, color: '#10B981' },
    { name: 'EV Owners', value: 15, color: '#F59E0B' },
    { name: 'Visitors', value: 12, color: '#EF4444' }
  ];

  const aiPredictions = [
    {
      type: 'occupancy',
      title: 'Peak Hour Prediction',
      prediction: 'Tomorrow 12:30 PM - 98% occupancy expected',
      confidence: 94,
      icon: Target,
      color: 'text-blue-400'
    },
    {
      type: 'revenue',
      title: 'Revenue Forecast',
      prediction: 'Weekly revenue projected to increase by 15%',
      confidence: 87,
      icon: TrendingUp,
      color: 'text-green-400'
    },
    {
      type: 'maintenance',
      title: 'Maintenance Alert',
      prediction: 'Zone C sensors showing irregular patterns',
      confidence: 92,
      icon: AlertTriangle,
      color: 'text-yellow-400'
    },
    {
      type: 'optimization',
      title: 'Optimization Opportunity',
      prediction: 'Dynamic pricing could increase revenue by 8%',
      confidence: 78,
      icon: Brain,
      color: 'text-purple-400'
    }
  ];

  const performanceMetrics = [
    { 
      metric: 'Space Utilization', 
      current: 82.4, 
      target: 85, 
      benchmark: 78,
      trend: 'improving',
      description: 'Above industry average'
    },
    { 
      metric: 'Revenue per Space', 
      current: 124.50, 
      target: 120, 
      benchmark: 110,
      trend: 'excellent',
      description: 'Exceeding target'
    },
    { 
      metric: 'Customer Retention', 
      current: 68.2, 
      target: 70, 
      benchmark: 65,
      trend: 'stable',
      description: 'Near target'
    },
    { 
      metric: 'System Uptime', 
      current: 99.7, 
      target: 99.5, 
      benchmark: 99.2,
      trend: 'excellent',
      description: 'Exceptional reliability'
    }
  ];

  const renderKPICards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {kpiData.map((kpi, index) => {
        const Icon = kpi.icon;
        
        return (
          <motion.div
            key={kpi.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
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
              cursor-pointer relative overflow-hidden
            `}>
              {/* Gradient background on hover */}
              <div className={`
                absolute inset-0 bg-gradient-to-r ${kpi.color} opacity-0 
                group-hover:opacity-5 transition-opacity duration-300
              `} />
              
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`
                    p-3 rounded-xl bg-gradient-to-r ${kpi.color}
                    shadow-lg group-hover:shadow-xl transition-all duration-300
                    group-hover:scale-110
                  `}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {kpi.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 text-green-400" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-400" />
                    )}
                    <span className={`text-sm font-medium ${
                      kpi.trend === 'up' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {kpi.change}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {kpi.title}
                  </h3>
                  <p className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {kpi.value}
                  </p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    {kpi.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );

  const renderOccupancyChart = () => (
    <Card className={`
      ${isDarkMode 
        ? 'bg-gray-900/50 border-gray-700/50' 
        : 'bg-white/50 border-gray-200/50'
      }
      backdrop-blur-xl
    `}>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-600">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          {t.hourlyOccupancy}
          {aiInsights && (
            <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border-0">
              <Brain className="w-3 h-3 mr-1" />
              AI Enhanced
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={occupancyData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis 
              dataKey="hour" 
              tick={{ fontSize: 12 }}
              stroke={isDarkMode ? '#9CA3AF' : '#6B7280'}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              stroke={isDarkMode ? '#9CA3AF' : '#6B7280'}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="optimal" 
              fill="#10B981" 
              fillOpacity={0.2} 
              stroke="#10B981"
              strokeWidth={2}
              name="Optimal"
            />
            <Line 
              type="monotone" 
              dataKey="current" 
              stroke="#3B82F6" 
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              name="Current"
            />
            <Line 
              type="monotone" 
              dataKey="predicted" 
              stroke="#F59E0B" 
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: '#F59E0B', strokeWidth: 2, r: 3 }}
              name="AI Prediction"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  const renderRevenueChart = () => (
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
            <DollarSign className="w-5 h-5 text-white" />
          </div>
          {t.revenueAnalysis}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis 
              dataKey="day" 
              tick={{ fontSize: 12 }}
              stroke={isDarkMode ? '#9CA3AF' : '#6B7280'}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              stroke={isDarkMode ? '#9CA3AF' : '#6B7280'}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
              }}
            />
            <Bar dataKey="hourly" stackId="a" fill="#3B82F6" name="Hourly" radius={[0, 0, 4, 4]} />
            <Bar dataKey="monthly" stackId="a" fill="#10B981" name="Monthly Pass" />
            <Bar dataKey="ev" stackId="a" fill="#F59E0B" name="EV Charging" />
            <Bar dataKey="penalty" stackId="a" fill="#EF4444" name="Penalties" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  const renderZoneComparison = () => (
    <Card className={`
      ${isDarkMode 
        ? 'bg-gray-900/50 border-gray-700/50' 
        : 'bg-white/50 border-gray-200/50'
      }
      backdrop-blur-xl
    `}>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          {t.zoneComparison}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {zoneData.map((zone, index) => (
            <motion.div
              key={zone.zone}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02]
                ${isDarkMode 
                  ? 'bg-gray-800/30 border-gray-700/30 hover:bg-gray-700/30' 
                  : 'bg-gray-50/30 border-gray-200/30 hover:bg-gray-100/30'
                }
                backdrop-blur-sm
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`
                    w-3 h-3 rounded-full
                    ${zone.efficiency >= 95 ? 'bg-green-400' : 
                      zone.efficiency >= 90 ? 'bg-yellow-400' : 'bg-red-400'
                    }
                  `} />
                  <div>
                    <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {zone.zone}
                    </h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {zone.spaces} spaces
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {zone.occupancy}%
                    </p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      Occupancy
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <p className={`text-lg font-bold text-green-400`}>
                      ${zone.revenue}
                    </p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      Revenue
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <p className={`text-lg font-bold ${
                      zone.efficiency >= 95 ? 'text-green-400' : 
                      zone.efficiency >= 90 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {zone.efficiency}%
                    </p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                      Efficiency
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-3">
                <Progress 
                  value={zone.occupancy} 
                  className="h-2"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const renderUserSegments = () => (
    <Card className={`
      ${isDarkMode 
        ? 'bg-gray-900/50 border-gray-700/50' 
        : 'bg-white/50 border-gray-200/50'
      }
      backdrop-blur-xl
    `}>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-pink-500 to-rose-600">
            <Users className="w-5 h-5 text-white" />
          </div>
          {t.userSegments}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <ResponsiveContainer width="60%" height={200}>
            <RechartsPieChart>
              <Pie
                dataKey="value"
                data={userSegments}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
              >
                {userSegments.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
          
          <div className="space-y-3">
            {userSegments.map((segment, index) => (
              <div key={segment.name} className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: segment.color }}
                />
                <div>
                  <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {segment.name}
                  </p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {segment.value}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderAIPredictions = () => (
    <Card className={`
      ${isDarkMode 
        ? 'bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/30' 
        : 'bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200/50'
      }
      backdrop-blur-xl
    `}>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 relative">
            <Brain className="w-5 h-5 text-white" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse" />
          </div>
          {t.aiInsights}
          <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border-0">
            <Sparkles className="w-3 h-3 mr-1" />
            Live AI
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {aiPredictions.map((prediction, index) => {
          const Icon = prediction.icon;
          
          return (
            <motion.div
              key={prediction.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02]
                ${isDarkMode 
                  ? 'bg-gray-800/30 border-gray-700/30' 
                  : 'bg-white/30 border-gray-200/30'
                }
                backdrop-blur-sm
              `}
            >
              <div className="flex items-start gap-3">
                <div className={`
                  p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20
                `}>
                  <Icon className={`w-5 h-5 ${prediction.color}`} />
                </div>
                
                <div className="flex-1">
                  <h4 className={`font-semibold mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {prediction.title}
                  </h4>
                  <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {prediction.prediction}
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <Progress value={prediction.confidence} className="flex-1 h-2" />
                    <span className={`text-xs font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {prediction.confidence}% confidence
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );

  const renderPerformanceMetrics = () => (
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
            <Target className="w-5 h-5 text-white" />
          </div>
          Performance Benchmarks
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {performanceMetrics.map((metric, index) => (
          <motion.div
            key={metric.metric}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {metric.metric}
              </h4>
              <Badge className={`
                ${metric.trend === 'excellent' ? 'bg-green-500/20 text-green-400' :
                  metric.trend === 'improving' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }
                border-0
              `}>
                {metric.trend}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Current: {typeof metric.current === 'number' && metric.current > 100 ? `$${metric.current}` : `${metric.current}${typeof metric.current === 'number' ? '%' : ''}`}
                </span>
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  Target: {typeof metric.target === 'number' && metric.target > 100 ? `$${metric.target}` : `${metric.target}${typeof metric.target === 'number' ? '%' : ''}`}
                </span>
              </div>
              
              <Progress 
                value={(typeof metric.current === 'number' ? metric.current : 0) / (typeof metric.target === 'number' ? metric.target : 100) * 100} 
                className="h-3"
              />
              
              <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                {metric.description} • Benchmark: {typeof metric.benchmark === 'number' && metric.benchmark > 100 ? `$${metric.benchmark}` : `${metric.benchmark}${typeof metric.benchmark === 'number' ? '%' : ''}`}
              </p>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );

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
            {t.analytics}
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {t.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className={`
              ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}
              backdrop-blur-sm
            `}
          >
            <Filter className="w-4 h-4 mr-2" />
            {t.filters}
          </Button>
          
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className={`
              w-32
              ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}
              backdrop-blur-sm
            `}>
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">{t.today}</SelectItem>
              <SelectItem value="7d">{t.last7days}</SelectItem>
              <SelectItem value="30d">{t.last30days}</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
          
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
            <Download className="w-4 h-4 mr-2" />
            {t.exportData}
          </Button>
        </div>
      </motion.div>

      {/* Filters Panel */}
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
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Zone</label>
                    <Select value={selectedZone} onValueChange={setSelectedZone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Zones</SelectItem>
                        <SelectItem value="a">Zone A</SelectItem>
                        <SelectItem value="b">Zone B</SelectItem>
                        <SelectItem value="c">Zone C</SelectItem>
                        <SelectItem value="ev">EV Section</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-end gap-2">
                    <Switch 
                      checked={compareMode} 
                      onCheckedChange={setCompareMode}
                    />
                    <label className="text-sm">Compare Mode</label>
                  </div>
                  
                  <div className="flex items-end gap-2">
                    <Switch 
                      checked={aiInsights} 
                      onCheckedChange={setAiInsights}
                    />
                    <label className="text-sm">AI Insights</label>
                  </div>
                  
                  <div className="flex items-end gap-2">
                    <Switch 
                      checked={animateCharts} 
                      onCheckedChange={setAnimateCharts}
                    />
                    <label className="text-sm">Animations</label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* KPI Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {renderKPICards()}
      </motion.div>

      {/* Analytics Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`
            grid w-full grid-cols-2 md:grid-cols-6 gap-2 p-2 rounded-2xl
            ${isDarkMode 
              ? 'bg-gray-900/50 border-gray-700/50' 
              : 'bg-white/50 border-gray-200/50'
            }
            backdrop-blur-xl border
          `}>
            {[
              { value: 'overview', icon: BarChart3, label: t.overview },
              { value: 'occupancy', icon: Car, label: t.occupancy },
              { value: 'revenue', icon: DollarSign, label: t.revenue },
              { value: 'behavior', icon: Users, label: t.behavior },
              { value: 'predictions', icon: Brain, label: t.predictions },
              { value: 'performance', icon: Target, label: t.performance }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={`
                    flex flex-col lg:flex-row items-center gap-2 p-3 rounded-xl
                    transition-all duration-300 relative overflow-hidden
                    ${activeTab === tab.value 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                      : `${isDarkMode ? 'hover:bg-gray-800/50 text-gray-300' : 'hover:bg-gray-100/50 text-gray-600'}`
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium hidden lg:block">{tab.label}</span>
                  
                  {activeTab === tab.value && (
                    <motion.div
                      layoutId="activeAnalyticsTab"
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 xl:grid-cols-2 gap-6"
            >
              {renderOccupancyChart()}
              {renderRevenueChart()}
              {renderZoneComparison()}
              {renderUserSegments()}
            </motion.div>
          </TabsContent>

          {/* Occupancy Tab */}
          <TabsContent value="occupancy" className="mt-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {renderOccupancyChart()}
              {renderZoneComparison()}
            </motion.div>
          </TabsContent>

          {/* Revenue Tab */}
          <TabsContent value="revenue" className="mt-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {renderRevenueChart()}
              {renderPerformanceMetrics()}
            </motion.div>
          </TabsContent>

          {/* Behavior Tab */}
          <TabsContent value="behavior" className="mt-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {renderUserSegments()}
              {renderPerformanceMetrics()}
            </motion.div>
          </TabsContent>

          {/* Predictions Tab */}
          <TabsContent value="predictions" className="mt-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 xl:grid-cols-2 gap-6"
            >
              {renderAIPredictions()}
              {renderOccupancyChart()}
            </motion.div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="mt-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 xl:grid-cols-2 gap-6"
            >
              {renderPerformanceMetrics()}
              {renderZoneComparison()}
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};
