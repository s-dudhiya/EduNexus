import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Search, Loader2, BarChart3 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Progress } from '@/components/ui/progress';

// API Fetching Functions
const fetchExams = async () => {
  const { data } = await axios.get('/api/faculty-results/');
  return data;
};

const fetchExamResults = async (examName) => {
  if (!examName) return [];
  const { data } = await axios.get(`/api/faculty-results/?exam_name=${examName}`);
  return data;
};

const fetchStudentMarks = async (searchQuery) => {
  if (!searchQuery) return { past: [], practical: [] };
  const { data } = await axios.get(`/api/faculty-results/?search_query=${searchQuery}`);
  return data;
};

const fetchCurrentSemMarks = async () => {
    const { data } = await axios.get('/api/faculty-results/?current_sem_marks=true');
    return data;
};

export default function ViewResults() {
  const [examStudentSearchTerm, setExamStudentSearchTerm] = useState('');
  const [currentSemSearchTerm, setCurrentSemSearchTerm] = useState('');
  const [selectedExam, setSelectedExam] = useState('');
  const [studentSearchTerm, setStudentSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [selectedTest, setSelectedTest] = useState('t1_marks');
  const [selectedSubject, setSelectedSubject] = useState('All');

  // Fetch data
  const { data: exams, isLoading: examsLoading } = useQuery({ queryKey: ['exams'], queryFn: fetchExams, initialData: [] });
  const { data: examResults, isLoading: examResultsLoading } = useQuery({
    queryKey: ['examResults', selectedExam],
    queryFn: () => fetchExamResults(selectedExam),
    enabled: !!selectedExam,
    initialData: []
  });
  const { data: studentMarks, isLoading: studentMarksLoading } = useQuery({
    queryKey: ['studentMarks', debouncedSearchTerm],
    queryFn: () => fetchStudentMarks(debouncedSearchTerm),
    enabled: !!debouncedSearchTerm,
    initialData: { past: [], practical: [] }
  });
  const { data: currentSemMarks, isLoading: currentSemMarksLoading } = useQuery({
    queryKey: ['currentSemMarks'],
    queryFn: fetchCurrentSemMarks,
    initialData: []
  });

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchTerm(studentSearchTerm), 500);
    return () => clearTimeout(handler);
  }, [studentSearchTerm]);

  // Ranking and filtering logic for exam results
  const rankedExamResults = useMemo(() => {
    if (!examResults || examResults.length === 0) return [];

    const studentTotals = new Map();
    examResults.forEach(result => {
      const enroll = result.enrollment_no;
      const total = result.code_marks + result.mcq_marks;
      if (!studentTotals.has(enroll)) {
        studentTotals.set(enroll, { enroll, name: result.student_name, total: 0 });
      }
      studentTotals.get(enroll).total += total;
    });

    const sortedStudents = Array.from(studentTotals.values()).sort((a, b) => b.total - a.total);

    let rank = 1;
    let prevTotal = -1;
    sortedStudents.forEach((stud, index) => {
      if (index > 0 && stud.total < prevTotal) {
        rank = index + 1;
      }
      stud.rank = rank;
      prevTotal = stud.total;
    });

    const rankMap = new Map(sortedStudents.map(s => [s.enroll, s.rank]));

    return examResults.map(result => ({
      ...result,
      total: result.code_marks + result.mcq_marks,
      rank: rankMap.get(result.enrollment_no)
    }));
  }, [examResults]);

  const filteredExamResults = useMemo(() => {
    return rankedExamResults
      .filter(result => 
        result.student_name.toLowerCase().includes(examStudentSearchTerm.toLowerCase()) ||
        result.enrollment_no.toString().includes(examStudentSearchTerm)
      )
      .sort((a, b) => a.rank - b.rank);
  }, [rankedExamResults, examStudentSearchTerm]);

  // Compute unique subjects for current semester marks
  const uniqueSubjects = useMemo(() => {
    if (!currentSemMarks || currentSemMarks.length === 0) return [];
    const subjectsSet = new Set(currentSemMarks.map(mark => mark.subject_name));
    return ['All', ...Array.from(subjectsSet)];
  }, [currentSemMarks]);

  // Filter by selected subject
  const filteredBySubject = useMemo(() => {
    if (selectedSubject === 'All') return currentSemMarks;
    return currentSemMarks.filter(mark => mark.subject_name === selectedSubject);
  }, [currentSemMarks, selectedSubject]);

  // Ranking logic for filtered current semester marks
  const rankedCurrentSemMarks = useMemo(() => {
    if (!filteredBySubject || filteredBySubject.length === 0) return [];

    const studentTotals = new Map();
    filteredBySubject.forEach(mark => {
      const enroll = mark.enrollment_number;
      const marksVal = mark[selectedTest] || 0;
      if (!studentTotals.has(enroll)) {
        studentTotals.set(enroll, { enroll, name: mark.student_name, total: 0 });
      }
      studentTotals.get(enroll).total += marksVal;
    });

    const sortedStudents = Array.from(studentTotals.values()).sort((a, b) => b.total - a.total);

    let rank = 1;
    let prevTotal = -1;
    sortedStudents.forEach((stud, index) => {
      if (index > 0 && stud.total < prevTotal) {
        rank = index + 1;
      }
      stud.rank = rank;
      prevTotal = stud.total;
    });

    const rankMap = new Map(sortedStudents.map(s => [s.enroll, s.rank]));

    return filteredBySubject.map(mark => ({
      ...mark,
      rank: rankMap.get(mark.enrollment_number)
    }));
  }, [filteredBySubject, selectedTest]);

  const filteredCurrentSemMarks = useMemo(() => {
    return rankedCurrentSemMarks
      .filter(mark =>
        mark.student_name.toLowerCase().includes(currentSemSearchTerm.toLowerCase()) ||
        mark.enrollment_number.toString().includes(currentSemSearchTerm)
      )
      .sort((a, b) => a.rank - b.rank);
  }, [rankedCurrentSemMarks, currentSemSearchTerm]);

  const cgpaChartData = useMemo(() => {
    if (!studentMarks?.past) return [];
    const pastGroups = {};
    studentMarks.past.forEach(pm => {
      if (!pastGroups[pm.semester]) pastGroups[pm.semester] = [];
      pastGroups[pm.semester].push(pm.marks);
    });
    return Object.keys(pastGroups).sort((a, b) => a - b).map(sem => {
      const gradePoints = pastGroups[sem].map(mark => mark / 10);
      const cgpa = gradePoints.length > 0 ? gradePoints.reduce((a, b) => a + b, 0) / gradePoints.length : 0;
      return { semester: `Semester ${sem}`, cgpa: cgpa };
    });
  }, [studentMarks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <Card className="shadow-card">
          <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
            <CardTitle className="text-2xl flex items-center gap-2"><FileText className="h-6 w-6" />Student Results</CardTitle>
          </CardHeader>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4">
            <Tabs defaultValue="exam-results">
              <TabsList>
                <TabsTrigger value="exam-results">Online Exam Results</TabsTrigger>
                <TabsTrigger value="current-sem-marks">Current Semester Marks</TabsTrigger>
                <TabsTrigger value="past-marks">Past Marks</TabsTrigger>
              </TabsList>

              <TabsContent value="exam-results">
                <div className="flex items-center gap-4 mt-4">
                  <Input placeholder="Search by name or enrollment..." value={examStudentSearchTerm} onChange={(e) => setExamStudentSearchTerm(e.target.value)} className="flex-1"/>
                  <Select onValueChange={setSelectedExam} value={selectedExam}>
                    <SelectTrigger className="w-[280px]"><SelectValue placeholder="Select an exam" /></SelectTrigger>
                    <SelectContent>{exams.map((examName) => (<SelectItem key={examName} value={examName}>{examName}</SelectItem>))}</SelectContent>
                  </Select>
                </div>
                {examResultsLoading && <div className="flex justify-center p-4"><Loader2 className="h-6 w-6 animate-spin" /></div>}
                {selectedExam && !examResultsLoading && (
                  <Table className="mt-4">
                    <TableHeader><TableRow><TableHead>Rank</TableHead><TableHead>Enrollment No</TableHead><TableHead>Student Name</TableHead><TableHead>Subject</TableHead><TableHead>Code</TableHead><TableHead>MCQ</TableHead><TableHead>Total</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {filteredExamResults.map((result) => (
                        <TableRow key={result.id}>
                          <TableCell>{result.rank}</TableCell>
                          <TableCell>{result.enrollment_no}</TableCell>
                          <TableCell>{result.student_name}</TableCell>
                          <TableCell>{result.subject_name}</TableCell>
                          <TableCell>{result.code_marks}</TableCell>
                          <TableCell>{result.mcq_marks}</TableCell>
                          <TableCell>{result.total}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TabsContent>

              <TabsContent value="current-sem-marks">
                <div className="flex items-center gap-4 mt-4">
                    <Input placeholder="Search by name or enrollment..." value={currentSemSearchTerm} onChange={(e) => setCurrentSemSearchTerm(e.target.value)} className="flex-1"/>
                    <Select onValueChange={setSelectedTest} defaultValue="t1_marks">
                        <SelectTrigger className="w-[280px]"><SelectValue placeholder="Select Test" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="t1_marks">Test 1 Marks</SelectItem>
                            <SelectItem value="t2_marks">Test 2 Marks</SelectItem>
                            <SelectItem value="t3_marks">Test 3 Marks</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select onValueChange={setSelectedSubject} value={selectedSubject}>
                        <SelectTrigger className="w-[280px]"><SelectValue placeholder="Select Subject" /></SelectTrigger>
                        <SelectContent>
                            {uniqueSubjects.map((sub) => (
                                <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                {currentSemMarksLoading && <div className="flex justify-center p-4"><Loader2 className="h-6 w-6 animate-spin" /></div>}
                {!currentSemMarksLoading && (
                    <Table className="mt-4">
                        <TableHeader><TableRow><TableHead>Rank</TableHead><TableHead>Enrollment No</TableHead><TableHead>Student Name</TableHead><TableHead>Subject</TableHead><TableHead>Marks</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {filteredCurrentSemMarks.map((mark) => (
                                <TableRow key={mark.id}>
                                    <TableCell>{mark.rank}</TableCell>
                                    <TableCell>{mark.enrollment_number}</TableCell>
                                    <TableCell>{mark.student_name}</TableCell>
                                    <TableCell>{mark.subject_name}</TableCell>
                                    <TableCell>{mark[selectedTest]}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
              </TabsContent>

              <TabsContent value="past-marks">
                <div className="relative mt-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search by enrollment no or name to view past marks..." value={studentSearchTerm} onChange={(e) => setStudentSearchTerm(e.target.value)} className="pl-10"/>
                </div>
                {studentMarksLoading && <div className="flex justify-center p-4"><Loader2 className="h-6 w-6 animate-spin" /></div>}
                {debouncedSearchTerm && !studentMarksLoading && studentMarks && (
                  <div className="grid lg:grid-cols-2 gap-6 mt-6">
                    <Card className="shadow-card">
                      <CardHeader><CardTitle className="text-sm flex items-center gap-2"><BarChart3 className="h-4 w-4" />CGPA Progress</CardTitle></CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {cgpaChartData.map((data, index) => (
                            <div key={index} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>{data.semester}</span>
                                <span className="font-medium">{data.cgpa.toFixed(2)} CGPA</span>
                              </div>
                              <Progress value={data.cgpa * 10} />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="shadow-card">
                      <CardHeader><CardTitle className="text-sm flex items-center gap-2"><BarChart3 className="h-4 w-4" />Practical Marks</CardTitle></CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {studentMarks.practical.map((mark, index) => (
                            <div key={index} className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>{mark.subject_name}</span>
                                <span className="font-medium">{mark.marks} / 100</span>
                              </div>
                              <Progress value={mark.marks} />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};