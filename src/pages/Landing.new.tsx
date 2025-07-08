import { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, Play, Car, Camera, Brain, DollarSign, Settings, Zap, Shield, Rocket, 
  Users, Star, Github, Download, ChevronDown, MapPin, Smartphone, BarChart3, 
  Calendar, Eye, Lock, Wifi, Monitor, Clock, TrendingUp, Building, CreditCard,
  Bell, QrCode, Cpu, Cloud, Globe, Palette, Menu, X, Sun, Moon, MessageCircle,
  Check, Sparkles, Target, Layout, Layers, ArrowDown, ChevronLeft, ChevronRight,
  MousePointer, BarChart, Wifi as WifiIcon, Video, Languages, Mail, Phone
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

const Landing = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnnualPricing, setIsAnnualPricing] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const demoRef = useRef(null);
  const pricingRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 6);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  const scrollToSection = (elementRef) => {
    elementRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start' 
    });
  };

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Detection",
      description: "Smart vehicle recognition with 99.2% accuracy",
      color: "from-blue-500 to-cyan-500",
      glassBg: "bg-blue-500/10"
    },
    {
      icon: BarChart3,
      title: "Real-Time Dashboard",
      description: "Live revenue and occupancy analytics",
      color: "from-purple-500 to-pink-500",
      glassBg: "bg-purple-500/10"
    },
    {
      icon: Calendar,
      title: "Smart Reservations",
      description: "Advanced booking with QR access",
      color: "from-yellow-500 to-orange-500",
      glassBg: "bg-yellow-500/10"
    },
    {
      icon: Camera,
      title: "Camera Integration",
      description: "RTSP/IP cameras with IoT sensors",
      color: "from-green-500 to-emerald-500",
      glassBg: "bg-green-500/10"
    },
    {
      icon: DollarSign,
      title: "Dynamic Pricing",
      description: "AI-optimized revenue engine",
      color: "from-indigo-500 to-blue-500",
      glassBg: "bg-indigo-500/10"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "GDPR compliant with 2FA",
      color: "from-pink-500 to-red-500",
      glassBg: "bg-pink-500/10"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Mall Operations Manager",
      company: "Metro Shopping Center",
      content: "TuniPark increased our parking revenue by 280% in just 6 months. The AI detection is incredibly accurate!",
      avatar: "SJ",
      rating: 5
    },
    {
      name: "Ahmed Hassan",
      role: "Parking Director",
      company: "Downtown Plaza",
      content: "The smart reservation system eliminated our manual processes. Our customers love the mobile experience.",
      avatar: "AH",
      rating: 5
    },
    {
      name: "Maria Rodriguez",
      role: "Facility Owner",
      company: "Business Park Solutions",
      content: "Best investment we made! The dashboard gives us insights we never had before. Customer support is amazing.",
      avatar: "MR",
      rating: 5
    }
  ];

  const parkingSlots = [
    { id: 1, type: 'regular', status: 'available', position: { x: 20, y: 30 } },
    { id: 2, type: 'ev', status: 'occupied', position: { x: 60, y: 30 } },
    { id: 3, type: 'handicapped', status: 'reserved', position: { x: 100, y: 30 } },
    { id: 4, type: 'vip', status: 'available', position: { x: 140, y: 30 } },
    { id: 5, type: 'regular', status: 'available', position: { x: 20, y: 80 } },
    { id: 6, type: 'regular', status: 'occupied', position: { x: 60, y: 80 } },
  ];

  const stats = [
    { value: "10K+", label: "Parking Spots", icon: Car },
    { value: "500+", label: "Locations", icon: MapPin },
    { value: "4.9", label: "Rating", icon: Star },
    { value: "50K+", label: "Users", icon: Users }
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-950 to-purple-950 text-white' 
        : 'bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 text-gray-900'
    } overflow-hidden`}>
      
      {/* Glassmorphic Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? `${isDarkMode ? 'bg-gray-900/20' : 'bg-white/20'} backdrop-blur-xl border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200/20'}` 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-xl ${isDarkMode ? 'bg-white/10' : 'bg-gray-900/10'} backdrop-blur-sm flex items-center justify-center shadow-lg`}>
                <Car className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                TuniPark
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection(featuresRef)}
                className={`${isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors font-medium`}
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection(demoRef)}
                className={`${isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors font-medium`}
              >
                Demo
              </button>
              <button 
                onClick={() => scrollToSection(pricingRef)}
                className={`${isDarkMode ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors font-medium`}
              >
                Pricing
              </button>
              
              {/* Theme Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg ${isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-900/10 hover:bg-gray-900/20'} transition-all duration-300`}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className={`${isDarkMode ? 'border-white/20 text-white hover:bg-white/10' : 'border-gray-300 hover:bg-gray-100'} backdrop-blur-sm`}
              >
                Sign In
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-lg ${isDarkMode ? 'bg-white/10' : 'bg-gray-900/10'} backdrop-blur-sm`}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden ${isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-xl border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200/20'}`}>
            <div className="px-4 py-6 space-y-4">
              <button 
                onClick={() => { scrollToSection(featuresRef); setIsMenuOpen(false); }}
                className="block w-full text-left py-2 font-medium"
              >
                Features
              </button>
              <button 
                onClick={() => { scrollToSection(demoRef); setIsMenuOpen(false); }}
                className="block w-full text-left py-2 font-medium"
              >
                Demo
              </button>
              <button 
                onClick={() => { scrollToSection(pricingRef); setIsMenuOpen(false); }}
                className="block w-full text-left py-2 font-medium"
              >
                Pricing
              </button>
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="font-medium">Dark Mode</span>
                <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Glassmorphic Hero Section */}
      <section ref={heroRef} className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Glassmorphic Badge */}
              <div className={`inline-flex items-center px-6 py-3 rounded-full ${
                isDarkMode ? 'bg-white/10' : 'bg-gray-900/10'
              } backdrop-blur-sm border ${
                isDarkMode ? 'border-white/20' : 'border-gray-200/30'
              } shadow-lg`}>
                <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
                <span className="text-sm font-medium">AI-Powered Parking SaaS Platform</span>
              </div>
              
              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  Make Your Parking
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Smart, Profitable
                  </span>
                  <br />
                  and Effortless
                </h1>
                
                <p className={`text-xl md:text-2xl leading-relaxed max-w-2xl ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  AI-powered tools for parking owners to automate operations, maximize revenue, and provide seamless customer experiences.
                </p>
              </div>

              {/* Neumorphic CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6">
                <button 
                  onClick={handleGetStarted}
                  className={`group relative px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)]'
                  } text-white shadow-2xl hover:scale-105 hover:shadow-blue-500/25`}
                >
                  <div className="flex items-center justify-center">
                    <Rocket className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                    Start for Free
                  </div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity blur-xl" />
                </button>
                
                <button className={`group px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/10 hover:border-white/30' 
                    : 'bg-gray-900/5 backdrop-blur-sm border border-gray-200/30 hover:bg-gray-900/10 hover:border-gray-300/40'
                } hover:scale-105`}>
                  <div className="flex items-center justify-center">
                    <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Watch Demo
                  </div>
                </button>
              </div>

              {/* Animated Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className={`group p-4 rounded-2xl ${
                    isDarkMode ? 'bg-white/5' : 'bg-gray-900/5'
                  } backdrop-blur-sm border ${
                    isDarkMode ? 'border-white/10' : 'border-gray-200/20'
                  } hover:border-blue-400/30 transition-all duration-300 text-center`}>
                    <div className={`flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-xl ${
                      isDarkMode ? 'bg-blue-500/20' : 'bg-blue-500/10'
                    } group-hover:scale-110 transition-transform`}>
                      <stat.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual - Glassmorphic Dashboard */}
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
              
              {/* Main Dashboard Card */}
              <Card className={`relative ${
                isDarkMode ? 'bg-white/10' : 'bg-white/20'
              } backdrop-blur-xl border ${
                isDarkMode ? 'border-white/20' : 'border-gray-200/30'
              } rounded-3xl overflow-hidden shadow-2xl hover:shadow-blue-500/20 transition-all duration-500`}>
                <CardContent className="p-0">
                  {/* Dashboard Header */}
                  <div className={`flex items-center justify-between p-6 border-b ${
                    isDarkMode ? 'border-white/10' : 'border-gray-200/20'
                  }`}>
                    <div className="flex items-center space-x-4">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                        <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse delay-100" />
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-200" />
                      </div>
                      <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        TuniPark Smart Dashboard
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 bg-green-400 rounded-full animate-pulse`} />
                      <span className="text-xs text-green-400 font-medium">Live</span>
                    </div>
                  </div>

                  {/* Dashboard Content */}
                  <div className="p-6 space-y-6">
                    {/* Feature Cards Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {features.slice(0, 4).map((feature, index) => (
                        <Card 
                          key={index}
                          className={`relative p-4 border-0 transition-all duration-500 hover:scale-105 ${
                            currentFeature === index 
                              ? `bg-gradient-to-br ${feature.color} shadow-lg` 
                              : `${isDarkMode ? 'bg-white/5' : 'bg-gray-900/5'} backdrop-blur-sm`
                          }`}
                        >
                          <CardContent className="p-0">
                            <feature.icon className={`w-6 h-6 mb-3 ${
                              currentFeature === index ? 'text-white' : 'text-blue-400'
                            }`} />
                            <h3 className={`font-semibold text-sm mb-1 ${
                              currentFeature === index ? 'text-white' : isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                              {feature.title}
                            </h3>
                            <p className={`text-xs ${
                              currentFeature === index ? 'text-white/80' : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>
                              {feature.description}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Animated Progress Indicators */}
                    <div className="space-y-4">
                      {['Occupancy Rate', 'Revenue Growth', 'AI Accuracy', 'Customer Satisfaction'].map((item, index) => (
                        <div key={index} className="space-y-2">
                          <div className={`flex justify-between text-xs font-medium ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-600'
                          }`}>
                            <span>{item}</span>
                            <span className="text-green-400">{87 + index * 3}%</span>
                          </div>
                          <div className={`w-full ${
                            isDarkMode ? 'bg-gray-700/50' : 'bg-gray-200/50'
                          } rounded-full h-2 overflow-hidden`}>
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-2000 ease-out shadow-sm"
                              style={{ 
                                width: `${87 + index * 3}%`,
                                boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)'
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Live Metrics */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: 'Active', value: '247', color: 'text-green-400' },
                        { label: 'Reserved', value: '89', color: 'text-yellow-400' },
                        { label: 'Available', value: '156', color: 'text-blue-400' }
                      ].map((metric, index) => (
                        <div key={index} className={`text-center p-3 rounded-xl ${
                          isDarkMode ? 'bg-white/5' : 'bg-gray-900/5'
                        } backdrop-blur-sm`}>
                          <div className={`text-lg font-bold ${metric.color}`}>{metric.value}</div>
                          <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {metric.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <div className={`w-6 h-10 border-2 ${
              isDarkMode ? 'border-white/30' : 'border-gray-400/50'
            } rounded-full flex justify-center`}>
              <div className={`w-1 h-3 ${
                isDarkMode ? 'bg-white/50' : 'bg-gray-400'
              } rounded-full mt-2 animate-pulse`} />
            </div>
          </div>
        </div>
      </section>

      {/* Glassmorphic Features Overview */}
      <section ref={featuresRef} className={`py-20 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-black/10' : 'bg-white/30'} backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className={`inline-flex items-center px-6 py-3 rounded-full ${
              isDarkMode ? 'bg-white/10' : 'bg-gray-900/10'
            } backdrop-blur-sm border ${
              isDarkMode ? 'border-white/20' : 'border-gray-200/30'
            } shadow-lg mb-6`}>
              <Target className="w-4 h-4 mr-2 text-blue-400" />
              <span className="text-sm font-medium">Complete Feature Suite</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Everything You Need for
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Smart Parking Success
              </span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              From AI-powered detection to dynamic pricing, TuniPark provides a complete ecosystem for modern parking operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered Detection",
                description: "Advanced computer vision with 99.2% accuracy for vehicle presence detection, license plate recognition, and occupancy monitoring.",
                gradient: "from-blue-500 to-cyan-500",
                glassBg: "bg-blue-500/10"
              },
              {
                icon: Palette,
                title: "Visual Layout Designer",
                description: "Intuitive drag-and-drop interface for creating parking layouts. Define zones, slot types, and access points visually.",
                gradient: "from-purple-500 to-pink-500",
                glassBg: "bg-purple-500/10"
              },
              {
                icon: Camera,
                title: "Camera & IoT Integration",
                description: "Connect RTSP/IP cameras, IoT sensors, and smart devices for comprehensive monitoring and automation.",
                gradient: "from-yellow-500 to-orange-500",
                glassBg: "bg-yellow-500/10"
              },
              {
                icon: DollarSign,
                title: "Dynamic Pricing Engine",
                description: "Smart revenue optimization with demand-based pricing, promotional codes, and subscription management.",
                gradient: "from-green-500 to-emerald-500",
                glassBg: "bg-green-500/10"
              },
              {
                icon: Calendar,
                title: "Smart Reservations",
                description: "Advanced booking system with QR access, no-show management, and automated slot allocation.",
                gradient: "from-indigo-500 to-blue-500",
                glassBg: "bg-indigo-500/10"
              },
              {
                icon: BarChart3,
                title: "Real-Time Analytics",
                description: "Comprehensive dashboards with live metrics, occupancy heatmaps, and predictive insights.",
                gradient: "from-pink-500 to-red-500",
                glassBg: "bg-pink-500/10"
              }
            ].map((feature, index) => (
              <Card 
                key={index}
                className={`group relative ${
                  isDarkMode ? 'bg-white/5' : 'bg-white/20'
                } backdrop-blur-xl border ${
                  isDarkMode ? 'border-white/10 hover:border-white/20' : 'border-gray-200/20 hover:border-gray-300/30'
                } rounded-3xl transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden`}
              >
                {/* Glassmorphic gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                <CardContent className="relative p-8">
                  {/* Icon with glassmorphic background */}
                  <div className={`relative w-16 h-16 rounded-2xl ${
                    isDarkMode ? feature.glassBg : feature.glassBg
                  } backdrop-blur-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300`}>
                    <feature.icon className="w-8 h-8 text-blue-400 group-hover:text-white transition-colors" />
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-80 transition-opacity duration-300`} />
                  </div>
                  
                  <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'} group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:${feature.gradient} group-hover:bg-clip-text transition-all duration-300`}>
                    {feature.title}
                  </h3>
                  
                  <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} group-hover:text-opacity-90 transition-colors`}>
                    {feature.description}
                  </p>
                  
                  {/* Hover arrow */}
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowRight className="w-5 h-5 text-blue-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - 3 Step Process */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-black/5' : 'bg-white/20'} backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Get Started in
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Three Simple Steps
              </span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Transform your parking operations in minutes, not months
            </p>
          </div>

          <div className="relative">
            {/* Connection Path */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 transform -translate-y-1/2 opacity-30" />
            
            <div className="grid md:grid-cols-3 gap-8 relative">
              {[
                {
                  step: "1",
                  title: "Register",
                  description: "Sign up for free and create your parking owner account in under 2 minutes",
                  icon: Users,
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  step: "2", 
                  title: "Design Your Layout",
                  description: "Use our visual layout designer to map your parking spaces, zones, and access points",
                  icon: Layout,
                  color: "from-purple-500 to-pink-500"
                },
                {
                  step: "3",
                  title: "Start Earning",
                  description: "Connect your cameras, set pricing, and watch your parking revenue grow with AI automation",
                  icon: TrendingUp,
                  color: "from-green-500 to-emerald-500"
                }
              ].map((step, index) => (
                <div key={index} className="relative group">
                  {/* Step Card */}
                  <Card className={`relative ${
                    isDarkMode ? 'bg-white/5' : 'bg-white/20'
                  } backdrop-blur-xl border ${
                    isDarkMode ? 'border-white/10 hover:border-white/20' : 'border-gray-200/20 hover:border-gray-300/30'
                  } rounded-3xl transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden`}>
                    
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                    
                    <CardContent className="relative p-8 text-center">
                      {/* Step Number */}
                      <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-2xl font-bold text-white">{step.step}</span>
                      </div>
                      
                      {/* Icon */}
                      <div className={`w-12 h-12 mx-auto mb-4 rounded-xl ${
                        isDarkMode ? 'bg-white/10' : 'bg-gray-900/10'
                      } backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <step.icon className="w-6 h-6 text-blue-400" />
                      </div>
                      
                      <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {step.title}
                      </h3>
                      
                      <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                  
                  {/* Connection Arrow */}
                  {index < 2 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <div className={`w-8 h-8 rounded-full ${
                        isDarkMode ? 'bg-white/10' : 'bg-gray-900/10'
                      } backdrop-blur-sm flex items-center justify-center`}>
                        <ArrowRight className="w-4 h-4 text-blue-400" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Preview */}
      <section ref={demoRef} className={`py-20 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-black/10' : 'bg-white/30'} backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className={`inline-flex items-center px-6 py-3 rounded-full ${
              isDarkMode ? 'bg-white/10' : 'bg-gray-900/10'
            } backdrop-blur-sm border ${
              isDarkMode ? 'border-white/20' : 'border-gray-200/30'
            } shadow-lg mb-6`}>
              <MousePointer className="w-4 h-4 mr-2 text-blue-400" />
              <span className="text-sm font-medium">Interactive Experience</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Try Our
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Layout Builder
              </span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Experience the power of our visual parking layout designer
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className={`${
              isDarkMode ? 'bg-white/5' : 'bg-white/20'
            } backdrop-blur-xl border ${
              isDarkMode ? 'border-white/10' : 'border-gray-200/20'
            } rounded-3xl overflow-hidden shadow-2xl`}>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Smart Parking Layout Demo
                  </h3>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Hover over parking slots to see real-time status
                  </p>
                </div>

                {/* Demo Parking Layout */}
                <div className={`relative ${
                  isDarkMode ? 'bg-gray-900/30' : 'bg-gray-100/30'
                } backdrop-blur-sm rounded-2xl p-8 min-h-[300px] border ${
                  isDarkMode ? 'border-white/5' : 'border-gray-200/20'
                }`}>
                  
                  {/* Parking Slots */}
                  <div className="relative">
                    {parkingSlots.map((slot) => (
                      <div
                        key={slot.id}
                        className={`absolute w-16 h-10 rounded-lg cursor-pointer transition-all duration-300 border-2 ${
                          slot.status === 'available' 
                            ? 'bg-green-500/20 border-green-400 hover:bg-green-500/30' 
                            : slot.status === 'occupied'
                            ? 'bg-red-500/20 border-red-400 hover:bg-red-500/30'
                            : 'bg-yellow-500/20 border-yellow-400 hover:bg-yellow-500/30'
                        } hover:scale-110 group`}
                        style={{
                          left: `${slot.position.x}px`,
                          top: `${slot.position.y}px`
                        }}
                        onMouseEnter={() => setSelectedSlot(slot)}
                        onMouseLeave={() => setSelectedSlot(null)}
                      >
                        {/* Slot Icon */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          {slot.type === 'ev' ? (
                            <Zap className="w-4 h-4 text-yellow-400" />
                          ) : slot.type === 'handicapped' ? (
                            <Users className="w-4 h-4 text-blue-400" />
                          ) : slot.type === 'vip' ? (
                            <Star className="w-4 h-4 text-purple-400" />
                          ) : (
                            <Car className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                        
                        {/* Tooltip */}
                        {selectedSlot?.id === slot.id && (
                          <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-2 ${
                            isDarkMode ? 'bg-gray-800' : 'bg-white'
                          } backdrop-blur-sm rounded-lg shadow-lg border ${
                            isDarkMode ? 'border-white/10' : 'border-gray-200'
                          } text-xs font-medium whitespace-nowrap z-10`}>
                            {slot.type.charAt(0).toUpperCase() + slot.type.slice(1)} Slot - {
                              slot.status.charAt(0).toUpperCase() + slot.status.slice(1)
                            }
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {/* Legend */}
                    <div className="absolute bottom-4 right-4">
                      <div className={`${
                        isDarkMode ? 'bg-white/10' : 'bg-gray-900/10'
                      } backdrop-blur-sm rounded-xl p-4 space-y-2`}>
                        <div className="flex items-center space-x-2 text-sm">
                          <div className="w-3 h-3 bg-green-500 rounded" />
                          <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Available</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <div className="w-3 h-3 bg-red-500 rounded" />
                          <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Occupied</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <div className="w-3 h-3 bg-yellow-500 rounded" />
                          <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Reserved</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-8">
                  <Button 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-2xl font-semibold shadow-2xl hover:scale-105 transition-all duration-300"
                    onClick={handleGetStarted}
                  >
                    Try Layout Builder
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Choose Your
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Perfect Plan
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Flexible pricing options designed to grow with your parking business
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Starter",
                price: "Free",
                period: "Forever",
                description: "Perfect for getting started",
                features: [
                  "Up to 50 parking spaces",
                  "Basic analytics dashboard",
                  "Mobile app access",
                  "Email support",
                  "Standard integrations"
                ],
                gradient: "from-gray-500 to-gray-600",
                popular: false
              },
              {
                name: "Professional",
                price: "$99",
                period: "per month",
                description: "Most popular for growing businesses",
                features: [
                  "Up to 500 parking spaces",
                  "AI-powered detection",
                  "Real-time analytics",
                  "Dynamic pricing engine",
                  "Camera integrations",
                  "Advanced reporting",
                  "Priority support",
                  "API access"
                ],
                gradient: "from-blue-500 to-purple-600",
                popular: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "Contact us",
                description: "For large-scale operations",
                features: [
                  "Unlimited parking spaces",
                  "Multi-location management",
                  "White-label branding",
                  "Custom integrations",
                  "Dedicated support manager",
                  "Edge computing deployment",
                  "Custom training",
                  "SLA guarantee"
                ],
                gradient: "from-purple-500 to-pink-600",
                popular: false
              }
            ].map((plan, index) => (
              <Card 
                key={index}
                className={`relative bg-gray-800/50 backdrop-blur-xl border transition-all duration-300 hover:scale-105 ${
                  plan.popular 
                    ? 'border-blue-500/50 shadow-2xl shadow-blue-500/20' 
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-400 mb-4">{plan.description}</p>
                    <div className="mb-6">
                      <span className={`text-4xl font-bold bg-gradient-to-r ${plan.gradient} bg-clip-text text-transparent`}>
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-gray-400 ml-2">/{plan.period}</span>
                      )}
                    </div>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-300">
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center mr-3 flex-shrink-0`}>
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                        : 'bg-gray-700 hover:bg-gray-600'
                    } text-white`}
                  >
                    {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-black/5' : 'bg-white/20'} backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Trusted by
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Parking Leaders
              </span>
            </h2>
            <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              See what parking operators around the world are saying about TuniPark
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <Card className={`${
                      isDarkMode ? 'bg-white/5' : 'bg-white/20'
                    } backdrop-blur-xl border ${
                      isDarkMode ? 'border-white/10' : 'border-gray-200/20'
                    } rounded-3xl shadow-2xl`}>
                      <CardContent className="p-8 text-center">
                        <div className="flex justify-center mb-6">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        
                        <blockquote className={`text-xl md:text-2xl font-medium mb-8 leading-relaxed ${
                          isDarkMode ? 'text-gray-100' : 'text-gray-800'
                        }`}>
                          "{testimonial.content}"
                        </blockquote>
                        
                        <div className="flex items-center justify-center space-x-4">
                          <div className={`w-16 h-16 rounded-full ${
                            isDarkMode ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-gradient-to-br from-blue-400 to-purple-500'
                          } flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                            {testimonial.avatar}
                          </div>
                          <div className="text-left">
                            <div className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {testimonial.name}
                            </div>
                            <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {testimonial.role}
                            </div>
                            <div className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                              {testimonial.company}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentTestimonial === index
                      ? 'bg-blue-400 scale-125'
                      : isDarkMode 
                        ? 'bg-white/30 hover:bg-white/50' 
                        : 'bg-gray-400/50 hover:bg-gray-400/70'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentTestimonial((prev) => prev === 0 ? testimonials.length - 1 : prev - 1)}
              className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full ${
                isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-900/10 hover:bg-gray-900/20'
              } backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
              className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full ${
                isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-900/10 hover:bg-gray-900/20'
              } backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Leading Parking Operators
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Choose TuniPark
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: TrendingUp,
                value: "300%",
                label: "Revenue Increase",
                description: "Average revenue boost with dynamic pricing"
              },
              {
                icon: Clock,
                value: "85%",
                label: "Time Saved",
                description: "Reduction in manual operations"
              },
              {
                icon: Eye,
                value: "99.2%",
                label: "AI Accuracy",
                description: "Vehicle detection precision rate"
              },
              {
                icon: Users,
                value: "50K+",
                label: "Happy Users",
                description: "Satisfied parking operators worldwide"
              }
            ].map((benefit, index) => (
              <Card key={index} className="bg-gray-800/30 backdrop-blur-xl border border-white/10 text-center group hover:scale-105 transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    {benefit.value}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{benefit.label}</h3>
                  <p className="text-gray-400 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & CTA Banner */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-black/5' : 'bg-white/20'} backdrop-blur-sm relative overflow-hidden`}>
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <Card className={`${
            isDarkMode ? 'bg-white/5' : 'bg-white/20'
          } backdrop-blur-xl border ${
            isDarkMode ? 'border-white/10' : 'border-gray-200/20'
          } rounded-3xl shadow-2xl overflow-hidden`}>
            <CardContent className="p-12 text-center">
              {/* Chat bubble animation */}
              <div className="mb-8">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${
                  isDarkMode ? 'bg-gradient-to-br from-blue-500 to-purple-600' : 'bg-gradient-to-br from-blue-400 to-purple-500'
                } shadow-2xl animate-bounce`}>
                  <MessageCircle className="w-10 h-10 text-white" />
                </div>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your
                <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Parking Operations?
                </span>
              </h2>
              
              <p className={`text-xl mb-8 max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Join thousands of parking operators who have already digitized and automated their parking management with TuniPark.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button 
                  onClick={handleGetStarted}
                  className={`group px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.3)]'
                  } text-white shadow-2xl hover:scale-105 hover:shadow-blue-500/25`}
                >
                  <div className="flex items-center justify-center">
                    <Rocket className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                    Start Free Trial Today
                  </div>
                </button>
                
                <button className={`group px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/10 hover:border-white/30' 
                    : 'bg-gray-900/5 backdrop-blur-sm border border-gray-200/30 hover:bg-gray-900/10 hover:border-gray-300/40'
                } hover:scale-105`}>
                  <div className="flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Talk to Support
                  </div>
                </button>
              </div>

              <div className="mt-12 text-center">
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Still have questions? Let's chat.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Glassmorphic Footer */}
      <footer className={`${
        isDarkMode ? 'border-t border-white/10 bg-black/20' : 'border-t border-gray-200/20 bg-white/10'
      } backdrop-blur-xl py-16 px-4 sm:px-6 lg:px-8`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 rounded-2xl ${
                  isDarkMode ? 'bg-white/10' : 'bg-gray-900/10'
                } backdrop-blur-sm flex items-center justify-center shadow-lg`}>
                  <Car className={`w-7 h-7 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  TuniPark
                </span>
              </div>
              <p className={`max-w-md leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Smart parking management platform for the future of urban mobility. Empowering parking owners with AI-powered automation and analytics.
              </p>
              
              {/* Theme & Language Controls */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Sun className="w-4 h-4" />
                  <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
                  <Moon className="w-4 h-4" />
                </div>
                <div className={`px-3 py-2 rounded-lg ${
                  isDarkMode ? 'bg-white/10' : 'bg-gray-900/10'
                } backdrop-blur-sm border ${
                  isDarkMode ? 'border-white/20' : 'border-gray-200/30'
                } flex items-center space-x-2`}>
                  <Languages className="w-4 h-4" />
                  <span className="text-sm font-medium">EN</span>
                  <ChevronDown className="w-3 h-3" />
                </div>
              </div>
            </div>
            
            {/* Links Sections */}
            <div>
              <h3 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Platform</h3>
              <div className={`space-y-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <div className="hover:text-blue-400 transition-colors cursor-pointer">AI Detection</div>
                <div className="hover:text-blue-400 transition-colors cursor-pointer">Smart Pricing</div>
                <div className="hover:text-blue-400 transition-colors cursor-pointer">Mobile Apps</div>
                <div className="hover:text-blue-400 transition-colors cursor-pointer">Live Demo</div>
              </div>
            </div>
            
            <div>
              <h3 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Resources</h3>
              <div className={`space-y-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <div className="hover:text-blue-400 transition-colors cursor-pointer">Documentation</div>
                <div className="hover:text-blue-400 transition-colors cursor-pointer">API Reference</div>
                <div className="hover:text-blue-400 transition-colors cursor-pointer">Integration Guide</div>
                <div className="hover:text-blue-400 transition-colors cursor-pointer">Support Center</div>
              </div>
            </div>
            
            <div>
              <h3 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Company</h3>
              <div className={`space-y-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <div className="hover:text-blue-400 transition-colors cursor-pointer">About Us</div>
                <div className="hover:text-blue-400 transition-colors cursor-pointer">Careers</div>
                <div className="hover:text-blue-400 transition-colors cursor-pointer">Partners</div>
                <div className="hover:text-blue-400 transition-colors cursor-pointer">Contact</div>
              </div>
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className={`border-t ${
            isDarkMode ? 'border-white/10' : 'border-gray-200/20'
          } mt-12 pt-8`}>
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className={`text-center md:text-left ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <p>&copy; 2025 TuniPark by SmartPark Systems. All rights reserved.</p>
                <p className="text-sm mt-1">Revolutionizing parking management worldwide.</p>
              </div>
              
              {/* Social Media Icons */}
              <div className="flex items-center space-x-4">
                {[
                  { icon: Github, label: 'GitHub' },
                  { icon: Mail, label: 'Email' },
                  { icon: Phone, label: 'Phone' }
                ].map((social, index) => (
                  <button
                    key={index}
                    className={`w-10 h-10 rounded-xl ${
                      isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-900/10 hover:bg-gray-900/20'
                    } backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110 group`}
                  >
                    <social.icon className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 ${
        isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'
      } backdrop-blur-xl border-t ${
        isDarkMode ? 'border-white/10' : 'border-gray-200/20'
      } px-4 py-3`}>
        <div className="flex justify-between items-center">
          <button 
            onClick={() => scrollToSection(heroRef)}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
              isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'
            }`}
          >
            <Car className="w-5 h-5" />
            <span className="text-xs font-medium">Home</span>
          </button>
          <button 
            onClick={() => scrollToSection(featuresRef)}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
              isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'
            }`}
          >
            <Layers className="w-5 h-5" />
            <span className="text-xs font-medium">Features</span>
          </button>
          <button 
            onClick={() => scrollToSection(demoRef)}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
              isDarkMode ? 'hover:bg-white/10' : 'hover:bg-gray-100'
            }`}
          >
            <Video className="w-5 h-5" />
            <span className="text-xs font-medium">Demo</span>
          </button>
          <button 
            onClick={handleGetStarted}
            className="flex flex-col items-center space-y-1 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white"
          >
            <Rocket className="w-5 h-5" />
            <span className="text-xs font-medium">Start</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
