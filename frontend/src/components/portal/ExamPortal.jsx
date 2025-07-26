import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Camera, AlertTriangle, Clock, Monitor, Code, CheckCircle } from 'lucide-react';

export function ExamPortal({ 
  examTitle = "Data Structures and Algorithms", 
  duration = 120,
  questions = [
    {
      id: "1",
      title: "Binary Tree Traversal",
      description: "Implement an in-order traversal of a binary tree",
      type: "coding",
      points: 25
    },
    {
      id: "2", 
      title: "Algorithm Complexity",
      description: "What is the time complexity of merge sort?",
      type: "mcq",
      options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
      points: 10
    }
  ]
}) {
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isTabSwitched, setIsTabSwitched] = useState(false);
  const [webcamActive, setWebcamActive] = useState(false);
  const videoRef = useRef(null);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Tab switch detection
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

  // Webcam setup
  useEffect(() => {
    if (webcamActive && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(console.error);
    }
  }, [webcamActive]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      {/* Tab Switch Alert Overlay */}
      {isTabSwitched && (
        <div className="fixed inset-0 bg-destructive/90 flex items-center justify-center z-50">
          <Alert className="max-w-md bg-background border-destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription className="text-center">
              <strong>Warning!</strong> Tab switching detected. Please return to the exam.
            </AlertDescription>
          </Alert>
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="shadow-card">
          <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl">{examTitle}</CardTitle>
                <p className="text-primary-foreground/80">Online Proctored Examination</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 text-lg font-mono">
                  <Clock className="h-5 w-5" />
                  {formatTime(timeLeft)}
                </div>
                <Badge variant={timeLeft < 600 ? "destructive" : "secondary"} className="mt-1">
                  {timeLeft < 600 ? "Urgent" : "Time Remaining"}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <Progress value={progress} className="w-32" />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={webcamActive ? "success" : "outline"}
                  size="sm"
                  onClick={() => setWebcamActive(!webcamActive)}
                  className="gap-2"
                >
                  <Camera className="h-4 w-4" />
                  {webcamActive ? "Camera On" : "Start Camera"}
                </Button>
                <Badge variant="outline" className="gap-1">
                  <Monitor className="h-3 w-3" />
                  Proctored
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Exam Area */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm">
                    {currentQuestion + 1}
                  </span>
                  {questions[currentQuestion]?.title}
                  <Badge variant="outline" className="ml-auto">
                    {questions[currentQuestion]?.points} points
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{questions[currentQuestion]?.description}</p>
                
                {questions[currentQuestion]?.type === 'coding' ? (
                  <Tabs defaultValue="code" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="code" className="gap-2">
                        <Code className="h-4 w-4" />
                        Code Editor
                      </TabsTrigger>
                      <TabsTrigger value="test">Test Cases</TabsTrigger>
                      <TabsTrigger value="output">Output</TabsTrigger>
                    </TabsList>
                    <TabsContent value="code" className="mt-4">
                      <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                        <Textarea
                          placeholder="// Write your solution here
function inOrderTraversal(root) {
    // Your code here
}"
                          className="min-h-[300px] bg-background font-mono"
                          value={answers[questions[currentQuestion]?.id] || ''}
                          onChange={(e) => setAnswers(prev => ({
                            ...prev,
                            [questions[currentQuestion]?.id]: e.target.value
                          }))}
                        />
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">Run Code</Button>
                        <Button variant="success" size="sm">Submit</Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="test" className="mt-4">
                      <div className="bg-muted rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Test Case 1:</h4>
                        <pre className="text-sm">Input: [1,null,2,3]
Expected Output: [1,3,2]</pre>
                      </div>
                    </TabsContent>
                    <TabsContent value="output" className="mt-4">
                      <div className="bg-muted rounded-lg p-4">
                        <div className="flex items-center gap-2 text-success mb-2">
                          <CheckCircle className="h-4 w-4" />
                          Test Case 1: Passed
                        </div>
                        <pre className="text-sm">Output: [1,3,2]</pre>
                      </div>
                    </TabsContent>
                  </Tabs>
                ) : (
                  <div className="space-y-3">
                    {questions[currentQuestion]?.options?.map((option, index) => (
                      <label key={index} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted cursor-pointer">
                        <input
                          type="radio"
                          name={`question-${currentQuestion}`}
                          value={option}
                          onChange={(e) => setAnswers(prev => ({
                            ...prev,
                            [questions[currentQuestion]?.id]: e.target.value
                          }))}
                          className="text-primary"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                disabled={currentQuestion === 0}
                onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
              >
                Previous
              </Button>
              <div className="flex gap-2">
                <Button variant="outline">Save & Continue Later</Button>
                {currentQuestion < questions.length - 1 ? (
                  <Button onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}>
                    Next Question
                  </Button>
                ) : (
                  <Button variant="success">Submit Exam</Button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Webcam Feed */}
            {webcamActive && (
              <Card className="shadow-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    Proctoring Feed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full h-32 bg-muted rounded-lg object-cover"
                  />
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Face detection active
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Question Navigator */}
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Question Navigator</CardTitle>
              </CardHeader>
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
                <div className="flex justify-between text-xs text-muted-foreground mt-4">
                  <span>Answered: {Object.keys(answers).length}</span>
                  <span>Remaining: {questions.length - Object.keys(answers).length}</span>
                </div>
              </CardContent>
            </Card>

            {/* Instructions */}
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Instructions</CardTitle>
              </CardHeader>
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
  );
}