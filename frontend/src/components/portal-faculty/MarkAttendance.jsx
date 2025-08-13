import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { UserCheck, Users, Calendar, Save, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import axios from "axios";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// API fetching functions
const fetchBranches = async () => {
  const { data } = await axios.get('/api/branches/');
  return data;
};

const fetchSubjects = async () => {
  const { data } = await axios.get('/api/subjects/');
  return data;
};

const fetchStudents = async (branch) => {
  if (!branch) return [];
  const { data } = await axios.get(`/api/students-by-branch/${branch}/`);
  return data;
};

const submitAttendance = async (data) => {
  const { data: responseData } = await axios.post('/api/mark-attendance/', data);
  return responseData;
};

export default function MarkAttendance() {
  const [selectedBranch, setSelectedBranch] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: branches, isLoading: branchesLoading } = useQuery({ queryKey: ['branches'], queryFn: fetchBranches });
  const { data: subjects, isLoading: subjectsLoading } = useQuery({ queryKey: ['subjects'], queryFn: fetchSubjects });
  const { data: students, isLoading: studentsLoading } = useQuery({
    queryKey: ['students', selectedBranch],
    queryFn: () => fetchStudents(selectedBranch),
    enabled: !!selectedBranch,
  });

  const { control, handleSubmit, watch, setValue, getValues, reset } = useForm({
    defaultValues: {
      branch: "",
      subject_id: "",
      attendance: {},
    },
  });

  const attendanceData = watch("attendance");

  const attendanceMutation = useMutation({
    mutationFn: submitAttendance,
    onSuccess: () => {
      toast({
        title: "Attendance Marked",
        description: "Attendance has been successfully recorded.",
      });
      // Reset the form to its default state
      reset({
        branch: "",
        subject_id: "",
        attendance: {}
      });
      // Clear the branch selector
      setSelectedBranch("");
      // The problematic invalidateQueries line has been removed.
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.response?.data?.error || "Failed to mark attendance.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsConfirmOpen(false);
    }
  });

  const onSubmit = () => {
    const data = getValues();
    const attendanceArray = Object.entries(data.attendance).map(([enrollment_no, status]) => ({
      enrollment_no: parseInt(enrollment_no),
      status,
    }));
    attendanceMutation.mutate({ subject_id: data.subject_id, attendance: attendanceArray });
  };

  const markAll = (status) => {
    if (students) {
      const allStatus = students.reduce((acc, student) => {
        acc[student.enrollment_no] = status;
        return acc;
      }, {});
      setValue("attendance", allStatus);
    }
  };

  const getAttendanceStats = () => {
    if (!students || !attendanceData) return { present: 0, absent: 0, total: 0 };
    const present = Object.values(attendanceData).filter(s => s === "present").length;
    const absent = Object.values(attendanceData).filter(s => s === "absent").length;
    return { present, absent, total: students.length };
  };

  const stats = getAttendanceStats();
  const isFormComplete = students && Object.keys(attendanceData).length === students.length;
  const getInitials = (name = '') => name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
        <div className="max-w-7xl mx-auto space-y-6">
            <Card className="shadow-card">
                <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
                    <CardTitle className="text-2xl flex items-center gap-2"><UserCheck className="h-6 w-6" />Attendance Tracking</CardTitle>
                </CardHeader>
            </Card>

            <Card className="shadow-card">
                <CardHeader>
                <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" />Select Branch & Subject</CardTitle>
                <CardDescription>Today's Date: {new Date().toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                    <Controller name="branch" control={control} render={({ field }) => (
                        <Select value={selectedBranch} onValueChange={(value) => { setSelectedBranch(value); field.onChange(value); setValue("attendance", {}); }} disabled={branchesLoading}>
                            <SelectTrigger><SelectValue placeholder="Select a branch" /></SelectTrigger>
                            <SelectContent>{branches?.map((branch) => (<SelectItem key={branch} value={branch}>{branch}</SelectItem>))}</SelectContent>
                        </Select>
                    )} />
                    <Controller name="subject_id" control={control} render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value} disabled={subjectsLoading}>
                            <SelectTrigger><SelectValue placeholder="Select a subject" /></SelectTrigger>
                            <SelectContent>{subjects?.map((subject) => (<SelectItem key={subject.subject_id} value={subject.subject_id.toString()}>{subject.subject_name}</SelectItem>))}</SelectContent>
                        </Select>
                    )} />
                </div>
                </CardContent>
            </Card>

            {selectedBranch && (
                <Card className="shadow-card">
                <CardHeader>
                    <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" />Student Attendance</CardTitle>
                        <CardDescription>Mark attendance for each student</CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <Button type="button" variant="outline" size="sm" onClick={() => markAll('present')}>Mark All Present</Button>
                        <Button type="button" variant="outline" size="sm" onClick={() => markAll('absent')}>Mark All Absent</Button>
                    </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {studentsLoading ? (
                    <div className="space-y-4">{[...Array(4)].map((_, i) => (<Skeleton key={i} className="h-16 w-full" />))}</div>
                    ) : (
                    <>
                        <form onSubmit={handleSubmit(() => setIsConfirmOpen(true))} className="space-y-4">
                        <Table>
                            <TableHeader><TableRow><TableHead>Student</TableHead><TableHead>Roll Number</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                            <TableBody>
                            {students?.map((student) => (
                                <TableRow key={student.enrollment_no}>
                                <TableCell><div className="flex items-center gap-3"><Avatar className="h-8 w-8"><AvatarFallback>{getInitials(student.name)}</AvatarFallback></Avatar><span className="font-medium">{student.name}</span></div></TableCell>
                                <TableCell>{student.enrollment_no}</TableCell>
                                <TableCell>
                                    <Controller name={`attendance.${student.enrollment_no}`} control={control} render={({ field }) => (
                                        <div className="flex gap-2">
                                        <Button type="button" variant={field.value === "present" ? "default" : "outline"} onClick={() => field.onChange("present")}>Present</Button>
                                        <Button type="button" variant={field.value === "absent" ? "destructive" : "outline"} onClick={() => field.onChange("absent")}>Absent</Button>
                                        </div>
                                    )} />
                                </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        <div className="flex items-center justify-between pt-4 border-t">
                            <div className="flex gap-4">
                            <Badge variant="default">Present: {stats.present}</Badge>
                            <Badge variant="destructive">Absent: {stats.absent}</Badge>
                            <Badge variant="outline">Total: {stats.total}</Badge>
                            </div>
                            <Button type="submit" disabled={!isFormComplete || attendanceMutation.isPending} className="gap-2"><Save className="h-4 w-4" />Submit Attendance</Button>
                        </div>
                        </form>
                        <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Confirm Submission</AlertDialogTitle>
                            <AlertDialogDescription>Are you sure you want to submit the attendance? This action cannot be undone for today.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleSubmit(onSubmit)} disabled={attendanceMutation.isPending}>
                                {attendanceMutation.isPending ? "Saving..." : "Confirm"}
                            </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                        </AlertDialog>
                    </>
                    )}
                </CardContent>
                </Card>
            )}
        </div>
    </div>
  );
}
