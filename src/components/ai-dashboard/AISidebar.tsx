import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  Car, 
  BarChart3, 
  Zap, 
  Settings, 
  HelpCircle, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  Brain,
  Activity,
  MapPin,
  DollarSign,
  Bell,
  Moon,
  Sun,
  Globe,
  Search
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

interface AISidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isDarkMode: boolean;
  onThemeToggle: () => void;
  currentLang: string;
  onLanguageChange: (lang: string) => void;
  isRTL: boolean;
}

export const AISidebar = ({ 
  activeSection, 
  onSectionChange, 
  isDarkMode, 
  onThemeToggle,
  currentLang,
  onLanguageChange,
  isRTL 
}: AISidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  // Languages
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇹🇳' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  // Translations
  const translations = {
    en: {
      dashboard: 'Dashboard',
      usersStaff: 'Users & Staff',
      parkingSpaces: 'Parking Spaces',
      revenue: 'Revenue',
      analytics: 'Analytics',
      iotDevices: 'IoT Devices',
      settings: 'Settings',
      help: 'Help',
      logout: 'Logout',
      aiPowered: 'AI-Powered',
      smartParking: 'Smart Parking',
      version: 'v2.0',
      online: 'Online',
      notifications: 'Notifications',
      darkMode: 'Dark Mode',
      language: 'Language'
    },
    ar: {
      dashboard: 'لوحة التحكم',
      usersStaff: 'المستخدمون والموظفون',
      parkingSpaces: 'أماكن الانتظار',
      revenue: 'الإيرادات',
      analytics: 'التحليلات',
      iotDevices: 'أجهزة إنترنت الأشياء',
      settings: 'الإعدادات',
      help: 'المساعدة',
      logout: 'تسجيل الخروج',
      aiPowered: 'مدعوم بالذكاء الاصطناعي',
      smartParking: 'الانتظار الذكي',
      version: 'إصدار 2.0',
      online: 'متصل',
      notifications: 'الإشعارات',
      darkMode: 'الوضع المظلم',
      language: 'اللغة'
    },
    fr: {
      dashboard: 'Tableau de Bord',
      usersStaff: 'Utilisateurs et Personnel',
      parkingSpaces: 'Places de Parking',
      revenue: 'Revenus',
      analytics: 'Analyses',
      iotDevices: 'Appareils IoT',
      settings: 'Paramètres',
      help: 'Aide',
      logout: 'Déconnexion',
      aiPowered: 'Alimenté par IA',
      smartParking: 'Parking Intelligent',
      version: 'v2.0',
      online: 'En ligne',
      notifications: 'Notifications',
      darkMode: 'Mode Sombre',
      language: 'Langue'
    },
    de: {
      dashboard: 'Dashboard',
      usersStaff: 'Benutzer & Personal',
      parkingSpaces: 'Parkplätze',
      revenue: 'Umsatz',
      analytics: 'Analysen',
      iotDevices: 'IoT-Geräte',
      settings: 'Einstellungen',
      help: 'Hilfe',
      logout: 'Abmelden',
      aiPowered: 'KI-Unterstützt',
      smartParking: 'Intelligentes Parken',
      version: 'v2.0',
      online: 'Online',
      notifications: 'Benachrichtigungen',
      darkMode: 'Dunkler Modus',
      language: 'Sprache'
    }
  };

  const t = translations[currentLang as keyof typeof translations] || translations.en;

  const menuItems = [
    { 
      id: 'dashboard', 
      icon: LayoutDashboard, 
      label: t.dashboard,
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      id: 'users-staff', 
      icon: Users, 
      label: t.usersStaff,
      color: 'from-purple-500 to-pink-500'
    },
    { 
      id: 'parking-spaces', 
      icon: Car, 
      label: t.parkingSpaces,
      color: 'from-green-500 to-emerald-500'
    },
    { 
      id: 'revenue', 
      icon: DollarSign, 
      label: t.revenue,
      color: 'from-emerald-500 to-teal-500'
    },
    { 
      id: 'analytics', 
      icon: BarChart3, 
      label: t.analytics,
      color: 'from-orange-500 to-red-500'
    },
    { 
      id: 'iot-devices', 
      icon: Zap, 
      label: t.iotDevices,
      color: 'from-yellow-500 to-orange-500'
    },
    { 
      id: 'settings', 
      icon: Settings, 
      label: t.settings,
      color: 'from-gray-500 to-slate-500'
    }
  ];

  const bottomItems = [
    { id: 'help', icon: HelpCircle, label: t.help },
    { id: 'logout', icon: LogOut, label: t.logout }
  ];

  const sidebarVariants = {
    expanded: { width: 280 },
    collapsed: { width: 80 }
  };

  const itemVariants = {
    expanded: { opacity: 1, x: 0 },
    collapsed: { opacity: 0, x: -20 }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsMobileOpen(true)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={isCollapsed ? "collapsed" : "expanded"}
        variants={sidebarVariants}
        className={`
          fixed ${isRTL ? 'right-0' : 'left-0'} top-0 h-full z-50 lg:z-30
          ${isMobileOpen ? 'translate-x-0' : isRTL ? 'translate-x-full' : '-translate-x-full'}
          lg:translate-x-0
          transition-transform duration-300 ease-in-out
        `}
      >
        {/* Glassmorphic Container */}
        <div className={`
          h-full 
          ${isDarkMode 
            ? 'bg-gray-900/90 border-gray-700/50' 
            : 'bg-white/90 border-gray-200/50'
          }
          backdrop-blur-xl border-r shadow-2xl
          flex flex-col
        `}>
          {/* Header */}
          <div className="p-6 border-b border-gray-200/10">
            <div className="flex items-center justify-between">
              {/* Logo & Brand */}
              <motion.div 
                className="flex items-center gap-3"
                animate={{ opacity: isCollapsed ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative">
                  <div className={`
                    w-10 h-10 rounded-xl 
                    bg-gradient-to-r from-blue-500 to-purple-600
                    flex items-center justify-center
                    shadow-lg
                  `}>
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <motion.div
                    className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                
                {!isCollapsed && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h1 className={`
                      text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-600 
                      bg-clip-text text-transparent
                    `}>
                      TuniPark
                    </h1>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        <Sparkles className="w-3 h-3 mr-1" />
                        {t.aiPowered}
                      </Badge>
                      <span className="text-xs text-gray-500">{t.version}</span>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Close Mobile / Toggle Desktop */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    setIsMobileOpen(false);
                  } else {
                    setIsCollapsed(!isCollapsed);
                  }
                }}
                className="lg:hidden"
              >
                <X className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden lg:flex"
              >
                {isCollapsed ? 
                  <ChevronRight className="h-5 w-5" /> : 
                  <ChevronLeft className="h-5 w-5" />
                }
              </Button>
            </div>

            {/* User Profile */}
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6"
              >
                <div className={`
                  p-4 rounded-xl 
                  ${isDarkMode 
                    ? 'bg-gray-800/50 border-gray-700/30' 
                    : 'bg-gray-50/50 border-gray-200/30'
                  }
                  border backdrop-blur-sm
                `}>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                        AI
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Ahmed Ben Ali
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-xs text-gray-500">{t.online}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Bell className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex-1 p-4 space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => {
                    onSectionChange(item.id);
                    if (window.innerWidth < 1024) {
                      setIsMobileOpen(false);
                    }
                  }}
                  className={`
                    w-full p-3 rounded-xl text-left transition-all duration-300
                    ${isActive 
                      ? `bg-gradient-to-r ${item.color} text-white shadow-lg shadow-blue-500/25` 
                      : `${isDarkMode 
                          ? 'hover:bg-gray-800/50 text-gray-300 hover:text-white' 
                          : 'hover:bg-gray-100/50 text-gray-600 hover:text-gray-900'
                        }`
                    }
                    relative overflow-hidden group
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  
                  <div className="flex items-center gap-3 relative z-10">
                    <div className={`
                      p-2 rounded-lg 
                      ${isActive 
                        ? 'bg-white/20' 
                        : `${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'} group-hover:bg-white/10`
                      }
                      transition-colors duration-300
                    `}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.span
                          variants={itemVariants}
                          initial="collapsed"
                          animate="expanded"
                          exit="collapsed"
                          className="font-medium"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    
                    {isActive && !isCollapsed && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto w-2 h-2 bg-white rounded-full"
                      />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Settings & Controls */}
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 border-t border-gray-200/10 space-y-4"
            >
              {/* Theme Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                  <span className="text-sm">{t.darkMode}</span>
                </div>
                <Switch checked={isDarkMode} onCheckedChange={onThemeToggle} />
              </div>

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowLangDropdown(!showLangDropdown)}
                  className={`
                    w-full flex items-center justify-between p-2 rounded-lg
                    ${isDarkMode ? 'hover:bg-gray-800/50' : 'hover:bg-gray-100/50'}
                    transition-colors duration-300
                  `}
                >
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span className="text-sm">{t.language}</span>
                  </div>
                  <span className="text-sm">{languages.find(l => l.code === currentLang)?.flag}</span>
                </button>

                <AnimatePresence>
                  {showLangDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`
                        absolute bottom-full mb-2 w-full
                        ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
                        rounded-lg shadow-xl border border-gray-200/10
                        backdrop-blur-xl p-2 space-y-1
                      `}
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            onLanguageChange(lang.code);
                            setShowLangDropdown(false);
                          }}
                          className={`
                            w-full flex items-center gap-3 p-2 rounded-lg text-left
                            ${currentLang === lang.code 
                              ? 'bg-blue-500/20 text-blue-400' 
                              : `${isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-100/50'}`
                            }
                            transition-colors duration-300
                          `}
                        >
                          <span>{lang.flag}</span>
                          <span className="text-sm">{lang.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* Bottom Items */}
          <div className="p-4 space-y-2">
            {bottomItems.map((item) => {
              const Icon = item.icon;
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'logout') {
                      // Handle logout
                      console.log('Logging out...');
                    }
                  }}
                  className={`
                    w-full p-3 rounded-xl text-left transition-all duration-300
                    ${isDarkMode 
                      ? 'hover:bg-gray-800/50 text-gray-300 hover:text-white' 
                      : 'hover:bg-gray-100/50 text-gray-600 hover:text-gray-900'
                    }
                    ${item.id === 'logout' ? 'hover:bg-red-500/20 hover:text-red-400' : ''}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`
                      p-2 rounded-lg 
                      ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'}
                      transition-colors duration-300
                    `}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.span
                          variants={itemVariants}
                          initial="collapsed"
                          animate="expanded"
                          exit="collapsed"
                          className="font-medium"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </>
  );
};
