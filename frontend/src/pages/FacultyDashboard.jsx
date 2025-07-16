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
  Briefcase
} from 'lucide-react';
import eduNexusLogo from '@/assets/edunexus-logo.png';
import greenTechCrest from '@/assets/greentech-crest.png';

const FacultyDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const modules = [
    {
      id: 'course-management',
      title: 'Course Management',
      description: 'Manage your courses and materials',
      icon: BookOpen,
      color: 'bg-primary',
      stats: '4 Courses',
      badge: 'Faculty Tool'
    },
    {
      id: 'student-grades',
      title: 'Gradebook',
      description: 'Enter and manage student grades',
      icon: BarChart3,
      color: 'bg-secondary',
      stats: '120 Students',
      badge: 'Faculty Tool'
    },
    {
      id: 'assignments',
      title: 'Assignment Review',
      description: 'Review and grade submissions',
      icon: FileText,
      color: 'bg-tertiary',
      stats: '15 Pending',
      badge: 'Faculty Tool'
    },
    {
      id: 'student-chat',
      title: 'Student Chat',
      description: 'Communicate with your students',
      icon: MessageSquare,
      color: 'bg-primary-dark',
      stats: '8 New',
      badge: 'Faculty Tool'
    },
    {
      id: 'attendance',
      title: 'Attendance',
      description: 'Mark and track student attendance',
      icon: Users,
      color: 'bg-accent',
      stats: '95% Avg.',
      badge: 'Faculty Tool'
    },
    {
      id: 'research',
      title: 'Research Portal',
      description: 'Manage research grants and papers',
      icon: Briefcase,
      color: 'bg-secondary-dark',
      stats: '2 Active',
      badge: 'Faculty Tool'
    }
  ];

  const sidebarItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: User, label: 'Profile' },
    { icon: BookOpen, label: 'My Courses' },
    { icon: ClipboardCheck, label: 'Submissions' },
    { icon: BarChart3, label: 'Gradebook' },
    { icon: Calendar, label: 'My Schedule' },
    { icon: MessageSquare, label: 'Messages' },
    { icon: Briefcase, label: 'Research' },
    { icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:flex lg:flex-col`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <img src={greenTechCrest} alt="GreenTech" className="h-8 w-8" />
            <div className="ml-2">
              <span className="text-sm font-bold text-gray-900 block">GreenTech</span>
              <span className="text-xs text-gray-600">University</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="flex-1 mt-8 px-4 space-y-1">
          {sidebarItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200 ${
                item.active ? 'bg-blue-50 text-blue-600 font-semibold' : ''
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="mt-auto p-4 border-t border-gray-200">
          <Button onClick={handleLogout} variant="ghost" className="w-full justify-start text-gray-700 hover:text-red-600">
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64 bg-background">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden mr-2"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              {/* EduNexus Logo */}
              <div className="flex items-center mr-6">
                <img src={eduNexusLogo} alt="EduNexus" className="h-8 w-8" />
                <span className="ml-2 text-xl font-bold text-primary">EduNexus</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">GreenTech Academic Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </Button>
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>{user?.full_name?.charAt(0) || 'F'}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <div className="font-medium">{user?.full_name || 'Faculty Member'}</div>
                  <div className="text-xs text-gray-500">Professor, CSE</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.full_name || 'Dr. Smith'}</h2>
            <p className="text-gray-600">Your central hub for managing your courses and students at GreenTech.</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Courses</p>
                    <p className="text-2xl font-bold text-gray-900">4</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Students</p>
                    <p className="text-2xl font-bold text-gray-900">120</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <FileText className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Submissions</p>
                    <p className="text-2xl font-bold text-gray-900">15 Pending</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <MessageSquare className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">New Messages</p>
                    <p className="text-2xl font-bold text-gray-900">8</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Modules Grid */}
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

          {/* Recent Activity & Upcoming */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">John Smith</p>
                      <p className="text-xs text-gray-600">Submitted: Data Structures - Project 2</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Jane Doe</p>
                      <p className="text-xs text-gray-600">Submitted: Operating Systems - Lab 5</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <MessageSquare className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New message from Emily</p>
                      <p className="text-xs text-gray-600">"Question about the final exam"</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Upcoming Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">CS101: Intro to Programming</p>
                      <p className="text-xs text-gray-600">10:00 AM - 11:30 AM</p>
                    </div>
                    <Badge variant="outline">Lecture</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Office Hours</p>
                      <p className="text-xs text-gray-600">1:00 PM - 3:00 PM</p>
                    </div>
                    <Badge variant="outline">Office</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Faculty Meeting</p>
                      <p className="text-xs text-gray-600">4:00 PM - 5:00 PM</p>
                    </div>
                    <Badge variant="outline">Meeting</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Footer */}
          <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>EduNexus – Built for Greenfield Tech University (GreenTech)</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default FacultyDashboard;
