import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Save, FileText, Loader2 } from 'lucide-react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ManageExams = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { control, register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
    defaultValues: {
      subject_id: '',
      questions: []
    }
  });

  const { fields: questions, append: addQuestion, remove: removeQuestion } = useFieldArray({
    control,
    name: 'questions'
  });

  // Fetch subjects for the dropdown
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('/api/subjects/');
        setSubjects(response.data);
      } catch (error) {
        toast({ title: "Error", description: "Failed to load subjects.", variant: "destructive" });
      }
    };
    fetchSubjects();
  }, [toast]);

  const addMcqQuestion = () => {
    addQuestion({
      type: 'mcq',
      question: '',
      options: ['', '', '', ''],
      answer: ''
    });
  };

  const addCodeQuestion = () => {
    const hasCodeQuestion = watch('questions').some(q => q.type === 'code');
    if (hasCodeQuestion) {
      toast({
        title: "Limit Reached",
        description: "You can only add one coding question per exam.",
        variant: "destructive"
      });
      return;
    }
    addQuestion({
      type: 'code',
      question: '',
      test_output_1: '',
      test_output_2_input: '',
      test_output_2_output: '',
    });
  };

  const onSubmit = async (data) => {
    setIsLoading(true);

    const codingQuestion = data.questions.find(q => q.type === 'code');
    const formattedTestCases = [
        { "Input": codingQuestion?.test_output_2_input || "", "Output": codingQuestion?.test_output_2_output || "" }
    ];
    
    const mcqQuestions = data.questions.filter(q => q.type === 'mcq');
    const formattedMcqs = mcqQuestions.reduce((acc, mcq, index) => {
      acc[`question_${index + 1}`] = {
        question: mcq.question,
        options: mcq.options.filter(opt => opt),
        answer: mcq.answer
      };
      return acc;
    }, {});

    const selectedSubject = subjects.find(s => s.subject_id.toString() === data.subject_id);

    const payload = {
      subject_id: parseInt(data.subject_id),
      sem: selectedSubject?.sem,
      code_question: codingQuestion?.question || '',
      test_output_1: codingQuestion?.test_output_1 || '',
      test_output_2: formattedTestCases,
      mcq_ques: formattedMcqs
    };

    try {
      await axios.post('/api/create-exam/', payload);
      toast({
        title: "Exam Created Successfully",
        description: "The new exam paper has been saved.",
      });
      reset();
      navigate('/faculty-dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save the exam. Please check your input.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <Card className="shadow-card">
          <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl flex items-center gap-2">
                <FileText className="h-6 w-6" />
                Create New Exam Paper
              </CardTitle>
              <Button form="exam-form" type="submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                Save Exam
              </Button>
            </div>
          </CardHeader>
        </Card>

        <form id="exam-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Controller
                  name="subject_id"
                  control={control}
                  rules={{ required: "Please select a subject" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map(subject => (
                          <SelectItem key={subject.subject_id} value={subject.subject_id.toString()}>
                            {subject.subject_name} (Sem {subject.sem})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.subject_id && <p className="text-sm text-destructive">{errors.subject_id.message}</p>}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Questions ({questions.length})
                <div className="flex items-center gap-2">
                  <Button type="button" variant="outline" onClick={addCodeQuestion}><Plus className="h-4 w-4 mr-2" />Add Code</Button>
                  <Button type="button" onClick={addMcqQuestion}><Plus className="h-4 w-4 mr-2" />Add MCQ</Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {questions.map((question, index) => (
                <Card key={question.id} className="border-2">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Q{index + 1}</Badge>
                        <Badge variant="outline">{question.type.toUpperCase()}</Badge>
                      </div>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeQuestion(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Question *</Label>
                      <Textarea {...register(`questions.${index}.question`, { required: true })} placeholder="Enter question text..." />
                    </div>

                    {question.type === 'mcq' && (
                      <div className="space-y-2">
                        <Label>Options</Label>
                        {(watch(`questions.${index}.options`) || []).map((_, optionIndex) => (
                          <div key={optionIndex} className="flex items-center gap-2">
                            <Input {...register(`questions.${index}.options.${optionIndex}`)} placeholder={`Option ${optionIndex + 1}`} />
                          </div>
                        ))}
                        <div className="mt-2">
                          <Label>Correct Answer</Label>
                          <Select onValueChange={(value) => setValue(`questions.${index}.answer`, value)}>
                            <SelectTrigger><SelectValue placeholder="Select correct option" /></SelectTrigger>
                            <SelectContent>
                              {(watch(`questions.${index}.options`) || []).map((option, optionIndex) => (
                                option && <SelectItem key={optionIndex} value={option}>{option}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}

                    {question.type === 'code' && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Visible Test Case (for students)</Label>
                          <Textarea {...register(`questions.${index}.test_output_1`)} placeholder="e.g., Input: world" rows={2} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Hidden Test Case Input</Label>
                                <Input {...register(`questions.${index}.test_output_2_input`)} placeholder="e.g., world" />
                            </div>
                            <div className="space-y-2">
                                <Label>Hidden Test Case Output</Label>
                                <Input {...register(`questions.${index}.test_output_2_output`)} placeholder="e.g., dlrow" />
                            </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default ManageExams;

// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Badge } from '@/components/ui/badge';
// import { Plus, Trash2, Save, FileText, Loader2 } from 'lucide-react';
// import { useForm, useFieldArray, Controller } from 'react-hook-form';
// import { useToast } from '@/hooks/use-toast';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const ManageExams = () => {
//   const { toast } = useToast();
//   const navigate = useNavigate();
//   const [subjects, setSubjects] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const { control, register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
//     defaultValues: { subject_id: '', questions: [] }
//   });

//   const { fields: questions, append, remove } = useFieldArray({
//     control,
//     name: 'questions'
//   });

//   useEffect(() => {
//     const fetchSubjects = async () => {
//       try {
//         const res = await axios.get('/api/subjects/');
//         setSubjects(res.data);
//       } catch {
//         toast({ title: 'Error', description: 'Failed to load subjects.', variant: 'destructive' });
//       }
//     };
//     fetchSubjects();
//   }, [toast]);

//   const addMcqQuestion = () =>
//     append({ type: 'mcq', question: '', options: ['', '', '', ''], answer: '' });

//   const addCodeQuestion = () => {
//     if (watch('questions').some(q => q.type === 'code')) {
//       toast({ title: 'Limit reached', description: 'Only one coding question allowed.', variant: 'destructive' });
//       return;
//     }
//     append({
//       type: 'code',
//       question: '',
//       test_output_1: '',
//       test_output_2_input: '',
//       test_output_2_output: '',
//     });
//   };

//   const onSubmit = async (data) => {
//     setIsLoading(true);

//     try {
//       const codingQuestion = data.questions.find(q => q.type === 'code');
//       const mcqQuestions = data.questions.filter(q => q.type === 'mcq');

//       const formattedMcqs = mcqQuestions.reduce((acc, mcq, i) => {
//         acc[`question_${i + 1}`] = {
//           question: mcq.question,
//           options: mcq.options.filter(Boolean),
//           answer: mcq.answer
//         };
//         return acc;
//       }, {});

//       const selectedSubject = subjects.find(s => s.subject_id.toString() === data.subject_id);

//       const payload = {
//         subject_id: parseInt(data.subject_id),
//         sem: selectedSubject?.sem,
//         code_question: codingQuestion?.question || '',
//         test_output_1: codingQuestion?.test_output_1 || '',
//         test_output_2: codingQuestion
//           ? [{ Input: codingQuestion.test_output_2_input, Output: codingQuestion.test_output_2_output }]
//           : [],
//         mcq_ques: formattedMcqs
//       };

//       await axios.post('/api/create-exam/', payload);

//       toast({ title: 'Exam Created', description: 'The new exam paper has been saved.' });
//       reset();
//       navigate('/faculty-dashboard');
//     } catch {
//       toast({ title: 'Error', description: 'Failed to save the exam.', variant: 'destructive' });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
//       <div className="max-w-6xl mx-auto space-y-6">

//         {/* Header Card */}
//         <Card className="bg-white/80 backdrop-blur-sm shadow-lg border border-blue-100">
//           <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
//             <div className="flex items-center justify-between">
//               <CardTitle className="text-2xl flex items-center gap-2 font-semibold">
//                 <FileText className="h-6 w-6" />
//                 Create New Exam
//               </CardTitle>
//               <Button
//                 form="exam-form"
//                 type="submit"
//                 disabled={isLoading}
//                 className="bg-white text-blue-700 hover:bg-blue-50"
//               >
//                 {isLoading ? (
//                   <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                 ) : (
//                   <Save className="h-4 w-4 mr-2" />
//                 )}
//                 Save Exam
//               </Button>
//             </div>
//           </CardHeader>
//         </Card>

//         <form id="exam-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
//           {/* Basic Info */}
//           <Card className="bg-white/80 backdrop-blur-sm border border-blue-100 shadow-md">
//             <CardHeader>
//               <CardTitle>Basic Information</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div>
//                 <Label className="font-medium text-gray-700">Subject *</Label>
//                 <Controller
//                   name="subject_id"
//                   control={control}
//                   rules={{ required: 'Please select a subject' }}
//                   render={({ field }) => (
//                     <Select onValueChange={field.onChange} defaultValue={field.value}>
//                       <SelectTrigger className="border-blue-200 focus:border-blue-500 focus:ring-blue-500">
//                         <SelectValue placeholder="Select subject" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {subjects.map(s => (
//                           <SelectItem key={s.subject_id} value={s.subject_id.toString()}>
//                             {s.subject_name} (Sem {s.sem})
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   )}
//                 />
//                 {errors.subject_id && (
//                   <p className="text-sm text-red-600">{errors.subject_id.message}</p>
//                 )}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Questions */}
//           <Card className="bg-white/80 backdrop-blur-sm border border-blue-100 shadow-md">
//             <CardHeader>
//               <CardTitle className="flex items-center justify-between">
//                 <span>Questions ({questions.length})</span>
//                 <div className="flex gap-2">
//                   <Button type="button" variant="outline" onClick={addCodeQuestion} className="border-blue-300 text-blue-600 hover:bg-blue-50">
//                     <Plus className="h-4 w-4 mr-1" /> Add Code
//                   </Button>
//                   <Button type="button" onClick={addMcqQuestion} className="bg-blue-600 hover:bg-blue-700 text-white">
//                     <Plus className="h-4 w-4 mr-1" /> Add MCQ
//                   </Button>
//                 </div>
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {questions.map((q, i) => (
//                 <Card key={q.id} className="border border-blue-200 rounded-lg shadow-sm">
//                   <CardHeader className="pb-2">
//                     <div className="flex justify-between items-center">
//                       <div className="flex items-center gap-2">
//                         <Badge variant="secondary">Q{i + 1}</Badge>
//                         <Badge variant="outline" className="uppercase">{q.type}</Badge>
//                       </div>
//                       <Button type="button" variant="ghost" size="sm" onClick={() => remove(i)}>
//                         <Trash2 className="h-4 w-4 text-red-500" />
//                       </Button>
//                     </div>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div>
//                       <Label>Question *</Label>
//                       <Textarea
//                         {...register(`questions.${i}.question`, { required: true })}
//                         placeholder="Enter question text..."
//                         className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
//                       />
//                     </div>

//                     {/* MCQ Options */}
//                     {q.type === 'mcq' && (
//                       <>
//                         <Label>Options</Label>
//                         {(watch(`questions.${i}.options`) || []).map((_, optIdx) => (
//                           <Input
//                             key={optIdx}
//                             {...register(`questions.${i}.options.${optIdx}`)}
//                             placeholder={`Option ${optIdx + 1}`}
//                             className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 mb-2"
//                           />
//                         ))}
//                         <Label>Correct Answer</Label>
//                         <Select onValueChange={(val) => setValue(`questions.${i}.answer`, val)}>
//                           <SelectTrigger className="border-blue-200 focus:border-blue-500 focus:ring-blue-500">
//                             <SelectValue placeholder="Select correct option" />
//                           </SelectTrigger>
//                           <SelectContent>
//                             {(watch(`questions.${i}.options`) || [])
//                               .filter(Boolean)
//                               .map((opt, idx) => (
//                                 <SelectItem key={idx} value={opt}>{opt}</SelectItem>
//                               ))}
//                           </SelectContent>
//                         </Select>
//                       </>
//                     )}

//                     {/* Code Question Fields */}
//                     {q.type === 'code' && (
//                       <>
//                         <Label>Visible Test Case (for students)</Label>
//                         <Textarea
//                           {...register(`questions.${i}.test_output_1`)}
//                           placeholder="e.g., Input: world"
//                           className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
//                         />
//                         <div className="grid grid-cols-2 gap-4">
//                           <div>
//                             <Label>Hidden Test Input</Label>
//                             <Input
//                               {...register(`questions.${i}.test_output_2_input`)}
//                               placeholder="e.g., world"
//                               className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
//                             />
//                           </div>
//                           <div>
//                             <Label>Hidden Test Output</Label>
//                             <Input
//                               {...register(`questions.${i}.test_output_2_output`)}
//                               placeholder="e.g., dlrow"
//                               className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
//                             />
//                           </div>
//                         </div>
//                       </>
//                     )}
//                   </CardContent>
//                 </Card>
//               ))}
//             </CardContent>
//           </Card>

//         </form>
//       </div>
//     </div>
//   );
// };

// export default ManageExams;

