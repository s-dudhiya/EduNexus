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
  Image, 
  File,
  Calendar,
  User,
  Paperclip,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function NotesUpload() {
  const { user } = useAuth();
  const userRole = user?.role;

  // State for fetching and displaying notes
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  
  // State for the upload modal
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadForm, setUploadForm] = useState({
    desc: '',
    subject_name: ''
  });
  const fileInputRef = useRef(null);

  // Fetch notes when the component loads
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('/api/notes/');
        setDocuments(response.data);
      } catch (err) {
        setError("Failed to load documents. Please try again later.");
        console.error("Fetch notes error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  // Filtering logic
  const filteredDocuments = documents.filter(doc => {
    const searchMatch = doc.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const subjectMatch = selectedSubject === 'all' || doc.subject_name === selectedSubject;
    return searchMatch && subjectMatch;
  });

  // --- FILE UPLOAD LOGIC ---
  const handleUpload = async () => {
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
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setDocuments(prev => [response.data, ...prev]);
    } catch (err) {
      setUploadError("Upload failed. Please try again.");
      console.error("Upload error:", err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = async (noteId, subjectName) => {
    try {
        const response = await axios.get(`/api/notes/${noteId}/download/`, {
            responseType: 'blob', //  handling binary file data
        });
        
        // Create a URL for the blob data
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        // Suggest a filename for the user
        link.setAttribute('download', `${subjectName}_notes.pdf`); 
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    } catch (err) {
        console.error("Download error:", err);
        alert("Failed to download file.");
    }
  };

  const getFileIcon = (type) => {
    return <FileText className="h-5 w-5 text-red-500" />;
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
                Notes Hub
              </CardTitle>
            </div>
          </CardHeader>
        </Card>

        {/* Main Content */}
        <div className="space-y-6">
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search documents..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10"/>
                </div>
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="w-full md:w-48"><SelectValue placeholder="Filter by subject" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {/* Dynamically create filter options from the documents */}
                    {[...new Set(documents.map(doc => doc.subject_name))].map(subject => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {loading ? (
            <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>
          ) : error ? (
            <Alert variant="destructive"><AlertDescription>{error}</AlertDescription></Alert>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {filteredDocuments.map((doc) => (
                <Card key={doc.id} className="shadow-card hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getFileIcon(doc.type)}
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
