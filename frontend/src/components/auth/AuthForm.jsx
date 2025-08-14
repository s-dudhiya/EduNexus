// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Eye, EyeOff, GraduationCap, AlertCircle } from 'lucide-react';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { useAuth } from '@/contexts/AuthContext';

// export const AuthForm = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();
  
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     rememberMe: false,
//     role: 'student'
//   });
  
//   const [errors, setErrors] = useState({});

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.email) {
//       newErrors.email = 'Email is required';
//     } else if (!validateEmail(formData.email)) {
//       newErrors.email = 'Please enter a valid email';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 4 ||formData.password.length > 4) {
//       newErrors.password = 'Pin Is of 4 Digits';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     if (errors[field]) {
//       setErrors(prev => ({ ...prev, [field]: undefined }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setIsLoading(true);
//     setErrors({});

//     // The login function now returns a result object, it does not throw an error.
//     const result = await login(formData.email, formData.password, formData.role);
    
//     if (result.success) {
//       // If login is successful, navigate based on the role selected in the form.
//       if (formData.role === 'faculty') {
//         navigate('/faculty-dashboard');
//       } else {
//         navigate('/student-dashboard');
//       }
//     } else {
//       // If login fails, display the specific error message from the API.
//       setErrors({ api: result.error || 'Login failed. Please check your credentials.' });
//     }
    
//     setIsLoading(false);
//   };

//   const handleForgotPassword = () => {
//     console.log('Forgot password clicked');
//   };
  
//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-hero pt-24">
//       <div className="flex items-center justify-center p-4">
//         <Card className="w-full max-w-md shadow-elevation">
//         <CardHeader className="text-center space-y-2">
//           <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center">
//             <GraduationCap className="h-6 w-6 text-white" />
//           </div>
//           <CardTitle className="text-2xl font-bold text-primary">
//             EduNexus Login
//           </CardTitle>
//           <CardDescription>
//             Access your connected digital campus
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           <Tabs value="login" className="w-full">
//             <TabsContent value="login" className="space-y-4 mt-6">
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 {errors.api && (
//                   <Alert variant="destructive">
//                     <AlertCircle className="h-4 w-4" />
//                     <AlertDescription>{errors.api}</AlertDescription>
//                   </Alert>
//                 )}
//                 <div className="space-y-2">
//                   <Label htmlFor="login-email">Email</Label>
//                   <Input
//                     id="login-email"
//                     type="email"
//                     placeholder="Enter your email"
//                     value={formData.email}
//                     onChange={(e) => handleInputChange('email', e.target.value)}
//                     className={errors.email ? 'border-destructive' : ''}
//                     required
//                   />
//                   {errors.email && (
//                     <p className="text-sm text-destructive flex items-center gap-1">
//                       <AlertCircle className="h-3 w-3" />
//                       {errors.email}
//                     </p>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="login-password">Password</Label>
//                   <div className="relative">
//                     <Input
//                       id="login-password"
//                       type={showPassword ? 'text' : 'password'}
//                       placeholder="Enter your password"
//                       value={formData.password}
//                       onChange={(e) => handleInputChange('password', e.target.value)}
//                       className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
//                       required
//                     />
//                     <Button
//                       type="button"
//                       variant="ghost"
//                       size="sm"
//                       className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? (
//                         <EyeOff className="h-4 w-4 text-muted-foreground" />
//                       ) : (
//                         <Eye className="h-4 w-4 text-muted-foreground" />
//                       )}
//                     </Button>
//                   </div>
//                   {errors.password && (
//                     <p className="text-sm text-destructive flex items-center gap-1">
//                       <AlertCircle className="h-3 w-3" />
//                       {errors.password}
//                     </p>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="role">Role</Label>
//                   <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select your role" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="student">Student</SelectItem>
//                       <SelectItem value="faculty">Faculty</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-2">
//                     <Checkbox
//                       id="remember"
//                       checked={formData.rememberMe}
//                       onCheckedChange={(checked) => handleInputChange('rememberMe', checked)}
//                     />
//                     <Label htmlFor="remember" className="text-sm">
//                       Remember me
//                     </Label>
//                   </div>
//                   <Button
//                     type="button"
//                     variant="link"
//                     className="px-0 text-primary"
//                     onClick={handleForgotPassword}
//                   >
//                     Forgot password?
//                   </Button>
//                 </div>

//                 <Button type="submit" className="w-full" disabled={isLoading}>
//                   {isLoading ? 'Signing in...' : 'Sign In'}
//                 </Button>
//               </form>
//             </TabsContent>
//           </Tabs>
//         </CardContent>
//       </Card>
//       </div>
      
//       {/* Footer Help */}
//       <div className="text-center mt-2 mb-4">
//         <p className="text-white/80 text-sm">
//           Need help? Contact <span className="font-semibold">GreenTech IT Support</span>
//         </p>
//       </div>
//     </div>
//   );
// };



import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, GraduationCap, AlertCircle, BookOpen, Users, Award, ArrowLeft,Shield,ArrowRight, UserCog, ClipboardList, BookOpenText } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';

export const AuthForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
    role: 'student'
  });
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 4 || formData.password.length > 4) {
      newErrors.password = 'Pin Is of 4 Digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setErrors({});
    
    const result = await login(formData.email, formData.password, formData.role);
    
    if (result.success) {
      if (formData.role === 'faculty') {
        navigate('/faculty-dashboard');
      } else {
        navigate('/student-dashboard');
      }
    } else {
      setErrors({ api: result.error || 'Login failed. Please check your credentials.' });
    }
    
    setIsLoading(false);
  };

  const handleForgotPassword = () => {
    console.log('Forgot password clicked');
  };

  const goBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] via-[#c7d2fe] to-[#a5b4fc] relative overflow-hidden">
      {/* Background Elements - Matching Landing Page */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-float-gentle"></div>
        <div className="absolute top-40 left-20 w-24 h-24 bg-blue-200 rounded-lg opacity-15 animate-float-gentle" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 right-1/4 w-20 h-20 bg-blue-50 rounded-full opacity-25 animate-float-gentle" style={{ animationDelay: '4s' }}></div>
        
        {/* Decorative Icons */}
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

      {/* Header with Logo - Matching Landing Page */}
      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">EDUNEXUS</span>
              <p className="text-xs text-blue-600 font-medium -mt-0.5">Greenfield Tech University</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            onClick={goBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Button>
        </div>
      </div>

      {/* Main Login Container */}
      {/* <div className="relative z-10 flex flex-col pt-8">
        <div className="flex items-center justify-center p-3"> */}
        <div className="relative z-10 flex flex-col pt-4 pb-8">
        <div className="flex items-center justify-center p-4 mb-4">
          <Card className="w-full max-w-md shadow-2xl border border-blue-200 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-blue-600">
                EduNexus Login
              </CardTitle>
              <CardDescription className="text-gray-600">
                Access your connected digital campus
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value="login" className="w-full">
                <TabsContent value="login" className="space-y-4 mt-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {errors.api && (
                      <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-700">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{errors.api}</AlertDescription>
                      </Alert>
                    )}

                    {/* Modern Role Selection */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-gray-700">Access Level</Label>
                  <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                    <SelectTrigger className="h-14 bg-white/50 border-blue-200 text-gray-900 backdrop-blur-xl rounded-2xl focus:border-blue-500 focus:ring-blue-500/30 shadow-sm">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-xl border-blue-200 rounded-2xl shadow-xl">
                      <SelectItem value="student" className="py-4 text-gray-900 hover:bg-blue-50 rounded-xl m-1">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                            <GraduationCap className="w-4 h-4 text-white" />
                          </div>
                          <span>Student Access</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="faculty" className="py-4 text-gray-900 hover:bg-indigo-50 rounded-xl m-1">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                            <UserCog className="w-4 h-4 text-white" />
                          </div>
                          <span>Faculty Access</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                 {/* Modern Email Field */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-gray-700">Email Address</Label>
                  <Input
                    type="email"
                    placeholder="Enter your university email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`h-14 bg-white/50 border-blue-200 text-gray-900 placeholder:text-gray-500 backdrop-blur-xl rounded-2xl focus:border-blue-500 focus:ring-blue-500/30 shadow-sm ${errors.email ? 'border-red-300' : ''}`}
                    required
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600 flex items-center gap-2">
                      <AlertCircle className="h-3 w-3" />
                      {errors.email}
                    </p>
                  )}
                </div>

                    {/* Modern Password Field */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-gray-700">Security PIN</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your 4-digit PIN"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={`h-14 pr-14 bg-white/50 border-blue-200 text-gray-900 placeholder:text-gray-500 backdrop-blur-xl rounded-2xl focus:border-blue-500 focus:ring-blue-500/30 shadow-sm ${errors.password ? 'border-red-300' : ''}`}
                      maxLength={4}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 hover:bg-blue-50 rounded-xl"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </Button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-600 flex items-center gap-2">
                      <AlertCircle className="h-3 w-3" />
                      {errors.password}
                    </p>
                  )}
                </div>

              
                
                 {/* Modern Submit Button - Blue Theme */}
                <Button 
                  type="submit" 
                  className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-2xl transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 relative overflow-hidden group" 
                  disabled={isLoading}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    {isLoading ? (
                      <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Accessing Portal...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <span>Access EDUNEXUS</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

                    
      {/* Animation Styles */}
      <style jsx>{`
        @keyframes float-gentle {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes bounce-gentle {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes pulse-gentle {
          0%, 100% {
            opacity: 0.15;
          }
          50% {
            opacity: 0.25;
          }
        }

        .animate-float-gentle {
          animation: float-gentle 6s ease-in-out infinite;
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 4s ease-in-out infinite;
        }

        .animate-pulse-gentle {
          animation: pulse-gentle 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};



