import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  MessageSquare, 
  Bell, 
  Settings, 
  Phone, 
  Mail, 
  Calendar,
  CheckCircle,
  Clock,
  AlertTriangle,
  MessageCircle,
  Download,
  Send,
  Edit,
  Save
} from 'lucide-react';

export function ParentCommunication({
  preferences: initialPreferences = {
    whatsappAlerts: true,
    emailNotifications: true,
    smsAlerts: false,
    attendanceAlerts: true,
    examAlerts: true,
    feeAlerts: true,
    emergencyAlerts: true,
    phoneNumber: '+1-234-567-8900',
    email: 'parent@example.com',
    preferredTime: 'morning',
    language: 'english'
  },
  communicationHistory = [
    {
      id: '1',
      type: 'whatsapp',
      subject: 'Attendance Alert',
      message: 'Your child was absent from Data Structures class today (Jan 15, 2024)',
      sentDate: '2024-01-15 10:30 AM',
      status: 'read',
      category: 'attendance'
    },
    {
      id: '2',
      type: 'email',
      subject: 'Mid-term Exam Schedule',
      message: 'Mid-term examinations will begin on February 1st, 2024. Please find the detailed schedule attached.',
      sentDate: '2024-01-14 02:15 PM',
      status: 'delivered',
      category: 'exam'
    },
    {
      id: '3',
      type: 'sms',
      subject: 'Fee Payment Reminder',
      message: 'Semester fee payment is due by January 20th, 2024. Amount: $2,500',
      sentDate: '2024-01-13 09:00 AM',
      status: 'sent',
      category: 'fee'
    },
    {
      id: '4',
      type: 'whatsapp',
      subject: 'Academic Achievement',
      message: 'Congratulations! Your child has been placed on the Dean\'s List for exceptional academic performance.',
      sentDate: '2024-01-12 11:45 AM',
      status: 'read',
      category: 'general'
    }
  ]
}) {
  const [preferences, setPreferences] = useState(initialPreferences);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredHistory = communicationHistory.filter(record => 
    selectedCategory === 'all' || record.category === selectedCategory
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sent':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-primary" />;
      case 'read':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'failed':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'whatsapp':
        return <MessageCircle className="h-4 w-4 text-green-500" />;
      case 'email':
        return <Mail className="h-4 w-4 text-blue-500" />;
      case 'sms':
        return <MessageSquare className="h-4 w-4 text-purple-500" />;
      default:
        return null;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'attendance':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'exam':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'fee':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'emergency':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'general':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleSavePreferences = () => {
    // Save preferences logic
    setIsEditing(false);
    console.log('Preferences saved:', preferences);
  };

  const statistics = {
    totalMessages: communicationHistory.length,
    whatsappCount: communicationHistory.filter(r => r.type === 'whatsapp').length,
    emailCount: communicationHistory.filter(r => r.type === 'email').length,
    smsCount: communicationHistory.filter(r => r.type === 'sms').length,
    readRate: Math.round((communicationHistory.filter(r => r.status === 'read').length / communicationHistory.length) * 100)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="shadow-card">
          <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Phone className="h-6 w-6" />
              Parent Communication Portal
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{statistics.totalMessages}</div>
              <p className="text-sm text-muted-foreground">Total Messages</p>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-500">{statistics.whatsappCount}</div>
              <p className="text-sm text-muted-foreground">WhatsApp</p>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-500">{statistics.emailCount}</div>
              <p className="text-sm text-muted-foreground">Email</p>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">{statistics.readRate}%</div>
              <p className="text-sm text-muted-foreground">Read Rate</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="preferences" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="preferences" className="gap-2">
              <Settings className="h-4 w-4" />
              Preferences
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Communication History
            </TabsTrigger>
            <TabsTrigger value="emergency" className="gap-2">
              <AlertTriangle className="h-4 w-4" />
              Emergency Contacts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preferences">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Communication Preferences */}
              <Card className="shadow-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notification Preferences
                    </CardTitle>
                    <Button
                      variant={isEditing ? "default" : "outline"}
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                      className="gap-2"
                    >
                      {isEditing ? (
                        <>
                          <Save className="h-4 w-4" />
                          Save
                        </>
                      ) : (
                        <>
                          <Edit className="h-4 w-4" />
                          Edit
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Notification Channels */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-sm">Communication Channels</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MessageCircle className="h-4 w-4 text-green-500" />
                          <Label htmlFor="whatsapp">WhatsApp Alerts</Label>
                        </div>
                        <Switch
                          id="whatsapp"
                          checked={preferences.whatsappAlerts}
                          onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, whatsappAlerts: checked }))}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-blue-500" />
                          <Label htmlFor="email">Email Notifications</Label>
                        </div>
                        <Switch
                          id="email"
                          checked={preferences.emailNotifications}
                          onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, emailNotifications: checked }))}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-purple-500" />
                          <Label htmlFor="sms">SMS Alerts</Label>
                        </div>
                        <Switch
                          id="sms"
                          checked={preferences.smsAlerts}
                          onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, smsAlerts: checked }))}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Alert Types */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-sm">Alert Types</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="attendance">Attendance Alerts</Label>
                        <Switch
                          id="attendance"
                          checked={preferences.attendanceAlerts}
                          onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, attendanceAlerts: checked }))}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="exam">Exam Notifications</Label>
                        <Switch
                          id="exam"
                          checked={preferences.examAlerts}
                          onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, examAlerts: checked }))}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="fee">Fee Reminders</Label>
                        <Switch
                          id="fee"
                          checked={preferences.feeAlerts}
                          onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, feeAlerts: checked }))}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="emergency">Emergency Alerts</Label>
                        <Switch
                          id="emergency"
                          checked={preferences.emergencyAlerts}
                          onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, emergencyAlerts: checked }))}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <Button onClick={handleSavePreferences} className="w-full gap-2">
                      <Save className="h-4 w-4" />
                      Save Preferences
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={preferences.phoneNumber}
                      onChange={(e) => setPreferences(prev => ({ ...prev, phoneNumber: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-input">Email Address</Label>
                    <Input
                      id="email-input"
                      type="email"
                      value={preferences.email}
                      onChange={(e) => setPreferences(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Preferred Communication Time</Label>
                    <Select 
                      value={preferences.preferredTime} 
                      onValueChange={(value) => setPreferences(prev => ({ ...prev, preferredTime: value }))}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning (8 AM - 12 PM)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (12 PM - 6 PM)</SelectItem>
                        <SelectItem value="evening">Evening (6 PM - 9 PM)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Language Preference</Label>
                    <Select 
                      value={preferences.language} 
                      onValueChange={(value) => setPreferences(prev => ({ ...prev, language: value }))}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Communication History</CardTitle>
                  <div className="flex gap-2">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="attendance">Attendance</SelectItem>
                        <SelectItem value="exam">Exams</SelectItem>
                        <SelectItem value="fee">Fees</SelectItem>
                        <SelectItem value="emergency">Emergency</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Sent Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredHistory.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getTypeIcon(record.type)}
                            <span className="capitalize">{record.type}</span>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <div>
                            <p className="font-medium text-sm">{record.subject}</p>
                            <p className="text-xs text-muted-foreground line-clamp-1">{record.message}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`text-xs ${getCategoryColor(record.category)}`}>
                            {record.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{record.sentDate}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(record.status)}
                            <span className="text-sm capitalize">{record.status}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="emergency">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Emergency Contact Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <h4 className="font-semibold text-destructive">Emergency Protocol</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    In case of emergencies, parents will be contacted immediately through all enabled channels. 
                    Emergency alerts cannot be disabled and have the highest priority.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Primary Emergency Contact</h4>
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input value="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label>Relationship</Label>
                      <Input value="Father" />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone Number</Label>
                      <Input value="+1-234-567-8900" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Secondary Emergency Contact</h4>
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input value="Jane Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label>Relationship</Label>
                      <Input value="Mother" />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone Number</Label>
                      <Input value="+1-234-567-8901" />
                    </div>
                  </div>
                </div>

                <Button className="gap-2">
                  <Save className="h-4 w-4" />
                  Update Emergency Contacts
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}