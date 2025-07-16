import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  UserCheck, 
  UserX, 
  Clock, 
  Users, 
  CheckCircle, 
  AlertTriangle,
  Calendar as CalendarIcon,
  MapPin,
  QrCode
} from 'lucide-react';

interface AttendanceRecord {
  id: string;
  date: string;
  subject: string;
  status: 'present' | 'absent' | 'late';
  time?: string;
  location?: string;
}

interface AttendanceTrackingProps {
  userRole?: 'student' | 'faculty';
  attendanceData?: AttendanceRecord[];
}

export function AttendanceTracking({ 
  userRole = 'student',
  attendanceData = [
    { id: '1', date: '2024-01-15', subject: 'Data Structures', status: 'present', time: '09:00 AM', location: 'Room 101' },
    { id: '2', date: '2024-01-16', subject: 'Web Development', status: 'present', time: '11:00 AM', location: 'Lab 2' },
    { id: '3', date: '2024-01-17', subject: 'Database Systems', status: 'late', time: '10:15 AM', location: 'Room 205' },
    { id: '4', date: '2024-01-18', subject: 'Machine Learning', status: 'absent' },
    { id: '5', date: '2024-01-19', subject: 'Software Engineering', status: 'present', time: '02:00 PM', location: 'Room 303' },
  ]
}: AttendanceTrackingProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isCheckingIn, setIsCheckingIn] = useState(false);

  // Calculate attendance statistics
  const totalClasses = attendanceData.length;
  const presentClasses = attendanceData.filter(record => record.status === 'present').length;
  const lateClasses = attendanceData.filter(record => record.status === 'late').length;
  const absentClasses = attendanceData.filter(record => record.status === 'absent').length;
  const attendancePercentage = Math.round((presentClasses / totalClasses) * 100);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return 'bg-success';
      case 'late': return 'bg-warning';
      case 'absent': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <UserCheck className="h-4 w-4" />;
      case 'late': return <Clock className="h-4 w-4" />;
      case 'absent': return <UserX className="h-4 w-4" />;
      default: return null;
    }
  };

  const handleCheckIn = () => {
    setIsCheckingIn(true);
    setTimeout(() => {
      setIsCheckingIn(false);
      // Mock successful check-in
    }, 2000);
  };

  if (userRole === 'faculty') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <Card className="shadow-card">
            <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Users className="h-6 w-6" />
                Faculty Attendance Dashboard
              </CardTitle>
            </CardHeader>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Class Overview */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="shadow-card">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Students</p>
                        <p className="text-2xl font-bold">45</p>
                      </div>
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="shadow-card">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Present Today</p>
                        <p className="text-2xl font-bold text-success">42</p>
                      </div>
                      <UserCheck className="h-8 w-8 text-success" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="shadow-card">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Absent Today</p>
                        <p className="text-2xl font-bold text-destructive">3</p>
                      </div>
                      <UserX className="h-8 w-8 text-destructive" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Student List */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Today's Attendance
                    <Badge variant="outline">CS301 - Database Systems</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[
                      { name: 'Alice Johnson', rollNo: 'CS2021001', status: 'present', time: '09:00 AM' },
                      { name: 'Bob Smith', rollNo: 'CS2021002', status: 'present', time: '09:02 AM' },
                      { name: 'Carol Wilson', rollNo: 'CS2021003', status: 'late', time: '09:15 AM' },
                      { name: 'David Brown', rollNo: 'CS2021004', status: 'absent' },
                      { name: 'Eve Davis', rollNo: 'CS2021005', status: 'present', time: '08:58 AM' },
                    ].map((student, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(student.status)}`} />
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-muted-foreground">{student.rollNo}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge 
                            variant={student.status === 'present' ? 'default' : student.status === 'late' ? 'secondary' : 'destructive'}
                            className="mb-1"
                          >
                            {student.status}
                          </Badge>
                          {student.time && (
                            <p className="text-xs text-muted-foreground">{student.time}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="shadow-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full gap-2">
                    <QrCode className="h-4 w-4" />
                    Generate QR Code
                  </Button>
                  <Button variant="outline" className="w-full gap-2">
                    <Clock className="h-4 w-4" />
                    Mark Manual Attendance
                  </Button>
                  <Button variant="outline" className="w-full">
                    Export Report
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border-0"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Student View
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card className="shadow-card">
          <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
            <CardTitle className="text-2xl flex items-center gap-2">
              <UserCheck className="h-6 w-6" />
              My Attendance
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Attendance Alert */}
        {attendancePercentage < 75 && (
          <Alert variant="destructive" className="border-destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Low Attendance Warning!</strong> Your attendance is {attendancePercentage}%. 
              You need at least 75% to be eligible for exams.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Statistics Cards */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="shadow-card">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{attendancePercentage}%</div>
                  <p className="text-sm text-muted-foreground">Overall</p>
                  <Progress value={attendancePercentage} className="mt-2" />
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-success">{presentClasses}</div>
                  <p className="text-sm text-muted-foreground">Present</p>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-warning">{lateClasses}</div>
                  <p className="text-sm text-muted-foreground">Late</p>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-destructive">{absentClasses}</div>
                  <p className="text-sm text-muted-foreground">Absent</p>
                </CardContent>
              </Card>
            </div>

            {/* Attendance Records */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Recent Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {attendanceData.map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-4 h-4 rounded-full ${getStatusColor(record.status)}`} />
                        <div>
                          <p className="font-medium">{record.subject}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <CalendarIcon className="h-3 w-3" />
                              {record.date}
                            </span>
                            {record.time && (
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {record.time}
                              </span>
                            )}
                            {record.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {record.location}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(record.status)}
                        <Badge 
                          variant={record.status === 'present' ? 'default' : record.status === 'late' ? 'secondary' : 'destructive'}
                        >
                          {record.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Check-in */}
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Quick Check-in</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full gap-2" 
                  onClick={handleCheckIn}
                  disabled={isCheckingIn}
                >
                  {isCheckingIn ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground" />
                      Checking in...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      Check In Now
                    </>
                  )}
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <QrCode className="h-4 w-4" />
                  Scan QR Code
                </Button>
              </CardContent>
            </Card>

            {/* Calendar */}
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border-0"
                />
              </CardContent>
            </Card>

            {/* Subject-wise Attendance */}
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Subject-wise Attendance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { subject: 'Data Structures', percentage: 85 },
                  { subject: 'Web Development', percentage: 90 },
                  { subject: 'Database Systems', percentage: 70 },
                  { subject: 'Machine Learning', percentage: 65 },
                ].map((item, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{item.subject}</span>
                      <span className={item.percentage < 75 ? 'text-destructive' : 'text-success'}>
                        {item.percentage}%
                      </span>
                    </div>
                    <Progress 
                      value={item.percentage} 
                      className="h-2"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}