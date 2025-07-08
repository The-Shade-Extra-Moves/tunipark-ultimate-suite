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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/90 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">TuniPark</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
              <a href="#pricing" className="hover:text-blue-400 transition-colors">Pricing</a>
              <a href="#demo" className="hover:text-blue-400 transition-colors">Live Demo</a>
              <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
              <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-in slide-in-from-left duration-1000">
              <div className="space-y-6">
                <Badge variant="outline" className="border-blue-400/30 text-blue-400 bg-blue-400/10">
                  <Car className="w-3 h-3 mr-1" />
                  Smart Parking SaaS Platform - AI Powered
                </Badge>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  Revolutionize
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Parking Management
                  </span>
                  <br />
                  with AI & IoT
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                  TuniPark is a cloud-based SaaS platform that empowers parking owners to manage, monitor, monetize, and optimize parking locations using advanced AI, IoT, and smart reservation systems.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl shadow-blue-500/25 group"
                  onClick={handleGetStarted}
                >
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/20 text-white hover:bg-white/10 group"
                >
                  <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Watch Live Demo
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                      <stat.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual - Dashboard Mockup */}
            <div className="relative animate-in slide-in-from-right duration-1000 delay-300">
              <div className="relative">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl" />
                
                {/* Dashboard Mockup */}
                <Card className="relative bg-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                  <CardContent className="p-0">
                    {/* Mockup Header */}
                    <div className="flex items-center justify-between p-4 border-b border-white/10">
                      <div className="flex items-center space-x-3">
                        <div className="flex space-x-1">
                          <div className="w-3 h-3 bg-red-500 rounded-full" />
                          <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                          <div className="w-3 h-3 bg-green-500 rounded-full" />
                        </div>
                        <span className="text-sm text-gray-400">TuniPark Dashboard</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Settings className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>

                    {/* Mockup Content */}
                    <div className="p-6 space-y-6">
                      {/* Feature Cards */}
                      <div className="grid grid-cols-2 gap-4">
                        {features.map((feature, index) => (
                          <Card 
                            key={index}
                            className={`bg-gradient-to-br ${feature.color} p-4 border-0 transition-all duration-500 hover:scale-105 ${
                              currentFeature === index ? 'ring-2 ring-white/30 shadow-lg' : ''
                            }`}
                          >
                            <CardContent className="p-0">
                              <feature.icon className="w-6 h-6 text-white mb-2" />
                              <h3 className="font-semibold text-white text-sm">{feature.title}</h3>
                              <p className="text-white/80 text-xs">{feature.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      {/* Progress Bars */}
                      <div className="space-y-3">
                        {['Occupancy Rate', 'Revenue Growth', 'AI Accuracy', 'User Satisfaction'].map((item, index) => (
                          <div key={index} className="space-y-1">
                            <div className="flex justify-between text-xs text-gray-400">
                              <span>{item}</span>
                              <span>{87 + index * 3}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                                style={{ width: `${87 + index * 3}%` }}
                              />
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
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need for
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Smart Parking Management
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From AI-powered detection to dynamic pricing, TuniPark provides a complete ecosystem for modern parking operations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Car,
                title: "Multi-Parking Management",
                description: "Manage multiple locations from one dashboard. Assign staff to each parking and view global metrics or drill into specific sites.",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: Palette,
                title: "Visual Layout Designer",
                description: "Drag-and-drop interface for parking slot layout. Define slot types, create zones, and view layout maps in real-time.",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Camera,
                title: "Camera & AI Integration",
                description: "Connect RTSP/IP cameras with AI detection, IoT sensor support, and live feed monitoring per slot or zone.",
                gradient: "from-yellow-500 to-orange-500"
              },
              {
                icon: Brain,
                title: "AI-Powered Automation",
                description: "Vehicle presence detection, license plate recognition, smart predictions, and unauthorized entry detection.",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                icon: DollarSign,
                title: "Dynamic Pricing Engine",
                description: "Per-slot pricing control, hourly/daily/subscription options, promo codes, and smart demand-based pricing.",
                gradient: "from-indigo-500 to-blue-500"
              },
              {
                icon: Calendar,
                title: "Smart Reservations",
                description: "Instant or scheduled booking, auto slot locking, no-show rules, and QR access for repeat customers.",
                gradient: "from-pink-500 to-red-500"
              },
              {
                icon: BarChart3,
                title: "Real-Time Analytics",
                description: "Live status tracking, occupancy heatmaps, traffic forecasting, and comprehensive revenue dashboards.",
                gradient: "from-teal-500 to-green-500"
              },
              {
                icon: CreditCard,
                title: "Revenue Management",
                description: "Daily/weekly/monthly reports, revenue by slot/zone, payout tracking, and automated invoice generation.",
                gradient: "from-orange-500 to-red-500"
              },
              {
                icon: Users,
                title: "User & Staff Management",
                description: "Role-based access control, email/QR invitations, audit logs, and staff restrictions per location.",
                gradient: "from-violet-500 to-purple-500"
              },
              {
                icon: Globe,
                title: "API & Integrations",
                description: "Share live availability to partners, fleet integration, access tokens, and webhooks for real-time events.",
                gradient: "from-cyan-500 to-blue-500"
              },
              {
                icon: Shield,
                title: "Security & Privacy",
                description: "GDPR-compliant with data anonymization, license plate masking, 2FA, and secure edge-to-cloud communication.",
                gradient: "from-red-500 to-pink-500"
              },
              {
                icon: Cpu,
                title: "Edge Computing Support",
                description: "Deploy AI modules locally on Jetson/Raspberry Pi, sync with cloud periodically, and offline fallback capabilities.",
                gradient: "from-emerald-500 to-teal-500"
              }
            ].map((feature, index) => (
              <Card 
                key={index}
                className="bg-gray-800/50 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 group hover:scale-105"
              >
                <CardContent className="p-6">
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
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

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Parking Operations?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of parking operators who have already digitized and automated their parking management with TuniPark.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl shadow-blue-500/25"
              onClick={handleGetStarted}
            >
              Start Free Trial Today
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Car className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">TuniPark</span>
              </div>
              <p className="text-gray-400">
                Smart parking management platform for the future of urban mobility.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <div className="space-y-2 text-gray-400">
                <div>AI Detection</div>
                <div>Smart Pricing</div>
                <div>Mobile Apps</div>
                <div>Live Demo</div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <div className="space-y-2 text-gray-400">
                <div>Documentation</div>
                <div>API Reference</div>
                <div>Integration Guide</div>
                <div>Support Center</div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2 text-gray-400">
                <div>About Us</div>
                <div>Careers</div>
                <div>Partners</div>
                <div>Contact</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TuniPark. All rights reserved. Revolutionizing parking management worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
