import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

export function AttendanceTracking({ 
  userRole = 'student',
}) {
  const [subjectAttendance, setSubjectAttendance] = useState([]);

  useEffect(() => {
    axios.get('/api/attendance/')
      .then(response => {
        setSubjectAttendance(response.data);
      })
      .catch(error => {
        console.error('Error fetching attendance data:', error);
      });
  }, []);

  // Calculate attendance statistics
  const totalLectures = subjectAttendance.reduce((sum, rec) => sum + rec.total_lectures, 0);
  const totalAttended = subjectAttendance.reduce((sum, rec) => sum + rec.total_attended, 0);
  const absentClasses = totalLectures - totalAttended;
  const attendancePercentage = totalLectures > 0 ? Math.round((totalAttended / totalLectures) * 100) : 0;

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
          <div className="lg:col-span-3 space-y-6">
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
                  <div className="text-2xl font-bold">{totalLectures}</div>
                  <p className="text-sm text-muted-foreground">Total Lectures</p>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-success">{totalAttended}</div>
                  <p className="text-sm text-muted-foreground">Present</p>
                </CardContent>
              </Card>
              <Card className="shadow-card">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-destructive">{absentClasses}</div>
                  <p className="text-sm text-muted-foreground">Absent</p>
                </CardContent>
              </Card>
            </div>

            {/* Subject-wise Attendance */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Subject-wise Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {subjectAttendance.map((item, index) => {
                    const subjectPercentage = item.total_lectures > 0 ? Math.round((item.total_attended / item.total_lectures) * 100) : 0;
                    return (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{item.subject_name}</span>
                          <span className={subjectPercentage < 75 ? 'text-destructive' : 'text-success'}>
                            {subjectPercentage}%
                          </span>
                        </div>
                        <Progress 
                          value={subjectPercentage} 
                          className="h-2"
                        />
                        <div className="text-xs text-muted-foreground">
                          Attended: {item.total_attended} / {item.total_lectures}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}