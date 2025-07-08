import { MainLayout } from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, CheckCircle, Star, Zap, Shield, Users } from 'lucide-react';

const Subscription = () => {
  const currentPlan = {
    name: 'Professional',
    price: 49,
    billingCycle: 'monthly',
    features: [
      'Up to 50 parking spaces',
      'AI-powered analytics',
      'Camera integration',
      'Real-time monitoring',
      '24/7 support',
      'Custom reporting'
    ],
    nextBilling: '2024-02-08',
    status: 'active'
  };

  const plans = [
    {
      name: 'Starter',
      price: 19,
      originalPrice: null,
      popular: false,
      features: [
        'Up to 10 parking spaces',
        'Basic monitoring',
        'Mobile app access',
        'Email support',
        'Standard reports'
      ],
      limitations: [
        'No AI analytics',
        'No camera integration'
      ]
    },
    {
      name: 'Professional',
      price: 49,
      originalPrice: 59,
      popular: true,
      features: [
        'Up to 50 parking spaces',
        'AI-powered analytics',
        'Camera integration',
        'Real-time monitoring',
        '24/7 support',
        'Custom reporting',
        'API access'
      ],
      limitations: []
    },
    {
      name: 'Enterprise',
      price: 99,
      originalPrice: null,
      popular: false,
      features: [
        'Unlimited parking spaces',
        'Advanced AI features',
        'Multiple camera support',
        'White-label solution',
        'Priority support',
        'Custom integrations',
        'Dedicated account manager',
        'SLA guarantee'
      ],
      limitations: []
    }
  ];

  const usage = [
    { metric: 'Parking Spaces', current: 32, limit: 50, percentage: 64 },
    { metric: 'AI Analytics Calls', current: 1250, limit: 2000, percentage: 62.5 },
    { metric: 'API Requests', current: 8500, limit: 10000, percentage: 85 },
    { metric: 'Storage Used', current: 2.3, limit: 5, percentage: 46, unit: 'GB' }
  ];

  const billingHistory = [
    { date: '2024-01-08', amount: 49.00, status: 'paid', invoice: 'INV-001' },
    { date: '2023-12-08', amount: 49.00, status: 'paid', invoice: 'INV-002' },
    { date: '2023-11-08', amount: 49.00, status: 'paid', invoice: 'INV-003' },
    { date: '2023-10-08', amount: 49.00, status: 'paid', invoice: 'INV-004' }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Subscription</h1>
            <p className="text-gray-600">Manage your TuniPark subscription and billing</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <CreditCard className="w-4 h-4 mr-2" />
            Update Payment
          </Button>
        </div>

        {/* Current Plan */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Current Plan</CardTitle>
              <Badge className="bg-green-100 text-green-800">
                {currentPlan.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{currentPlan.name}</h3>
                <p className="text-3xl font-bold text-blue-600">
                  ${currentPlan.price}
                  <span className="text-sm font-normal text-gray-500">/{currentPlan.billingCycle}</span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Next billing: {new Date(currentPlan.nextBilling).toLocaleDateString()}
                </p>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline">Change Plan</Button>
                <Button variant="outline">Cancel Subscription</Button>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="font-medium text-gray-900 mb-2">Plan Features:</h4>
              <div className="grid grid-cols-2 gap-2">
                {currentPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Usage This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {usage.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{item.metric}</span>
                    <span className="text-sm text-gray-500">
                      {item.current}{item.unit || ''} / {item.limit}{item.unit || ''}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        item.percentage > 80 ? 'bg-red-500' : 
                        item.percentage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">{item.percentage}% used</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Available Plans */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Available Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-blue-500 border-2' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-3 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader>
                  <CardTitle className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      {plan.name === 'Starter' && <Users className="w-5 h-5 text-green-600" />}
                      {plan.name === 'Professional' && <Zap className="w-5 h-5 text-blue-600" />}
                      {plan.name === 'Enterprise' && <Shield className="w-5 h-5 text-purple-600" />}
                      <span>{plan.name}</span>
                    </div>
                    
                    <div className="text-center">
                      <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                      <span className="text-gray-500">/month</span>
                      {plan.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          Was ${plan.originalPrice}/month
                        </div>
                      )}
                    </div>
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                    
                    {plan.limitations.map((limitation, limitIndex) => (
                      <div key={limitIndex} className="flex items-center space-x-2 opacity-50">
                        <div className="w-4 h-4 rounded-full border border-gray-300 flex-shrink-0"></div>
                        <span className="text-sm text-gray-500">{limitation}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full mt-6 ${
                      currentPlan.name === plan.name 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                        : plan.popular 
                          ? 'bg-blue-600 hover:bg-blue-700' 
                          : 'bg-gray-900 hover:bg-gray-800'
                    }`}
                    disabled={currentPlan.name === plan.name}
                  >
                    {currentPlan.name === plan.name ? 'Current Plan' : 'Upgrade'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Billing History */}
        <Card>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {billingHistory.map((bill, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-green-100 rounded-full">
                      <CreditCard className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{bill.invoice}</p>
                      <p className="text-sm text-gray-600">{new Date(bill.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-gray-900">${bill.amount.toFixed(2)}</span>
                    <Badge className="bg-green-100 text-green-800">
                      {bill.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Subscription;