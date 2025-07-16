import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  TrendingDown, 
  Download, 
  BarChart3, 
  Award, 
  Target,
  Calendar,
  FileText,
  Medal,
  ArrowUpCircle,
  ArrowDownCircle
} from 'lucide-react';

interface SubjectResult {
  id: string;
  subject: string;
  code: string;
  semester: string;
  marks: number;
  totalMarks: number;
  grade: string;
  gpa: number;
  credits: number;
  status: 'pass' | 'fail';
  examType: 'midterm' | 'final' | 'assignment' | 'quiz';
}

interface ResultViewingProps {
  results?: SubjectResult[];
}

export function ResultViewing({
  results = [
    {
      id: '1',
      subject: 'Data Structures and Algorithms',
      code: 'CS301',
      semester: 'Fall 2024',
      marks: 85,
      totalMarks: 100,
      grade: 'A',
      gpa: 4.0,
      credits: 3,
      status: 'pass',
      examType: 'final'
    },
    {
      id: '2',
      subject: 'Web Development',
      code: 'CS302',
      semester: 'Fall 2024',
      marks: 92,
      totalMarks: 100,
      grade: 'A+',
      gpa: 4.0,
      credits: 4,
      status: 'pass',
      examType: 'final'
    },
    {
      id: '3',
      subject: 'Database Systems',
      code: 'CS303',
      semester: 'Fall 2024',
      marks: 78,
      totalMarks: 100,
      grade: 'B+',
      gpa: 3.5,
      credits: 3,
      status: 'pass',
      examType: 'final'
    },
    {
      id: '4',
      subject: 'Machine Learning',
      code: 'CS401',
      semester: 'Fall 2024',
      marks: 88,
      totalMarks: 100,
      grade: 'A',
      gpa: 4.0,
      credits: 4,
      status: 'pass',
      examType: 'final'
    },
    {
      id: '5',
      subject: 'Software Engineering',
      code: 'CS304',
      semester: 'Fall 2024',
      marks: 82,
      totalMarks: 100,
      grade: 'A-',
      gpa: 3.7,
      credits: 3,
      status: 'pass',
      examType: 'final'
    }
  ]
}: ResultViewingProps) {
  const [selectedSemester, setSelectedSemester] = useState('Fall 2024');
  const [selectedExamType, setSelectedExamType] = useState('all');

  const filteredResults = results.filter(result => {
    const semesterMatch = result.semester === selectedSemester;
    const examTypeMatch = selectedExamType === 'all' || result.examType === selectedExamType;
    return semesterMatch && examTypeMatch;
  });

  // Calculate statistics
  const totalCredits = filteredResults.reduce((sum, result) => sum + result.credits, 0);
  const weightedGPA = filteredResults.reduce((sum, result) => sum + (result.gpa * result.credits), 0) / totalCredits;
  const averageMarks = filteredResults.reduce((sum, result) => sum + result.marks, 0) / filteredResults.length;
  const passedSubjects = filteredResults.filter(result => result.status === 'pass').length;

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'text-success';
      case 'A-':
      case 'B+':
        return 'text-primary';
      case 'B':
      case 'B-':
        return 'text-warning';
      default:
        return 'text-destructive';
    }
  };

  const getGradeBackground = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'bg-success/10 border-success/20';
      case 'A-':
      case 'B+':
        return 'bg-primary/10 border-primary/20';
      case 'B':
      case 'B-':
        return 'bg-warning/10 border-warning/20';
      default:
        return 'bg-destructive/10 border-destructive/20';
    }
  };

  // Mock chart data for visualization
  const chartData = [
    { semester: 'Spring 2023', gpa: 3.2 },
    { semester: 'Fall 2023', gpa: 3.5 },
    { semester: 'Spring 2024', gpa: 3.7 },
    { semester: 'Fall 2024', gpa: weightedGPA },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="shadow-card">
          <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Award className="h-6 w-6" />
              Academic Results & Progress
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{weightedGPA.toFixed(2)}</div>
              <p className="text-sm text-muted-foreground">CGPA</p>
              <div className="flex items-center justify-center mt-2">
                <TrendingUp className="h-4 w-4 text-success mr-1" />
                <span className="text-xs text-success">+0.2 from last semester</span>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">{averageMarks.toFixed(1)}%</div>
              <p className="text-sm text-muted-foreground">Average Marks</p>
              <Progress value={averageMarks} className="mt-2" />
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning">{passedSubjects}</div>
              <p className="text-sm text-muted-foreground">Subjects Passed</p>
              <div className="text-xs text-muted-foreground mt-1">
                out of {filteredResults.length}
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{totalCredits}</div>
              <p className="text-sm text-muted-foreground">Credits Earned</p>
              <div className="flex items-center justify-center mt-2">
                <Target className="h-4 w-4 text-primary mr-1" />
                <span className="text-xs text-muted-foreground">120 total required</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Results */}
          <div className="lg:col-span-2 space-y-6">
            {/* Filters */}
            <Card className="shadow-card">
              <CardContent className="p-4">
                <div className="flex gap-4 items-center">
                  <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fall 2024">Fall 2024</SelectItem>
                      <SelectItem value="Spring 2024">Spring 2024</SelectItem>
                      <SelectItem value="Fall 2023">Fall 2023</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedExamType} onValueChange={setSelectedExamType}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Exam type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Exams</SelectItem>
                      <SelectItem value="final">Final Exams</SelectItem>
                      <SelectItem value="midterm">Midterm Exams</SelectItem>
                      <SelectItem value="assignment">Assignments</SelectItem>
                      <SelectItem value="quiz">Quizzes</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="ml-auto gap-2">
                    <Download className="h-4 w-4" />
                    Export PDF
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results Table */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Subject Results
                  <Badge variant="outline">{selectedSemester}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredResults.map((result) => (
                    <div key={result.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{result.subject}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{result.code}</span>
                            <span>•</span>
                            <span>{result.credits} credits</span>
                            <span>•</span>
                            <Badge variant="outline" className="text-xs capitalize">
                              {result.examType}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${getGradeColor(result.grade)}`}>
                            {result.grade}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            GPA: {result.gpa.toFixed(1)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex-1 mr-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Marks Obtained</span>
                            <span>{result.marks}/{result.totalMarks}</span>
                          </div>
                          <Progress value={(result.marks / result.totalMarks) * 100} />
                        </div>
                        <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getGradeBackground(result.grade)}`}>
                          {((result.marks / result.totalMarks) * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Chart */}
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  GPA Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {chartData.map((data, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{data.semester}</span>
                        <span className="font-medium">{data.gpa.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${(data.gpa / 4) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Medal className="h-4 w-4" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-2 bg-success/10 rounded-lg border border-success/20">
                  <Medal className="h-5 w-5 text-success" />
                  <div>
                    <p className="text-sm font-medium">Dean's List</p>
                    <p className="text-xs text-muted-foreground">Fall 2024</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 bg-primary/10 rounded-lg border border-primary/20">
                  <Award className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Academic Excellence</p>
                    <p className="text-xs text-muted-foreground">Spring 2024</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 bg-warning/10 rounded-lg border border-warning/20">
                  <TrendingUp className="h-5 w-5 text-warning" />
                  <div>
                    <p className="text-sm font-medium">Most Improved</p>
                    <p className="text-xs text-muted-foreground">Fall 2023</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full gap-2" size="sm">
                  <FileText className="h-4 w-4" />
                  Download Transcript
                </Button>
                <Button variant="outline" className="w-full gap-2" size="sm">
                  <Calendar className="h-4 w-4" />
                  View Exam Schedule
                </Button>
                <Button variant="outline" className="w-full gap-2" size="sm">
                  <BarChart3 className="h-4 w-4" />
                  Detailed Analytics
                </Button>
              </CardContent>
            </Card>

            {/* Performance Comparison */}
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">vs Class Average</span>
                  <div className="flex items-center gap-1">
                    <ArrowUpCircle className="h-4 w-4 text-success" />
                    <span className="text-sm text-success">+12%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">vs Previous Semester</span>
                  <div className="flex items-center gap-1">
                    <ArrowUpCircle className="h-4 w-4 text-success" />
                    <span className="text-sm text-success">+8%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Ranking in Class</span>
                  <span className="text-sm font-medium">3rd out of 45</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}