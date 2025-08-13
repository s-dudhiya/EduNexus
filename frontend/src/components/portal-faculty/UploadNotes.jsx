import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContext';
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
  Calendar,
  User,
  Paperclip,
  Loader2,
  AlertTriangle,
  Trash2 // Import Trash2 icon
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';


export default function NotesUpload() {
  const { user, accessToken } = useAuth();
  const userRole = user?.role;
  const { toast } = useToast();

  // State for data and UI
  const [documents, setDocuments] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for filters
  const [searchTerm, setSearchTerm] = useState('');

  // State for upload modal
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadForm, setUploadForm] = useState({
    desc: '',
    subject_name: ''
  });
  const fileInputRef = useRef(null);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      if (!user || !accessToken) return;
      const api = axios.create({ headers: { Authorization: `Bearer ${accessToken}` } });
      try {
        const [notesRes, subjectsRes] = await Promise.all([
          api.get('/api/notes/'),
          api.get('/api/subjects/')
        ]);
        setDocuments(notesRes.data);
        setSubjects(subjectsRes.data);
      } catch (err) {
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user, accessToken]);

  // Filtering logic
  const filteredDocuments = documents.filter(doc =>
    doc.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.subject_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- FILE UPLOAD LOGIC ---
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile || !uploadForm.subject_name || !uploadForm.desc) {
      setUploadError("Please fill all fields and select a file.");
      return;
    }
    setIsUploading(true);
    setUploadError('');
    const formData = new FormData();
    formData.append('doc', selectedFile);
    formData.append('desc', uploadForm.desc);
    formData.append('subject_name', uploadForm.subject_name);

    try {
      const response = await axios.post('/api/notes/', formData, {
        headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${accessToken}` },
      });
      setDocuments(prev => [response.data, ...prev]);
      setSelectedFile(null);
      setUploadForm({ desc: '', subject_name: '' });
      toast({ title: "Success", description: "Document uploaded successfully." });
    } catch (err) {
      setUploadError("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // --- FILE DOWNLOAD LOGIC ---
  const handleDownload = async (noteId, subjectName) => {
    try {
        const response = await axios.get(`/api/notes/${noteId}/download/`, {
            responseType: 'blob',
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${subjectName}_notes.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    } catch (err) {
        alert("Failed to download file.");
    }
  };

  // --- FILE DELETE LOGIC ---
  const handleDelete = async (noteId) => {
    try {
      await axios.delete(`/api/notes/${noteId}/delete/`, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      });
      setDocuments(prev => prev.filter(doc => doc.id !== noteId));
      toast({ title: "Success", description: "Note deleted successfully." });
    } catch (err) {
      toast({ title: "Error", description: "Failed to delete note.", variant: "destructive" });
      console.error("Delete error:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

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
                    <form onSubmit={handleUpload} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" placeholder="Brief description..." value={uploadForm.desc} onChange={(e) => setUploadForm(prev => ({ ...prev, desc: e.target.value }))}/>
                      </div>
                      <div className="space-y-2">
                        <Label>Subject</Label>
                        <Select value={uploadForm.subject_name} onValueChange={(value) => setUploadForm(prev => ({ ...prev, subject_name: value }))}>
                          <SelectTrigger><SelectValue placeholder="Select subject" /></SelectTrigger>
                          <SelectContent>
                            {subjects.map(subject => (
                              <SelectItem key={subject.subject_id} value={subject.subject_name}>{subject.subject_name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="border-2 border-dashed rounded-lg p-8 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">{selectedFile ? selectedFile.name : "Drag and drop or click to browse"}</p>
                        <Button type="button" variant="outline" className="mt-4" onClick={() => fileInputRef.current.click()}>
                          <Paperclip className="h-4 w-4 mr-2" />
                          Choose File
                        </Button>
                        <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => setSelectedFile(e.target.files[0])} />
                      </div>
                      {uploadError && <Alert variant="destructive"><AlertDescription>{uploadError}</AlertDescription></Alert>}
                      <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline">Cancel</Button>
                        <Button type="submit" disabled={isUploading}>
                          {isUploading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...</> : 'Upload Document'}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </CardHeader>
        </Card>

        {/* Main Content */}
        <div className="space-y-6">
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search documents..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10"/>
              </div>
            </CardContent>
          </Card>

          {error ? (
            <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {filteredDocuments.map((doc) => (
                <Card key={doc.id} className="shadow-card hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm line-clamp-1">{doc.desc}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">{doc.subject_name}</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1"><User className="h-3 w-3" />{doc.uploader_name}</span>
                          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{doc.upload_date}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-end">
                        <Button variant="ghost" size="sm" onClick={() => handleDownload(doc.id, doc.subject_name)}>
                          <Download className="h-4 w-4" />
                        </Button>
                        {userRole === 'faculty' && user.fac_id === doc.uploader_id && (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the note titled "{doc.desc}".
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(doc.id)}>
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
