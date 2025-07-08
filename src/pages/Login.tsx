import { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Moon, Sun, Globe, ChevronDown, AlertCircle, CheckCircle2, Keyboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ar', name: 'العربية', flag: '🇹🇳' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
];

const translations = {
  en: {
    welcomeBack: "Welcome back",
    signInDescription: "Sign in to your account to continue managing your parking spaces",
    email: "Email",
    password: "Password",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    signIn: "Sign in",
    signingIn: "Signing in...",
    orContinueWith: "Or continue with",
    google: "Google",
    facebook: "Facebook",
    microsoft: "Microsoft",
    noAccount: "Don't have an account?",
    signUp: "Sign up",
    backToHomepage: "Back to homepage",
    enterEmail: "Enter your email",
    enterPassword: "Enter your password",
    keyboardShortcuts: "Use Ctrl+Enter to sign in quickly",
    invalidEmail: "Please enter a valid email address",
    passwordRequired: "Password is required",
    loginError: "Invalid email or password. Please try again.",
    loginSuccess: "Welcome back! Redirecting to dashboard..."
  },
  ar: {
    welcomeBack: "مرحباً بعودتك",
    signInDescription: "قم بتسجيل الدخول إلى حسابك لمواصلة إدارة مواقف السيارات الخاصة بك",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    rememberMe: "تذكرني",
    forgotPassword: "نسيت كلمة المرور؟",
    signIn: "تسجيل الدخول",
    signingIn: "جاري تسجيل الدخول...",
    orContinueWith: "أو متابعة باستخدام",
    google: "جوجل",
    facebook: "فيسبوك",
    microsoft: "مايكروسوفت",
    noAccount: "ليس لديك حساب؟",
    signUp: "إنشاء حساب",
    backToHomepage: "العودة للصفحة الرئيسية",
    enterEmail: "أدخل بريدك الإلكتروني",
    enterPassword: "أدخل كلمة المرور",
    keyboardShortcuts: "استخدم Ctrl+Enter لتسجيل الدخول بسرعة",
    invalidEmail: "يرجى إدخال عنوان بريد إلكتروني صحيح",
    passwordRequired: "كلمة المرور مطلوبة",
    loginError: "بريد إلكتروني أو كلمة مرور غير صحيحة. يرجى المحاولة مرة أخرى.",
    loginSuccess: "مرحباً بعودتك! جاري التوجيه إلى لوحة التحكم..."
  },
  fr: {
    welcomeBack: "Bon retour",
    signInDescription: "Connectez-vous à votre compte pour continuer à gérer vos places de parking",
    email: "E-mail",
    password: "Mot de passe",
    rememberMe: "Se souvenir de moi",
    forgotPassword: "Mot de passe oublié ?",
    signIn: "Se connecter",
    signingIn: "Connexion en cours...",
    orContinueWith: "Ou continuer avec",
    google: "Google",
    facebook: "Facebook",
    microsoft: "Microsoft",
    noAccount: "Vous n'avez pas de compte ?",
    signUp: "S'inscrire",
    backToHomepage: "Retour à l'accueil",
    enterEmail: "Entrez votre e-mail",
    enterPassword: "Entrez votre mot de passe",
    keyboardShortcuts: "Utilisez Ctrl+Entrée pour vous connecter rapidement",
    invalidEmail: "Veuillez entrer une adresse e-mail valide",
    passwordRequired: "Le mot de passe est requis",
    loginError: "E-mail ou mot de passe invalide. Veuillez réessayer.",
    loginSuccess: "Bon retour ! Redirection vers le tableau de bord..."
  },
  de: {
    welcomeBack: "Willkommen zurück",
    signInDescription: "Melden Sie sich in Ihrem Konto an, um Ihre Parkplätze weiter zu verwalten",
    email: "E-Mail",
    password: "Passwort",
    rememberMe: "Angemeldet bleiben",
    forgotPassword: "Passwort vergessen?",
    signIn: "Anmelden",
    signingIn: "Anmeldung läuft...",
    orContinueWith: "Oder fortfahren mit",
    google: "Google",
    facebook: "Facebook",
    microsoft: "Microsoft",
    noAccount: "Noch kein Konto?",
    signUp: "Registrieren",
    backToHomepage: "Zurück zur Startseite",
    enterEmail: "E-Mail eingeben",
    enterPassword: "Passwort eingeben",
    keyboardShortcuts: "Verwenden Sie Ctrl+Enter für schnelle Anmeldung",
    invalidEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein",
    passwordRequired: "Passwort ist erforderlich",
    loginError: "Ungültige E-Mail oder Passwort. Bitte versuchen Sie es erneut.",
    loginSuccess: "Willkommen zurück! Weiterleitung zum Dashboard..."
  }
};

const Login = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [showMessage, setShowMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  
  // Theme and Language State
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
             (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  const [currentLang, setCurrentLang] = useState('en');
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showKeyboardHint, setShowKeyboardHint] = useState(false);

  const t = translations[currentLang as keyof typeof translations];
  const isRTL = currentLang === 'ar';

  // Theme management
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // RTL management
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, [currentLang, isRTL]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        handleSubmit(e as any);
      }
      if (e.key === 'F1') {
        e.preventDefault();
        setShowKeyboardHint(!showKeyboardHint);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showKeyboardHint, formData]);

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {};

    if (!formData.email) {
      newErrors.email = t.invalidEmail;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.invalidEmail;
    }

    if (!formData.password) {
      newErrors.password = t.passwordRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setShowMessage(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate random login success/failure for demo
      const success = Math.random() > 0.3;
      
      if (success) {
        setShowMessage({ type: 'success', text: t.loginSuccess });
        // Store login state
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', formData.email);
        
        // Redirect after success animation
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 2000);
      } else {
        setShowMessage({ type: 'error', text: t.loginError });
      }
    } catch (error) {
      setShowMessage({ type: 'error', text: t.loginError });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof LoginFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    if (showMessage) {
      setShowMessage(null);
    }
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    // Simulate social login
    setTimeout(() => {
      setShowMessage({ type: 'success', text: `${t.loginSuccess} (${provider})` });
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
    }, 1000);
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${isRTL ? 'font-arabic' : ''} ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    } relative overflow-hidden flex items-center justify-center px-4`}>
      
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className={`absolute top-1/4 ${isRTL ? 'right-1/4' : 'left-1/4'} w-96 h-96 ${
            isDark ? 'bg-purple-500/20' : 'bg-blue-400/20'
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
            isDark ? 'bg-blue-500/20' : 'bg-purple-400/20'
          } rounded-full blur-3xl`}
        />
      </div>

      {/* Language and Theme Controls */}
      <div className={`fixed top-6 ${isRTL ? 'left-6' : 'right-6'} z-50 flex items-center gap-3`}>
        {/* Language Selector */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowLangDropdown(!showLangDropdown)}
            className={`${
              isDark 
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
                  isDark 
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
                        ? isDark ? 'bg-purple-600/30 text-purple-200' : 'bg-blue-100 text-blue-800'
                        : isDark ? 'hover:bg-gray-700/50 text-gray-200' : 'hover:bg-gray-50 text-gray-700'
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
          onClick={() => setIsDark(!isDark)}
          className={`${
            isDark 
              ? 'bg-white/10 hover:bg-white/20 text-white border-white/20' 
              : 'bg-black/10 hover:bg-black/20 text-black border-black/20'
          } backdrop-blur-lg rounded-xl border transition-all duration-300`}
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>
      </div>

      {/* Keyboard Shortcuts Hint */}
      <AnimatePresence>
        {showKeyboardHint && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-20 ${isRTL ? 'right-6' : 'left-6'} ${
              isDark ? 'bg-gray-800/90 text-gray-200' : 'bg-white/90 text-gray-800'
            } backdrop-blur-xl rounded-xl p-4 shadow-xl border ${
              isDark ? 'border-gray-700/50' : 'border-gray-200/50'
            } max-w-xs z-40`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Keyboard className="w-4 h-4" />
              <span className="font-medium text-sm">Keyboard Shortcuts</span>
            </div>
            <div className="text-xs space-y-1 text-muted-foreground">
              <div>Ctrl+Enter: Quick sign in</div>
              <div>F1: Toggle this help</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className={`${
          isDark 
            ? 'bg-gray-800/40 border-gray-700/50' 
            : 'bg-white/70 border-white/20'
        } backdrop-blur-xl border shadow-2xl overflow-hidden relative`}>
          
          {/* Glassmorphic overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          
          <CardHeader className="text-center pb-8 relative">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <div className={`w-12 h-12 ${
                isDark 
                  ? 'bg-gradient-to-br from-purple-500 to-blue-500' 
                  : 'bg-gradient-to-br from-blue-500 to-purple-500'
              } rounded-xl flex items-center justify-center shadow-lg`}>
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-800'
              }`}>TuniPark</span>
            </motion.div>
            
            <CardTitle className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
              {t.welcomeBack}
            </CardTitle>
            <CardDescription className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mt-2`}>
              {t.signInDescription}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 relative">
            {/* Status Message */}
            <AnimatePresence>
              {showMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex items-center gap-2 p-3 rounded-lg text-sm ${
                    showMessage.type === 'error'
                      ? isDark ? 'bg-red-900/20 text-red-300 border border-red-800/30' : 'bg-red-50 text-red-700 border border-red-200'
                      : isDark ? 'bg-green-900/20 text-green-300 border border-green-800/30' : 'bg-green-50 text-green-700 border border-green-200'
                  }`}
                >
                  {showMessage.type === 'error' ? (
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  )}
                  <span>{showMessage.text}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  {t.email}
                </Label>
                <div className="relative">
                  <Mail className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <Input
                    id="email"
                    type="email"
                    placeholder={t.enterEmail}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`${isRTL ? 'pr-10 text-right' : 'pl-10'} ${
                      isDark 
                        ? 'bg-gray-900/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-purple-400' 
                        : 'bg-white/50 border-gray-300/50 text-gray-900 placeholder:text-gray-500 focus:border-blue-400'
                    } backdrop-blur-sm transition-all duration-300 focus:shadow-lg ${
                      errors.email ? 'border-red-500 focus:border-red-500' : ''
                    }`}
                    required
                  />
                </div>
                {errors.email && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-red-500 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </motion.span>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  {t.password}
                </Label>
                <div className="relative">
                  <Lock className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t.enterPassword}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`${isRTL ? 'pr-10 pl-10 text-right' : 'pl-10 pr-10'} ${
                      isDark 
                        ? 'bg-gray-900/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-purple-400' 
                        : 'bg-white/50 border-gray-300/50 text-gray-900 placeholder:text-gray-500 focus:border-blue-400'
                    } backdrop-blur-sm transition-all duration-300 focus:shadow-lg ${
                      errors.password ? 'border-red-500 focus:border-red-500' : ''
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 ${
                      isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
                    } transition-colors`}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-red-500 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.password}
                  </motion.span>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : ''} justify-between`}>
                <label className={`flex items-center gap-2 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <input 
                    type="checkbox" 
                    checked={formData.rememberMe}
                    onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                    className={`w-4 h-4 rounded border-2 ${
                      isDark 
                        ? 'border-gray-600 bg-gray-800 checked:bg-purple-500 checked:border-purple-500' 
                        : 'border-gray-300 bg-white checked:bg-blue-500 checked:border-blue-500'
                    } focus:ring-2 focus:ring-offset-2 ${
                      isDark ? 'focus:ring-purple-500' : 'focus:ring-blue-500'
                    } transition-all duration-200`}
                  />
                  <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>{t.rememberMe}</span>
                </label>
                <Link 
                  to="/forgot-password" 
                  className={`text-sm ${
                    isDark ? 'text-purple-400 hover:text-purple-300' : 'text-blue-600 hover:text-blue-700'
                  } transition-colors`}
                >
                  {t.forgotPassword}
                </Link>
              </div>

              {/* Keyboard Shortcut Hint */}
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} text-center`}>
                {t.keyboardShortcuts}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className={`w-full ${
                  isDark 
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                } text-white shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden`}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    {t.signingIn}
                  </div>
                ) : (
                  <>
                    {t.signIn}
                    <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2 group-hover:-translate-x-1' : 'ml-2 group-hover:translate-x-1'} transition-transform`} />
                  </>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${isDark ? 'border-gray-600' : 'border-gray-300'}`}></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className={`${
                  isDark ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'
                } px-2`}>
                  {t.orContinueWith}
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-3 gap-3">
              <Button 
                variant="outline" 
                type="button"
                onClick={() => handleSocialLogin('Google')}
                disabled={isLoading}
                className={`${
                  isDark 
                    ? 'border-gray-600 bg-gray-800/50 hover:bg-gray-700/50 text-gray-200' 
                    : 'border-gray-300 bg-white/50 hover:bg-gray-50 text-gray-700'
                } backdrop-blur-sm transition-all duration-300 hover:shadow-lg`}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </Button>
              <Button 
                variant="outline" 
                type="button"
                onClick={() => handleSocialLogin('Facebook')}
                disabled={isLoading}
                className={`${
                  isDark 
                    ? 'border-gray-600 bg-gray-800/50 hover:bg-gray-700/50 text-gray-200' 
                    : 'border-gray-300 bg-white/50 hover:bg-gray-50 text-gray-700'
                } backdrop-blur-sm transition-all duration-300 hover:shadow-lg`}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </Button>
              <Button 
                variant="outline" 
                type="button"
                onClick={() => handleSocialLogin('Microsoft')}
                disabled={isLoading}
                className={`${
                  isDark 
                    ? 'border-gray-600 bg-gray-800/50 hover:bg-gray-700/50 text-gray-200' 
                    : 'border-gray-300 bg-white/50 hover:bg-gray-50 text-gray-700'
                } backdrop-blur-sm transition-all duration-300 hover:shadow-lg`}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"/>
                </svg>
              </Button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center text-sm">
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>{t.noAccount} </span>
              <Link 
                to="/register" 
                className={`${
                  isDark ? 'text-purple-400 hover:text-purple-300' : 'text-blue-600 hover:text-blue-700'
                } transition-colors font-medium`}
              >
                {t.signUp}
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Back to Homepage */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-6"
        >
          <Link 
            to="/" 
            className={`text-sm ${
              isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'
            } transition-colors hover:underline`}
          >
            ← {t.backToHomepage}
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
