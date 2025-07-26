import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Bell,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  GraduationCap,
  Settings,
  X
} from 'lucide-react';
import DashboardHome from '@/components/portal/Dashboard';
import { AttendanceTracking } from '@/components/portal/AttendanceTracking';
import { CourseManagement } from '@/components/portal/CourseManagement';
import { ExamPortal } from '@/components/portal/ExamPortal';
import { FacultyStudentChat } from '@/components/portal/FacultyStudentChat';
import { LibraryPortal } from '@/components/portal/LibraryPortal';
import { ResultViewing } from '@/components/portal/ResultViewing';
import { FinancialServices } from '@/components/portal/FinancialServices';
import { FeedbackSystem } from '@/components/portal/FeedbackSystem';
import { NotesUpload } from '@/components/portal/NotesUpload';
import { CampusServices } from '@/components/portal/CampusServices';

const Dashboard = () => {
  const [activeModule, setActiveModule] = useState('dashboard');

  const modules = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      component: DashboardHome
    },
    {
      id: 'attendance',
      title: 'Attendance',
      component: AttendanceTracking
    },
    {
      id: 'courses',
      title: 'Course Management',
      component: CourseManagement
    },
    {
      id: 'exams',
      title: 'Exam Portal',
      component: ExamPortal
    },
    {
      id: 'chat',
      title: 'Messages',
      component: FacultyStudentChat
    },
    {
      id: 'library',
      title: 'Library',
      component: LibraryPortal
    },
    {
      id: 'results',
      title: 'Results',
      component: ResultViewing
    },
    {
      id: 'fees',
      title: 'Financial Services',
      component: FinancialServices
    },
    {
      id: 'feedback',
      title: 'Feedback',
      component: FeedbackSystem
    },
    {
      id: 'notes',
      title: 'Notes',
      component: NotesUpload
    },
    {
      id: 'campus',
      title: 'Campus Services',
      component: CampusServices
    }
  ];

  const ActiveComponent = modules.find(m => m.id === activeModule)?.component || DashboardHome;

  // Mock user data
  const userData = {
    name: "John Smith",
    email: "john.smith@university.edu",
    studentId: "STU2024001",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "March 15, 1998",
    address: "123 University Ave, Campus City, CC 12345",
    program: "Computer Science",
    year: "3rd Year",
    gpa: "3.8",
    enrollmentDate: "September 2021"
  };

  // Mock notifications data
  const notifications = [
    {
      id: 1,
      title: "Assignment Due Tomorrow",
      message: "Data Structures Assignment #3 is due tomorrow at 11:59 PM",
      time: "2 hours ago",
      type: "warning",
      read: false
    },
    {
      id: 2,
      title: "Grade Posted",
      message: "Your grade for Calculus II Midterm has been posted",
      time: "1 day ago",
      type: "success",
      read: false
    },
    {
      id: 3,
      title: "Library Book Due",
      message: "Your library book 'Advanced Algorithms' is due in 3 days",
      time: "2 days ago",
      type: "info",
      read: true
    },
    {
      id: 4,
      title: "Fee Payment Reminder",
      message: "Tuition fee payment is due next week",
      time: "3 days ago",
      type: "warning",
      read: true
    }
  ];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar 
          activeModule={activeModule} 
          onModuleChange={setActiveModule} 
        />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6 shadow-sm">
            <SidebarTrigger />
            
            <div className="flex items-center flex-1">
              <h1 className="text-xl font-semibold text-foreground">
                {modules.find(m => m.id === activeModule)?.title || 'Student Dashboard'}
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Notifications Modal */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative h-9 w-9">
                    <Bell className="h-4 w-4" />
                    <span className="absolute -top-1 -right-1 h-2 w-2 bg-destructive rounded-full" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notifications
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <Card key={notification.id} className={`${!notification.read ? 'bg-muted/50' : ''}`}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium text-sm">{notification.title}</h4>
                                <Badge 
                                  variant={
                                    notification.type === 'warning' ? 'destructive' : 
                                    notification.type === 'success' ? 'default' : 'secondary'
                                  } 
                                  className="text-xs"
                                >
                                  {notification.type}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                              <span className="text-xs text-muted-foreground">{notification.time}</span>
                            </div>
                            {!notification.read && (
                              <div className="h-2 w-2 bg-primary rounded-full mt-1" />
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>

              {/* User Profile Modal */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Profile Details
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="text-lg">JS</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold">{userData.name}</h3>
                        <p className="text-muted-foreground">{userData.studentId}</p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Email</p>
                            <p className="text-sm text-muted-foreground">{userData.email}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Phone</p>
                            <p className="text-sm text-muted-foreground">{userData.phone}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Date of Birth</p>
                            <p className="text-sm text-muted-foreground">{userData.dateOfBirth}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Program</p>
                            <p className="text-sm text-muted-foreground">{userData.program}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Year</p>
                            <p className="text-sm text-muted-foreground">{userData.year}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Settings className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">GPA</p>
                            <p className="text-sm text-muted-foreground">{userData.gpa}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Address</p>
                          <p className="text-sm text-muted-foreground">{userData.address}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Enrollment Date</p>
                          <p className="text-sm text-muted-foreground">{userData.enrollmentDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto p-6">
            <div className="animate-fade-in">
              <ActiveComponent />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;