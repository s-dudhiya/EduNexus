import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  Award, 
  Loader2,
  AlertTriangle,
  CheckCircle,
  XCircle
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function ResultViewing() {
  const { user } = useAuth();
  const [marksData, setMarksData] = useState({
    currentMarks: [],
    pastMarks: [],
    practicalMarks: [],
    subjects: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResultsData = async () => {
      if (!user) return;
      try {
        const response = await axios.get('/api/student-results/');
        setMarksData({
          currentMarks: response.data.current_marks,
          pastMarks: response.data.past_marks,
          practicalMarks: response.data.practical_marks,
          subjects: response.data.subjects
        });
      } catch (err) {
        setError("Failed to load results data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchResultsData();
  }, [user]);

  if (loading) {
    return (
        <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="ml-4 text-lg">Loading Results...</p>
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
  
  const { currentMarks, pastMarks, practicalMarks, subjects } = marksData;
  
  const subjectMap = subjects.reduce((acc, subject) => {
    acc[subject.subject_id] = subject.subject_name;
    return acc;
  }, {});

  const PASSING_MARKS = 75 * 0.33;

  const combinedCurrent = currentMarks.map(cm => {
    const totalMarks = cm.t1_marks + cm.t2_marks + cm.t3_marks;
    const status = totalMarks >= PASSING_MARKS ? "Pass" : "Fail";
    return { ...cm, totalMarks, status, subject_name: subjectMap[cm.subject_id] || `Subject ${cm.subject_id}` };
  });

  const totalMarksObtained = combinedCurrent.reduce((sum, r) => sum + r.totalMarks, 0);
  const totalPossibleMarks = 5 * 75;

  const passedSubjects = combinedCurrent.filter(r => r.status === "Pass").length;

  // --- NEW CGPA CALCULATION LOGIC ---
  const pastGroups = {};
  pastMarks.forEach(pm => {
    if (!pastGroups[pm.semester]) pastGroups[pm.semester] = [];
    pastGroups[pm.semester].push(pm.marks);
  });

  const chartData = Object.keys(pastGroups).sort((a, b) => a - b).map(sem => {
    const gradePoints = pastGroups[sem].map(mark => mark / 10);
    const cgpa = gradePoints.length > 0 ? gradePoints.reduce((a, b) => a + b, 0) / gradePoints.length : 0;
    return { semester: `Semester ${sem}`, cgpa: cgpa };
  });

  const practicalData = practicalMarks.map(p => ({
    subject: subjectMap[p.subject_id] || `Subject ${p.subject_id}`,
    practical: p.marks
  }));

  const resultsContent = (
    <div className="space-y-6">
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Current Semester Results
            <Badge variant="outline">Semester {user.semester}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {combinedCurrent.map((result, index) => {
              const isPass = result.status === "Pass";
              return (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div><h4 className="font-semibold">{result.subject_name}</h4></div>
                    <div className="text-right">
                      <Badge variant={isPass ? "success" : "destructive"}>
                        {isPass ? <CheckCircle className="h-4 w-4 mr-1" /> : <XCircle className="h-4 w-4 mr-1" />}
                        {result.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1 mr-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Total Marks</span>
                        <span>{result.totalMarks.toFixed(1)} / 75</span>
                      </div>
                      <Progress value={(result.totalMarks / 75) * 100} />
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between"><span>T1 Marks (out of 25)</span><span>{result.t1_marks}</span></div>
                    <div className="flex justify-between"><span>T2 Marks (out of 25)</span><span>{result.t2_marks}</span></div>
                    <div className="flex justify-between"><span>T3 Marks (out of 25)</span><span>{result.t3_marks}</span></div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border p-2 rounded-lg shadow-lg">
          <p className="font-bold">{`${label}`}</p>
          <p className="text-primary">{`Marks: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <Card className="shadow-card">
          <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
            <CardTitle className="text-2xl flex items-center gap-2"><Award className="h-6 w-6" />Academic Results & Progress</CardTitle>
          </CardHeader>
        </Card>

        <div className="grid md:grid-cols-2 gap-4">
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-success">{totalMarksObtained.toFixed(1)} / {totalPossibleMarks}</div>
              <p className="text-sm text-muted-foreground">Total Marks (Current Sem)</p>
              <Progress value={(totalMarksObtained / totalPossibleMarks) * 100} className="mt-2" />
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-warning">{passedSubjects}</div>
              <p className="text-sm text-muted-foreground">Subjects Passed</p>
              <div className="text-xs text-muted-foreground mt-1">out of {combinedCurrent.length}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {resultsContent}
          </div>
          <div className="space-y-6">
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2"><BarChart3 className="h-4 w-4" />CGPA Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {chartData.map((data, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{data.semester}</span>
                        <span className="font-medium">{data.cgpa.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${data.cgpa * 10}%` }}/>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2"><BarChart3 className="h-4 w-4" />Subject Wise Practical Marks</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={practicalData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4F46E5" stopOpacity={1}/>
                        <stop offset="95%" stopColor="#4F46E5" stopOpacity={0.2}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" tickFormatter={() => ''} tickLine={false} axisLine={false} />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(79, 70, 229, 0.1)'}}/>
                    <Bar dataKey="practical" fill="url(#colorUv)" radius={[4, 4, 0, 0]} />
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
