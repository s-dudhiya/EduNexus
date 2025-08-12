import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { UserCheck, Users, Calendar, Save } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Mock data
const mockBatches = [
  { id: "1", name: "Grade 12 - Section A", students: 25 },
  { id: "2", name: "Grade 12 - Section B", students: 23 },
  { id: "3", name: "Grade 12 - Section C", students: 27 },
];

const mockCourses = [
  { id: "1", name: "Mathematics" },
  { id: "2", name: "Physics" },
  { id: "3", name: "Chemistry" },
];

const mockStudents = {
  "1": [
    { id: "s1", name: "John Doe", rollNumber: "12001", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john" },
    { id: "s2", name: "Jane Smith", rollNumber: "12002", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane" },
    { id: "s3", name: "Mike Johnson", rollNumber: "12003", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike" },
    { id: "s4", name: "Sarah Wilson", rollNumber: "12004", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah" },
  ],
  "2": [
    { id: "s5", name: "David Brown", rollNumber: "12005", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david" },
    { id: "s6", name: "Emma Davis", rollNumber: "12006", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma" },
    { id: "s7", name: "Alex Lee", rollNumber: "12007", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex" },
  ],
  "3": [
    { id: "s8", name: "Lisa Garcia", rollNumber: "12008", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa" },
    { id: "s9", name: "Tom Martinez", rollNumber: "12009", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tom" },
    { id: "s10", name: "Amy Taylor", rollNumber: "12010", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=amy" },
  ],
};

const fetchBatches = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockBatches;
};

const fetchCourses = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockCourses;
};

const fetchStudents = async (batchId) => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockStudents[batchId] || [];
};

const submitAttendance = async (data) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true };
};

export default function MarkAttendance() {
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: batches, isLoading: batchesLoading } = useQuery({
    queryKey: ['batches'],
    queryFn: fetchBatches,
  });

  const { data: courses, isLoading: coursesLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: fetchCourses,
  });

  const { data: students, isLoading: studentsLoading } = useQuery({
    queryKey: ['students', selectedBatch],
    queryFn: () => fetchStudents(selectedBatch),
    enabled: !!selectedBatch,
  });

  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      batchId: "",
      courseId: "",
      date: new Date().toISOString().split('T')[0],
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
      // Reset form
      setValue("attendance", {});
      setValue("date", new Date().toISOString().split('T')[0]);
      setSelectedBatch("");
      setSelectedCourse("");
      setIsConfirmOpen(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to mark attendance. Please try again.",
        variant: "destructive",
      });
      setIsConfirmOpen(false);
    },
  });

  const onSubmit = (data) => {
    const attendanceArray = Object.entries(data.attendance).map(([studentId, status]) => ({
      studentId,
      status,
    }));

    attendanceMutation.mutate({
      batchId: data.batchId,
      courseId: data.courseId,
      date: data.date,
      attendance: attendanceArray,
    });
  };

  const markAllPresent = () => {
    if (students) {
      const allPresent = students.reduce((acc, student) => {
        acc[student.id] = "present";
        return acc;
      }, {});
      setValue("attendance", allPresent);
    }
  };

  const markAllAbsent = () => {
    if (students) {
      const allAbsent = students.reduce((acc, student) => {
        acc[student.id] = "absent";
        return acc;
      }, {});
      setValue("attendance", allAbsent);
    }
  };

  const getAttendanceStats = () => {
    if (!students || !attendanceData) return { present: 0, absent: 0, total: 0 };
    
    const present = Object.values(attendanceData).filter(status => status === "present").length;
    const absent = Object.values(attendanceData).filter(status => status === "absent").length;
    const total = students.length;

    return { present, absent, total };
  };

  const stats = getAttendanceStats();
  const isFormComplete = students && Object.keys(attendanceData).length === students.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <UserCheck className="h-5 w-5" />
        <h1 className="text-2xl font-bold">Mark Attendance</h1>
      </div>

      {/* Selection Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Select Batch, Course and Date
          </CardTitle>
          <CardDescription>Choose the batch, course and date for which you want to mark attendance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Controller
              name="batchId"
              control={control}
              render={({ field }) => (
                <Select 
                  value={selectedBatch} 
                  onValueChange={(value) => {
                    setSelectedBatch(value);
                    field.onChange(value);
                    setValue("attendance", {});
                  }}
                  disabled={batchesLoading}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a batch" />
                  </SelectTrigger>
                  <SelectContent>
                    {batches?.map((batch) => (
                      <SelectItem key={batch.id} value={batch.id}>
                        {batch.name} ({batch.students} students)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <Controller
              name="courseId"
              control={control}
              render={({ field }) => (
                <Select 
                  value={selectedCourse} 
                  onValueChange={(value) => {
                    setSelectedCourse(value);
                    field.onChange(value);
                    setValue("attendance", {});
                  }}
                  disabled={coursesLoading}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses?.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <Input type="date" {...field} />
              )}
            />
          </div>
        </CardContent>
      </Card>

      {/* Attendance Form */}
      {selectedBatch && selectedCourse && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Student Attendance
                </CardTitle>
                <CardDescription>Mark attendance for each student</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" size="sm" onClick={markAllPresent}>
                  Mark All Present
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={markAllAbsent}>
                  Mark All Absent
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {studentsLoading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div>
                        <Skeleton className="h-4 w-24 mb-1" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                    <Skeleton className="h-9 w-24" />
                  </div>
                ))}
              </div>
            ) : (
              <>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Roll Number</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students?.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <img 
                                src={student.avatar} 
                                alt={student.name}
                                className="h-8 w-8 rounded-full"
                              />
                              <span className="font-medium">{student.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{student.rollNumber}</TableCell>
                          <TableCell>
                            <Controller
                              name={`attendance.${student.id}`}
                              control={control}
                              render={({ field }) => (
                                <div className="flex gap-2">
                                  <Button
                                    type="button"
                                    variant={field.value === "present" ? "default" : "outline"}
                                    onClick={() => field.onChange("present")}
                                  >
                                    Present
                                  </Button>
                                  <Button
                                    type="button"
                                    variant={field.value === "absent" ? "destructive" : "outline"}
                                    onClick={() => field.onChange("absent")}
                                  >
                                    Absent
                                  </Button>
                                </div>
                              )}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {/* Stats and Submit */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex gap-4">
                      <Badge variant="default">Present: {stats.present}</Badge>
                      <Badge variant="destructive">Absent: {stats.absent}</Badge>
                      <Badge variant="outline">Total: {stats.total}</Badge>
                    </div>
                    <Button 
                      type="button" 
                      disabled={!isFormComplete || attendanceMutation.isPending}
                      onClick={() => setIsConfirmOpen(true)}
                      className="gap-2"
                    >
                      <Save className="h-4 w-4" />
                      Submit Attendance
                    </Button>
                  </div>
                </form>
                <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Submission</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to submit the attendance? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleSubmit(onSubmit)} 
                        disabled={attendanceMutation.isPending}
                      >
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
  );
}