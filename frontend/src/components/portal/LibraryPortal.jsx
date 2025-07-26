import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Search, 
  Download, 
  Clock, 
  Calendar,
  Users,
  Filter,
  Heart,
  ExternalLink
} from 'lucide-react';

export const LibraryPortal = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const books = [
    {
      id: 1,
      title: "Advanced Data Structures",
      author: "Dr. Sarah Wilson",
      status: "Available",
      type: "Physical",
      location: "CS Section - Floor 2",
      dueDate: null
    },
    {
      id: 2,
      title: "Quantum Physics Fundamentals",
      author: "Prof. Michael Chen",
      status: "Checked Out",
      type: "Digital",
      location: "Online Access",
      dueDate: "2024-01-25"
    },
    {
      id: 3,
      title: "Modern Literature Analysis",
      author: "Dr. Emma Thompson",
      status: "Available",
      type: "Physical",
      location: "Literature - Floor 1",
      dueDate: null
    }
  ];

  const reservations = [
    {
      id: 1,
      room: "Study Room A-204",
      date: "2024-01-20",
      time: "14:00 - 16:00",
      capacity: "4 people"
    },
    {
      id: 2,
      room: "Group Study Hall",
      date: "2024-01-22",
      time: "10:00 - 12:00",
      capacity: "8 people"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-background to-muted">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">University Library Portal</h1>
          <p className="text-muted-foreground">Access books, research materials, and study spaces</p>
        </div>

        <Tabs defaultValue="catalog" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="catalog">Book Catalog</TabsTrigger>
            <TabsTrigger value="checked-out">My Books</TabsTrigger>
            <TabsTrigger value="reservations">Room Booking</TabsTrigger>
            <TabsTrigger value="digital">Digital Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="catalog" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Search Library Catalog
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-6">
                  <Input
                    placeholder="Search books, authors, subjects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button className="gap-2">
                    <Search className="h-4 w-4" />
                    Search
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </div>

                <div className="space-y-4">
                  {books.map((book) => (
                    <Card key={book.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
                          <p className="text-muted-foreground mb-2">by {book.author}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <BookOpen className="h-4 w-4" />
                              {book.type}
                            </span>
                            <span>{book.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={book.status === 'Available' ? 'default' : 'secondary'}>
                            {book.status}
                          </Badge>
                          <Button size="sm" className="gap-2">
                            <Heart className="h-4 w-4" />
                            {book.status === 'Available' ? 'Reserve' : 'Waitlist'}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="checked-out" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Currently Checked Out
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {books.filter(book => book.status === 'Checked Out').map((book) => (
                    <Card key={book.id} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
                          <p className="text-muted-foreground mb-2">by {book.author}</p>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-warning" />
                            <span className="text-warning">Due: {book.dueDate}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Button size="sm" variant="outline">
                            Renew
                          </Button>
                          <Button size="sm">
                            Return
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reservations" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Book Study Room
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Input type="date" placeholder="Select date" />
                    <Input type="time" placeholder="Start time" />
                    <Input type="time" placeholder="End time" />
                    <select className="w-full p-2 border rounded-md">
                      <option>Study Room A-204 (4 people)</option>
                      <option>Study Room B-301 (6 people)</option>
                      <option>Group Study Hall (8 people)</option>
                      <option>Silent Study Room (2 people)</option>
                    </select>
                    <Button className="w-full gap-2">
                      <Calendar className="h-4 w-4" />
                      Book Room
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    My Reservations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reservations.map((reservation) => (
                      <Card key={reservation.id} className="p-4">
                        <h4 className="font-semibold mb-2">{reservation.room}</h4>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>Date: {reservation.date}</p>
                          <p>Time: {reservation.time}</p>
                          <p>Capacity: {reservation.capacity}</p>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline">
                            Modify
                          </Button>
                          <Button size="sm" variant="destructive">
                            Cancel
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="digital" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="text-center">
                  <Download className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Academic Databases</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Access to IEEE, ACM, and other research databases
                  </p>
                  <Button className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Access
                  </Button>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="text-center">
                  <BookOpen className="h-12 w-12 text-secondary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">E-Books</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Digital library with thousands of e-books
                  </p>
                  <Button className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Browse
                  </Button>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="text-center">
                  <Search className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Research Tools</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Citation managers and research assistance
                  </p>
                  <Button className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Tools
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};