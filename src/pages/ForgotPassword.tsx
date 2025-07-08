import { useState, useEffect } from 'react';
import { Mail, ArrowRight, ArrowLeft, Send, CheckCircle2, Clock, RefreshCw, Key, Eye, EyeOff, Shield, Moon, Sun, Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

type Step = 'email' | 'sent' | 'reset' | 'success';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ar', name: 'العربية', flag: '🇹🇳' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
];

const translations = {
  en: {
    forgotPassword: "Forgot your password?",
    enterEmailDesc: "Enter your email address and we'll send you a link to reset your password",
    emailAddress: "Email Address",
    enterEmail: "Enter your email address",
    sendResetLink: "Send Reset Link",
    backToLogin: "Back to Login",
    emailSent: "Check your email!",
    emailSentDesc: "We've sent a password reset link to",
    didntReceive: "Didn't receive the email?",
    resendLink: "Resend link",
    openEmailApp: "Open Email App",
    resetPassword: "Reset your password",
    resetPasswordDesc: "Enter your new password below",
    newPassword: "New Password",
    confirmPassword: "Confirm Password",
    enterNewPassword: "Enter your new password",
    confirmNewPassword: "Confirm your new password",
    updatePassword: "Update Password",
    passwordReset: "Password reset successfully!",
    passwordResetDesc: "Your password has been updated. You can now sign in with your new password.",
    signIn: "Sign In",
    invalidEmail: "Please enter a valid email address",
    passwordTooShort: "Password must be at least 8 characters",
    passwordsNoMatch: "Passwords do not match",
    emailNotFound: "No account found with this email address",
    linkExpired: "This reset link has expired. Please request a new one.",
    networkError: "Network error. Please try again.",
    resendCooldown: "Please wait before requesting another link",
    passwordStrength: "Password Strength",
    weak: "Weak",
    fair: "Fair",
    good: "Good",
    strong: "Strong",
    veryStrong: "Very Strong"
  },
  ar: {
    forgotPassword: "نسيت كلمة المرور؟",
    enterEmailDesc: "أدخل عنوان بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور",
    emailAddress: "عنوان البريد الإلكتروني",
    enterEmail: "أدخل عنوان بريدك الإلكتروني",
    sendResetLink: "إرسال رابط الإعادة",
    backToLogin: "العودة لتسجيل الدخول",
    emailSent: "تحقق من بريدك الإلكتروني!",
    emailSentDesc: "لقد أرسلنا رابط إعادة تعيين كلمة المرور إلى",
    didntReceive: "لم تستلم البريد الإلكتروني؟",
    resendLink: "إعادة الإرسال",
    openEmailApp: "فتح تطبيق البريد",
    resetPassword: "إعادة تعيين كلمة المرور",
    resetPasswordDesc: "أدخل كلمة المرور الجديدة أدناه",
    newPassword: "كلمة المرور الجديدة",
    confirmPassword: "تأكيد كلمة المرور",
    enterNewPassword: "أدخل كلمة المرور الجديدة",
    confirmNewPassword: "أكد كلمة المرور الجديدة",
    updatePassword: "تحديث كلمة المرور",
    passwordReset: "تم إعادة تعيين كلمة المرور بنجاح!",
    passwordResetDesc: "تم تحديث كلمة المرور الخاصة بك. يمكنك الآن تسجيل الدخول بكلمة المرور الجديدة.",
    signIn: "تسجيل الدخول",
    invalidEmail: "يرجى إدخال عنوان بريد إلكتروني صحيح",
    passwordTooShort: "يجب أن تكون كلمة المرور 8 أحرف على الأقل",
    passwordsNoMatch: "كلمات المرور غير متطابقة",
    emailNotFound: "لم يتم العثور على حساب بهذا البريد الإلكتروني",
    linkExpired: "انتهت صلاحية رابط الإعادة. يرجى طلب رابط جديد.",
    networkError: "خطأ في الشبكة. يرجى المحاولة مرة أخرى.",
    resendCooldown: "يرجى الانتظار قبل طلب رابط آخر",
    passwordStrength: "قوة كلمة المرور",
    weak: "ضعيفة",
    fair: "مقبولة",
    good: "جيدة",
    strong: "قوية",
    veryStrong: "قوية جداً"
  },
  fr: {
    forgotPassword: "Mot de passe oublié ?",
    enterEmailDesc: "Entrez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe",
    emailAddress: "Adresse e-mail",
    enterEmail: "Entrez votre adresse e-mail",
    sendResetLink: "Envoyer le lien",
    backToLogin: "Retour à la connexion",
    emailSent: "Vérifiez votre e-mail !",
    emailSentDesc: "Nous avons envoyé un lien de réinitialisation à",
    didntReceive: "Vous n'avez pas reçu l'e-mail ?",
    resendLink: "Renvoyer le lien",
    openEmailApp: "Ouvrir l'app e-mail",
    resetPassword: "Réinitialiser votre mot de passe",
    resetPasswordDesc: "Entrez votre nouveau mot de passe ci-dessous",
    newPassword: "Nouveau mot de passe",
    confirmPassword: "Confirmer le mot de passe",
    enterNewPassword: "Entrez votre nouveau mot de passe",
    confirmNewPassword: "Confirmez votre nouveau mot de passe",
    updatePassword: "Mettre à jour le mot de passe",
    passwordReset: "Mot de passe réinitialisé avec succès !",
    passwordResetDesc: "Votre mot de passe a été mis à jour. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.",
    signIn: "Se connecter",
    invalidEmail: "Veuillez entrer une adresse e-mail valide",
    passwordTooShort: "Le mot de passe doit contenir au moins 8 caractères",
    passwordsNoMatch: "Les mots de passe ne correspondent pas",
    emailNotFound: "Aucun compte trouvé avec cette adresse e-mail",
    linkExpired: "Ce lien de réinitialisation a expiré. Veuillez en demander un nouveau.",
    networkError: "Erreur réseau. Veuillez réessayer.",
    resendCooldown: "Veuillez attendre avant de demander un autre lien",
    passwordStrength: "Force du mot de passe",
    weak: "Faible",
    fair: "Correct",
    good: "Bon",
    strong: "Fort",
    veryStrong: "Très fort"
  },
  de: {
    forgotPassword: "Passwort vergessen?",
    enterEmailDesc: "Geben Sie Ihre E-Mail-Adresse ein und wir senden Ihnen einen Link zum Zurücksetzen Ihres Passworts",
    emailAddress: "E-Mail-Adresse",
    enterEmail: "Geben Sie Ihre E-Mail-Adresse ein",
    sendResetLink: "Reset-Link senden",
    backToLogin: "Zurück zur Anmeldung",
    emailSent: "Überprüfen Sie Ihre E-Mail!",
    emailSentDesc: "Wir haben einen Passwort-Reset-Link gesendet an",
    didntReceive: "E-Mail nicht erhalten?",
    resendLink: "Link erneut senden",
    openEmailApp: "E-Mail-App öffnen",
    resetPassword: "Passwort zurücksetzen",
    resetPasswordDesc: "Geben Sie Ihr neues Passwort unten ein",
    newPassword: "Neues Passwort",
    confirmPassword: "Passwort bestätigen",
    enterNewPassword: "Geben Sie Ihr neues Passwort ein",
    confirmNewPassword: "Bestätigen Sie Ihr neues Passwort",
    updatePassword: "Passwort aktualisieren",
    passwordReset: "Passwort erfolgreich zurückgesetzt!",
    passwordResetDesc: "Ihr Passwort wurde aktualisiert. Sie können sich jetzt mit Ihrem neuen Passwort anmelden.",
    signIn: "Anmelden",
    invalidEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein",
    passwordTooShort: "Das Passwort muss mindestens 8 Zeichen lang sein",
    passwordsNoMatch: "Passwörter stimmen nicht überein",
    emailNotFound: "Kein Konto mit dieser E-Mail-Adresse gefunden",
    linkExpired: "Dieser Reset-Link ist abgelaufen. Bitte fordern Sie einen neuen an.",
    networkError: "Netzwerkfehler. Bitte versuchen Sie es erneut.",
    resendCooldown: "Bitte warten Sie, bevor Sie einen weiteren Link anfordern",
    passwordStrength: "Passwort-Stärke",
    weak: "Schwach",
    fair: "Ausreichend",
    good: "Gut",
    strong: "Stark",
    veryStrong: "Sehr stark"
  }
};

const ForgotPassword = () => {
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState<Step>(() => {
    const token = searchParams.get('token');
    return token ? 'reset' : 'email';
  });
  
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
             (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  
  const [currentLang, setCurrentLang] = useState('en');
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [passwordStrength, setPasswordStrength] = useState(0);

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

  // Resend cooldown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendCooldown > 0) {
      interval = setInterval(() => {
        setResendCooldown(prev => prev - 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [resendCooldown]);

  // Password strength calculation
  useEffect(() => {
    if (newPassword) {
      let strength = 0;
      if (newPassword.length >= 8) strength++;
      if (/[A-Z]/.test(newPassword)) strength++;
      if (/[a-z]/.test(newPassword)) strength++;
      if (/[0-9]/.test(newPassword)) strength++;
      if (/[^A-Za-z0-9]/.test(newPassword)) strength++;
      setPasswordStrength(strength);
    } else {
      setPasswordStrength(0);
    }
  }, [newPassword]);

  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const getPasswordStrengthColor = () => {
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
    return colors[passwordStrength - 1] || 'bg-gray-300';
  };

  const getPasswordStrengthText = () => {
    const texts = [t.weak, t.fair, t.good, t.strong, t.veryStrong];
    return texts[passwordStrength - 1] || '';
  };

  const handleSendResetLink = async () => {
    if (!validateEmail(email)) {
      setError(t.invalidEmail);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate random success/failure
      const success = Math.random() > 0.2;
      
      if (success) {
        setCurrentStep('sent');
        setResendCooldown(60);
      } else {
        setError(t.emailNotFound);
      }
    } catch (error) {
      setError(t.networkError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendLink = async () => {
    if (resendCooldown > 0) return;
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResendCooldown(60);
    } catch (error) {
      setError(t.networkError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword.length < 8) {
      setError(t.passwordTooShort);
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError(t.passwordsNoMatch);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate token validation
      const tokenValid = Math.random() > 0.1;
      
      if (tokenValid) {
        setCurrentStep('success');
      } else {
        setError(t.linkExpired);
      }
    } catch (error) {
      setError(t.networkError);
    } finally {
      setIsLoading(false);
    }
  };

  const openEmailApp = () => {
    // Try to open native email apps
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    
    if (isIOS) {
      window.location.href = 'message://';
    } else if (isAndroid) {
      window.location.href = 'intent://send#Intent;scheme=mailto;package=com.google.android.gm;end';
    } else {
      // Fallback for desktop
      window.open('https://mail.google.com', '_blank');
    }
  };

  const renderEmailStep = () => (
    <motion.div
      key="email"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className={`w-16 h-16 mx-auto rounded-full ${
            isDark ? 'bg-purple-500/20' : 'bg-blue-500/20'
          } flex items-center justify-center mb-4`}
        >
          <Key className={`w-8 h-8 ${isDark ? 'text-purple-400' : 'text-blue-600'}`} />
        </motion.div>
        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {t.forgotPassword}
        </h1>
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-sm mx-auto`}>
          {t.enterEmailDesc}
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            {t.emailAddress}
          </Label>
          <div className="relative">
            <Mail className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 w-5 h-5 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              placeholder={t.enterEmail}
              className={`${isRTL ? 'pr-12 text-right' : 'pl-12'} ${
                isDark 
                  ? 'bg-gray-900/50 border-gray-600/50 text-white placeholder:text-gray-400' 
                  : 'bg-white/50 border-gray-300/50 text-gray-900 placeholder:text-gray-500'
              } backdrop-blur-sm transition-all duration-300 focus:shadow-lg ${
                error ? 'border-red-500' : ''
              }`}
              required
            />
          </div>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-500"
            >
              {error}
            </motion.p>
          )}
        </div>

        <Button
          onClick={handleSendResetLink}
          disabled={isLoading || !email}
          className={`w-full ${
            isDark 
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
          } text-white transition-all duration-300 group`}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Sending...
            </div>
          ) : (
            <>
              <Send className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t.sendResetLink}
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );

  const renderSentStep = () => (
    <motion.div
      key="sent"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-6 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-4"
      >
        <CheckCircle2 className="w-10 h-10 text-green-500" />
      </motion.div>

      <div className="space-y-2">
        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {t.emailSent}
        </h1>
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {t.emailSentDesc}
        </p>
        <p className={`font-medium ${isDark ? 'text-purple-400' : 'text-blue-600'}`}>
          {email}
        </p>
      </div>

      <div className="space-y-4">
        <Button
          onClick={openEmailApp}
          className={`w-full ${
            isDark 
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
          } text-white`}
        >
          <Mail className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {t.openEmailApp}
        </Button>

        <div className="space-y-2">
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {t.didntReceive}
          </p>
          <Button
            variant="ghost"
            onClick={handleResendLink}
            disabled={resendCooldown > 0 || isLoading}
            className={`text-sm ${
              isDark ? 'text-purple-400 hover:text-purple-300' : 'text-blue-600 hover:text-blue-700'
            }`}
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin mr-2" />
            ) : resendCooldown > 0 ? (
              <>
                <Clock className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {resendCooldown}s
              </>
            ) : (
              <>
                <RefreshCw className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t.resendLink}
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );

  const renderResetStep = () => (
    <motion.div
      key="reset"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className={`w-16 h-16 mx-auto rounded-full ${
            isDark ? 'bg-purple-500/20' : 'bg-blue-500/20'
          } flex items-center justify-center mb-4`}
        >
          <Shield className={`w-8 h-8 ${isDark ? 'text-purple-400' : 'text-blue-600'}`} />
        </motion.div>
        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {t.resetPassword}
        </h1>
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {t.resetPasswordDesc}
        </p>
      </div>

      <div className="space-y-4">
        {/* New Password */}
        <div className="space-y-2">
          <Label htmlFor="newPassword" className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            {t.newPassword}
          </Label>
          <div className="relative">
            <Input
              id="newPassword"
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (error) setError('');
              }}
              placeholder={t.enterNewPassword}
              className={`${isRTL ? 'pr-12 text-right' : 'pr-12'} ${
                isDark 
                  ? 'bg-gray-900/50 border-gray-600/50 text-white placeholder:text-gray-400' 
                  : 'bg-white/50 border-gray-300/50 text-gray-900 placeholder:text-gray-500'
              } backdrop-blur-sm transition-all duration-300 focus:shadow-lg`}
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
          
          {/* Password Strength */}
          {newPassword && (
            <div className="space-y-2">
              <div className={`flex items-center justify-between text-xs ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <span>{t.passwordStrength}</span>
                <span className={`font-medium ${getPasswordStrengthColor().replace('bg-', 'text-')}`}>
                  {getPasswordStrengthText()}
                </span>
              </div>
              <div className={`w-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className={`text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            {t.confirmPassword}
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (error) setError('');
              }}
              placeholder={t.confirmNewPassword}
              className={`${isRTL ? 'pr-12 text-right' : 'pr-12'} ${
                isDark 
                  ? 'bg-gray-900/50 border-gray-600/50 text-white placeholder:text-gray-400' 
                  : 'bg-white/50 border-gray-300/50 text-gray-900 placeholder:text-gray-500'
              } backdrop-blur-sm transition-all duration-300 focus:shadow-lg ${
                confirmPassword && newPassword !== confirmPassword ? 'border-red-500' : ''
              }`}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className={`absolute ${isRTL ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 ${
                isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
              } transition-colors`}
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-500"
          >
            {error}
          </motion.p>
        )}

        <Button
          onClick={handleResetPassword}
          disabled={isLoading || !newPassword || !confirmPassword}
          className={`w-full ${
            isDark 
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
          } text-white transition-all duration-300`}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Updating...
            </div>
          ) : (
            <>
              <Key className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {t.updatePassword}
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );

  const renderSuccessStep = () => (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, duration: 0.8 }}
        className="w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center mb-4"
      >
        <CheckCircle2 className="w-10 h-10 text-green-500" />
      </motion.div>

      <div className="space-y-2">
        <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {t.passwordReset}
        </h1>
        <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-sm mx-auto`}>
          {t.passwordResetDesc}
        </p>
      </div>

      <Button
        asChild
        className={`w-full ${
          isDark 
            ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
        } text-white`}
      >
        <Link to="/login">
          {t.signIn}
          <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2' : 'ml-2'}`} />
        </Link>
      </Button>
    </motion.div>
  );

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

      {/* Main Card */}
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
          
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          
          <CardHeader className="relative">
            <div className="flex items-center justify-center mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="flex items-center gap-3"
              >
                <div className={`w-10 h-10 ${
                  isDark 
                    ? 'bg-gradient-to-br from-purple-500 to-blue-500' 
                    : 'bg-gradient-to-br from-blue-500 to-purple-500'
                } rounded-xl flex items-center justify-center shadow-lg`}>
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  TuniPark
                </span>
              </motion.div>
            </div>
          </CardHeader>

          <CardContent className="relative">
            <AnimatePresence mode="wait">
              {currentStep === 'email' && renderEmailStep()}
              {currentStep === 'sent' && renderSentStep()}
              {currentStep === 'reset' && renderResetStep()}
              {currentStep === 'success' && renderSuccessStep()}
            </AnimatePresence>

            {/* Back to Login */}
            {currentStep !== 'success' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center mt-6 pt-6 border-t border-gray-200/20"
              >
                <Link 
                  to="/login" 
                  className={`inline-flex items-center gap-2 text-sm ${
                    isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'
                  } transition-colors hover:underline`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t.backToLogin}
                </Link>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
