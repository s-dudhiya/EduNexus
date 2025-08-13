import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Camera, AlertTriangle, Clock, Monitor, Code, CheckCircle, Loader2, XCircle, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
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

export function ExamPortal({ setSidebarLocked }) {
  const { user } = useAuth();

  // State for fetching data
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for exam flow
  const [examState, setExamState] = useState('details'); // details, proctoring, active
  const [proctoringError, setProctoringError] = useState('');
  const [showSubmissionConfirm, setShowSubmissionConfirm] = useState(false);
  const [timeUp, setTimeUp] = useState(false);

  // State for exam interaction
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isTabSwitched, setIsTabSwitched] = useState(false);
  const [webcamActive, setWebcamActive] = useState(false);
  const videoRef = useRef(null);

  // State for code execution and submission
  const [codeOutput, setCodeOutput] = useState('');
  const [codeError, setCodeError] = useState('');
  const [codePassed, setCodePassed] = useState(null); // Use null to represent "not run yet"
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [finalScores, setFinalScores] = useState(null);

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const response = await axios.get('/api/exam-papers/');
        const paper = response.data[0];

        if (paper) {
          const formattedQuestions = [];
          formattedQuestions.push({
            id: `coding_${paper.id}`,
            title: "Coding Challenge",
            description: paper.code_question,
            type: "coding",
            points: 9
          });

          Object.entries(paper.mcq_ques).forEach(([num, mcq]) => {
            formattedQuestions.push({
              id: `${paper.id}_${num}`,
              title: `Question ${num}`,
              description: mcq.question,
              type: "mcq",
              options: mcq.options,
              answer: mcq.answer,
              points: 1
            });
          });

          setExam({
            id: paper.id,
            subject_id: paper.subject_id,
            title: `Exam for Subject ID: ${paper.subject_id}`,
            duration: 120,
            questions: formattedQuestions,
            test_output_1: paper.test_output_1,
            test_output_2: paper.test_output_2
          });
          setTimeLeft(120 * 60);
        } else {
          setError("No exam papers found.");
        }
      } catch (err) {
        setError("Failed to load the exam. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchExamData();
  }, []);

  const handleRunCode = async () => {
    const currentAnswer = answers[questions[currentQuestion]?.id] || '';
    setCodeOutput('');
    setCodeError('');
    setCodePassed(null); // Reset pass status

    try {
      const response = await axios.post('/api/run-code/', {
        code: currentAnswer,
        exam_paper_id: exam.id,
      });

      if (response.data.error) {
        setCodeError(response.data.error);
        setCodePassed(false);
      } else {
        setCodeOutput(response.data.output);
        setCodePassed(response.data.passed);
      }
    } catch (err) {
      setCodeError('An error occurred while running the code.');
      setCodePassed(false);
    }
  };

  const handleSubmitExam = useCallback(async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    let mcqScore = 0;
    exam.questions.forEach(q => {
      if (q.type === 'mcq') {
        const studentAnswer = answers[q.id];
        if (studentAnswer && studentAnswer === q.answer) {
          mcqScore += q.points;
        }
      }
    });

    const codingScore = codePassed === true ? 9 : 0;
    setFinalScores({ mcqScore, codingScore });

    const resultData = {
      enrollment_no: user.enrollment_no,
      subject_id: exam.subject_id,
      code_marks: codingScore,
      mcq_marks: mcqScore,
      test_name: exam.title,
    };

    try {
      await axios.post('/api/submit-exam/', resultData);
      setIsSubmitted(true);
    } catch (err) {
      setError("Failed to submit exam results. Please contact support.");
    } finally {
      setIsSubmitting(false);
    }
  }, [isSubmitting, exam, answers, codePassed, user]);

  // Timer, Tab switch, and Webcam effects
  useEffect(() => {
    if (examState !== 'active') return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimeUp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [examState]);

  useEffect(() => {
    if (timeUp) {
      handleSubmitExam();
    }
  }, [timeUp, handleSubmitExam]);

  useEffect(() => {
    if (examState === 'active') {
      setSidebarLocked(true);
    } else {
      setSidebarLocked(false);
    }

    return () => {
      setSidebarLocked(false);
    }
  }, [examState, setSidebarLocked]);
  
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsTabSwitched(true);
        setTimeout(() => setIsTabSwitched(false), 5000);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  useEffect(() => {
    let stream;
    if (webcamActive && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((s) => {
          stream = s;
          if (videoRef.current) videoRef.current.srcObject = stream;
          setProctoringError('');
        })
        .catch(err => {
          console.error("Webcam error:", err);
          setProctoringError("Webcam access denied. Please enable camera permissions in your browser settings.");
          setWebcamActive(false);
        });
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [webcamActive]);

  const handleStartProctoring = () => {
    setWebcamActive(true);
  };

  const formatTime = (s) => `${Math.floor(s/3600).toString().padStart(2,'0')}:${Math.floor((s%3600)/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;

  if (loading) return <div className="flex items-center justify-center min-h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  if (error) return <div className="flex items-center justify-center min-h-screen"><Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert></div>;

  if (isSubmitted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-lg text-center p-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-2xl mb-2">Exam Submitted Successfully!</CardTitle>
          <CardContent>
            <p className="text-muted-foreground mb-4">Your results have been recorded.</p>
            <div className="text-left space-y-2">
              <p><strong>MCQ Score:</strong> {finalScores.mcqScore}</p>
              <p><strong>Coding Score:</strong> {finalScores.codingScore}</p>
              <p className="font-bold text-lg">Total Score: {finalScores.mcqScore + finalScores.codingScore}</p>
            </div>
            <Button className="mt-6" onClick={() => window.location.href = '/student-dashboard'}>Return to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (examState === 'details') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-muted">
        <Card className="w-full max-w-2xl text-center p-8 shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl mb-2">{exam?.title}</CardTitle>
            <CardDescription>Online Proctored Examination</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-left">
            <p><strong>Duration:</strong> {exam?.duration} minutes</p>
            <p><strong>Total Questions:</strong> {exam?.questions?.length}</p>
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Important Instructions</AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-5 mt-2">
                  <li>This is a proctored exam. Your camera must be on.</li>
                  <li>Do not switch tabs or leave the exam window.</li>
                  <li>The exam will auto-submit when the timer ends.</li>
                </ul>
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter>
            <Button className="w-full" size="lg" onClick={() => setExamState('proctoring')}>
              Proceed to Proctoring Check
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (examState === 'proctoring') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-muted">
        <Card className="w-full max-w-lg text-center p-8 shadow-lg">
          <CardHeader>
            <ShieldCheck className="h-16 w-16 text-primary mx-auto mb-4" />
            <CardTitle className="text-2xl mb-2">Proctoring Setup</CardTitle>
            <CardDescription>We need to access your camera for proctoring.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center my-4">
              {webcamActive ? (
                <video ref={videoRef} autoPlay muted className="w-full h-full object-cover rounded-lg" />
              ) : (
                <Camera className="h-16 w-16 text-muted-foreground" />
              )}
            </div>
            {proctoringError && <Alert variant="destructive"><AlertDescription>{proctoringError}</AlertDescription></Alert>}
          </CardContent>
          <CardFooter className="flex-col space-y-4">
            {!webcamActive && !proctoringError && (
              <Button className="w-full" onClick={handleStartProctoring}>Enable Camera</Button>
            )}
            {webcamActive && !proctoringError && (
              <div className="text-center space-y-4 w-full">
                <Alert variant="success">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>Camera enabled successfully!</AlertDescription>
                </Alert>
                <Button className="w-full" size="lg" onClick={() => setExamState('active')}>
                  Start Exam
                </Button>
              </div>
            )}
          </CardFooter>
        </Card>
      </div>
    );
  }

  const questions = exam?.questions || [];
  const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  return (
    <>
      <AlertDialog open={showSubmissionConfirm} onOpenChange={setShowSubmissionConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to submit?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Your exam will be submitted for grading.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmitExam} disabled={isSubmitting}>
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Confirm & Submit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
        {isTabSwitched && (
          <div className="fixed inset-0 bg-destructive/90 flex items-center justify-center z-50">
            <Alert className="max-w-md bg-background border-destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-center"><strong>Warning!</strong> Tab switching detected.</AlertDescription>
            </Alert>
          </div>
        )}

        <div className="max-w-7xl mx-auto space-y-6">
          <Card className="shadow-card">
            <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl">{exam?.title}</CardTitle>
                  <p className="text-primary-foreground/80">Online Proctored Examination</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-lg font-mono"><Clock className="h-5 w-5" />{formatTime(timeLeft)}</div>
                  <Badge variant={timeLeft < 600 ? "destructive" : "secondary"} className="mt-1">{timeLeft < 600 ? "Urgent" : "Time Remaining"}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">Question {currentQuestion + 1} of {questions.length}</span>
                  <Progress value={progress} className="w-32" />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant={"success"} size="sm" className="gap-2"><Camera className="h-4 w-4" />Camera On</Button>
                  <Badge variant="outline" className="gap-1"><Monitor className="h-3 w-3" />Proctored</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 space-y-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm">{currentQuestion + 1}</span>
                    {questions[currentQuestion]?.title}
                    <Badge variant="outline" className="ml-auto">{questions[currentQuestion]?.points} points</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{questions[currentQuestion]?.description}</p>
                  {questions[currentQuestion]?.type === 'coding' ? (
                    <Tabs defaultValue="code" className="w-full">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="code" className="gap-2"><Code className="h-4 w-4" />Code Editor</TabsTrigger>
                        <TabsTrigger value="test">Test Cases</TabsTrigger>
                        <TabsTrigger value="output">Output</TabsTrigger>
                      </TabsList>
                      <TabsContent value="code" className="mt-4">
                        <Textarea placeholder="// Write your solution here" className="min-h-[300px] bg-background font-mono" value={answers[questions[currentQuestion]?.id] || ''} onChange={(e) => setAnswers(prev => ({...prev, [questions[currentQuestion]?.id]: e.target.value}))}/>
                        <div className="flex gap-2 mt-4"><Button variant="outline" size="sm" onClick={handleRunCode}>Run Code</Button></div>
                      </TabsContent>
                      <TabsContent value="test" className="mt-4">
                        <div className="bg-muted rounded-lg p-4">
                          <h4 className="font-semibold mb-2">Test Case 1:</h4>
                          <pre className="text-sm whitespace-pre-wrap font-mono">{exam?.test_output_1 || "No test cases provided."}</pre>
                        </div>
                      </TabsContent>
                      <TabsContent value="output" className="mt-4">
                        <div className="bg-muted rounded-lg p-4 min-h-[100px]">
                          {codeError && <Alert variant="destructive"><AlertDescription>{codeError}</AlertDescription></Alert>}
                          {codePassed === true && (
                            <>
                              <pre className="text-sm whitespace-pre-wrap font-mono">{codeOutput}</pre>
                              <Alert variant="success" className="mt-2">
                                <CheckCircle className="h-4 w-4" />
                                <AlertDescription>Test case passed successfully!</AlertDescription>
                              </Alert>
                            </>
                          )}
                          {codePassed === false && !codeError && (
                            <Alert variant="destructive" className="mt-2">
                              <XCircle className="h-4 w-4" />
                              <AlertDescription>Test case failed. The output does not match the expected result.</AlertDescription>
                            </Alert>
                          )}
                          {codePassed === null && !codeError && (
                            <p className="text-sm text-muted-foreground">Run your code to see the output here.</p>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                  ) : (
                    <div className="space-y-3">
                      {questions[currentQuestion]?.options?.map((option, index) => (
                        <label key={index} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted cursor-pointer">
                          <input type="radio" name={`question-${currentQuestion}`} value={option} checked={answers[questions[currentQuestion]?.id] === option} onChange={(e) => setAnswers(prev => ({...prev, [questions[currentQuestion]?.id]: e.target.value}))}/>
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" disabled={currentQuestion === 0} onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}>Previous</Button>
                <div className="flex gap-2">
                  {currentQuestion < questions.length - 1 ? (
                    <Button onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}>Next Question</Button>
                  ) : (
                    <Button variant="success" onClick={() => setShowSubmissionConfirm(true)} disabled={isSubmitting}>
                      {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      Submit Exam
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {webcamActive && (
                <Card className="shadow-card">
                  <CardHeader className="pb-3"><CardTitle className="text-sm flex items-center gap-2"><Camera className="h-4 w-4" />Proctoring Feed</CardTitle></CardHeader>
                  <CardContent>
                    <video ref={videoRef} autoPlay muted className="w-full h-32 bg-muted rounded-lg object-cover" />
                    <p className="text-xs text-muted-foreground mt-2 text-center">Face detection active</p>
                  </CardContent>
                </Card>
              )}

              <Card className="shadow-card">
                <CardHeader className="pb-3"><CardTitle className="text-sm">Question Navigator</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-2">
                    {questions.map((_, index) => (
                      <Button
                        key={index}
                        variant={index === currentQuestion ? "default" : answers[questions[index]?.id] ? "success" : "outline"}
                        size="sm"
                        className="aspect-square p-0"
                        onClick={() => setCurrentQuestion(index)}
                      >
                        {index + 1}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card">
                <CardHeader className="pb-3"><CardTitle className="text-sm">Instructions</CardTitle></CardHeader>
                <CardContent className="text-xs text-muted-foreground space-y-2">
                  <p>• Keep your camera on throughout the exam</p>
                  <p>• Do not switch tabs or minimize the browser</p>
                  <p>• Save your progress regularly</p>
                  <p>• Contact support for technical issues</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
