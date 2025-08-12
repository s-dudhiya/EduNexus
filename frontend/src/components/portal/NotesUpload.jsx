import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Upload, 
  Search, 
  Download, 
  FileText, 
  Image, 
  File,
  Calendar,
  User,
  MoreVertical,
  Paperclip
} from 'lucide-react';

export function NotesUpload({
  userRole = 'student',
  documents = [
    {
      id: '1',
      title: 'Data Structures - Trees and Graphs',
      description: 'Comprehensive notes covering binary trees, AVL trees, and graph algorithms',
      type: 'pdf',
      subject: 'Data Structures',
      uploadedBy: 'Dr. Sarah Wilson',
      uploadDate: '2024-01-15'
    },
    {
      id: '2',
      title: 'Web Development Assignment 3',
      description: 'React component lifecycle and state management exercises',
      type: 'doc',
      subject: 'Web Development',
      uploadedBy: 'Prof. Michael Chen',
      uploadDate: '2024-01-14'
    },
    {
      id: '3',
      title: 'Database Normalization Examples',
      description: 'Practical examples of 1NF, 2NF, and 3NF with step-by-step explanations',
      type: 'pdf',
      subject: 'Database Systems',
      uploadedBy: 'Alice Johnson',
      uploadDate: '2024-01-13'
    },
    {
      id: '4',
      title: 'Machine Learning Project Guidelines',
      description: 'Complete project requirements and evaluation criteria for final project',
      type: 'doc',
      subject: 'Machine Learning',
      uploadedBy: 'Dr. Emily Davis',
      uploadDate: '2024-01-12'
    }
  ]
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    title: '',
    description: '',
    subject: ''
  });

  const filteredDocuments = documents.filter(doc => {
    const searchMatch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const subjectMatch = selectedSubject === 'all' || doc.subject === selectedSubject;
    return searchMatch && subjectMatch;
  });

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />;
      case 'doc':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'ppt':
        return <FileText className="h-5 w-5 text-orange-500" />;
      case 'image':
        return <Image className="h-5 w-5 text-green-500" />;
      default:
        return <File className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      setUploadForm({
        title: '',
        description: '',
        subject: ''
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="shadow-card">
          <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl flex items-center gap-2">
                <FileText className="h-6 w-6" />
                Notes & Documents Hub
              </CardTitle>
              {userRole === 'faculty' && (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary" className="gap-2">
                      <Upload className="h-4 w-4" />
                      Upload Document
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Upload New Document</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          placeholder="Document title..."
                          value={uploadForm.title}
                          onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Brief description of the document..."
                          value={uploadForm.description}
                          onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Subject</Label>
                        <Select value={uploadForm.subject} onValueChange={(value) => setUploadForm(prev => ({ ...prev, subject: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Data Structures">Data Structures</SelectItem>
                            <SelectItem value="Web Development">Web Development</SelectItem>
                            <SelectItem value="Database Systems">Database Systems</SelectItem>
                            <SelectItem value="Machine Learning">Machine Learning</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Drag and drop your file here, or click to browse
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Supports PDF, DOC, PPT, and image files up to 10MB
                        </p>
                        <Button variant="outline" className="mt-4">
                          <Paperclip className="h-4 w-4 mr-2" />
                          Choose File
                        </Button>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Cancel</Button>
                        <Button onClick={handleUpload} disabled={isUploading}>
                          {isUploading ? 'Uploading...' : 'Upload Document'}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </CardHeader>
        </Card>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Search and Filters */}
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search documents, tags, or content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    <SelectItem value="Data Structures">Data Structures</SelectItem>
                    <SelectItem value="Web Development">Web Development</SelectItem>
                    <SelectItem value="Database Systems">Database Systems</SelectItem>
                    <SelectItem value="Machine Learning">Machine Learning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Documents Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id} className="shadow-card hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getFileIcon(doc.type)}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm line-clamp-1">{doc.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {doc.subject}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {doc.uploadedBy}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {doc.uploadDate}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-end">
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}