import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  MessageSquare, 
  BarChart3,
  FileText,
  Star,
  Phone,
  ClipboardCheck,
  User,
  Settings,
  LogOut,
  Home,
  BookOpen,
  GraduationCap,
  MapPin,
  Bell,
  Search,
  Calendar,
  Menu,
  X,
  Network
} from 'lucide-react';
import { Link } from 'react-router-dom';
import eduNexusLogo from '@/assets/edunexus-logo.png';
import greenTechCrest from '@/assets/greentech-crest.png';

const StudentDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const modules = [
    {
      id: 'attendance',
      title: 'Attendance Tracking',
      description: 'Track your attendance',
      icon: Users,
      color: 'bg-primary',
      stats: '89%',
      badge: 'EduNexus Module'
    },
    {
      id: 'grades',
      title: 'Results Portal',
      description: 'View your academic performance',
      icon: BarChart3,
      color: 'bg-secondary',
      stats: '8.5 CGPA',
      badge: 'EduNexus Module'
    },
    {
      id: 'assignments',
      title: 'Course Management',
      description: 'Manage your assignments and courses',
      icon: FileText,
      color: 'bg-tertiary',
      stats: '3 Pending',
      badge: 'EduNexus Module'
    },
    {
      id: 'exams',
      title: 'Exam Portal',
      description: 'Upcoming examinations',
      icon: ClipboardCheck,
      color: 'bg-accent',
      stats: '2 Upcoming',
      badge: 'EduNexus Module'
    },
    {
      id: 'chat',
      title: 'Faculty Chat',
      description: 'Chat with faculty and staff',
      icon: MessageSquare,
      color: 'bg-primary-dark',
      stats: '5 New',
      badge: 'EduNexus Module'
    },
    {
      id: 'notes',
      title: 'Notes Upload',
      description: 'Share and access study materials',
      icon: BookOpen,
      color: 'bg-secondary-dark',
      stats: '12 Files',
      badge: 'EduNexus Module'
    }
  ];

  const sidebarItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: User, label: 'Profile' },
    { icon: BookOpen, label: 'Courses' },
    { icon: ClipboardCheck, label: 'Assignments' },
    { icon: BarChart3, label: 'Grades' },
    { icon: Calendar, label: 'Schedule' },
    { icon: MessageSquare, label: 'Messages' },
    { icon: FileText, label: 'Resources' },
    { icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-muted">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
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
        
        <nav className="mt-8">
          {sidebarItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
                item.active ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : ''
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="ml-3">{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-6 border-t">
          <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-red-600">
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
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
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <div className="font-medium">John Smith</div>
                  <div className="text-xs text-gray-500">GreenTech</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back to EduNexus</h2>
            <p className="text-gray-600">John Smith • Computer Science Engineering • Final Year • GreenTech</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Attendance</p>
                    <p className="text-2xl font-bold text-gray-900">89%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">CGPA</p>
                    <p className="text-2xl font-bold text-gray-900">8.5</p>
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
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <ClipboardCheck className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Exams</p>
                    <p className="text-2xl font-bold text-gray-900">2</p>
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
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <BarChart3 className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Grade updated</p>
                      <p className="text-xs text-gray-600">Operating Systems - A+</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <FileText className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Assignment submitted</p>
                      <p className="text-xs text-gray-600">Data Structures - Project 2</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <MessageSquare className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New message</p>
                      <p className="text-xs text-gray-600">Prof. Smith replied</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Machine Learning</p>
                      <p className="text-xs text-gray-600">10:00 AM - 11:30 AM</p>
                    </div>
                    <Badge variant="outline">Lecture</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Database Lab</p>
                      <p className="text-xs text-gray-600">2:00 PM - 4:00 PM</p>
                    </div>
                    <Badge variant="outline">Lab</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Project Meeting</p>
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

export default StudentDashboard;