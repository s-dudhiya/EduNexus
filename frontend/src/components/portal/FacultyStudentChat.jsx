import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Send, 
  Search, 
  MoreVertical, 
  Phone, 
  Video, 
  Paperclip,
  Smile,
  Users,
  CheckCheck,
  Clock
} from 'lucide-react';

export function FacultyStudentChat({
  currentUser = { id: 'user1', name: 'John Doe', role: 'student' }
}) {
  const [selectedContact, setSelectedContact] = useState('contact1');
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const contacts = [
    {
      id: 'contact1',
      name: 'Dr. Sarah Wilson',
      role: 'faculty',
      subject: 'Data Structures',
      lastMessage: 'Great question! Let me explain the concept of binary trees...',
      lastMessageTime: '2 mins ago',
      unreadCount: 2,
      online: true,
      avatar: '/placeholder-avatar.jpg'
    },
    {
      id: 'contact2',
      name: 'Prof. Michael Chen',
      role: 'faculty',
      subject: 'Web Development',
      lastMessage: 'Your assignment submission was excellent.',
      lastMessageTime: '1 hour ago',
      unreadCount: 0,
      online: false,
      avatar: '/placeholder-avatar.jpg'
    },
    {
      id: 'contact3',
      name: 'Alice Johnson',
      role: 'student',
      subject: 'Study Group',
      lastMessage: 'Are you joining the study session tomorrow?',
      lastMessageTime: '3 hours ago',
      unreadCount: 1,
      online: true,
      avatar: '/placeholder-avatar.jpg'
    },
    {
      id: 'contact4',
      name: 'Dr. Emily Davis',
      role: 'faculty',
      subject: 'Machine Learning',
      lastMessage: 'The deadline for the project has been extended.',
      lastMessageTime: 'Yesterday',
      unreadCount: 0,
      online: false,
      avatar: '/placeholder-avatar.jpg'
    }
  ];

  const messages = [
    {
      id: 'msg1',
      senderId: 'contact1',
      senderName: 'Dr. Sarah Wilson',
      senderRole: 'faculty',
      content: 'Hello! I hope you\'re doing well with the data structures course.',
      timestamp: '10:30 AM',
      read: true,
      type: 'text'
    },
    {
      id: 'msg2',
      senderId: 'user1',
      senderName: 'John Doe',
      senderRole: 'student',
      content: 'Hi Dr. Wilson! Yes, I\'m enjoying the course. I have a question about binary tree traversal.',
      timestamp: '10:32 AM',
      read: true,
      type: 'text'
    },
    {
      id: 'msg3',
      senderId: 'contact1',
      senderName: 'Dr. Sarah Wilson',
      senderRole: 'faculty',
      content: 'Great question! Let me explain the concept of binary trees. There are three main types of traversal: in-order, pre-order, and post-order.',
      timestamp: '10:35 AM',
      read: false,
      type: 'text'
    },
    {
      id: 'msg4',
      senderId: 'contact1',
      senderName: 'Dr. Sarah Wilson',
      senderRole: 'faculty',
      content: 'Would you like me to share some additional resources on this topic?',
      timestamp: '10:36 AM',
      read: false,
      type: 'text'
    }
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.subject?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedContactData = contacts.find(c => c.id === selectedContact);
  const chatMessages = selectedContact ? messages.filter(m => 
    m.senderId === selectedContact || m.senderId === currentUser.id
  ) : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div className="max-w-7xl mx-auto">
        <Card className="shadow-card h-[calc(100vh-2rem)]">
          <CardHeader className="bg-gradient-primary text-primary-foreground rounded-t-lg">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Users className="h-6 w-6" />
              Faculty-Student Communication
            </CardTitle>
          </CardHeader>
          <div className="flex h-[calc(100vh-8rem)]">
            {/* Contacts Sidebar */}
            <div className="w-80 border-r border-border flex flex-col">
              {/* Search */}
              <div className="p-4 border-b border-border">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search contacts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Contacts List */}
              <ScrollArea className="flex-1">
                <div className="p-2 space-y-1">
                  {filteredContacts.map((contact) => (
                    <div
                      key={contact.id}
                      onClick={() => setSelectedContact(contact.id)}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedContact === contact.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={contact.avatar} />
                          <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        {contact.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-background" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium truncate">{contact.name}</p>
                          <span className="text-xs opacity-70">{contact.lastMessageTime}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <Badge 
                              variant="outline" 
                              className={`text-xs mb-1 ${
                                selectedContact === contact.id 
                                  ? 'border-primary-foreground text-primary-foreground' 
                                  : ''
                              }`}
                            >
                              {contact.role === 'faculty' ? contact.subject : 'Student'}
                            </Badge>
                            <p className="text-sm opacity-70 truncate">{contact.lastMessage}</p>
                          </div>
                          {contact.unreadCount > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {contact.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedContactData ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={selectedContactData.avatar} />
                          <AvatarFallback>
                            {selectedContactData.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        {selectedContactData.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-background" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{selectedContactData.name}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {selectedContactData.role === 'faculty' ? selectedContactData.subject : 'Student'}
                          </Badge>
                          {selectedContactData.online && (
                            <span className="text-xs text-success">Online</span>
                          )}
                          {isTyping && (
                            <span className="text-xs text-muted-foreground">Typing...</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {chatMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${
                            msg.senderId === currentUser.id ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                              msg.senderId === currentUser.id
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <p className="text-sm">{msg.content}</p>
                            <div className={`flex items-center justify-between mt-2 text-xs ${
                              msg.senderId === currentUser.id ? 'text-primary-foreground/70' : 'text-muted-foreground'
                            }`}>
                              <span>{msg.timestamp}</span>
                              {msg.senderId === currentUser.id && (
                                <div className="flex items-center gap-1">
                                  {msg.read ? (
                                    <CheckCheck className="h-3 w-3" />
                                  ) : (
                                    <Clock className="h-3 w-3" />
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>

                  {/* Message Input */}
                  <div className="p-4 border-t border-border">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Smile className="h-4 w-4" />
                      </Button>
                      <div className="flex-1 relative">
                        <Input
                          placeholder="Type a message..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="pr-12"
                        />
                        <Button
                          size="sm"
                          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                          onClick={handleSendMessage}
                          disabled={!message.trim()}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Select a contact to start chatting</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}