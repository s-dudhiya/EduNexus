import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, Plus, Trash2, Save, Eye } from 'lucide-react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const ManageExams = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { control, register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      description: '',
      subject: '',
      duration: 60,
      totalMarks: 100,
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      isProctored: true,
      allowLateSubmission: false,
      randomizeQuestions: false,
      showResultsAfter: 'manual',
      instructions: '',
      questions: []
    }
  });

  const { fields: questions, append: addQuestion, remove: removeQuestion } = useFieldArray({
    control,
    name: 'questions'
  });

  const watchedQuestions = watch('questions');

  useEffect(() => {
    addQuestion({
      id: Date.now().toString(),
      type: 'code',
      question: '',
      marks: 9,
      testCases: [
        { output: '' },
        { output: '' }
      ],
      isCompulsory: true
    });
  }, []);

  const addNewQuestion = () => {
    const newQuestion = {
      id: Date.now().toString(),
      type: 'mcq',
      question: '',
      marks: 1,
      options: ['', '', '', ''],
      correctAnswer: 0,
      isCompulsory: false
    };
    addQuestion(newQuestion);
  };

  const addOption = (index) => {
    const currentOptions = watch(`questions.${index}.options`) || [];
    setValue(`questions.${index}.options`, [...currentOptions, '']);
  };

  const removeOption = (index, optionIndex) => {
    const currentOptions = watch(`questions.${index}.options`);
    if (currentOptions.length > 2) {
      currentOptions.splice(optionIndex, 1);
      setValue(`questions.${index}.options`, [...currentOptions]);
      const currentCorrect = watch(`questions.${index}.correctAnswer`);
      if (currentCorrect >= optionIndex) {
        setValue(`questions.${index}.correctAnswer`, Math.max(0, currentCorrect - 1));
      }
    } else {
      toast({
        title: "Cannot Remove Option",
        description: "MCQ must have at least 2 options.",
        variant: "destructive"
      });
    }
  };

  const calculateTotalMarks = () => {
    return watchedQuestions?.reduce((total, q) => total + (q.marks || 0), 0) || 0;
  };

  const onSubmit = (data) => {
    // Update total marks based on questions
    data.totalMarks = calculateTotalMarks();
    
    console.log('Exam Data:', data);
    
    toast({
      title: "Exam Created Successfully",
      description: `"${data.title}" has been saved and is ready for scheduling.`,
      variant: "default"
    });

    // Navigate to exam management or preview
    navigate('/exams/manage');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Create New Exam</h1>
          <p className="text-muted-foreground">Design and configure your exam parameters</p>
        </div>
        <div className="flex gap-2">
          
          <Button form="exam-form" type="submit">
            <Save className="h-4 w-4 mr-2" />
            Save Exam
          </Button>
        </div>
      </div>

      <form id="exam-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Exam Title *</Label>
                <Input
                  id="title"
                  {...register('title', { required: 'Title is required' })}
                  placeholder="e.g., Final Exam - Data Structures"
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Select onValueChange={(value) => setValue('subject', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="computer-science">Computer Science</SelectItem>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register('description')}
                placeholder="Brief description of the exam content and objectives"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>


        {/* Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>Instructions for Students</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              {...register('instructions')}
              placeholder="Enter detailed instructions for students..."
              rows={4}
            />
          </CardContent>
        </Card>

        {/* Questions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Questions ({questions.length})
              <div className="flex items-center gap-2">
                <Button type="button" onClick={addNewQuestion}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add MCQ Question
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {questions.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p>No questions added yet. Click "Add Question" to get started.</p>
              </div>
            )}

            {questions.map((question, index) => (
              <Card key={question.id} className="border-2">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Q{index + 1}</Badge>
                      <Badge variant="outline">{question.type.toUpperCase()}</Badge>
                      <Badge variant="outline">Marks: {question.marks}</Badge>
                    </div>
                    {!question.isCompulsory && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeQuestion(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Question *</Label>
                    <Textarea
                      {...register(`questions.${index}.question`)}
                      placeholder="Enter your question here..."
                      rows={3}
                    />
                  </div>

                  {question.type === 'mcq' && (
                    <div className="space-y-2">
                      <Label>Options</Label>
                      {(watch(`questions.${index}.options`) || []).map((_, optionIndex) => (
                        <div key={optionIndex} className="flex items-center gap-2">
                          <Badge variant="outline" className="w-8 h-8 rounded-full">
                            {String.fromCharCode(65 + optionIndex)}
                          </Badge>
                          <Input
                            {...register(`questions.${index}.options.${optionIndex}`)}
                            placeholder={`Option ${String.fromCharCode(65 + optionIndex)}`}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeOption(index, optionIndex)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button type="button" onClick={() => addOption(index)} className="mt-2">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Option
                      </Button>
                      <div className="mt-2">
                        <Label>Correct Answer</Label>
                        <Select onValueChange={(value) => setValue(`questions.${index}.correctAnswer`, parseInt(value))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select correct option" />
                          </SelectTrigger>
                          <SelectContent>
                            {(watch(`questions.${index}.options`) || []).map((_, optionIndex) => (
                              <SelectItem key={optionIndex} value={optionIndex.toString()}>
                                Option {String.fromCharCode(65 + optionIndex)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {question.type === 'code' && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Test Cases</Label>
                        {(watch(`questions.${index}.testCases`) || []).map((_, tcIndex) => (
                          <div key={tcIndex} className="space-y-2">
                            <Input
                              {...register(`questions.${index}.testCases.${tcIndex}.output`)}
                              placeholder={`Test Case ${tcIndex + 1} Expected Output`}
                            />
                          </div>
                        ))}
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
  );
};

export default ManageExams;