import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  GraduationCap,
  Settings
} from 'lucide-react';
import DashboardHome from '@/components/portal/Dashboard';
import { AttendanceTracking } from '@/components/portal/AttendanceTracking';
import { ExamPortal } from '@/components/portal/ExamPortal';
import { FacultyStudentChat } from '@/components/portal/FacultyStudentChat';
import { ResultViewing } from '@/components/portal/ResultViewing';
import { NotesUpload } from '@/components/portal/NotesUpload';

const StudentDashboard = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarLocked, setSidebarLocked] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const handleSetSidebarLocked = (locked) => {
    setSidebarLocked(locked);
    if (locked) setSidebarOpen(false);
  };

  const modules = [
    { id: 'dashboard', title: 'Dashboard', component: DashboardHome },
    { id: 'attendance', title: 'Attendance', component: AttendanceTracking },
    { id: 'exams', title: 'Exam Portal', component: ExamPortal },
    { id: 'chat', title: 'Messages', component: FacultyStudentChat },
    { id: 'results', title: 'Results', component: ResultViewing },
    { id: 'notes', title: 'Notes', component: NotesUpload },
  ];

  const ActiveComponent = modules.find((m) => m.id === activeModule)?.component || DashboardHome;

  const staticData = {
    dateOfBirth: "March 15, 1998",
    address: "123 University Ave, Campus City, CC 12345",
    gpa: "3.8",
    enrollmentDate: "September 2021"
  };

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const getInitials = (name = '') => name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <SidebarProvider open={isSidebarOpen} onOpenChange={setSidebarOpen}>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <AppSidebar
          activeModule={activeModule}
          onModuleChange={setActiveModule}
          isLocked={sidebarLocked}
        />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-blue-100 bg-white/80 backdrop-blur-md px-6 shadow-sm">

            {!sidebarLocked && <SidebarTrigger />}

            <div className="flex items-center flex-1">
              <h1 className="text-xl font-bold text-blue-700">
                {modules.find(m => m.id === activeModule)?.title || 'Student Dashboard'}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              {/* Profile Modal */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full border border-blue-200 hover:bg-blue-50 transition"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" />
                      {/* FIX: Fallback text always visible even on hover */}
                      <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                        {getInitials(user?.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] bg-white/90 backdrop-blur-md border border-blue-100 shadow-xl rounded-lg">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-blue-700 font-bold">
                      <User className="h-5 w-5" />
                      Profile Details
                    </DialogTitle>
                  </DialogHeader>
                  {user && (
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 border-2 border-blue-200">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback className="bg-blue-100 text-blue-700 font-bold text-lg">
                            {getInitials(user.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                          <p className="text-gray-500">{user.enrollment_no}</p>
                        </div>
                      </div>

                      <Separator />

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-blue-500" />
                            <div>
                              <p className="text-sm font-medium">Email</p>
                              <p className="text-sm text-gray-600">{user.email_id}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-blue-500" />
                            <div>
                              <p className="text-sm font-medium">Phone</p>
                              <p className="text-sm text-gray-600">+91 {user.contact_no}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-blue-500" />
                            <div>
                              <p className="text-sm font-medium">Date of Birth</p>
                              <p className="text-sm text-gray-600">{staticData.dateOfBirth}</p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-indigo-500" />
                            <div>
                              <p className="text-sm font-medium">Program</p>
                              <p className="text-sm text-gray-600">{user.branch}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-indigo-500" />
                            <div>
                              <p className="text-sm font-medium">Semester</p>
                              <p className="text-sm text-gray-600">{user.semester}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Settings className="h-4 w-4 text-indigo-500" />
                            <div>
                              <p className="text-sm font-medium">GPA</p>
                              <p className="text-sm text-gray-600">{staticData.gpa}</p>
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

          {/* Main Content */}
          <main className="flex-1 overflow-auto p-6 bg-white/50 backdrop-blur-sm">
            <div className="animate-fade-in">
              <ActiveComponent setSidebarLocked={handleSetSidebarLocked} />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default StudentDashboard;
