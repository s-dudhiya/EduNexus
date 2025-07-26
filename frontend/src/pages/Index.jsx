import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { 
  GraduationCap, 
  Users, 
  BookOpen,
  LogIn,
  Award,
  Globe,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Star,
  Building,
  Trophy,
  Heart,
  ClipboardCheck,
  MessageSquare
} from 'lucide-react';
import Footer from '@/components/Footer';

// Import college images and logos
import campusMain from '@/assets/campus-main.jpg';
import library from '@/assets/library.jpg';
import lab from '@/assets/lab.jpg';
import graduation from '@/assets/graduation.jpg';
import eduNexusLogo from '@/assets/edunexus-logo.png';
import greenTechCrest from '@/assets/greentech-crest.png';

const Index = () => {
  const collegeInfo = [
    {
      title: "Academic Excellence",
      description: "Ranked among the top universities with world-class faculty and cutting-edge research facilities",
      icon: Trophy,
      stats: "95% Graduate Employment Rate",
      badge: "Powered by EduNexus"
    },
    {
      title: "Modern Infrastructure", 
      description: "State-of-the-art campus with advanced laboratories, libraries, and student facilities",
      icon: Building,
      stats: "50+ Research Labs",
      badge: "Powered by EduNexus"
    },
    {
      title: "Connected Campus",
      description: "Seamlessly integrated digital platform connecting students, faculty, and resources through EduNexus",
      icon: Heart,
      stats: "25,000+ Students",
      badge: "Powered by EduNexus"
    }
  ];

  const features = [
    {
      title: "Exams Module",
      description: "Online examinations and result management",
      icon: ClipboardCheck,
      badge: "EduNexus Module"
    },
    {
      title: "Attendance System",
      description: "Real-time attendance tracking and analytics",
      icon: Users,
      badge: "EduNexus Module"
    },
    {
      title: "Faculty Chat",
      description: "Direct communication with professors and staff",
      icon: MessageSquare,
      badge: "EduNexus Module"
    },
    {
      title: "Course Management",
      description: "Complete academic course administration",
      icon: BookOpen,
      badge: "EduNexus Module"
    }
  ];

  const campusImages = [
    {
      src: campusMain,
      title: "Beautiful Campus",
      description: "Our historic campus blends traditional architecture with modern facilities"
    },
    {
      src: library,
      title: "Modern Library",
      description: "A world-class library with extensive digital resources and study spaces"
    },
    {
      src: lab,
      title: "Research Labs",
      description: "State-of-the-art laboratories for cutting-edge research and innovation"
    },
    {
      src: graduation,
      title: "Graduation Day",
      description: "Celebrating our graduates' achievements and their bright futures ahead"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-white">EduNexus</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/auth">
                <Button variant="ghost" className="text-white hover:bg-white/20">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 text-white pt-16">
        <div className="absolute inset-0 bg-black/20" />
        
        {/* University Header */}
        <div className="relative text-center mb-12">
          {/* EduNexus Logo */}
          <div className="flex items-center justify-center mb-8">
          </div>
          
          {/* Main Hero Heading */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white">
            GreenTech
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-4xl mx-auto mb-8">
            Powered by EduNexus — your connected digital campus
          </p>
          
          {/* About Section */}
          <div className="max-w-3xl mx-auto mb-8">
            <p className="text-lg opacity-85 leading-relaxed">
              Welcome to Greenfield Tech University (GreenTech), where innovation meets education. Our mission is to cultivate the next generation of technology leaders through cutting-edge curriculum, state-of-the-art facilities, and seamless digital integration powered by our EduNexus platform.
            </p>
          </div>
          <div className="flex items-center justify-center gap-8 text-sm opacity-80 mb-12">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Established 1985</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>25,000+ Students</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span>Top 10 Nationally</span>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <Link to="/auth">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
                <LogIn className="h-5 w-5 mr-2" />
                Access your portal with EduNexus
              </Button>
            </Link>
          </div>
        </div>

        {/* Campus Image Carousel - RESTORED */}
        <div className="relative max-w-4xl mx-auto mb-16 w-full">
          <h2 className="text-3xl font-bold text-center mb-8">Explore Our Campus</h2>
          <Carousel className="w-full">
            <CarouselContent>
              {campusImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative">
                    <img 
                      src={image.src} 
                      alt={image.title}
                      className="w-full h-96 object-cover rounded-lg"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                      <h3 className="text-xl font-semibold text-white mb-2">{image.title}</h3>
                      <p className="text-white/80">{image.description}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-white border-white/20 hover:bg-white/20" />
            <CarouselNext className="text-white border-white/20 hover:bg-white/20" />
          </Carousel>
        </div>


        {/* College Information Grid */}
        <div className="relative max-w-6xl mx-auto grid md:grid-cols-3 gap-6 mb-16">
          {collegeInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="p-6 text-center">
                  <div className="bg-white/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{info.title}</h3>
                  <p className="text-white/80 text-sm mb-4">{info.description}</p>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30 mb-2">
                    {info.stats}
                  </Badge>
                  <div className="text-xs text-white/60 font-medium">{info.badge}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Feature Section */}
        <div className="relative max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">EduNexus Platform Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                  <CardContent className="p-6 text-center">
                    <div className="bg-secondary/20 rounded-full p-3 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-semibold mb-2">{feature.title}</h4>
                    <p className="text-white/70 text-sm mb-3">{feature.description}</p>
                    <div className="text-xs text-secondary-glow font-medium">{feature.badge}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Contact and Quick Links */}
        <div className="relative text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Our Academic Community
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Experience world-class education, cutting-edge research, and lifelong connections at Greenfield Tech University, powered by EduNexus.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link to="/auth">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Apply Now
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              Virtual Tour
            </Button>
          </div>
          
          {/* Quick Contact */}
          <div className="flex flex-wrap justify-center gap-6 text-sm opacity-80 mb-8">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>(555) 123-4567</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>admissions@greentech.edu</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>123 University Ave, Education City</span>
            </div>
          </div>

          {/* University Crest */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <img src={greenTechCrest} alt="GreenTech University" className="h-12 w-12" />
            <span className="text-lg font-semibold text-white">Greenfield Tech University</span>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;