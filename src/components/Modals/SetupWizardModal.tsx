import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Camera, Zap, DollarSign, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';

interface SetupWizardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSpaceCreated: (space: any) => void;
}

export const SetupWizardModal = ({ open, onOpenChange, onSpaceCreated }: SetupWizardModalProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    id: '',
    name: '',
    zone: '',
    type: 'regular' as 'regular' | 'ev' | 'handicap' | 'xl',
    
    // Step 2: Hardware Setup
    hasCamera: false,
    hasSensor: false,
    cameraIp: '',
    rtspUrl: '',
    sensorType: '',
    
    // Step 3: Pricing
    hourlyRate: '',
    allowReservations: false,
    maxStayHours: '',
    gracePeriodMinutes: '',
    
    // Step 4: Review
  });

  const steps = [
    { id: 1, title: 'Basic Information', icon: MapPin },
    { id: 2, title: 'Hardware Setup', icon: Camera },
    { id: 3, title: 'Pricing & Rules', icon: DollarSign },
    { id: 4, title: 'Review & Finish', icon: CheckCircle }
  ];

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    const newSpace = {
      ...formData,
      status: 'active' as const,
      currentVehicle: undefined,
      revenue24h: 0,
      hourlyRate: parseFloat(formData.hourlyRate) || 5.00
    };

    onSpaceCreated(newSpace);
    onOpenChange(false);
    
    toast({
      title: "Success",
      description: `Parking space ${formData.name} has been set up successfully`
    });

    // Reset form
    setCurrentStep(1);
    setFormData({
      id: '', name: '', zone: '', type: 'regular',
      hasCamera: false, hasSensor: false, cameraIp: '', rtspUrl: '', sensorType: '',
      hourlyRate: '', allowReservations: false, maxStayHours: '', gracePeriodMinutes: ''
    });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.id && formData.name && formData.zone;
      case 2:
        return true; // Hardware is optional
      case 3:
        return formData.hourlyRate;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Parking Space Setup Wizard</DialogTitle>
          <div className="space-y-2">
            <Progress value={(currentStep / totalSteps) * 100} className="w-full" />
            <p className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</p>
          </div>
        </DialogHeader>

        {/* Step Navigation */}
        <div className="flex justify-between mb-6">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            
            return (
              <div
                key={step.id}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                  isActive ? 'bg-blue-100 text-blue-600' : 
                  isCompleted ? 'bg-green-100 text-green-600' : 
                  'bg-gray-100 text-gray-400'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:block">{step.title}</span>
              </div>
            );
          })}
        </div>

        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Basic Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="wizard-id">Space ID *</Label>
                  <Input
                    id="wizard-id"
                    value={formData.id}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                    placeholder="e.g., A1, B5"
                  />
                </div>
                
                <div>
                  <Label htmlFor="wizard-name">Display Name *</Label>
                  <Input
                    id="wizard-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Space A1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="wizard-zone">Zone *</Label>
                <Select value={formData.zone} onValueChange={(value) => setFormData({ ...formData, zone: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Zone A">Zone A</SelectItem>
                    <SelectItem value="Zone B">Zone B</SelectItem>
                    <SelectItem value="Zone C">Zone C</SelectItem>
                    <SelectItem value="Zone D">Zone D</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="wizard-type">Space Type</Label>
                <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="ev">Electric Vehicle</SelectItem>
                    <SelectItem value="handicap">Handicap Accessible</SelectItem>
                    <SelectItem value="xl">XL/Oversized</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Hardware Setup */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Camera className="w-5 h-5" />
                <span>Hardware Setup</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Camera className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Camera System</p>
                      <p className="text-sm text-gray-600">License plate recognition and monitoring</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={formData.hasCamera}
                    onCheckedChange={(checked) => setFormData({ ...formData, hasCamera: !!checked })}
                  />
                </div>

                {formData.hasCamera && (
                  <div className="pl-8 space-y-3 border-l-2 border-blue-200">
                    <div>
                      <Label htmlFor="camera-ip">Camera IP Address</Label>
                      <Input
                        id="camera-ip"
                        value={formData.cameraIp}
                        onChange={(e) => setFormData({ ...formData, cameraIp: e.target.value })}
                        placeholder="192.168.1.100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="rtsp-url">RTSP Stream URL</Label>
                      <Input
                        id="rtsp-url"
                        value={formData.rtspUrl}
                        onChange={(e) => setFormData({ ...formData, rtspUrl: e.target.value })}
                        placeholder="rtsp://192.168.1.100:554/stream1"
                      />
                    </div>
                    <Button variant="outline" size="sm">Test Camera Connection</Button>
                  </div>
                )}

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">Occupancy Sensor</p>
                      <p className="text-sm text-gray-600">Real-time space availability detection</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={formData.hasSensor}
                    onCheckedChange={(checked) => setFormData({ ...formData, hasSensor: !!checked })}
                  />
                </div>

                {formData.hasSensor && (
                  <div className="pl-8 space-y-3 border-l-2 border-green-200">
                    <div>
                      <Label htmlFor="sensor-type">Sensor Type</Label>
                      <Select value={formData.sensorType} onValueChange={(value) => setFormData({ ...formData, sensorType: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select sensor type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ultrasonic">Ultrasonic</SelectItem>
                          <SelectItem value="magnetic">Magnetic</SelectItem>
                          <SelectItem value="infrared">Infrared</SelectItem>
                          <SelectItem value="weight">Weight Sensor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button variant="outline" size="sm">Test Sensor</Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Pricing & Rules */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5" />
                <span>Pricing & Rules</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="wizard-rate">Hourly Rate ($) *</Label>
                <Input
                  id="wizard-rate"
                  type="number"
                  step="0.25"
                  value={formData.hourlyRate}
                  onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                  placeholder="5.00"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="max-stay">Maximum Stay (hours)</Label>
                  <Input
                    id="max-stay"
                    type="number"
                    value={formData.maxStayHours}
                    onChange={(e) => setFormData({ ...formData, maxStayHours: e.target.value })}
                    placeholder="24"
                  />
                </div>
                
                <div>
                  <Label htmlFor="grace-period">Grace Period (minutes)</Label>
                  <Input
                    id="grace-period"
                    type="number"
                    value={formData.gracePeriodMinutes}
                    onChange={(e) => setFormData({ ...formData, gracePeriodMinutes: e.target.value })}
                    placeholder="15"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="wizard-reservations"
                    checked={formData.allowReservations}
                    onCheckedChange={(checked) => setFormData({ ...formData, allowReservations: !!checked })}
                  />
                  <Label htmlFor="wizard-reservations">Allow Reservations</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Review & Finish */}
        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>Review & Finish</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Basic Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Space ID:</span>
                      <span>{formData.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Name:</span>
                      <span>{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Zone:</span>
                      <span>{formData.zone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="capitalize">{formData.type}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Hardware</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Camera:</span>
                      <span>{formData.hasCamera ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sensor:</span>
                      <span>{formData.hasSensor ? 'Yes' : 'No'}</span>
                    </div>
                    {formData.hasSensor && formData.sensorType && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sensor Type:</span>
                        <span className="capitalize">{formData.sensorType}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Pricing</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hourly Rate:</span>
                      <span>${formData.hourlyRate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reservations:</span>
                      <span>{formData.allowReservations ? 'Allowed' : 'Not Allowed'}</span>
                    </div>
                    {formData.maxStayHours && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Max Stay:</span>
                        <span>{formData.maxStayHours}h</span>
                      </div>
                    )}
                    {formData.gracePeriodMinutes && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Grace Period:</span>
                        <span>{formData.gracePeriodMinutes}m</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-6 border-t">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          {currentStep < totalSteps ? (
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              className="flex items-center space-x-2"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleFinish}
              disabled={!canProceed()}
              className="flex items-center space-x-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Create Space</span>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};