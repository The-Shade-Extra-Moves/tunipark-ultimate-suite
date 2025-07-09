import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Globe, 
  Database, 
  Mail,
  Save,
  Check,
  AlertTriangle,
  Zap,
  Key,
  Cloud,
  Smartphone,
  Monitor,
  Lock,
  Unlock,
  RefreshCw,
  Download,
  Trash2,
  Plus,
  Sparkles,
  Brain,
  Eye,
  EyeOff
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface AISettingsProps {
  isDarkMode: boolean;
  currentLang: string;
  isRTL: boolean;
  onLanguageChange: (lang: string) => void;
  onThemeToggle: () => void;
}

export const AISettings = ({ isDarkMode, currentLang, isRTL, onLanguageChange, onThemeToggle }: AISettingsProps) => {
  const [settings, setSettings] = useState({
    // General Settings
    companyName: 'TuniPark AI Solutions',
    timezone: 'GMT+1',
    language: currentLang,
    currency: 'USD',
    
    // Notifications
    emailNotifications: true,
    smsNotifications: false,
    webhookNotifications: true,
    pushNotifications: true,
    
    // Notification Types
    spaceOccupancyAlerts: true,
    deviceOfflineNotifications: true,
    revenueMilestones: true,
    securityEvents: true,
    systemMaintenance: false,
    userActivity: true,
    
    // Security
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordPolicy: 'strong',
    loginAttemptMonitoring: true,
    ipWhitelisting: false,
    auditLogRetention: true,
    
    // System
    autoBackup: true,
    debugMode: false,
    apiRateLimit: 1000,
    aiInsights: true,
    realTimeSync: true,
    
    // Integrations
    webhookUrl: '',
    apiKey: 'pk_live_xxxxxxxxxxxxxxxx',
    
    // AI Settings
    aiPredictionAccuracy: 'high',
    autoOptimization: true,
    smartNotifications: true
  });

  const [activeTab, setActiveTab] = useState('general');
  const [hasChanges, setHasChanges] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);

  // Translations
  const translations = {
    en: {
      settings: 'AI Settings',
      subtitle: 'Configure your TuniPark AI system preferences',
      saveChanges: 'Save Changes',
      general: 'General',
      notifications: 'Notifications',
      security: 'Security',
      system: 'System',
      integrations: 'Integrations',
      ai: 'AI Features',
      
      // General
      generalSettings: 'General Settings',
      companyName: 'Company Name',
      timezone: 'Timezone',
      language: 'Language',
      currency: 'Currency',
      
      // Notifications
      notificationPreferences: 'Notification Preferences',
      emailNotifications: 'Email Notifications',
      emailDesc: 'Receive notifications via email',
      smsNotifications: 'SMS Notifications',
      smsDesc: 'Receive critical alerts via SMS',
      webhookNotifications: 'Webhook Notifications',
      webhookDesc: 'Send events to external systems',
      pushNotifications: 'Push Notifications',
      pushDesc: 'Browser and mobile push notifications',
      notificationTypes: 'Notification Types',
      spaceOccupancy: 'Space occupancy alerts',
      deviceOffline: 'Device offline notifications',
      revenueMilestones: 'Revenue milestones',
      securityEvents: 'Security events',
      systemMaintenance: 'System maintenance',
      userActivity: 'User activity',
      
      // Security
      securitySettings: 'Security Settings',
      twoFactorAuth: 'Two-Factor Authentication',
      twoFactorDesc: 'Add an extra layer of security to your account',
      sessionTimeout: 'Session Timeout (minutes)',
      sessionTimeoutDesc: 'How long before users are automatically logged out',
      passwordPolicy: 'Password Policy',
      securityFeatures: 'Security Features',
      loginMonitoring: 'Login attempt monitoring',
      ipWhitelisting: 'IP address whitelisting',
      auditRetention: 'Audit log retention (90 days)',
      
      // System
      systemConfiguration: 'System Configuration',
      autoBackup: 'Automatic Backups',
      autoBackupDesc: 'Daily automated database backups',
      debugMode: 'Debug Mode',
      debugDesc: 'Enable detailed logging for troubleshooting',
      apiRateLimit: 'API Rate Limit (requests/hour)',
      realTimeSync: 'Real-time Synchronization',
      realTimeSyncDesc: 'Enable live data synchronization',
      systemMaintenance: 'System Maintenance',
      runCleanup: 'Run Database Cleanup',
      clearCache: 'Clear Cache',
      exportLogs: 'Export Logs',
      
      // Integrations
      externalIntegrations: 'External Integrations',
      webhookUrl: 'Webhook URL',
      webhookUrlDesc: 'Endpoint to receive parking events',
      apiKey: 'API Key',
      apiKeyDesc: 'Your unique API key for external integrations',
      availableIntegrations: 'Available Integrations',
      connected: 'Connected',
      connect: 'Connect',
      
      // AI Features
      aiFeatures: 'AI Features',
      aiInsights: 'AI Insights',
      aiInsightsDesc: 'Enable AI-powered analytics and predictions',
      autoOptimization: 'Auto Optimization',
      autoOptimizationDesc: 'Let AI automatically optimize parking operations',
      smartNotifications: 'Smart Notifications',
      smartNotificationsDesc: 'AI-curated important notifications only',
      predictionAccuracy: 'Prediction Accuracy',
      
      // Common
      basic: 'Basic',
      strong: 'Strong',
      strict: 'Strict',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      saved: 'Settings Saved',
      error: 'Error Saving Settings'
    },
    ar: {
      settings: 'إعدادات الذكاء الاصطناعي',
      subtitle: 'تكوين تفضيلات نظام TuniPark AI',
      saveChanges: 'حفظ التغييرات',
      general: 'عام',
      notifications: 'الإشعارات',
      security: 'الأمان',
      system: 'النظام',
      integrations: 'التكاملات',
      ai: 'ميزات الذكاء الاصطناعي',
      
      // General
      generalSettings: 'الإعدادات العامة',
      companyName: 'اسم الشركة',
      timezone: 'المنطقة الزمنية',
      language: 'اللغة',
      currency: 'العملة',
      
      // Continue with other translations...
      saved: 'تم حفظ الإعدادات',
      error: 'خطأ في حفظ الإعدادات'
    },
    fr: {
      settings: 'Paramètres IA',
      subtitle: 'Configurez vos préférences système TuniPark IA',
      saveChanges: 'Enregistrer les Modifications',
      general: 'Général',
      notifications: 'Notifications',
      security: 'Sécurité',
      system: 'Système',
      integrations: 'Intégrations',
      ai: 'Fonctionnalités IA',
      
      saved: 'Paramètres Enregistrés',
      error: 'Erreur lors de l\'enregistrement'
    },
    de: {
      settings: 'KI-Einstellungen',
      subtitle: 'Konfigurieren Sie Ihre TuniPark KI-Systemeinstellungen',
      saveChanges: 'Änderungen Speichern',
      general: 'Allgemein',
      notifications: 'Benachrichtigungen',
      security: 'Sicherheit',
      system: 'System',
      integrations: 'Integrationen',
      ai: 'KI-Funktionen',
      
      saved: 'Einstellungen Gespeichert',
      error: 'Fehler beim Speichern'
    }
  };

  const t = translations[currentLang as keyof typeof translations] || translations.en;

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
    
    // Handle special cases
    if (key === 'language') {
      onLanguageChange(value);
    }
  };

  const handleSave = () => {
    // Simulate API call
    setTimeout(() => {
      setHasChanges(false);
      // Show success notification
    }, 1000);
  };

  const integrations = [
    { 
      name: 'Stripe', 
      description: 'Payment processing', 
      connected: true,
      icon: '💳',
      color: 'from-blue-500 to-purple-600'
    },
    { 
      name: 'Twilio', 
      description: 'SMS notifications', 
      connected: false,
      icon: '📱',
      color: 'from-red-500 to-pink-600'
    },
    { 
      name: 'Slack', 
      description: 'Team notifications', 
      connected: false,
      icon: '💬',
      color: 'from-green-500 to-emerald-600'
    },
    { 
      name: 'Google Analytics', 
      description: 'Usage tracking', 
      connected: true,
      icon: '📊',
      color: 'from-orange-500 to-yellow-600'
    },
    { 
      name: 'AI Vision API', 
      description: 'Advanced computer vision', 
      connected: true,
      icon: '👁️',
      color: 'from-purple-500 to-indigo-600'
    },
    { 
      name: 'IoT Platform', 
      description: 'Device management', 
      connected: true,
      icon: '⚡',
      color: 'from-cyan-500 to-blue-600'
    }
  ];

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
            {t.settings}
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {t.subtitle}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Button
            onClick={handleSave}
            disabled={!hasChanges}
            className={`
              px-6 py-3 text-base font-semibold
              ${hasChanges 
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700' 
                : 'bg-gray-400 cursor-not-allowed'
              }
              text-white shadow-lg hover:shadow-xl transition-all duration-300
            `}
          >
            <Save className="w-5 h-5 mr-2" />
            {t.saveChanges}
          </Button>
        </motion.div>
      </motion.div>

      {/* Settings Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`
            grid w-full grid-cols-3 lg:grid-cols-6 gap-2 p-2 rounded-2xl
            ${isDarkMode 
              ? 'bg-gray-900/50 border-gray-700/50' 
              : 'bg-white/50 border-gray-200/50'
            }
            backdrop-blur-xl border
          `}>
            {[
              { value: 'general', icon: SettingsIcon, label: t.general },
              { value: 'notifications', icon: Bell, label: t.notifications },
              { value: 'security', icon: Shield, label: t.security },
              { value: 'system', icon: Database, label: t.system },
              { value: 'integrations', icon: Globe, label: t.integrations },
              { value: 'ai', icon: Brain, label: t.ai }
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
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general" className="mt-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
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
                      <SettingsIcon className="w-5 h-5 text-white" />
                    </div>
                    {t.generalSettings}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="companyName" className="text-base font-medium">
                        {t.companyName}
                      </Label>
                      <Input
                        id="companyName"
                        value={settings.companyName}
                        onChange={(e) => handleSettingChange('companyName', e.target.value)}
                        className={`
                          mt-2 h-12
                          ${isDarkMode 
                            ? 'bg-gray-800/50 border-gray-700/50 focus:border-blue-500' 
                            : 'bg-white/50 border-gray-200/50 focus:border-blue-500'
                          }
                          backdrop-blur-sm
                        `}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="timezone" className="text-base font-medium">
                        {t.timezone}
                      </Label>
                      <Select 
                        value={settings.timezone} 
                        onValueChange={(value) => handleSettingChange('timezone', value)}
                      >
                        <SelectTrigger className={`
                          mt-2 h-12
                          ${isDarkMode 
                            ? 'bg-gray-800/50 border-gray-700/50' 
                            : 'bg-white/50 border-gray-200/50'
                          }
                          backdrop-blur-sm
                        `}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="GMT-8">GMT-8 (Pacific)</SelectItem>
                          <SelectItem value="GMT-5">GMT-5 (Eastern)</SelectItem>
                          <SelectItem value="GMT+0">GMT+0 (UTC)</SelectItem>
                          <SelectItem value="GMT+1">GMT+1 (Central European)</SelectItem>
                          <SelectItem value="GMT+2">GMT+2 (Eastern European)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="language" className="text-base font-medium">
                        {t.language}
                      </Label>
                      <Select 
                        value={settings.language} 
                        onValueChange={(value) => handleSettingChange('language', value)}
                      >
                        <SelectTrigger className={`
                          mt-2 h-12
                          ${isDarkMode 
                            ? 'bg-gray-800/50 border-gray-700/50' 
                            : 'bg-white/50 border-gray-200/50'
                          }
                          backdrop-blur-sm
                        `}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">🇺🇸 English</SelectItem>
                          <SelectItem value="fr">🇫🇷 Français</SelectItem>
                          <SelectItem value="ar">🇹🇳 العربية</SelectItem>
                          <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="currency" className="text-base font-medium">
                        {t.currency}
                      </Label>
                      <Select 
                        value={settings.currency} 
                        onValueChange={(value) => handleSettingChange('currency', value)}
                      >
                        <SelectTrigger className={`
                          mt-2 h-12
                          ${isDarkMode 
                            ? 'bg-gray-800/50 border-gray-700/50' 
                            : 'bg-white/50 border-gray-200/50'
                          }
                          backdrop-blur-sm
                        `}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">💵 USD ($)</SelectItem>
                          <SelectItem value="EUR">💶 EUR (€)</SelectItem>
                          <SelectItem value="TND">🇹🇳 TND (د.ت)</SelectItem>
                          <SelectItem value="GBP">💷 GBP (£)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="mt-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <Card className={`
                ${isDarkMode 
                  ? 'bg-gray-900/50 border-gray-700/50' 
                  : 'bg-white/50 border-gray-200/50'
                }
                backdrop-blur-xl
              `}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-600">
                      <Bell className="w-5 h-5 text-white" />
                    </div>
                    {t.notificationPreferences}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Notification Toggles */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { key: 'emailNotifications', label: t.emailNotifications, desc: t.emailDesc, icon: Mail },
                      { key: 'smsNotifications', label: t.smsNotifications, desc: t.smsDesc, icon: Smartphone },
                      { key: 'webhookNotifications', label: t.webhookNotifications, desc: t.webhookDesc, icon: Globe },
                      { key: 'pushNotifications', label: t.pushNotifications, desc: t.pushDesc, icon: Bell }
                    ].map((notification) => {
                      const Icon = notification.icon;
                      return (
                        <div 
                          key={notification.key}
                          className={`
                            p-4 rounded-xl border transition-all duration-300
                            ${isDarkMode 
                              ? 'bg-gray-800/30 border-gray-700/30 hover:bg-gray-700/30' 
                              : 'bg-gray-50/30 border-gray-200/30 hover:bg-gray-100/30'
                            }
                            backdrop-blur-sm
                          `}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`
                                p-2 rounded-lg 
                                ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'}
                              `}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <div>
                                <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                  {notification.label}
                                </h4>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  {notification.desc}
                                </p>
                              </div>
                            </div>
                            <Switch
                              checked={settings[notification.key as keyof typeof settings] as boolean}
                              onCheckedChange={(checked) => handleSettingChange(notification.key, checked)}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Notification Types */}
                  <div className="border-t border-gray-200/10 pt-6">
                    <h4 className={`font-semibold text-lg mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {t.notificationTypes}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { key: 'spaceOccupancyAlerts', label: t.spaceOccupancy },
                        { key: 'deviceOfflineNotifications', label: t.deviceOffline },
                        { key: 'revenueMilestones', label: t.revenueMilestones },
                        { key: 'securityEvents', label: t.securityEvents },
                        { key: 'systemMaintenance', label: t.systemMaintenance },
                        { key: 'userActivity', label: t.userActivity }
                      ].map((type) => (
                        <div key={type.key} className="flex items-center gap-3">
                          <Switch
                            checked={settings[type.key as keyof typeof settings] as boolean}
                            onCheckedChange={(checked) => handleSettingChange(type.key, checked)}
                          />
                          <label className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {type.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="mt-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={`
                ${isDarkMode 
                  ? 'bg-gray-900/50 border-gray-700/50' 
                  : 'bg-white/50 border-gray-200/50'
                }
                backdrop-blur-xl
              `}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-600">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    {t.securitySettings}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Security Controls */}
                  <div className="space-y-6">
                    <div className={`
                      p-4 rounded-xl border transition-all duration-300
                      ${isDarkMode 
                        ? 'bg-gray-800/30 border-gray-700/30' 
                        : 'bg-gray-50/30 border-gray-200/30'
                      }
                      backdrop-blur-sm
                    `}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`
                            p-2 rounded-lg 
                            ${settings.twoFactorAuth 
                              ? 'bg-green-500/20 text-green-400' 
                              : `${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'}`
                            }
                          `}>
                            {settings.twoFactorAuth ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                          </div>
                          <div>
                            <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {t.twoFactorAuth}
                            </h4>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {t.twoFactorDesc}
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={settings.twoFactorAuth}
                          onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="sessionTimeout" className="text-base font-medium">
                          {t.sessionTimeout}
                        </Label>
                        <Input
                          id="sessionTimeout"
                          type="number"
                          value={settings.sessionTimeout}
                          onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                          className={`
                            mt-2 h-12
                            ${isDarkMode 
                              ? 'bg-gray-800/50 border-gray-700/50 focus:border-red-500' 
                              : 'bg-white/50 border-gray-200/50 focus:border-red-500'
                            }
                            backdrop-blur-sm
                          `}
                        />
                        <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          {t.sessionTimeoutDesc}
                        </p>
                      </div>
                      
                      <div>
                        <Label htmlFor="passwordPolicy" className="text-base font-medium">
                          {t.passwordPolicy}
                        </Label>
                        <Select 
                          value={settings.passwordPolicy} 
                          onValueChange={(value) => handleSettingChange('passwordPolicy', value)}
                        >
                          <SelectTrigger className={`
                            mt-2 h-12
                            ${isDarkMode 
                              ? 'bg-gray-800/50 border-gray-700/50' 
                              : 'bg-white/50 border-gray-200/50'
                            }
                            backdrop-blur-sm
                          `}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="basic">{t.basic} (8+ characters)</SelectItem>
                            <SelectItem value="strong">{t.strong} (12+ chars, mixed case, numbers)</SelectItem>
                            <SelectItem value="strict">{t.strict} (16+ chars, symbols required)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Security Features */}
                    <div className="border-t border-gray-200/10 pt-6">
                      <h4 className={`font-semibold text-lg mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {t.securityFeatures}
                      </h4>
                      <div className="space-y-3">
                        {[
                          { key: 'loginAttemptMonitoring', label: t.loginMonitoring },
                          { key: 'ipWhitelisting', label: t.ipWhitelisting },
                          { key: 'auditLogRetention', label: t.auditRetention }
                        ].map((feature) => (
                          <div key={feature.key} className="flex items-center gap-3">
                            <Switch
                              checked={settings[feature.key as keyof typeof settings] as boolean}
                              onCheckedChange={(checked) => handleSettingChange(feature.key, checked)}
                            />
                            <label className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              {feature.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system" className="mt-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
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
                      <Database className="w-5 h-5 text-white" />
                    </div>
                    {t.systemConfiguration}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* System Controls */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { 
                        key: 'autoBackup', 
                        label: t.autoBackup, 
                        desc: t.autoBackupDesc, 
                        icon: Database 
                      },
                      { 
                        key: 'debugMode', 
                        label: t.debugMode, 
                        desc: t.debugDesc, 
                        icon: AlertTriangle 
                      },
                      { 
                        key: 'realTimeSync', 
                        label: t.realTimeSync, 
                        desc: t.realTimeSyncDesc, 
                        icon: RefreshCw 
                      }
                    ].map((control) => {
                      const Icon = control.icon;
                      return (
                        <div 
                          key={control.key}
                          className={`
                            p-4 rounded-xl border transition-all duration-300
                            ${isDarkMode 
                              ? 'bg-gray-800/30 border-gray-700/30 hover:bg-gray-700/30' 
                              : 'bg-gray-50/30 border-gray-200/30 hover:bg-gray-100/30'
                            }
                            backdrop-blur-sm
                          `}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`
                                p-2 rounded-lg 
                                ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'}
                              `}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <div>
                                <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                  {control.label}
                                </h4>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  {control.desc}
                                </p>
                              </div>
                            </div>
                            <Switch
                              checked={settings[control.key as keyof typeof settings] as boolean}
                              onCheckedChange={(checked) => handleSettingChange(control.key, checked)}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div>
                    <Label htmlFor="apiRateLimit" className="text-base font-medium">
                      {t.apiRateLimit}
                    </Label>
                    <Input
                      id="apiRateLimit"
                      type="number"
                      value={settings.apiRateLimit}
                      onChange={(e) => handleSettingChange('apiRateLimit', parseInt(e.target.value))}
                      className={`
                        mt-2 h-12
                        ${isDarkMode 
                          ? 'bg-gray-800/50 border-gray-700/50 focus:border-green-500' 
                          : 'bg-white/50 border-gray-200/50 focus:border-green-500'
                        }
                        backdrop-blur-sm
                      `}
                    />
                  </div>

                  {/* System Maintenance */}
                  <div className="border-t border-gray-200/10 pt-6">
                    <h4 className={`font-semibold text-lg mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {t.systemMaintenance}
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="outline" className="flex items-center gap-2">
                        <Database className="w-4 h-4" />
                        {t.runCleanup}
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Trash2 className="w-4 h-4" />
                        {t.clearCache}
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        {t.exportLogs}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations" className="mt-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <Card className={`
                ${isDarkMode 
                  ? 'bg-gray-900/50 border-gray-700/50' 
                  : 'bg-white/50 border-gray-200/50'
                }
                backdrop-blur-xl
              `}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    {t.externalIntegrations}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="webhookUrl" className="text-base font-medium">
                        {t.webhookUrl}
                      </Label>
                      <Input
                        id="webhookUrl"
                        value={settings.webhookUrl}
                        onChange={(e) => handleSettingChange('webhookUrl', e.target.value)}
                        placeholder="https://your-app.com/webhook"
                        className={`
                          mt-2 h-12
                          ${isDarkMode 
                            ? 'bg-gray-800/50 border-gray-700/50 focus:border-blue-500' 
                            : 'bg-white/50 border-gray-200/50 focus:border-blue-500'
                          }
                          backdrop-blur-sm
                        `}
                      />
                      <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        {t.webhookUrlDesc}
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="apiKey" className="text-base font-medium">
                        {t.apiKey}
                      </Label>
                      <div className="relative mt-2">
                        <Input
                          id="apiKey"
                          value={settings.apiKey}
                          onChange={(e) => handleSettingChange('apiKey', e.target.value)}
                          type={showApiKey ? "text" : "password"}
                          className={`
                            h-12 pr-12
                            ${isDarkMode 
                              ? 'bg-gray-800/50 border-gray-700/50 focus:border-blue-500' 
                              : 'bg-white/50 border-gray-200/50 focus:border-blue-500'
                            }
                            backdrop-blur-sm
                          `}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-12 w-12"
                          onClick={() => setShowApiKey(!showApiKey)}
                        >
                          {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                      <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        {t.apiKeyDesc}
                      </p>
                    </div>
                  </div>

                  {/* Available Integrations */}
                  <div className="border-t border-gray-200/10 pt-6">
                    <h4 className={`font-semibold text-lg mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {t.availableIntegrations}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      {integrations.map((integration, index) => (
                        <motion.div
                          key={integration.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`
                            p-4 border rounded-xl transition-all duration-300 hover:scale-105
                            ${isDarkMode 
                              ? 'bg-gray-800/30 border-gray-700/30 hover:bg-gray-700/30' 
                              : 'bg-gray-50/30 border-gray-200/30 hover:bg-gray-100/30'
                            }
                            backdrop-blur-sm
                          `}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className={`
                                w-10 h-10 rounded-lg bg-gradient-to-r ${integration.color}
                                flex items-center justify-center text-white text-lg
                              `}>
                                {integration.icon}
                              </div>
                              <div>
                                <h5 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                  {integration.name}
                                </h5>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  {integration.description}
                                </p>
                              </div>
                            </div>
                          </div>
                          <Button 
                            variant={integration.connected ? "outline" : "default"} 
                            size="sm" 
                            className="w-full"
                          >
                            {integration.connected ? (
                              <>
                                <Check className="w-4 h-4 mr-2" />
                                {t.connected}
                              </>
                            ) : (
                              <>
                                <Plus className="w-4 h-4 mr-2" />
                                {t.connect}
                              </>
                            )}
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* AI Features Tab */}
          <TabsContent value="ai" className="mt-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
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
                    {t.aiFeatures}
                    <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border-0">
                      <Sparkles className="w-3 h-3 mr-1" />
                      AI-Powered
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* AI Controls */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { 
                        key: 'aiInsights', 
                        label: t.aiInsights, 
                        desc: t.aiInsightsDesc, 
                        icon: Brain 
                      },
                      { 
                        key: 'autoOptimization', 
                        label: t.autoOptimization, 
                        desc: t.autoOptimizationDesc, 
                        icon: Zap 
                      },
                      { 
                        key: 'smartNotifications', 
                        label: t.smartNotifications, 
                        desc: t.smartNotificationsDesc, 
                        icon: Bell 
                      }
                    ].map((control) => {
                      const Icon = control.icon;
                      return (
                        <div 
                          key={control.key}
                          className={`
                            p-4 rounded-xl border transition-all duration-300
                            ${isDarkMode 
                              ? 'bg-gray-800/30 border-gray-700/30 hover:bg-gray-700/30' 
                              : 'bg-white/30 border-gray-200/30 hover:bg-white/50'
                            }
                            backdrop-blur-sm
                          `}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`
                                p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20
                                ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}
                              `}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <div>
                                <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                  {control.label}
                                </h4>
                                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  {control.desc}
                                </p>
                              </div>
                            </div>
                            <Switch
                              checked={settings[control.key as keyof typeof settings] as boolean}
                              onCheckedChange={(checked) => handleSettingChange(control.key, checked)}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div>
                    <Label htmlFor="aiPredictionAccuracy" className="text-base font-medium">
                      {t.predictionAccuracy}
                    </Label>
                    <Select 
                      value={settings.aiPredictionAccuracy} 
                      onValueChange={(value) => handleSettingChange('aiPredictionAccuracy', value)}
                    >
                      <SelectTrigger className={`
                        mt-2 h-12
                        ${isDarkMode 
                          ? 'bg-gray-800/50 border-gray-700/50' 
                          : 'bg-white/50 border-gray-200/50'
                        }
                        backdrop-blur-sm
                      `}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">🎯 {t.high} (More Processing)</SelectItem>
                        <SelectItem value="medium">⚖️ {t.medium} (Balanced)</SelectItem>
                        <SelectItem value="low">⚡ {t.low} (Faster)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};
