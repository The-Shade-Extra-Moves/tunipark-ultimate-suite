import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AISidebar } from '@/components/ai-dashboard/AISidebar';
import { Sun, Moon, Globe, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface AIDashboardLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const AIDashboardLayout: React.FC<AIDashboardLayoutProps> = ({
  children,
  currentPage,
  onPageChange
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    }
    return 'light';
  });
  const [language, setLanguage] = useState<'en' | 'ar' | 'fr'>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') as 'en' | 'ar' | 'fr' || 'en';
    }
    return 'en';
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('theme', theme);
    localStorage.setItem('language', language);
  }, [theme, language]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const translations = {
    en: {
      toggleTheme: 'Toggle theme',
      selectLanguage: 'Select language',
      english: 'English',
      arabic: 'العربية',
      french: 'Français'
    },
    ar: {
      toggleTheme: 'تبديل المظهر',
      selectLanguage: 'اختر اللغة',
      english: 'English',
      arabic: 'العربية',
      french: 'Français'
    },
    fr: {
      toggleTheme: 'Basculer le thème',
      selectLanguage: 'Sélectionner la langue',
      english: 'English',
      arabic: 'العربية',
      french: 'Français'
    }
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute top-1/3 right-0 w-64 h-64 bg-gradient-to-r from-green-400/15 to-teal-400/15 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative flex h-screen">
        {/* Sidebar */}
        <AnimatePresence mode="wait">
          {(!isMobile || !sidebarCollapsed) && (
            <motion.div
              initial={{ x: -280, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -280, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className={`${isMobile ? 'fixed inset-y-0 left-0 z-50' : 'relative'}`}
            >
              <AISidebar
                currentPage={currentPage}
                onPageChange={onPageChange}
                isCollapsed={sidebarCollapsed}
                onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Overlay */}
        <AnimatePresence>
          {isMobile && !sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={() => setSidebarCollapsed(true)}
            />
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Header */}
          <motion.header
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/30 flex items-center justify-between px-6 relative z-30"
          >
            {/* Mobile Menu Button */}
            {isMobile && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarCollapsed(false)}
                className="p-2 hover:bg-white/10 dark:hover:bg-gray-700/30"
              >
                <Menu className="w-5 h-5" />
              </Button>
            )}

            {/* Header Title - Dynamic based on current page */}
            <div className="flex-1 flex items-center">
              {!isMobile && (
                <div className="ml-4">
                  <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {currentPage === 'users' && 'Users & Staff Management'}
                    {currentPage === 'overview' && 'AI Overview Dashboard'}
                    {currentPage === 'analytics' && 'Smart Analytics'}
                    {currentPage === 'spaces' && 'Parking Spaces'}
                    {currentPage === 'notifications' && 'Smart Alerts'}
                    {currentPage === 'billing' && 'Billing & Plans'}
                    {currentPage === 'security' && 'Security Center'}
                    {currentPage === 'settings' && 'Settings'}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    TuniPark AI Dashboard 2.0
                  </p>
                </div>
              )}
            </div>

            {/* Header Controls */}
            <div className="flex items-center space-x-2">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="p-2 hover:bg-white/10 dark:hover:bg-gray-700/30 transition-colors"
                title={t.toggleTheme}
              >
                {theme === 'light' ? (
                  <Moon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Sun className="w-4 h-4 text-yellow-500" />
                )}
              </Button>

              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-2 hover:bg-white/10 dark:hover:bg-gray-700/30 transition-colors"
                    title={t.selectLanguage}
                  >
                    <Globe className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-white/20 dark:border-gray-700/30"
                >
                  <DropdownMenuItem 
                    onClick={() => setLanguage('en')}
                    className={`${language === 'en' ? 'bg-blue-50 dark:bg-blue-900/30' : ''} cursor-pointer`}
                  >
                    {t.english}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setLanguage('ar')}
                    className={`${language === 'ar' ? 'bg-blue-50 dark:bg-blue-900/30' : ''} cursor-pointer`}
                  >
                    {t.arabic}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setLanguage('fr')}
                    className={`${language === 'fr' ? 'bg-blue-50 dark:bg-blue-900/30' : ''} cursor-pointer`}
                  >
                    {t.french}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </motion.header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto p-6 relative z-10">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="h-full"
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
};
