import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Star, 
  Send, 
  MessageSquare, 
  TrendingUp, 
  Users,
  BarChart3,
  Filter,
  Download,
  Eye,
  EyeOff
} from 'lucide-react';

interface FeedbackData {
  id: string;
  category: string;
  subject: string;
  rating: number;
  comment: string;
  anonymous: boolean;
  date: string;
  status: 'new' | 'reviewed' | 'resolved';
}

interface FeedbackSystemProps {
  userRole?: 'student' | 'admin';
  feedbackData?: FeedbackData[];
}

export function FeedbackSystem({ 
  userRole = 'student',
  feedbackData = [
    {
      id: '1',
      category: 'Teaching Quality',
      subject: 'Data Structures',
      rating: 5,
      comment: 'Excellent explanation of complex concepts. Very helpful examples.',
      anonymous: false,
      date: '2024-01-15',
      status: 'reviewed'
    },
    {
      id: '2',
      category: 'Course Content',
      subject: 'Web Development',
      rating: 4,
      comment: 'Good coverage but needs more practical exercises.',
      anonymous: true,
      date: '2024-01-14',
      status: 'new'
    },
    {
      id: '3',
      category: 'Infrastructure',
      subject: 'Lab Facilities',
      rating: 3,
      comment: 'Lab equipment needs upgrading. Some computers are slow.',
      anonymous: true,
      date: '2024-01-13',
      status: 'resolved'
    }
  ]
}: FeedbackSystemProps) {
  const [formData, setFormData] = useState({
    category: '',
    subject: '',
    rating: 0,
    comment: '',
    anonymous: false
  });
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const StarRating = ({ rating, onRatingChange, readonly = false }: { 
    rating: number; 
    onRatingChange?: (rating: number) => void;
    readonly?: boolean;
  }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={readonly}
            onClick={() => onRatingChange && onRatingChange(star)}
            className={`${
              star <= rating
                ? 'text-warning fill-warning'
                : 'text-muted-foreground'
            } ${readonly ? 'cursor-default' : 'hover:text-warning cursor-pointer'} transition-colors`}
          >
            <Star className="h-5 w-5" />
          </button>
        ))}
      </div>
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Feedback submitted:', formData);
    // Reset form
    setFormData({
      category: '',
      subject: '',
      rating: 0,
      comment: '',
      anonymous: false
    });
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-success';
    if (rating >= 3) return 'text-warning';
    return 'text-destructive';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-primary';
      case 'reviewed': return 'bg-warning';
      case 'resolved': return 'bg-success';
      default: return 'bg-muted';
    }
  };

  if (userRole === 'admin') {
    const avgRating = feedbackData.reduce((sum, item) => sum + item.rating, 0) / feedbackData.length;
    const totalFeedback = feedbackData.length;
    const newFeedback = feedbackData.filter(item => item.status === 'new').length;
    
    const filteredData = feedbackData.filter(item => {
      const categoryMatch = filterCategory === 'all' || item.category === filterCategory;
      const statusMatch = filterStatus === 'all' || item.status === filterStatus;
      return categoryMatch && statusMatch;
    });

    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <Card className="shadow-card">
            <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
              <CardTitle className="text-2xl flex items-center gap-2">
                <BarChart3 className="h-6 w-6" />
                Feedback Analytics Dashboard
              </CardTitle>
            </CardHeader>
          </Card>

          {/* Statistics */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="shadow-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{totalFeedback}</div>
                <p className="text-sm text-muted-foreground">Total Feedback</p>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-warning">{newFeedback}</div>
                <p className="text-sm text-muted-foreground">New Feedback</p>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="p-4 text-center">
                <div className={`text-2xl font-bold ${getRatingColor(avgRating)}`}>
                  {avgRating.toFixed(1)}
                </div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-success">
                  {Math.round((avgRating / 5) * 100)}%
                </div>
                <p className="text-sm text-muted-foreground">Satisfaction</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Filters */}
              <Card className="shadow-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="Teaching Quality">Teaching Quality</SelectItem>
                        <SelectItem value="Course Content">Course Content</SelectItem>
                        <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                        <SelectItem value="Support Services">Support Services</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="reviewed">Reviewed</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Feedback List */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Feedback Submissions
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredData.map((feedback) => (
                      <div key={feedback.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{feedback.category}</Badge>
                              <Badge variant="outline">{feedback.subject}</Badge>
                              <div className={`w-2 h-2 rounded-full ${getStatusColor(feedback.status)}`} />
                              <span className="text-sm text-muted-foreground capitalize">{feedback.status}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <StarRating rating={feedback.rating} readonly />
                              <span className={`text-sm font-medium ${getRatingColor(feedback.rating)}`}>
                                {feedback.rating}/5
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            {feedback.anonymous ? (
                              <div className="flex items-center gap-1">
                                <EyeOff className="h-3 w-3" />
                                Anonymous
                              </div>
                            ) : (
                              <div className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                Public
                              </div>
                            )}
                            <span>{feedback.date}</span>
                          </div>
                        </div>
                        <p className="text-sm">{feedback.comment}</p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Mark as Reviewed</Button>
                          <Button size="sm" variant="outline">Resolve</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card className="shadow-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Category Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { category: 'Teaching Quality', count: 15, percentage: 40 },
                    { category: 'Course Content', count: 12, percentage: 32 },
                    { category: 'Infrastructure', count: 8, percentage: 21 },
                    { category: 'Support Services', count: 3, percentage: 7 },
                  ].map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{item.category}</span>
                        <span>{item.count}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="shadow-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>New feedback received</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-warning rounded-full" />
                      <span>Feedback marked as reviewed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-success rounded-full" />
                      <span>Issue resolved</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Student View
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card className="shadow-card">
          <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
            <CardTitle className="text-2xl flex items-center gap-2">
              <MessageSquare className="h-6 w-6" />
              Submit Feedback
            </CardTitle>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Feedback Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Share Your Experience</CardTitle>
                <p className="text-muted-foreground">
                  Your feedback helps us improve the learning experience for everyone.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select 
                        value={formData.category} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Teaching Quality">Teaching Quality</SelectItem>
                          <SelectItem value="Course Content">Course Content</SelectItem>
                          <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                          <SelectItem value="Support Services">Support Services</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject/Course</Label>
                      <Input
                        id="subject"
                        placeholder="e.g., Data Structures"
                        value={formData.subject}
                        onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Overall Rating</Label>
                    <div className="flex items-center gap-3">
                      <StarRating 
                        rating={formData.rating} 
                        onRatingChange={(rating) => setFormData(prev => ({ ...prev, rating }))}
                      />
                      <span className="text-sm text-muted-foreground">
                        {formData.rating > 0 && `${formData.rating}/5`}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="comment">Comments</Label>
                    <Textarea
                      id="comment"
                      placeholder="Share your detailed feedback..."
                      className="min-h-[120px]"
                      value={formData.comment}
                      onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="anonymous"
                        checked={formData.anonymous}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, anonymous: checked }))}
                      />
                      <Label htmlFor="anonymous" className="flex items-center gap-2">
                        {formData.anonymous ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        Submit anonymously
                      </Label>
                    </div>
                    <Button type="submit" className="gap-2">
                      <Send className="h-4 w-4" />
                      Submit Feedback
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Previous Feedback */}
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Your Recent Feedback</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {feedbackData.slice(0, 3).map((feedback) => (
                  <div key={feedback.id} className="border rounded-lg p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">{feedback.subject}</Badge>
                      <StarRating rating={feedback.rating} readonly />
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {feedback.comment}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{feedback.date}</span>
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(feedback.status)}`} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Guidelines */}
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Feedback Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground space-y-2">
                <p>• Be specific and constructive in your feedback</p>
                <p>• Focus on facts rather than personal opinions</p>
                <p>• Suggest improvements where possible</p>
                <p>• Maintain respectful and professional language</p>
                <p>• Anonymous feedback is completely confidential</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}