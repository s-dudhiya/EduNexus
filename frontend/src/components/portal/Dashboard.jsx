import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  FileText,
  ClipboardCheck,
  Loader2,
  AlertTriangle,
  Award,
  BookOpen
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const DashboardHome = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;

      try {
        const response = await axios.get(`/api/student-dashboard-summary/${user.enrollment_no}/`);
        setDashboardData(response.data);
      } catch (err) {
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-4 text-lg">Loading Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  const quickStats = [
    {
      title: "Overall Attendance",
      value: `${dashboardData?.overall_attendance || 0}%`,
      icon: Users,
      color: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      title: "Department Rank",
      value: dashboardData?.department_rank ? `#${dashboardData.department_rank}` : "N/A",
      icon: Award,
      color: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      title: "Pending Assignments",
      value: dashboardData?.pending_assignments || 0,
      icon: FileText,
      color: "bg-orange-100",
      iconColor: "text-orange-600"
    },
    {
      title: "Upcoming Exams",
      value: dashboardData?.upcoming_exams || 0,
      icon: ClipboardCheck,
      color: "bg-purple-100",
      iconColor: "text-purple-600"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}!</h2>
        <p className="text-gray-600">{user?.branch} • Semester {user?.semester}</p>
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

      {/* Dynamic Cards Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subjects with Low Attendance Card */}
        {dashboardData?.low_attendance_subjects?.length > 0 && (
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive flex items-center gap-2">
                <AlertTriangle />
                Low Attendance Alert
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Your attendance is below 75% in the following subjects. Please attend classes regularly.
              </p>
              <div className="space-y-2">
                {dashboardData.low_attendance_subjects.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <p className="text-sm font-medium">{item.name}</p>
                    <Badge variant="destructive">{item.percentage}%</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Current Semester Subjects Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen />
              Current Semester Subjects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dashboardData?.current_subjects?.length > 0 ? (
                dashboardData.current_subjects.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                    <p className="text-sm font-medium">{item.subject_name}</p>
                    <Badge variant="outline">ID: {item.subject_id}</Badge>
                  </div>
                ))
              ) : <p className="text-sm text-muted-foreground">No subjects found for this semester.</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;
