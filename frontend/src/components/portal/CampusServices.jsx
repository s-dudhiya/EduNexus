import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Utensils, 
  Bus, 
  Shield,
  Heart,
  Users,
  Calendar,
  Clock,
  Phone,
  AlertCircle,
  CheckCircle,
  Navigation,
  Car
} from 'lucide-react';

export const CampusServices = () => {
  const [selectedDining, setSelectedDining] = useState('Main Cafeteria');

  const diningHalls = [
    {
      name: "Main Cafeteria",
      status: "Open",
      hours: "7:00 AM - 9:00 PM",
      waitTime: "5 mins",
      menu: ["Grilled Chicken", "Vegetarian Pasta", "Fresh Salad Bar", "Pizza Station"],
      crowdLevel: "Medium"
    },
    {
      name: "Student Union Food Court",
      status: "Open",
      hours: "10:00 AM - 10:00 PM",
      waitTime: "3 mins",
      menu: ["Burgers", "Sushi", "Mexican Grill", "Coffee & Pastries"],
      crowdLevel: "High"
    },
    {
      name: "Library Café",
      status: "Closed",
      hours: "8:00 AM - 6:00 PM",
      waitTime: "N/A",
      menu: ["Sandwiches", "Coffee", "Light Snacks"],
      crowdLevel: "Low"
    }
  ];

  const shuttleRoutes = [
    {
      route: "Campus Loop",
      nextArrival: "3 mins",
      status: "On Time",
      stops: ["Main Gate", "Library", "Student Union", "Dorms", "Parking Lot A"]
    },
    {
      route: "Downtown Express",
      nextArrival: "12 mins",
      status: "Delayed",
      stops: ["Campus Center", "City Mall", "Train Station", "Hospital"]
    },
    {
      route: "Residence Hall Shuttle",
      nextArrival: "7 mins",
      status: "On Time",
      stops: ["North Dorms", "South Dorms", "Graduate Housing", "Family Housing"]
    }
  ];

  const healthServices = [
    {
      service: "Student Health Center",
      status: "Open",
      hours: "8:00 AM - 5:00 PM",
      phone: "(555) 123-4567",
      services: ["General Medicine", "Vaccinations", "Mental Health", "Emergency Care"]
    },
    {
      service: "Counseling Center",
      status: "Open",
      hours: "9:00 AM - 6:00 PM",
      phone: "(555) 123-4568",
      services: ["Individual Counseling", "Group Therapy", "Crisis Support", "Workshops"]
    },
    {
      service: "Wellness Center",
      status: "Open",
      hours: "6:00 AM - 10:00 PM",
      phone: "(555) 123-4569",
      services: ["Fitness Classes", "Nutrition Counseling", "Stress Management", "Yoga"]
    }
  ];

  const securityServices = [
    {
      title: "Campus Security",
      phone: "(555) 123-SAFE",
      description: "24/7 campus security and emergency response"
    },
    {
      title: "SafeWalk Escort",
      phone: "(555) 123-WALK",
      description: "Free walking escort service across campus"
    },
    {
      title: "Emergency Hotline",
      phone: "911",
      description: "For immediate emergencies"
    }
  ];

  const events = [
    {
      title: "Campus Safety Workshop",
      date: "2024-01-25",
      time: "2:00 PM",
      location: "Student Union Room 201"
    },
    {
      title: "Mental Health First Aid Training",
      date: "2024-01-28",
      time: "10:00 AM",
      location: "Health Center Conference Room"
    },
    {
      title: "Shuttle Service Information Session",
      date: "2024-02-01",
      time: "4:00 PM",
      location: "Transportation Hub"
    }
  ];

  const parkingInfo = [
    {
      lot: "Student Lot A",
      available: 45,
      total: 200,
      rate: "$3/day",
      distance: "5 min walk to main campus"
    },
    {
      lot: "Student Lot B",
      available: 12,
      total: 150,
      rate: "$3/day",
      distance: "8 min walk to main campus"
    },
    {
      lot: "Visitor Parking",
      available: 8,
      total: 50,
      rate: "$5/day",
      distance: "2 min walk to main campus"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Campus Services</h1>
          <p className="text-muted-foreground">Access dining, transportation, health, and safety services</p>
        </div>

        <Tabs defaultValue="dining" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dining">Dining</TabsTrigger>
            <TabsTrigger value="transportation">Transportation</TabsTrigger>
            <TabsTrigger value="health">Health & Wellness</TabsTrigger>
            <TabsTrigger value="safety">Safety & Security</TabsTrigger>
            <TabsTrigger value="parking">Parking</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          <TabsContent value="dining" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {diningHalls.map((hall) => (
                <Card key={hall.name} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{hall.name}</h3>
                      <p className="text-sm text-muted-foreground">{hall.hours}</p>
                    </div>
                    <Badge variant={hall.status === 'Open' ? 'default' : 'secondary'}>
                      {hall.status}
                    </Badge>
                  </div>

                  {hall.status === 'Open' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>Wait Time: {hall.waitTime}</span>
                        </div>
                        <Badge variant="outline">{hall.crowdLevel}</Badge>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Today's Menu</h4>
                        <div className="space-y-1">
                          {hall.menu.slice(0, 3).map((item, index) => (
                            <p key={index} className="text-sm text-muted-foreground">• {item}</p>
                          ))}
                          {hall.menu.length > 3 && (
                            <p className="text-sm text-primary">+{hall.menu.length - 3} more items</p>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button size="sm" className="gap-2">
                          <MapPin className="h-4 w-4" />
                          Directions
                        </Button>
                        <Button size="sm" variant="outline">
                          Full Menu
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="h-5 w-5" />
                  Meal Plan Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Current Meal Plan</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Plan Type:</span>
                        <span className="font-medium">Unlimited Plus</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Dining Dollars:</span>
                        <span className="font-medium">$245.50</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Guest Passes:</span>
                        <span className="font-medium">3 remaining</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Recent Activity</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Main Cafeteria - Lunch</span>
                        <span>$12.50</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Library Café - Coffee</span>
                        <span>$4.25</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Student Union - Dinner</span>
                        <span>$15.75</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transportation" className="space-y-6">
            <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {shuttleRoutes.map((route) => (
                <Card key={route.route} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{route.route}</h3>
                      <p className="text-sm text-muted-foreground">Next arrival: {route.nextArrival}</p>
                    </div>
                    <Badge variant={route.status === 'On Time' ? 'default' : 'destructive'}>
                      {route.status}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-2">Route Stops</h4>
                      <div className="space-y-1">
                        {route.stops.map((stop, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span>{stop}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="gap-2">
                        <Navigation className="h-4 w-4" />
                        Track Bus
                      </Button>
                      <Button size="sm" variant="outline">
                        Schedule
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bus className="h-5 w-5" />
                  Transportation Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Service Information</h4>
                    <div className="space-y-2 text-sm">
                      <p>• Free shuttle service for all students and staff</p>
                      <p>• Buses run every 10-15 minutes during peak hours</p>
                      <p>• Limited service on weekends and holidays</p>
                      <p>• Real-time tracking available via mobile app</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Contact Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>(555) 123-RIDE</span>
                      </div>
                      <p>Transportation Office: Student Union, Room 150</p>
                      <p>Hours: Monday-Friday, 7:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="health" className="space-y-6">
            <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {healthServices.map((service) => (
                <Card key={service.service} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{service.service}</h3>
                      <p className="text-sm text-muted-foreground">{service.hours}</p>
                    </div>
                    <Badge variant={service.status === 'Open' ? 'default' : 'secondary'}>
                      {service.status}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4" />
                      <span>{service.phone}</span>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Services Offered</h4>
                      <div className="space-y-1">
                        {service.services.map((item, index) => (
                          <p key={index} className="text-sm text-muted-foreground">• {item}</p>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="gap-2">
                        <Calendar className="h-4 w-4" />
                        Book Appointment
                      </Button>
                      <Button size="sm" variant="outline">
                        More Info
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Health & Wellness Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Emergency Contacts</h4>
                    <div className="space-y-2">
                      <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <h5 className="font-medium text-destructive">Emergency: 911</h5>
                        <p className="text-sm">For immediate medical emergencies</p>
                      </div>
                      <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                        <h5 className="font-medium text-warning">Crisis Hotline: (555) 123-HELP</h5>
                        <p className="text-sm">24/7 mental health crisis support</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Health Tips</h4>
                    <div className="space-y-2 text-sm">
                      <p>• Stay hydrated - aim for 8 glasses of water daily</p>
                      <p>• Get 7-9 hours of sleep each night</p>
                      <p>• Take regular study breaks to reduce stress</p>
                      <p>• Use campus gym facilities - free for students</p>
                      <p>• Don't hesitate to seek help when needed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="safety" className="space-y-6">
            <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {securityServices.map((service, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start gap-3">
                    <Shield className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span className="font-medium">{service.phone}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Safety Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                      <h4 className="font-semibold text-warning mb-1">Weather Alert</h4>
                      <p className="text-sm">Severe weather expected tonight. Stay indoors and avoid unnecessary travel.</p>
                      <p className="text-xs text-muted-foreground mt-1">Posted 2 hours ago</p>
                    </div>
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h4 className="font-semibold text-blue-700 mb-1">Maintenance Notice</h4>
                      <p className="text-sm">Emergency lighting tests scheduled for tomorrow 2-4 PM in all buildings.</p>
                      <p className="text-xs text-muted-foreground mt-1">Posted 1 day ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Safety Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p>• Always carry your student ID</p>
                    <p>• Use well-lit pathways when walking at night</p>
                    <p>• Program emergency numbers in your phone</p>
                    <p>• Report suspicious activity immediately</p>
                    <p>• Use the SafeWalk escort service after dark</p>
                    <p>• Keep dorm room doors locked at all times</p>
                    <p>• Attend campus safety workshops</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="parking" className="space-y-6">
            <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {parkingInfo.map((lot) => (
                <Card key={lot.lot} className="p-6">
                  <h3 className="font-semibold text-lg mb-3">{lot.lot}</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Available Spaces</span>
                      <Badge variant={lot.available > 20 ? 'default' : lot.available > 10 ? 'secondary' : 'destructive'}>
                        {lot.available}/{lot.total}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Rate:</span>
                        <span className="font-medium">{lot.rate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Distance:</span>
                        <span className="font-medium">{lot.distance}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="gap-2">
                        <Car className="h-4 w-4" />
                        Reserve Spot
                      </Button>
                      <Button size="sm" variant="outline">
                        Directions
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  Parking Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Parking Permits</h4>
                    <div className="space-y-2 text-sm">
                      <p>• Annual student permit: $180</p>
                      <p>• Semester student permit: $100</p>
                      <p>• Daily visitor permit: $5</p>
                      <p>• Faculty/staff permit: $240/year</p>
                    </div>
                    <Button size="sm" className="mt-3">Purchase Permit</Button>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Parking Regulations</h4>
                    <div className="space-y-2 text-sm">
                      <p>• Valid permit required in all lots</p>
                      <p>• No overnight parking without special permit</p>
                      <p>• Handicap spaces require proper placard</p>
                      <p>• Violations result in $25-$100 fines</p>
                    </div>
                    <Button size="sm" variant="outline" className="mt-3">View Full Rules</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Campus Service Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.map((event, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold">{event.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                        </div>
                        <Button size="sm">Register</Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Service Announcements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-700 mb-1">New Mobile App Features</h4>
                    <p className="text-sm">The campus services app now includes real-time dining hall wait times and shuttle tracking!</p>
                    <p className="text-xs text-muted-foreground mt-1">Posted yesterday</p>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-700 mb-1">Extended Health Center Hours</h4>
                    <p className="text-sm">Health center now open until 7 PM on weekdays during exam period.</p>
                    <p className="text-xs text-muted-foreground mt-1">Posted 2 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};