import React from 'react';
import { AuthForm } from '@/components/auth/AuthForm';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home, BookOpen, Users, Award, Phone, Mail, MapPin } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

const Auth = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-float-gentle"></div>
        <div className="absolute top-40 left-20 w-24 h-24 bg-blue-200 rounded-lg opacity-15 animate-float-gentle" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 right-1/4 w-20 h-20 bg-blue-50 rounded-full opacity-25 animate-float-gentle" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-32 left-10 opacity-10 animate-bounce-gentle">
          <BookOpen className="w-16 h-16 text-blue-400" />
        </div>
        <div className="absolute bottom-40 right-16 opacity-15 animate-pulse-gentle">
          <Users className="w-12 h-12 text-blue-300" />
        </div>
        <div className="absolute top-1/2 right-10 opacity-20 animate-bounce-gentle" style={{ animationDelay: '3s' }}>
          <Award className="w-10 h-10 text-blue-500" />
        </div>
      </div>

      {/* Enhanced Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg shadow-md border-b border-gray-100 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3 animate-fade-in-left">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm transform hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">EN</span>
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">EDUNEXUS</span>
                <p className="text-xs text-blue-600 font-medium -mt-0.5">Greenfield Tech University</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 animate-fade-in-right">
              <Link to="/">
                <Button 
                  variant="ghost" 
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 flex items-center space-x-2"
                >
                  <Home className="h-4 w-4" />
                  <span>Back to Home</span>
                </Button>
              </Link>
              
              {/* --- UPDATED "NEED HELP?" BUTTON AND DIALOG --- */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="border-blue-200 text-blue-600 hover:bg-blue-100 hover:text-gray-900 hover:border-blue-300 transition-all duration-300"
                  >
                    Need Help?
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Contact Support</DialogTitle>
                    <DialogDescription>
                      If you are facing any issues, please contact our IT support team.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4 space-y-4">
                    <div className="flex items-center gap-4">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-semibold">Phone Support</p>
                        <p className="text-sm text-muted-foreground">(+91) 89898 98989</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-semibold">Email Support</p>
                        <p className="text-sm text-muted-foreground">support@greentech.edu</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-semibold">Visit Us</p>
                        <p className="text-sm text-muted-foreground">IT Department, Admin Building</p>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10">
        <AuthForm />
      </div>

      {/* Enhanced Footer */}
      <div className="relative z-10">
        <footer id='contact' className="py-12 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 animate-fade-in-up">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-3 mb-6 animate-fade-in-left">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center hover:rotate-12 transition-transform duration-300">
                    <span className="text-white font-bold text-lg">EN</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">EduNexus</h3>
                    <p className="text-blue-400">Greenfield Tech University</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6 max-w-md animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  Empowering education through innovative technology and comprehensive management solutions.
                </p>
                <div className="space-y-2 text-gray-300 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  <p className="hover:text-white transition-colors duration-300 cursor-pointer">📞 (+91) 8989898989 </p>
                  <p className="hover:text-white transition-colors duration-300 cursor-pointer">✉️ info@greentech.edu</p>
                  <p className="hover:text-white transition-colors duration-300 cursor-pointer">📍 Ahmedabad,Gujarat</p>
                </div>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <h4 className="font-bold mb-4">Academic</h4>
                <ul className="space-y-2 text-gray-300">
                  {['Admissions', 'Programs', 'Faculty', 'Research'].map((link, index) => (
                    <li key={link}>
                      <a 
                        href="#" 
                        className="hover:text-white hover:translate-x-2 transform transition-all duration-300 inline-block"
                        style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                <h4 className="font-bold mb-4">Support</h4>
                <ul className="space-y-2 text-gray-300">
                  {['Help Center', 'Technical Support', 'Contact Us', 'Privacy Policy'].map((link, index) => (
                    <li key={link}>
                      <a 
                        href="#" 
                        className="hover:text-white hover:translate-x-2 transform transition-all duration-300 inline-block"
                        style={{ animationDelay: `${1.0 + index * 0.1}s` }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 animate-fade-in-up" style={{ animationDelay: '1.4s' }}>
              <p>© 2025 EduNexus - Greenfield Tech University. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Auth;
