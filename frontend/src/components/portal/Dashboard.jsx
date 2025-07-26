import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  BarChart3,
  FileText,
  ClipboardCheck,
  MessageSquare,
  BookOpen,
  GraduationCap,
  DollarSign
} from 'lucide-react';

const DashboardHome = () => {
  const quickStats = [
    {
      title: "Attendance",
      value: "89%",
      icon: Users,
      color: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      title: "CGPA",
      value: "8.5",
      icon: BarChart3,
      color: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      title: "Pending",
      value: "3",
      icon: FileText,
      color: "bg-orange-100",
      iconColor: "text-orange-600"
    },
    {
      title: "Exams",
      value: "2",
      icon: ClipboardCheck,
      color: "bg-purple-100",
      iconColor: "text-purple-600"
    }
  ];

  const recentActivity = [
    {
      title: "Grade updated",
      description: "Operating Systems - A+",
      icon: BarChart3,
      color: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      title: "Assignment submitted",
      description: "Data Structures - Project 2",
      icon: FileText,
      color: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      title: "New message",
      description: "Prof. Smith replied",
      icon: MessageSquare,
      color: "bg-purple-100",
      iconColor: "text-purple-600"
    }
  ];

  const upcomingSchedule = [
    {
      title: "Machine Learning",
      time: "10:00 AM - 11:30 AM",
      type: "Lecture"
    },
    {
      title: "Database Lab",
      time: "2:00 PM - 4:00 PM",
      type: "Lab"
    },
    {
      title: "Project Meeting",
      time: "4:00 PM - 5:00 PM",
      type: "Meeting"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John!</h2>
        <p className="text-gray-600">Computer Science Engineering • Final Year</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className={`p-2 ${stat.color} rounded-lg`}>
                    <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
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
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`p-2 ${activity.color} rounded-lg`}>
                      <Icon className={`h-4 w-4 ${activity.iconColor}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-gray-600">{activity.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingSchedule.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-gray-600">{item.time}</p>
                  </div>
                  <Badge variant="outline">{item.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;