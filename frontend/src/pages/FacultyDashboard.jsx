import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  MessageSquare,
  BarChart3,
  FileText,
  ClipboardCheck,
  User,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  GraduationCap
} from 'lucide-react';
import ManageExams from '@/components/portal-faculty/ManageExams';
import MarkAttendance from '@/components/portal-faculty/MarkAttendance';
import FacultyChat from '@/components/portal-faculty/FacultyChat';
import ViewResults from '@/components/portal-faculty/ViewResults';
import UploadNotes from '@/components/portal-faculty/UploadNotes';

const FacultyDashboard = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const modules = [
    { id: 'manage-exams', title: 'Manage Exams', icon: ClipboardCheck, component: ManageExams },
    { id: 'mark-attendance', title: 'Mark Attendance', icon: Users, component: MarkAttendance },
    // { id: 'student-chat', title: 'Chat', icon: MessageSquare, component: FacultyChat },
    { id: 'see-results', title: 'See Results', icon: BarChart3, component: ViewResults },
    { id: 'upload-notes', title: 'Upload Notes', icon: FileText, component: UploadNotes }
  ];

  const ActiveComponent = modules.find(m => m.id === activeModule)?.component || ManageExams;

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const staticData = {
    phone: '9988776653',
    office: 'Building A, Room 210',
    department: 'Computer Science',
  };

  const getInitials = (name = '') =>
    name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full  bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Sidebar */}
        <AppSidebar activeModule={activeModule} onModuleChange={setActiveModule} modules={modules} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-blue-100 bg-white/80 backdrop-blur-md px-6 shadow-sm">
            <SidebarTrigger />

            <div className="flex items-center flex-1">
              <h1 className="text-xl font-bold text-blue-500">
                {modules.find(m => m.id === activeModule)?.title || 'Faculty Dashboard'}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              {/* Back to Home */}
              

              {/* Profile Dialog */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-full border border-blue-200 hover:bg-blue-50 transition"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" />
                      {/* FIX: Always keep strong color for Fallback text */}
                      <AvatarFallback className="bg-blue-100 text-blue-700 font-semibold">
                        {getInitials(user?.fac_name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] bg-white/90 backdrop-blur-md border border-blue-100 shadow-xl">
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
                            {getInitials(user?.fac_name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{user.fac_name}</h3>
                          <p className="text-gray-500">Faculty ID: {user.fac_id}</p>
                        </div>
                      </div>

                      <Separator />

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-blue-500" />
                            <div>
                              <p className="text-sm font-medium">Email</p>
                              <p className="text-sm text-gray-600">{user.fac_mail}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-blue-500" />
                            <div>
                              <p className="text-sm font-medium">Phone</p>
                              <p className="text-sm text-gray-600">+91 {staticData.phone}</p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-indigo-500" />
                            <div>
                              <p className="text-sm font-medium">Department</p>
                              <p className="text-sm text-gray-600">{staticData.department}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-indigo-500" />
                            <div>
                              <p className="text-sm font-medium">Office</p>
                              <p className="text-sm text-gray-600">{staticData.office}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>

              {/* Logout */}
              
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 p-6 overflow-y-auto bg-white/50 backdrop-blur-sm">
            <ActiveComponent />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default FacultyDashboard;
