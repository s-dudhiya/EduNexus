import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export function ResultViewing({ enrollmentNo = 12345 }) {
  const [student, setStudent] = useState(null);
  const [currentMarks, setCurrentMarks] = useState([]);
  const [pastMarks, setPastMarks] = useState([]);
  const [practicalMarks, setPracticalMarks] = useState([]);

  useEffect(() => {
    // Dummy data instead of API fetches
    const dummyStudent = {
      enrollment_no: 12345,
      name: 'John Doe',
      gender: 'Male',
      branch: 'Computer Science',
      semester: 5,
      contact_no: 1234567890,
      email_id: 'john@example.com',
      parents_contact: 9876543210,
      pin: 1234
    };
    setStudent(dummyStudent);

    const dummyCurrentMarks = [
      {
        id: 1,
        enrollment_number: 12345,
        subject_id: 101,
        subject_name: 'Data Structures',
        t1_marks: 80,
        t2_marks: 85,
        t3_marks: 90,
        t4_marks: 92,
        current_sem: 5
      },
      {
        id: 2,
        enrollment_number: 12345,
        subject_id: 102,
        subject_name: 'Algorithms',
        t1_marks: 75,
        t2_marks: 80,
        t3_marks: 85,
        t4_marks: 87,
        current_sem: 5
      },
      {
        id: 3,
        enrollment_number: 12345,
        subject_id: 103,
        subject_name: 'Database Systems',
        t1_marks: 70,
        t2_marks: 75,
        t3_marks: 80,
        t4_marks: 82,
        current_sem: 5
      },
      {
        id: 4,
        enrollment_number: 12345,
        subject_id: 104,
        subject_name: 'Operating Systems',
        t1_marks: 85,
        t2_marks: 90,
        t3_marks: 95,
        current_sem: 5
      },
      {
        id: 5,
        enrollment_number: 12345,
        subject_id: 105,
        subject_name: 'Computer Networks',
        t1_marks: 65,
        t2_marks: 70,
        t3_marks: 75,
        t4_marks: 77,
        current_sem: 5
      }
    ];
    setCurrentMarks(dummyCurrentMarks);

    const dummyPastMarks = [
      {
        id: 1,
        enrollment_no: 12345,
        subject_id: 1,
        semester: 1,
        marks: 85
      },
      {
        id: 2,
        enrollment_no: 12345,
        subject_id: 2,
        semester: 1,
        marks: 90
      },
      {
        id: 3,
        enrollment_no: 12345,
        subject_id: 3,
        semester: 1,
        marks: 80
      },
      {
        id: 4,
        enrollment_no: 12345,
        subject_id: 4,
        semester: 2,
        marks: 88
      },
      {
        id: 5,
        enrollment_no: 12345,
        subject_id: 5,
        semester: 2,
        marks: 92
      },
      {
        id: 6,
        enrollment_no: 12345,
        subject_id: 6,
        semester: 2,
        marks: 87
      },
      {
        id: 7,
        enrollment_no: 12345,
        subject_id: 7,
        semester: 3,
        marks: 78
      },
      {
        id: 8,
        enrollment_no: 12345,
        subject_id: 8,
        semester: 3,
        marks: 82
      },
      {
        id: 9,
        enrollment_no: 12345,
        subject_id: 9,
        semester: 3,
        marks: 85
      },
      {
        id: 10,
        enrollment_no: 12345,
        subject_id: 10,
        semester: 4,
        marks: 90
      },
      {
        id: 11,
        enrollment_no: 12345,
        subject_id: 11,
        semester: 4,
        marks: 88
      },
      {
        id: 12,
        enrollment_no: 12345,
        subject_id: 12,
        semester: 4,
        marks: 92
      }
    ];
    setPastMarks(dummyPastMarks);

    const dummyPracticalMarks = [
      {
        id: 1,
        enrollment_no: 12345,
        subject_id: 201,
        semester: 4,
        marks: 88
      },
      {
        id: 2,
        enrollment_no: 12345,
        subject_id: 202,
        semester: 4,
        marks: 92
      },
      {
        id: 3,
        enrollment_no: 12345,
        subject_id: 203,
        semester: 4,
        marks: 85
      },
      {
        id: 4,
        enrollment_no: 12345,
        subject_id: 204,
        semester: 4,
        marks: 90
      },
      {
        id: 5,
        enrollment_no: 12345,
        subject_id: 205,
        semester: 4,
        marks: 87
      }
    ];
    setPracticalMarks(dummyPracticalMarks);
  }, [enrollmentNo]);

  if (!student) {
    return <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">Loading...</div>;
  }

  const combinedCurrent = currentMarks.map(cm => {
    const t4_marks = 't4_marks' in cm ? cm.t4_marks : null;
    const allMarks = [
      cm.t1_marks,
      cm.t2_marks,
      cm.t3_marks,
      ...(t4_marks !== null ? [t4_marks] : [])
    ].filter(m => m > 0);
    const average = allMarks.length > 0 ? allMarks.reduce((a, b) => a + b, 0) / allMarks.length : 0;
    return { ...cm, t4_marks, average };
  });

  const averageMarks = combinedCurrent.length > 0 
    ? combinedCurrent.reduce((sum, r) => sum + r.average, 0) / combinedCurrent.length 
    : 0;

  const passedSubjects = combinedCurrent.filter(r => r.average > 33).length;

  const pastGroups = {};
  pastMarks.forEach(pm => {
    if (!pastGroups[pm.semester]) pastGroups[pm.semester] = [];
    pastGroups[pm.semester].push(pm.marks);
  });

  const practicalGroups = {};
  practicalMarks.forEach(pm => {
    if (!practicalGroups[pm.semester]) practicalGroups[pm.semester] = 0;
    practicalGroups[pm.semester] += pm.marks;
  });

  const chartData = Object.keys(pastGroups).sort((a, b) => a - b).map(sem => {
    const marks = pastGroups[sem];
    const avg = marks.reduce((a, b) => a + b, 0) / marks.length;
    return { semester: `Semester ${sem}`, average: avg };
  });

  const practicalData = practicalMarks.map(p => ({
    subject: `Subject ${p.subject_id}`,
    practical: p.marks
  }));

  const pastTotals = {};
  Object.keys(pastGroups).forEach(sem => {
    pastTotals[sem] = pastGroups[sem].reduce((a, b) => a + b, 0) + (practicalGroups[sem] || 0);
  });

  const currentTotal = combinedCurrent.reduce((sum, r) => sum + r.average, 0);

  const allSemesters = [...Object.keys(pastTotals).sort((a, b) => Number(a) - Number(b)), student.semester.toString()];

  const semesterTotals = allSemesters.map(sem => ({
    semester: `Sem ${sem}`,
    total: sem === student.semester.toString() ? currentTotal : pastTotals[sem]
  }));

  const showProgress = [3, 5, 7].includes(student.semester);

  const calculateGrade = (marks) => {
    if (marks >= 90) return 'A+';
    if (marks >= 80) return 'A';
    if (marks >= 70) return 'B+';
    if (marks >= 60) return 'B';
    if (marks >= 50) return 'C+';
    if (marks >= 40) return 'C';
    return 'F';
  };

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'text-success';
      case 'A-':
      case 'B+':
      case 'B':
        return 'text-primary';
      case 'B-':
      case 'C+':
      case 'C':
        return 'text-warning';
      default:
        return 'text-destructive';
    }
  };

  const getGradeBackground = (grade) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'bg-success/10 border-success/20';
      case 'A-':
      case 'B+':
      case 'B':
        return 'bg-primary/10 border-primary/20';
      case 'B-':
      case 'C+':
      case 'C':
        return 'bg-warning/10 border-warning/20';
      default:
        return 'bg-destructive/10 border-destructive/20';
    }
  };

  const resultsContent = (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Current Semester Results
            <Badge variant="outline">Semester {student.semester}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {combinedCurrent.map((result, index) => {
              const grade = calculateGrade(result.average);
              return (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{result.subject_name}</h4>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getGradeColor(grade)}`}>
                        {grade}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1 mr-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Average Marks</span>
                        <span>{result.average.toFixed(1)} / 100</span>
                      </div>
                      <Progress value={result.average} />
                    </div>
                    <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getGradeBackground(grade)}`}>
                      {result.average.toFixed(1)}%
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>T1 Marks</span>
                      <span>{result.t1_marks}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>T2 Marks</span>
                      <span>{result.t2_marks}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>T3 Marks</span>
                      <span>{result.t3_marks}</span>
                    </div>
                    {result.t4_marks !== null && (
                      <div className="flex justify-between text-sm">
                        <span>T4 Marks</span>
                        <span>{result.t4_marks}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <Card className="shadow-card">
          <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Award className="h-6 w-6" />
              Academic Results & Progress
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Award className="h-6 w-6" />
              Academic Results & Progress
            </CardTitle>
          </CardHeader>
        </Card>

        <div className="grid md:grid-cols-2 gap-4">
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
                out of {combinedCurrent.length}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {resultsContent}
          </div>
          <div className="space-y-6">
            {showProgress && (
              <Card className="shadow-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Percentage Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {chartData.map((data, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{data.semester}</span>
                          <span className="font-medium">{data.average.toFixed(2)}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${data.average}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Subject Wise Practical Marks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={practicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="practical" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Total Marks vs Semester
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={semesterTotals}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="semester" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}