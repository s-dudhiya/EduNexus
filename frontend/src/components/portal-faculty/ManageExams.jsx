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