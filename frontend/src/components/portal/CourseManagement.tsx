import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Users,
  CheckCircle,
  AlertCircle,
  FileText,
  Video,
  Download,
  MessageSquare
} from 'lucide-react';

export const CourseManagement = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = [
    {
      id: 1,
      code: "CS301",
      name: "Data Structures & Algorithms",
      instructor: "Dr. Sarah Johnson",
      credits: 3,
      semester: "Fall 2024",
      status: "In Progress",
      progress: 75,
      grade: "A-",
      nextClass: "2024-01-20 10:00 AM",
      assignments: 3,
      announcements: 2
    },
    {
      id: 2,
      code: "MATH205",
      name: "Discrete Mathematics",
      instructor: "Prof. Michael Chen",
      credits: 4,
      semester: "Fall 2024",
      status: "In Progress",
      progress: 60,
      grade: "B+",
      nextClass: "2024-01-21 2:00 PM",
      assignments: 1,
      announcements: 1
    },
    {
      id: 3,
      code: "ENG101",
      name: "Technical Writing",
      instructor: "Dr. Emma Wilson",
      credits: 2,
      semester: "Fall 2024",
      status: "Completed",
      progress: 100,
      grade: "A",
      nextClass: null,
      assignments: 0,
      announcements: 0
    }
  ];

  const assignments = [
    {
      id: 1,
      title: "Binary Tree Implementation",
      course: "CS301",
      dueDate: "2024-01-25",
      status: "Pending",
      grade: null,
      type: "Programming"
    },
    {
      id: 2,
      title: "Graph Theory Problem Set",
      course: "MATH205",
      dueDate: "2024-01-23",
      status: "Submitted",
      grade: "85%",
      type: "Problem Set"
    },
    {
      id: 3,
      title: "Research Paper Draft",
      course: "ENG101",
      dueDate: "2024-01-15",
      status: "Graded",
      grade: "92%",
      type: "Essay"
    }
  ];

  const schedule = [
    {
      day: "Monday",
      classes: [
        { course: "CS301", time: "10:00 - 11:30 AM", room: "Tech Building 201" },
        { course: "MATH205", time: "2:00 - 3:30 PM", room: "Math Building 105" }
      ]
    },
    {
      day: "Wednesday",
      classes: [
        { course: "CS301", time: "10:00 - 11:30 AM", room: "Tech Building 201" },
        { course: "ENG101", time: "1:00 - 2:00 PM", room: "Liberal Arts 301" }
      ]
    },
    {
      day: "Friday",
      classes: [
        { course: "MATH205", time: "2:00 - 3:30 PM", room: "Math Building 105" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Course Management</h1>
          <p className="text-muted-foreground">Manage your courses, assignments, and academic progress</p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="grades">Grades</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{courses.filter(c => c.status === 'In Progress').length}</div>
                  <p className="text-sm text-muted-foreground">Active Courses</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <FileText className="h-8 w-8 text-warning mx-auto mb-2" />
                  <div className="text-2xl font-bold">{assignments.filter(a => a.status === 'Pending').length}</div>
                  <p className="text-sm text-muted-foreground">Pending Assignments</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
                  <div className="text-2xl font-bold">{courses.filter(c => c.status === 'Completed').length}</div>
                  <p className="text-sm text-muted-foreground">Completed Courses</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 text-secondary mx-auto mb-2" />
                  <div className="text-2xl font-bold">3.7</div>
                  <p className="text-sm text-muted-foreground">Current GPA</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Upcoming Classes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courses.filter(c => c.nextClass).map((course) => (
                      <div key={course.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">{course.code}</h4>
                          <p className="text-sm text-muted-foreground">{course.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{course.nextClass}</p>
                          <p className="text-xs text-muted-foreground">{course.instructor}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Recent Announcements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-semibold text-sm">CS301 - Midterm Exam</h4>
                      <p className="text-sm text-muted-foreground">Midterm exam scheduled for January 28th. Review materials posted.</p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-semibold text-sm">MATH205 - Office Hours</h4>
                      <p className="text-sm text-muted-foreground">Extended office hours this week for exam preparation.</p>
                      <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <div className="space-y-4">
              {courses.map((course) => (
                <Card key={course.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold">{course.code}</h3>
                        <Badge variant={course.status === 'In Progress' ? 'default' : 'secondary'}>
                          {course.status}
                        </Badge>
                      </div>
                      <h4 className="text-lg mb-1">{course.name}</h4>
                      <p className="text-muted-foreground">Instructor: {course.instructor}</p>
                      <p className="text-sm text-muted-foreground">{course.credits} Credits • {course.semester}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{course.grade}</div>
                      <p className="text-sm text-muted-foreground">Current Grade</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Course Progress</span>
                      <span className="text-sm font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>{course.assignments} pending assignments</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      <span>{course.announcements} new announcements</span>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <Button size="sm" className="gap-2">
                      <BookOpen className="h-4 w-4" />
                      Course Materials
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2">
                      <Video className="h-4 w-4" />
                      Recordings
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Discussion
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  All Assignments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assignments.map((assignment) => (
                    <Card key={assignment.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold">{assignment.title}</h4>
                            <Badge variant="outline">{assignment.course}</Badge>
                            <Badge variant="secondary">{assignment.type}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              Due: {assignment.dueDate}
                            </div>
                            <Badge variant={
                              assignment.status === 'Pending' ? 'destructive' :
                              assignment.status === 'Submitted' ? 'default' : 'secondary'
                            }>
                              {assignment.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          {assignment.grade && (
                            <div className="text-lg font-bold text-primary">{assignment.grade}</div>
                          )}
                          <div className="flex gap-2 mt-2">
                            {assignment.status === 'Pending' && (
                              <Button size="sm">Submit</Button>
                            )}
                            <Button size="sm" variant="outline" className="gap-2">
                              <Download className="h-4 w-4" />
                              Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Weekly Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {schedule.map((day) => (
                    <div key={day.day}>
                      <h3 className="font-semibold text-lg mb-3">{day.day}</h3>
                      <div className="space-y-3">
                        {day.classes.map((classItem, index) => (
                          <Card key={index} className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold">{classItem.course}</h4>
                                <p className="text-sm text-muted-foreground">{classItem.room}</p>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center gap-2 text-sm">
                                  <Clock className="h-4 w-4" />
                                  {classItem.time}
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="grades" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Academic Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card className="p-4 text-center">
                      <div className="text-3xl font-bold text-primary mb-2">3.7</div>
                      <p className="text-sm text-muted-foreground">Current GPA</p>
                    </Card>
                    <Card className="p-4 text-center">
                      <div className="text-3xl font-bold text-success mb-2">3.8</div>
                      <p className="text-sm text-muted-foreground">Cumulative GPA</p>
                    </Card>
                    <Card className="p-4 text-center">
                      <div className="text-3xl font-bold text-secondary mb-2">45</div>
                      <p className="text-sm text-muted-foreground">Credits Earned</p>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    {courses.map((course) => (
                      <Card key={course.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold">{course.code} - {course.name}</h4>
                            <p className="text-sm text-muted-foreground">{course.instructor} • {course.credits} Credits</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">{course.grade}</div>
                            <Badge variant={course.status === 'In Progress' ? 'default' : 'secondary'}>
                              {course.status}
                            </Badge>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};