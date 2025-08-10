import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  MessageSquare, 
  BarChart3,
  FileText, 
  ClipboardCheck,
  User,
  Settings,
  LogOut,
  Home,
  BookOpen,
  Bell,
  Search,
  Calendar,
  Menu,
  X,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  GraduationCap
} from 'lucide-react';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

const modules = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    description: 'Overview of all activities',
    icon: Home,
    color: 'bg-blue-500',
    stats: '4 Updates',
    badge: 'Faculty Tool'
  },
  {
    id: 'manage-exams',
    title: 'Manage Exams',
    description: 'Create, view, and grade exams',
    icon: ClipboardCheck,
    color: 'bg-primary',
    stats: '2 Active',
    badge: 'Faculty Tool'
  },
  {
    id: 'mark-attendance',
    title: 'Mark Attendance',
    description: 'Mark and track student attendance',
    icon: Users,
    color: 'bg-accent',
    stats: '95% Avg.',
    badge: 'Faculty Tool'
  },
  {
    id: 'student-chat',
    title: 'Chat',
    description: 'Communicate with your students',
    icon: MessageSquare,
    color: 'bg-primary-dark',
    stats: '8 New',
    badge: 'Faculty Tool'
  },
  {
    id: 'see-results',
    title: 'See Results',
    description: 'View and analyze student results',
    icon: BarChart3,
    color: 'bg-secondary',
    stats: '120 Students',
    badge: 'Faculty Tool'
  },
  {
    id: 'upload-notes',
    title: 'Upload Notes',
    description: 'Share notes and materials with students',
    icon: FileText,
    color: 'bg-tertiary',
    stats: '5 Files',
    badge: 'Faculty Tool'
  }
];

const FacultyDashboard = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  // Static data for fields not yet in the database model
  const staticData = {
    phone: "9988776653",
    office: "Building A, Room 210",
    department: "Computer Science",
  };

  const notifications = [
    {
      id: 1,
      title: "New Submission in CS101",
      message: "John Smith submitted Project 2.",
      time: "5 minutes ago",
      type: "success",
      read: false
    },
    {
      id: 2,
      title: "Faculty Meeting Reminder",
      message: "Department meeting at 3:00 PM today.",
      time: "1 hour ago",
      type: "info",
      read: false
    },
    {
      id: 3,
      title: "Question from a student",
      message: "Emily asked a question about the upcoming exam.",
      time: "3 hours ago",
      type: "warning",
      read: true
    },
  ];
  
  const getInitials = (name = '') => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar 
          activeModule={activeModule} 
          onModuleChange={setActiveModule}
          modules={modules}
        />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6 shadow-sm">
            <SidebarTrigger />
            
            <div className="flex items-center flex-1">
              <h1 className="text-xl font-semibold text-foreground">
                {modules.find(m => m.id === activeModule)?.title || 'Faculty Dashboard'}
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
                                  variant={notification.type === 'warning' ? 'destructive' : notification.type === 'success' ? 'default' : 'secondary'} 
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

              {/* --- USER PROFILE MODAL (THIS SECTION IS NOW DYNAMIC) --- */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>{getInitials(user?.fac_name)}</AvatarFallback>
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
                  {user && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback className="text-lg">{getInitials(user.fac_name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-semibold">{user.fac_name}</h3>
                          <p className="text-muted-foreground">Faculty ID: {user.fac_id}</p>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Email</p>
                              <p className="text-sm text-muted-foreground">{user.fac_mail}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Phone</p>
                              <p className="text-sm text-muted-foreground">+91 {staticData.phone}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Department</p>
                              <p className="text-sm text-muted-foreground">{staticData.department}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Office</p>
                              <p className="text-sm text-muted-foreground">{staticData.office}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </header>

          {/* Dashboard Content */}
          <main className="flex-1 p-6 overflow-y-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.fac_name || 'Faculty Member'}</h2>
              <p className="text-gray-600">Your central hub for managing your courses and students at GreenTech.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* ... (Static cards remain the same) ... */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {modules.map((module) => {
                const Icon = module.icon;
                return (
                  <Card key={module.id} className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-primary">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-lg ${module.color}`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <Badge variant="secondary">{module.stats}</Badge>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{module.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{module.description}</p>
                      <p className="text-xs text-primary font-medium">{module.badge}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* ... (Static cards remain the same) ... */}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default FacultyDashboard;
