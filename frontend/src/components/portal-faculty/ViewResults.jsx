import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText } from 'lucide-react';

// Dummy data based on models
const students = [
  { enrollment_no: 101, name: 'Alice' },
  { enrollment_no: 102, name: 'Bob' },
  { enrollment_no: 103, name: 'Charlie' },
  { enrollment_no: 201, name: 'David' },
  { enrollment_no: 202, name: 'Eve' },
  { enrollment_no: 301, name: 'Frank' },
  { enrollment_no: 302, name: 'Grace' },
];

const subjects = [
  { subject_id: 1, subject_name: 'Computer Science' },
  { subject_id: 2, subject_name: 'History' },
  { subject_id: 3, subject_name: 'Physics' },
];

const exams = [
  { id: 'Midterm Exam', name: 'Midterm Exam' },
  { id: 'Final Exam', name: 'Final Exam' },
  { id: 'Quiz 1', name: 'Quiz 1' },
];

const examResults = [
  { id: 1, enrollment_no: 101, subject_id: 1, code_marks: 40, mcq_marks: 45, test_name: 'Midterm Exam' },
  { id: 2, enrollment_no: 102, subject_id: 1, code_marks: 42, mcq_marks: 50, test_name: 'Midterm Exam' },
  { id: 3, enrollment_no: 103, subject_id: 1, code_marks: 38, mcq_marks: 40, test_name: 'Midterm Exam' },
  { id: 4, enrollment_no: 101, subject_id: 2, code_marks: 45, mcq_marks: 43, test_name: 'Midterm Exam' },
  { id: 5, enrollment_no: 102, subject_id: 2, code_marks: 48, mcq_marks: 47, test_name: 'Midterm Exam' },
  { id: 6, enrollment_no: 101, subject_id: 1, code_marks: 42, mcq_marks: 46, test_name: 'Final Exam' },
  { id: 7, enrollment_no: 102, subject_id: 1, code_marks: 45, mcq_marks: 50, test_name: 'Final Exam' },
  { id: 8, enrollment_no: 103, subject_id: 1, code_marks: 40, mcq_marks: 42, test_name: 'Final Exam' },
  { id: 9, enrollment_no: 201, subject_id: 3, code_marks: 35, mcq_marks: 40, test_name: 'Quiz 1' },
  { id: 10, enrollment_no: 202, subject_id: 3, code_marks: 38, mcq_marks: 42, test_name: 'Quiz 1' },
];

const pastMarks = [
    { id: 1, enrollment_no: 101, subject_id: 1, semester: 1, marks: 85 },
    { id: 2, enrollment_no: 101, subject_id: 2, semester: 1, marks: 90 },
    { id: 3, enrollment_no: 102, subject_id: 1, semester: 1, marks: 88 },
    { id: 4, enrollment_no: 102, subject_id: 2, semester: 1, marks: 92 },
  ];
  
  const practicalMarks = [
    { id: 1, enrollment_no: 101, subject_id: 1, semester: 1, marks: 75 },
    { id: 2, enrollment_no: 101, subject_id: 2, semester: 1, marks: 80 },
    { id: 3, enrollment_no: 102, subject_id: 1, semester: 1, marks: 78 },
    { id: 4, enrollment_no: 102, subject_id: 2, semester: 1, marks: 82 },
  ];

const ViewResults = () => {
  const [examSearchTerm, setExamSearchTerm] = useState('');
  const [selectedExam, setSelectedExam] = useState(null);
  const [studentSearchTerm, setStudentSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredExams = exams.filter((exam) =>
    exam.name.toLowerCase().includes(examSearchTerm.toLowerCase())
  );

  const handleExamChange = (examName) => {
    setSelectedExam(examName);
  };

  const getResultsForExam = (examName) => {
    if (!examName) return [];
    return examResults
      .filter((result) => result.test_name === examName)
      .map((result) => {
        const student = students.find((s) => s.enrollment_no === result.enrollment_no);
        const subject = subjects.find((s) => s.subject_id === result.subject_id);
        return {
          ...result,
          student_name: student ? student.name : 'Unknown',
          subject_name: subject ? subject.subject_name : 'Unknown',
          total_marks: result.code_marks + result.mcq_marks,
        };
      });
  };

  const examResultsData = getResultsForExam(selectedExam);

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(studentSearchTerm.toLowerCase()) ||
      student.enrollment_no.toString().includes(studentSearchTerm)
  );

  const handleStudentChange = (enrollment_no) => {
    setSelectedStudent(enrollment_no);
  };

  const getStudentMarks = (enrollment_no) => {
    if (!enrollment_no) return { past: [], practical: [] };
    const studentPastMarks = pastMarks
      .filter((mark) => mark.enrollment_no === parseInt(enrollment_no))
      .map((mark) => ({
        ...mark,
        subject_name: subjects.find((s) => s.subject_id === mark.subject_id)?.subject_name || 'Unknown',
      }));
    const studentPracticalMarks = practicalMarks
      .filter((mark) => mark.enrollment_no === parseInt(enrollment_no))
      .map((mark) => ({
        ...mark,
        subject_name: subjects.find((s) => s.subject_id === mark.subject_id)?.subject_name || 'Unknown',
      }));
    return { past: studentPastMarks, practical: studentPracticalMarks };
  };

  const { past: pastMarksData, practical: practicalMarksData } = getStudentMarks(selectedStudent);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
        <div className="max-w-7xl mx-auto space-y-6">
            <Card className="shadow-card">
                <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
                    <CardTitle className="text-2xl flex items-center gap-2">
                        <FileText className="h-6 w-6" />
                        Student Results
                    </CardTitle>
                </CardHeader>
            </Card>
            <Card className="shadow-card">
                <CardContent className="p-4">
                    <Tabs defaultValue="exam-results">
                    <TabsList>
                        <TabsTrigger value="exam-results">Exam Results</TabsTrigger>
                        <TabsTrigger value="student-marks">Student Marks</TabsTrigger>
                    </TabsList>
                    <TabsContent value="exam-results">
                        <div className="flex flex-col gap-4 mt-4">
                        <div className="flex items-center gap-4">
                            <Input
                            placeholder="Search for an exam..."
                            value={examSearchTerm}
                            onChange={(e) => setExamSearchTerm(e.target.value)}
                            className="w-1/2"
                            />
                            <Select onValueChange={handleExamChange} value={selectedExam}>
                            <SelectTrigger className="w-1/2">
                                <SelectValue placeholder="Select an exam" />
                            </SelectTrigger>
                            <SelectContent>
                                {filteredExams.map((exam) => (
                                <SelectItem key={exam.id} value={exam.id}>
                                    {exam.name}
                                </SelectItem>
                                ))}
                            </SelectContent>
                            </Select>
                        </div>
                        {selectedExam && (
                            <div>
                            <h3 className="text-lg font-semibold mb-2">Results for {selectedExam}</h3>
                            <Table>
                                <TableHeader>
                                <TableRow>
                                    <TableHead>Enrollment No</TableHead>
                                    <TableHead>Student Name</TableHead>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Code Marks</TableHead>
                                    <TableHead>MCQ Marks</TableHead>
                                    <TableHead>Total Marks</TableHead>
                                </TableRow>
                                </TableHeader>
                                <TableBody>
                                {examResultsData.length > 0 ? (
                                    examResultsData.map((result) => (
                                    <TableRow key={result.id}>
                                        <TableCell>{result.enrollment_no}</TableCell>
                                        <TableCell>{result.student_name}</TableCell>
                                        <TableCell>{result.subject_name}</TableCell>
                                        <TableCell>{result.code_marks}</TableCell>
                                        <TableCell>{result.mcq_marks}</TableCell>
                                        <TableCell>{result.total_marks}</TableCell>
                                    </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                    <TableCell colSpan="6" className="text-center">No results found for this exam.</TableCell>
                                    </TableRow>
                                )}
                                </TableBody>
                            </Table>
                            </div>
                        )}
                        </div>
                    </TabsContent>
                    <TabsContent value="student-marks">
                        <div className="flex flex-col gap-4 mt-4">
                        <div className="flex items-center gap-4">
                            <Input
                            placeholder="Search for a student by name or enrollment no..."
                            value={studentSearchTerm}
                            onChange={(e) => setStudentSearchTerm(e.target.value)}
                            className="w-1/2"
                            />
                            <Select onValueChange={handleStudentChange} value={selectedStudent}>
                            <SelectTrigger className="w-1/2">
                                <SelectValue placeholder="Select a student" />
                            </SelectTrigger>
                            <SelectContent>
                                {filteredStudents.map((student) => (
                                <SelectItem key={student.enrollment_no} value={student.enrollment_no.toString()}>
                                    {student.name} ({student.enrollment_no})
                                </SelectItem>
                                ))}
                            </SelectContent>
                            </Select>
                        </div>
                        {selectedStudent && (
                            <div>
                            <h3 className="text-lg font-semibold mb-2 mt-4">Past Marks</h3>
                            <Table>
                                <TableHeader>
                                <TableRow>
                                    <TableHead>Semester</TableHead>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Marks</TableHead>
                                </TableRow>
                                </TableHeader>
                                <TableBody>
                                {pastMarksData.length > 0 ? (
                                    pastMarksData.map((mark) => (
                                    <TableRow key={mark.id}>
                                        <TableCell>{mark.semester}</TableCell>
                                        <TableCell>{mark.subject_name}</TableCell>
                                        <TableCell>{mark.marks}</TableCell>
                                    </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                    <TableCell colSpan="3" className="text-center">No past marks found for this student.</TableCell>
                                    </TableRow>
                                )}
                                </TableBody>
                            </Table>

                            <h3 className="text-lg font-semibold mb-2 mt-4">Practical Marks</h3>
                            <Table>
                                <TableHeader>
                                <TableRow>
                                    <TableHead>Semester</TableHead>
                                    <TableHead>Subject</TableHead>
                                    <TableHead>Marks</TableHead>
                                </TableRow>
                                </TableHeader>
                                <TableBody>
                                {practicalMarksData.length > 0 ? (
                                    practicalMarksData.map((mark) => (
                                    <TableRow key={mark.id}>
                                        <TableCell>{mark.semester}</TableCell>
                                        <TableCell>{mark.subject_name}</TableCell>
                                        <TableCell>{mark.marks}</TableCell>
                                    </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                    <TableCell colSpan="3" className="text-center">No practical marks found for this student.</TableCell>
                                    </TableRow>
                                )}
                                </TableBody>
                            </Table>
                            </div>
                        )}
                        </div>
                    </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    </div>
  );
};

export default ViewResults;
