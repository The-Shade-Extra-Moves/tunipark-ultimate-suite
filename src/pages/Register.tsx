import { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, ArrowLeft, Eye, EyeOff, Check, X, Upload, MapPin, 
  Building, Mail, Lock, User, Globe, Flag, Star, Sparkles,
  CheckCircle, Moon, Sun, Languages
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isRTL, setIsRTL] = useState(false);
  const [language, setLanguage] = useState('en');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isAnnualBilling, setIsAnnualBilling] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('free');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: 'US',
    parkingName: '',
    parkingAddress: '',
    numberOfSlots: '',
    termsAccepted: false
  });

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});

  const fileInputRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  const countries = [
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
    { code: 'FR', name: 'France', flag: '🇫🇷' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'TN', name: 'Tunisia', flag: '🇹🇳' }
  ];

  const pricingPlans = [
    {
      id: 'free',
      name: 'Starter',
      price: 0,
      period: 'Forever',
      description: 'Perfect for getting started',
      features: [
        'Up to 50 parking spaces',
        'Basic analytics dashboard',
        'Mobile app access',
        'Email support'
      ],
      gradient: 'from-gray-500 to-gray-600',
      popular: false
    },
    {
      id: 'pro',
      name: 'Professional',
      price: 99,
      period: 'month',
      description: 'Most popular for growing businesses',
      features: [
        'Up to 500 parking spaces',
        'AI-powered detection',
        'Real-time analytics',
        'Dynamic pricing engine',
        'Priority support'
      ],
      gradient: 'from-blue-500 to-purple-600',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 299,
      period: 'month',
      description: 'For large-scale operations',
      features: [
        'Unlimited parking spaces',
        'Multi-location management',
        'White-label branding',
        'Custom integrations',
        'Dedicated support'
      ],
      gradient: 'from-purple-500 to-pink-600',
      popular: false
    }
  ];

  useEffect(() => {
    if (language === 'ar') {
      setIsRTL(true);
      document.dir = 'rtl';
    } else {
      setIsRTL(false);
      document.dir = 'ltr';
    }
  }, [language]);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    
    if (field === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors({ ...validationErrors, [field]: null });
    }
  };

  const validateStep = (step) => {
    const errors = {};
    
    if (step === 1) {
      if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
      if (!formData.email.trim()) errors.email = 'Email is required';
      if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
      if (!formData.password) errors.password = 'Password is required';
      if (passwordStrength < 3) errors.password = 'Password is too weak';
      if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
      if (!acceptTerms) errors.terms = 'You must accept the terms and conditions';
    }
    
    if (step === 2) {
      if (!formData.parkingName.trim()) errors.parkingName = 'Parking name is required';
      if (!formData.parkingAddress.trim()) errors.parkingAddress = 'Parking address is required';
      if (!formData.numberOfSlots || formData.numberOfSlots < 1) errors.numberOfSlots = 'Number of slots must be at least 1';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    // Here you would typically submit the form data to your backend
    console.log('Registration data:', { ...formData, selectedPlan, isAnnualBilling });
    
    // Simulate success and redirect
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-red-500';
    if (passwordStrength <= 2) return 'bg-yellow-500';
    if (passwordStrength <= 3) return 'bg-blue-500';
    if (passwordStrength <= 4) return 'bg-green-500';
    return 'bg-emerald-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 1) return 'Weak';
    if (passwordStrength <= 2) return 'Fair';
    if (passwordStrength <= 3) return 'Good';
    if (passwordStrength <= 4) return 'Strong';
    return 'Very Strong';
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-950 to-purple-950 text-white' 
        : 'bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 text-gray-900'
    } overflow-auto ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      
      {/* Header with Theme and Language Controls */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-4">
        {/* Language Selector */}
        <div className="relative group">
          <Button
            variant="outline"
            size="sm"
            className={`${
              isDarkMode ? 'bg-white/10 border-white/20 hover:bg-white/20' : 'bg-gray-900/10 border-gray-300 hover:bg-gray-100'
            } backdrop-blur-sm transition-all duration-300`}
          >
            <Languages className="w-4 h-4 mr-2" />
            {languages.find(l => l.code === language)?.flag}
          </Button>
          
          <div className={`absolute top-full mt-2 ${isRTL ? 'left-0' : 'right-0'} ${
            isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'
          } backdrop-blur-xl border ${
            isDarkMode ? 'border-white/10' : 'border-gray-200/20'
          } rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-48`}>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-white/10 first:rounded-t-xl last:rounded-b-xl transition-colors ${
                  language === lang.code ? 'bg-blue-500/20 text-blue-400' : ''
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Theme Toggle */}
        <Button
          onClick={() => setIsDarkMode(!isDarkMode)}
          variant="outline"
          size="sm"
          className={`${
            isDarkMode ? 'bg-white/10 border-white/20 hover:bg-white/20' : 'bg-gray-900/10 border-gray-300 hover:bg-gray-100'
          } backdrop-blur-sm transition-all duration-300`}
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>
      </div>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl mx-auto">
          
          {/* Progress Indicator */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    step <= currentStep 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                      : isDarkMode ? 'bg-white/10 text-gray-400' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step < currentStep ? <Check className="w-5 h-5" /> : step}
                  </div>
                  {step < 3 && (
                    <div className={`w-16 h-0.5 mx-2 transition-all duration-300 ${
                      step < currentStep ? 'bg-gradient-to-r from-blue-500 to-purple-600' : isDarkMode ? 'bg-white/20' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold">
                {currentStep === 1 && 'Create Your Account'}
                {currentStep === 2 && 'Setup Your Parking'}
                {currentStep === 3 && 'Choose Your Plan'}
              </h1>
              <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {currentStep === 1 && 'Join thousands of parking operators worldwide'}
                {currentStep === 2 && 'Tell us about your parking facility'}
                {currentStep === 3 && 'Select the perfect plan for your business'}
              </p>
            </div>
          </div>

          {/* Main Form Card */}
          <Card className={`${
            isDarkMode ? 'bg-white/5' : 'bg-white/20'
          } backdrop-blur-xl border ${
            isDarkMode ? 'border-white/10' : 'border-gray-200/20'
          } rounded-3xl shadow-2xl overflow-hidden`}>
            <CardContent className="p-8 md:p-12">
              
              {/* Step 1: Registration Form */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`} />
                        <input
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-4 rounded-2xl border transition-all duration-300 ${
                            isDarkMode 
                              ? 'bg-white/5 border-white/10 focus:border-blue-400 focus:bg-white/10' 
                              : 'bg-gray-900/5 border-gray-300/30 focus:border-blue-500 focus:bg-white/50'
                          } backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                            validationErrors.fullName ? 'border-red-500 shake' : ''
                          }`}
                          placeholder="Enter your full name"
                        />
                      </div>
                      {validationErrors.fullName && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <X className="w-4 h-4" />
                          {validationErrors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Business Email *
                      </label>
                      <div className="relative">
                        <Mail className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`} />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-4 rounded-2xl border transition-all duration-300 ${
                            isDarkMode 
                              ? 'bg-white/5 border-white/10 focus:border-blue-400 focus:bg-white/10' 
                              : 'bg-gray-900/5 border-gray-300/30 focus:border-blue-500 focus:bg-white/50'
                          } backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                            validationErrors.email ? 'border-red-500 shake' : ''
                          }`}
                          placeholder="your@company.com"
                        />
                      </div>
                      {validationErrors.email && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <X className="w-4 h-4" />
                          {validationErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Password */}
                    <div className="space-y-2">
                      <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Password *
                      </label>
                      <div className="relative">
                        <Lock className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`} />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className={`w-full ${isRTL ? 'pr-12 pl-12' : 'pl-12 pr-12'} py-4 rounded-2xl border transition-all duration-300 ${
                            isDarkMode 
                              ? 'bg-white/5 border-white/10 focus:border-blue-400 focus:bg-white/10' 
                              : 'bg-gray-900/5 border-gray-300/30 focus:border-blue-500 focus:bg-white/50'
                          } backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                            validationErrors.password ? 'border-red-500 shake' : ''
                          }`}
                          placeholder="Create a strong password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors`}
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      
                      {/* Password Strength Indicator */}
                      {formData.password && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">Password Strength</span>
                            <span className={`text-xs font-medium ${getPasswordStrengthColor().replace('bg-', 'text-')}`}>
                              {getPasswordStrengthText()}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                              style={{ width: `${(passwordStrength / 5) * 100}%` }}
                            />
                          </div>
                        </div>
                      )}
                      
                      {validationErrors.password && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <X className="w-4 h-4" />
                          {validationErrors.password}
                        </p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                      <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <Lock className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`} />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          className={`w-full ${isRTL ? 'pr-12 pl-12' : 'pl-12 pr-12'} py-4 rounded-2xl border transition-all duration-300 ${
                            isDarkMode 
                              ? 'bg-white/5 border-white/10 focus:border-blue-400 focus:bg-white/10' 
                              : 'bg-gray-900/5 border-gray-300/30 focus:border-blue-500 focus:bg-white/50'
                          } backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                            validationErrors.confirmPassword ? 'border-red-500 shake' : ''
                          }`}
                          placeholder="Confirm your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors`}
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {validationErrors.confirmPassword && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <X className="w-4 h-4" />
                          {validationErrors.confirmPassword}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Country Selector */}
                  <div className="space-y-2">
                    <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Country
                    </label>
                    <div className="relative">
                      <Flag className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <select
                        value={formData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-4 rounded-2xl border transition-all duration-300 ${
                          isDarkMode 
                            ? 'bg-white/5 border-white/10 focus:border-blue-400 focus:bg-white/10' 
                            : 'bg-gray-900/5 border-gray-300/30 focus:border-blue-500 focus:bg-white/50'
                        } backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      >
                        {countries.map((country) => (
                          <option key={country.code} value={country.code} className="bg-gray-900">
                            {country.flag} {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={acceptTerms}
                      onCheckedChange={setAcceptTerms}
                      className="data-[state=checked]:bg-blue-500"
                    />
                    <label className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      I accept the{' '}
                      <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                  {validationErrors.terms && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <X className="w-4 h-4" />
                      {validationErrors.terms}
                    </p>
                  )}
                </div>
              )}

              {/* Step 2: Parking Setup */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Parking Name */}
                    <div className="space-y-2">
                      <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Parking Name *
                      </label>
                      <div className="relative">
                        <Building className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`} />
                        <input
                          type="text"
                          value={formData.parkingName}
                          onChange={(e) => handleInputChange('parkingName', e.target.value)}
                          className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-4 rounded-2xl border transition-all duration-300 ${
                            isDarkMode 
                              ? 'bg-white/5 border-white/10 focus:border-blue-400 focus:bg-white/10' 
                              : 'bg-gray-900/5 border-gray-300/30 focus:border-blue-500 focus:bg-white/50'
                          } backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                            validationErrors.parkingName ? 'border-red-500 shake' : ''
                          }`}
                          placeholder="Downtown Parking Center"
                        />
                      </div>
                      {validationErrors.parkingName && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <X className="w-4 h-4" />
                          {validationErrors.parkingName}
                        </p>
                      )}
                    </div>

                    {/* Number of Slots */}
                    <div className="space-y-2">
                      <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Number of Slots *
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={formData.numberOfSlots}
                        onChange={(e) => handleInputChange('numberOfSlots', e.target.value)}
                        className={`w-full px-4 py-4 rounded-2xl border transition-all duration-300 ${
                          isDarkMode 
                            ? 'bg-white/5 border-white/10 focus:border-blue-400 focus:bg-white/10' 
                            : 'bg-gray-900/5 border-gray-300/30 focus:border-blue-500 focus:bg-white/50'
                        } backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                          validationErrors.numberOfSlots ? 'border-red-500 shake' : ''
                        }`}
                        placeholder="50"
                      />
                      {validationErrors.numberOfSlots && (
                        <p className="text-red-500 text-sm flex items-center gap-1">
                          <X className="w-4 h-4" />
                          {validationErrors.numberOfSlots}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Parking Address */}
                  <div className="space-y-2">
                    <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Parking Address *
                    </label>
                    <div className="relative">
                      <MapPin className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-4 w-5 h-5 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                      <textarea
                        value={formData.parkingAddress}
                        onChange={(e) => handleInputChange('parkingAddress', e.target.value)}
                        rows={3}
                        className={`w-full ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-4 rounded-2xl border transition-all duration-300 ${
                          isDarkMode 
                            ? 'bg-white/5 border-white/10 focus:border-blue-400 focus:bg-white/10' 
                            : 'bg-gray-900/5 border-gray-300/30 focus:border-blue-500 focus:bg-white/50'
                        } backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none ${
                          validationErrors.parkingAddress ? 'border-red-500 shake' : ''
                        }`}
                        placeholder="123 Main Street, Downtown District, City, Country"
                      />
                    </div>
                    {validationErrors.parkingAddress && (
                      <p className="text-red-500 text-sm flex items-center gap-1">
                        <X className="w-4 h-4" />
                        {validationErrors.parkingAddress}
                      </p>
                    )}
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-2">
                    <label className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Parking Photo (Optional)
                    </label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
                        isDarkMode 
                          ? 'border-white/20 hover:border-blue-400 bg-white/5 hover:bg-white/10' 
                          : 'border-gray-300 hover:border-blue-500 bg-gray-100/50 hover:bg-white/50'
                      } backdrop-blur-sm`}
                    >
                      {uploadedImage ? (
                        <div className="space-y-4">
                          <img
                            src={uploadedImage}
                            alt="Parking preview"
                            className="w-32 h-32 object-cover rounded-xl mx-auto"
                          />
                          <p className="text-sm text-green-500">Image uploaded successfully!</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Upload className={`w-12 h-12 mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                          <div>
                            <p className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              Click to upload a photo
                            </p>
                            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              PNG, JPG up to 10MB
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Plan Selection */}
              {currentStep === 3 && (
                <div className="space-y-8 animate-fade-in">
                  {/* Billing Toggle */}
                  <div className="text-center">
                    <div className={`inline-flex items-center gap-4 p-2 rounded-2xl ${
                      isDarkMode ? 'bg-white/10' : 'bg-gray-900/10'
                    } backdrop-blur-sm`}>
                      <span className={`text-sm font-medium ${!isAnnualBilling ? 'text-blue-400' : isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Monthly
                      </span>
                      <Switch
                        checked={isAnnualBilling}
                        onCheckedChange={setIsAnnualBilling}
                        className="data-[state=checked]:bg-blue-500"
                      />
                      <span className={`text-sm font-medium ${isAnnualBilling ? 'text-blue-400' : isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Annual
                        <Badge className="ml-2 bg-green-500 text-white">Save 20%</Badge>
                      </span>
                    </div>
                  </div>

                  {/* Pricing Plans */}
                  <div className="grid md:grid-cols-3 gap-6">
                    {pricingPlans.map((plan) => (
                      <Card
                        key={plan.id}
                        onClick={() => setSelectedPlan(plan.id)}
                        className={`relative cursor-pointer transition-all duration-300 hover:scale-105 ${
                          selectedPlan === plan.id
                            ? 'ring-2 ring-blue-400 shadow-2xl shadow-blue-500/20'
                            : isDarkMode ? 'bg-white/5 border-white/10 hover:border-white/20' : 'bg-white/20 border-gray-200/20 hover:border-gray-300/30'
                        } backdrop-blur-xl border rounded-3xl overflow-hidden`}
                      >
                        {plan.popular && (
                          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                            <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1">
                              <Star className="w-3 h-3 mr-1" />
                              Most Popular
                            </Badge>
                          </div>
                        )}
                        
                        <CardContent className="p-6">
                          <div className="text-center mb-6">
                            <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {plan.name}
                            </h3>
                            <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {plan.description}
                            </p>
                            <div className="mb-4">
                              <span className={`text-3xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                                {plan.id === 'free' ? 'Free' : `$${isAnnualBilling ? Math.round(plan.price * 0.8) : plan.price}`}
                              </span>
                              {plan.id !== 'free' && (
                                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  /{isAnnualBilling ? 'year' : plan.period}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <ul className="space-y-3 mb-6">
                            {plan.features.map((feature, index) => (
                              <li key={index} className={`flex items-center gap-3 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center flex-shrink-0`}>
                                  <Check className="w-3 h-3 text-white" />
                                </div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                          
                          {selectedPlan === plan.id && (
                            <div className="flex items-center justify-center">
                              <CheckCircle className="w-6 h-6 text-blue-400" />
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Success Animation for Plan Completion */}
                  {currentStep === 3 && (
                    <div className="text-center space-y-6">
                      <div className="animate-bounce">
                        <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
                          <Sparkles className="w-10 h-10 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-green-400 mb-2">🎉 Almost Ready!</h3>
                        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          Your TuniPark account is ready to be created
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className={`flex items-center justify-between mt-8 pt-8 border-t ${
                isDarkMode ? 'border-white/10' : 'border-gray-200/20'
              }`}>
                <div>
                  {currentStep > 1 && (
                    <Button
                      onClick={handlePrevStep}
                      variant="outline"
                      className={`${
                        isDarkMode ? 'border-white/20 hover:bg-white/10' : 'border-gray-300 hover:bg-gray-100'
                      } backdrop-blur-sm transition-all duration-300`}
                    >
                      <ArrowLeft className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                      Previous
                    </Button>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => navigate('/login')}
                    variant="ghost"
                    className={`${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    Already have an account?
                  </Button>
                  
                  <Button
                    onClick={currentStep === 3 ? handleSubmit : handleNextStep}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-2xl font-semibold shadow-2xl hover:scale-105 transition-all duration-300"
                  >
                    {currentStep === 3 ? 'Create Account' : 'Next'}
                    <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2' : 'ml-2'}`} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        .shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Register;
