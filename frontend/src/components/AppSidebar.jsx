import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { 
  Users, 
  MessageSquare, 
  BarChart3,
  FileText,
  ClipboardCheck,
  LogOut,
  Home,
  GraduationCap,
} from 'lucide-react';

// Default student modules list
const studentModules = [
  { id: 'dashboard', title: 'Dashboard', description: 'Overview and statistics', icon: Home },
  { id: 'attendance', title: 'Attendance', description: 'Track your attendance', icon: Users },
  { id: 'exams', title: 'Exam Portal', description: 'Online examinations', icon: ClipboardCheck },
  { id: 'chat', title: 'Messages', description: 'Chat with faculty', icon: MessageSquare },
  { id: 'results', title: 'Results', description: 'View academic results', icon: BarChart3 },
  { id: 'notes', title: 'Notes', description: 'Upload and manage notes', icon: FileText }
];

export function AppSidebar({
  activeModule,
  onModuleChange,
  modules = studentModules,
  isLocked = false
}) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-blue-100 bg-gradient-to-b from-blue-50 via-white to-indigo-50 shadow-md"
    >
<SidebarHeader className="h-16 flex items-left border-b border-blue-100 bg-white/80 backdrop-blur-sm px-4 py-4">
  <div className="flex items-center space-x-3 -ml-2">
    <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
      <GraduationCap className="h-4 w-4 text-white" />
    </div>
    {!isCollapsed && (
      <span className="text-lg font-bold text-blue-700 tracking-tight select-none">
        EDUNEXUS
      </span>
    )}
  </div>
</SidebarHeader>

      {/* Menu Content */}
      <SidebarContent className='bg-gradient-to-br from-[#f9fbff] via-[#f5f8ff] to-[#f3f4ff]'>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase  text-gray-500 px-4 py-2">
            Academic Modules
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {modules.map((module) => {
                const Icon = module.icon;
                const isActive = activeModule === module.id;
                return (
                  <SidebarMenuItem key={module.id}>
                    <SidebarMenuButton
                      onClick={() => onModuleChange(module.id)}
                      isActive={isActive}
                      className={`group relative transition-all duration-300 
                        ${isActive
                          ? 'bg-blue-100 text-blue-700 font-semibold shadow-inner'
                          : 'hover:bg-blue-50 text-gray-700 hover:text-blue-600'
                        }
                        rounded-md mx-2 my-1`}
                      tooltip={module.title}
                      disabled={isLocked}
                    >
                      <Icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-500'} transition-colors`} />
                      {!isCollapsed && <span>{module.title}</span>}
                      {isActive && !isCollapsed && (
                        <div className="absolute right-2 h-2 w-2 rounded-full bg-blue-600" />
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with Logout */}
      <SidebarFooter className="border-t border-blue-100 bg-white/80 backdrop-blur-sm">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild disabled={isLocked} className="hover:bg-red-50 rounded-md mx-2 my-1">
              <Link to="/auth" className="flex items-center text-red-600 font-medium hover:text-red-700 transition-colors">
                <LogOut className="h-5 w-5 mr-2" />
                {!isCollapsed && <span>Logout</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
