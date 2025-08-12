import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
} from "@/components/ui/alert-dialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Upload, FileText, Search } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const UploadNotes = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [uploadedNotes, setUploadedNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    // TODO: Fetch subjects from the backend API
    setSubjects([
      { id: 1, name: 'Mathematics' },
      { id: 2, name: 'Science' },
      { id: 3, name: 'History' },
    ]);

    // TODO: Fetch uploaded notes from the backend API
    setUploadedNotes([
      { id: 1, title: 'Algebra Basics', subject: 'Mathematics', date: '2023-10-27' },
      { id: 2, title: 'Introduction to Physics', subject: 'Science', date: '2023-10-26' },
    ]);
  }, []);

  const handleUpload = (e) => {
    e.preventDefault();
    setIsUploading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', file);
    formData.append('subject_id', selectedSubject);

    // TODO: Implement the API call to upload the notes
    console.log({
      title,
      description,
      file,
      selectedSubject,
    });
    setTimeout(() => {
        setIsUploading(false);
        // After successful upload, you might want to refresh the notes list
    }, 2000);
  };

  const handleDelete = (noteId) => {
    // TODO: Implement the API call to delete the note
    console.log('Delete note with id:', noteId);
    setUploadedNotes(uploadedNotes.filter(note => note.id !== noteId));
  };

  const filteredDocuments = uploadedNotes.filter(doc => {
    const searchMatch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const subjectMatch = selectedSubject === 'all' || doc.subject === selectedSubject || selectedSubject === '';
    return searchMatch && subjectMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <Card className="shadow-card">
          <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl flex items-center gap-2">
                <FileText className="h-6 w-6" />
                Notes & Documents Hub
              </CardTitle>
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
                    <form onSubmit={handleUpload}>
                        <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                placeholder="Enter note title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Enter a brief description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Select onValueChange={setSelectedSubject} value={selectedSubject}>
                                <SelectTrigger>
                                <SelectValue placeholder="Select a subject" />
                                </SelectTrigger>
                                <SelectContent>
                                {subjects.map((subject) => (
                                    <SelectItem key={subject.id} value={subject.name}>
                                    {subject.name}
                                    </SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="file">Notes File</Label>
                            <Input
                                id="file"
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                required
                            />
                        </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                            <Button variant="outline" type="button">Cancel</Button>
                            <Button type="submit" disabled={isUploading}>
                                {isUploading ? 'Uploading...' : 'Upload Document'}
                            </Button>
                        </CardFooter>
                    </form>
                  </DialogContent>
                </Dialog>
            </div>
          </CardHeader>
        </Card>

        <Card className="shadow-card">
            <CardHeader>
                <CardTitle>Uploaded Notes</CardTitle>
                <CardDescription>View and manage your uploaded notes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search documents..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                    </div>
                    <Select onValueChange={setSelectedSubject}>
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by subject" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Subjects</SelectItem>
                        {subjects.map((subject) => (
                            <SelectItem key={subject.id} value={subject.name}>
                                {subject.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                </div>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Date Uploaded</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {filteredDocuments.map((note) => (
                        <TableRow key={note.id}>
                        <TableCell>{note.title}</TableCell>
                        <TableCell><Badge variant="outline">{note.subject}</Badge></TableCell>
                        <TableCell>{note.date}</TableCell>
                        <TableCell>
                            <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm">
                                Delete
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the note.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(note.id)}>
                                    Continue
                                </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                            </AlertDialog>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UploadNotes;
