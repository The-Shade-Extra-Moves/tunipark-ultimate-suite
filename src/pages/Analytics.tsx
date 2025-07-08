import { MainLayout } from '@/components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, TrendingUp, Users, Clock, Download, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';

const Analytics = () => {
  const occupancyData = [
    { hour: '06:00', occupancy: 15, avg: 20 },
    { hour: '08:00', occupancy: 65, avg: 60 },
    { hour: '10:00', occupancy: 85, avg: 80 },
    { hour: '12:00', occupancy: 95, avg: 90 },
    { hour: '14:00', occupancy: 88, avg: 85 },
    { hour: '16:00', occupancy: 92, avg: 88 },
    { hour: '18:00', occupancy: 70, avg: 75 },
    { hour: '20:00', occupancy: 35, avg: 40 }
  ];

  const weeklyTrends = [
    { day: 'Mon', occupancy: 78, revenue: 420, visits: 156 },
    { day: 'Tue', occupancy: 82, revenue: 485, visits: 168 },
    { day: 'Wed', occupancy: 75, revenue: 395, visits: 142 },
    { day: 'Thu', occupancy: 88, revenue: 540, visits: 189 },
    { day: 'Fri', occupancy: 92, revenue: 620, visits: 205 },
    { day: 'Sat', occupancy: 85, revenue: 580, visits: 198 },
    { day: 'Sun', occupancy: 68, revenue: 380, visits: 135 }
  ];

  const peakHours = [
    { time: '12:00-13:00', occupancy: 95, duration: '2.3h' },
    { time: '17:00-18:00', occupancy: 92, duration: '1.8h' },
    { time: '09:00-10:00', occupancy: 88, duration: '3.1h' },
    { time: '14:00-15:00', occupancy: 85, duration: '2.7h' }
  ];

  const userBehavior = [
    { metric: 'Avg. Session Duration', value: '2.4 hours', change: '+8%' },
    { metric: 'Return Rate', value: '68%', change: '+12%' },
    { metric: 'Peak Usage', value: '12:00 PM', change: 'Consistent' },
    { metric: 'Avg. Revenue/Visit', value: '$4.20', change: '+15%' }
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600">Deep insights into parking performance and user behavior</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-full">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg. Occupancy</p>
                  <p className="text-2xl font-bold text-blue-600">82%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-full">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Efficiency</p>
                  <p className="text-2xl font-bold text-green-600">94.2%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Daily Visitors</p>
                  <p className="text-2xl font-bold text-purple-600">193</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-full">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Avg. Duration</p>
                  <p className="text-2xl font-bold text-orange-600">2.4h</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="occupancy" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
            <TabsTrigger value="trends">Weekly Trends</TabsTrigger>
            <TabsTrigger value="peaks">Peak Analysis</TabsTrigger>
            <TabsTrigger value="behavior">User Behavior</TabsTrigger>
          </TabsList>

          <TabsContent value="occupancy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Hourly Occupancy Pattern</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={occupancyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="occupancy" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="avg" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="font-medium text-gray-900">Peak Hour</h3>
                    <p className="text-2xl font-bold text-blue-600">12:00 PM</p>
                    <p className="text-sm text-gray-500">95% occupancy</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="font-medium text-gray-900">Low Hour</h3>
                    <p className="text-2xl font-bold text-green-600">6:00 AM</p>
                    <p className="text-sm text-gray-500">15% occupancy</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="font-medium text-gray-900">Efficiency</h3>
                    <p className="text-2xl font-bold text-purple-600">94.2%</p>
                    <p className="text-sm text-gray-500">vs target 90%</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="occupancy" stroke="#3B82F6" strokeWidth={2} />
                    <Line type="monotone" dataKey="visits" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={weeklyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="peaks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Peak Hours Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {peakHours.map((peak, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">{peak.time}</h3>
                        <p className="text-sm text-gray-600">Avg. duration: {peak.duration}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">{peak.occupancy}%</p>
                        <p className="text-sm text-gray-500">occupancy</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Busiest Day</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">Friday</p>
                    <p className="text-sm text-gray-500">92% avg occupancy</p>
                    <p className="text-sm text-gray-500">205 visitors</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Quietest Day</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">Sunday</p>
                    <p className="text-sm text-gray-500">68% avg occupancy</p>
                    <p className="text-sm text-gray-500">135 visitors</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="behavior" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {userBehavior.map((metric, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h3 className="font-medium text-gray-900 mb-2">{metric.metric}</h3>
                      <p className="text-2xl font-bold text-blue-600">{metric.value}</p>
                      <p className="text-sm text-green-600">{metric.change}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>User Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Top Findings</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• 68% of users return within 30 days</li>
                      <li>• Peak usage consistently at lunch hours</li>
                      <li>• EV charging spots have 23% longer stays</li>
                      <li>• Weekend usage peaks later in the day</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Recommendations</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Consider dynamic pricing during peak hours</li>
                      <li>• Promote weekend early bird specials</li>
                      <li>• Expand EV charging infrastructure</li>
                      <li>• Implement loyalty program for frequent users</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Analytics;