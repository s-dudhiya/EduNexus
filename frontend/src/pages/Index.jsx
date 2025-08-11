
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
ChevronRight,
BookOpen,
Users,
Calendar,
Award,
ArrowRight,
Menu,
X,
GraduationCap,
Bell,
MessageSquare,
BarChart3
} from 'lucide-react';

function Index() {
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [scrollY, setScrollY] = useState(0);
const navigate = useNavigate();

useEffect(() => {
const handleScroll = () => setScrollY(window.scrollY);
window.addEventListener('scroll', handleScroll);
return () => window.removeEventListener('scroll', handleScroll);
}, []);

const navigateToLogin = () => {
navigate('/auth');
};

return (
<div className="min-h-screen bg-white">
{/* Navigation Header */}
<nav className={`fixed w-full z-50 transition-all duration-300 ${
scrollY > 50 ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'
}`}>
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="flex justify-between items-center py-4">
{/* Logo */}
<div className="flex items-center space-x-3">

<div>
<h1 className="text-xl font-bold text-gray-900">EduNexus</h1>
<p className="text-sm text-blue-600 font-medium">Greenfield Tech University</p>
</div>
</div>

{/* Desktop Navigation */}
<div className="hidden md:flex items-center space-x-8">
<a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Home</a>
<a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Features</a>
<a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">About</a>
<a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Contact</a>
<button
onClick={navigateToLogin}
className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
>
Login
</button>
</div>

{/* Mobile Menu Button */}
<button
onClick={() => setIsMenuOpen(!isMenuOpen)}
className="md:hidden p-2 rounded-lg hover:bg-gray-100"
>
{isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
</button>
</div>
</div>

{/* Mobile Navigation Menu */}
{isMenuOpen && (
<div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200">
<div className="px-4 py-4 space-y-4">
<a href="#home" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">Home</a>
<a href="#features" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">Features</a>
<a href="#about" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">About</a>
<a href="#contact" className="block text-gray-700 hover:text-blue-600 transition-colors font-medium">Contact</a>
<button
onClick={navigateToLogin}
className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
>
Login
</button>
</div>
</div>
)}
</nav>

{/* Hero Section */}
<section id="home" className="relative min-h-screen flex items-center overflow-hidden">
{/* Animated Background */}
<div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100">
<div className="absolute inset-0 opacity-30">
<div className="absolute top-20 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
<div className="absolute top-40 right-20 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
<div className="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
</div>
</div>

<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
<div className="text-center">
<div className="mb-8 animate-fade-in-up">
<span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 font-semibold text-sm mb-8">
<Award className="w-4 h-4 mr-2" />
Powered by EduNexus — your connected digital campus
</span>
</div>

<h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
<span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
EduNexus
</span>
</h1>

<p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
Welcome to <span className="font-semibold text-blue-700">Greenfield Tech University (GreenTech)</span>, where innovation meets education.
Our mission is to cultivate the next generation of technology leaders through cutting-edge curriculum, state-of-the-art facilities,
and seamless digital integration powered by our EduNexus platform.
</p>

<div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
<button
onClick={navigateToLogin}
className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 flex items-center"
>
Get Started
<ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
</button>
</div>

{/* Stats */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
<div className="text-center">
<div className="text-3xl font-bold text-blue-700 mb-2">25,000+</div>
<div className="text-gray-600 font-medium">Students</div>
</div>
<div className="text-center">
<div className="text-3xl font-bold text-blue-700 mb-2">1985</div>
<div className="text-gray-600 font-medium">Established</div>
</div>
<div className="text-center">
<div className="text-3xl font-bold text-blue-700 mb-2">50+</div>
<div className="text-gray-600 font-medium">Research Labs</div>
</div>
<div className="text-center">
<div className="text-3xl font-bold text-blue-700 mb-2">Top 10</div>
<div className="text-gray-600 font-medium">Nationally</div>
</div>
</div>
</div>
</div>
</section>

{/* Campus Gallery Section */}
<section className="py-20 bg-gray-50">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="text-center mb-16">
<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
Discover the spaces where innovation and learning come together
</h2>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
{[
{
title: 'Beautiful Campus',
description: 'Our historic campus blends traditional architecture with modern facilities',
image: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=800'
},
{
title: 'Modern Library',
description: 'A world-class library with extensive digital resources and study spaces',
image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800'
},
{
title: 'Research Labs',
description: 'State-of-the-art laboratories for cutting-edge research and innovation',
image: 'https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=800'
},
{
title: 'Graduation Day',
description: 'Celebrating our graduates\' achievements and their bright futures ahead',
image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800'
}
].map((item, index) => (
<div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
<div className="aspect-w-16 aspect-h-12 bg-gray-200">
<img
src={item.image}
alt={item.title}
className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
/>
</div>
<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
<div className="absolute bottom-0 left-0 right-0 p-6 text-white">
<h3 className="text-xl font-bold mb-2">{item.title}</h3>
<p className="text-sm text-gray-200">{item.description}</p>
</div>
</div>
))}
</div>
</div>
</section>

{/* Excellence Stats Section */}
<section className="py-20 bg-white">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
<div className="text-center lg:text-left">
<div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-6">
<Award className="w-10 h-10 text-white" />
</div>
<h3 className="text-2xl font-bold text-gray-900 mb-4">Academic Excellence</h3>
<p className="text-gray-600 mb-6">Ranked among the top universities with world-class faculty and cutting-edge research facilities</p>
<div className="text-4xl font-bold text-blue-700 mb-2">95%</div>
<div className="text-gray-600 font-medium mb-2">Graduate Employment Rate</div>
<div className="text-sm text-blue-600 font-semibold">Powered by EduNexus</div>
</div>

<div className="text-center lg:text-left">
<div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-6">
<BookOpen className="w-10 h-10 text-white" />
</div>
<h3 className="text-2xl font-bold text-gray-900 mb-4">Modern Infrastructure</h3>
<p className="text-gray-600 mb-6">State-of-the-art campus with advanced laboratories, libraries, and student facilities</p>
<div className="text-4xl font-bold text-blue-700 mb-2">50+</div>
<div className="text-gray-600 font-medium mb-2">Research Labs</div>
<div className="text-sm text-blue-600 font-semibold">Powered by EduNexus</div>
</div>

<div className="text-center lg:text-left">
<div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 mb-6">
<Users className="w-10 h-10 text-white" />
</div>
<h3 className="text-2xl font-bold text-gray-900 mb-4">Connected Campus</h3>
<p className="text-gray-600 mb-6">Seamlessly integrated digital platform connecting students, faculty, and resources through EduNexus</p>
<div className="text-4xl font-bold text-blue-700 mb-2">25,000+</div>
<div className="text-gray-600 font-medium mb-2">Students</div>
<div className="text-sm text-blue-600 font-semibold">Powered by EduNexus</div>
</div>
</div>
</div>
</section>

{/* EduNexus Platform Features */}
<section className="py-20 bg-gradient-to-br from-blue-50 to-white">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="text-center mb-16">
<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
EduNexus Platform Features
</h2>
<p className="text-xl text-gray-600 max-w-3xl mx-auto">
Powerful tools designed to enhance your educational experience
</p>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
{[
{
title: 'Exams Module',
description: 'Online examinations and result management',
icon: Award
},
{
title: 'Attendance System',
description: 'Real-time attendance tracking and analytics',
icon: Calendar
},
{
title: 'Faculty Chat',
description: 'Direct communication with professors and staff',
icon: MessageSquare
},
{
title: 'Course Management',
description: 'Complete academic course administration',
icon: BookOpen
}
].map((feature, index) => (
<div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
<div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
<feature.icon className="w-8 h-8 text-white" />
</div>
<h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
<p className="text-gray-600 mb-4">{feature.description}</p>
<div className="text-sm text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full inline-block">
EduNexus Module
</div>
</div>
))}
</div>
</div>
</section>

{/* Features Section */}
<section id="features" className="py-20 bg-white">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="text-center mb-16">
<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
Everything You Need in One Place
</h2>
<p className="text-xl text-gray-600 max-w-3xl mx-auto">
Discover powerful features designed to enhance your academic journey at Greenfield Tech University
</p>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
{[
{
icon: Users,
title: 'Exam & Proctoring',
description: 'Secure online examinations with advanced AI-powered proctoring for academic integrity.',
gradient: 'from-blue-500 to-blue-600'
},
{
icon: BookOpen,
title: 'Digital Notes Manager',
description: 'Organize, store, and access your study materials and lecture notes from anywhere.',
gradient: 'from-blue-600 to-blue-700'
},
{
icon: Calendar,
title: 'Attendance Tracker',
description: 'Real-time attendance monitoring with automated notifications and detailed reports.',
gradient: 'from-blue-400 to-blue-500'
},
{
icon: BarChart3,
title: 'Result Tracker',
description: 'Track your academic performance with comprehensive grade analytics and progress insights.',
gradient: 'from-blue-700 to-blue-800'
},
{
icon: Bell,
title: 'Smart Notifications',
description: 'Get instant alerts for exam schedules, assignment deadlines, and important announcements.',
gradient: 'from-blue-500 to-blue-700'
},
{
icon: MessageSquare,
title: 'Student-Faculty Portal',
description: 'Seamless communication platform connecting students and faculty for academic support.',
gradient: 'from-blue-600 to-blue-800'
}
].map((feature, index) => (
<div
key={index}
className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2"
>
<div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
<feature.icon className="w-8 h-8 text-white" />
</div>
<h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
<p className="text-gray-600 leading-relaxed">{feature.description}</p>
</div>
))}
</div>
</div>
</section>

{/* About Section */}
<section id="about" className="py-20 bg-gradient-to-br from-blue-50 to-white">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
<div>
<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
About <span className="text-blue-700">Greenfield Tech University</span>
</h2>
<p className="text-xl text-gray-600 mb-8 leading-relaxed">
At Greenfield Tech University, we're committed to providing cutting-edge education that prepares students
for the challenges of tomorrow. EduNexus is our digital gateway to enhanced learning experiences.
</p>
<div className="space-y-4">
{[
'State-of-the-art digital learning platform',
'Personalized learning paths for every student',
'Expert faculty with industry experience',
'24/7 technical support and assistance'
].map((item, index) => (
<div key={index} className="flex items-center">
<div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-4">
<ChevronRight className="w-4 h-4 text-blue-600" />
</div>
<span className="text-gray-700 font-medium">{item}</span>
</div>
))}
</div>
</div>
<div className="relative">
<div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl p-8 shadow-2xl">
<div className="bg-white rounded-2xl p-6 shadow-lg">
<div className="flex items-center justify-between mb-6">
<h3 className="text-2xl font-bold text-gray-900">Quick Stats</h3>
<BarChart3 className="w-8 h-8 text-blue-600" />
</div>
<div className="space-y-4">
<div>
<div className="flex justify-between mb-2">
<span className="font-medium text-gray-700">Student Satisfaction</span>
<span className="font-bold text-blue-700">98%</span>
</div>
<div className="w-full bg-gray-200 rounded-full h-3">
<div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full" style={{ width: '98%' }}></div>
</div>
</div>
<div>
<div className="flex justify-between mb-2">
<span className="font-medium text-gray-700">Course Completion</span>
<span className="font-bold text-blue-700">94%</span>
</div>
<div className="w-full bg-gray-200 rounded-full h-3">
<div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full" style={{ width: '94%' }}></div>
</div>
</div>
<div>
<div className="flex justify-between mb-2">
<span className="font-medium text-gray-700">Platform Uptime</span>
<span className="font-bold text-blue-700">99.9%</span>
</div>
<div className="w-full bg-gray-200 rounded-full h-3">
<div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full" style={{ width: '99.9%' }}></div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</section>

{/* Footer */}
<footer className="bg-gray-900 text-white py-16">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
<div className="col-span-1 md:col-span-2">
<div className="flex items-center space-x-3 mb-6">

<div>
<h3 className="text-2xl font-bold">EduNexus</h3>
<p className="text-blue-400 font-medium">Greenfield Tech University</p>
</div>
</div>
<p className="text-gray-300 leading-relaxed mb-6">
Empowering the next generation of innovators and leaders through cutting-edge digital education platform.
</p>
<div className="space-y-2 text-gray-300">
<p>(555) 123-4567</p>
<p>admissions@greentech.edu</p>
<p>123 University Ave, Education City</p>
</div>
</div>

<div>
<h4 className="text-lg font-semibold mb-6">Quick Links</h4>
<ul className="space-y-3">
<li><a href="#" className="text-gray-300 hover:text-white transition-colors">About Us</a></li>
<li><a href="#" className="text-gray-300 hover:text-white transition-colors">Admissions</a></li>
<li><a href="#" className="text-gray-300 hover:text-white transition-colors">Academic Programs</a></li>
<li><a href="#" className="text-gray-300 hover:text-white transition-colors">Campus Life</a></li>
</ul>
</div>

<div>
<h4 className="text-lg font-semibold mb-6">Support</h4>
<ul className="space-y-3">
<li><a href="#" className="text-gray-300 hover:text-white transition-colors">Help Center</a></li>
<li><a href="#" className="text-gray-300 hover:text-white transition-colors">Technical Support</a></li>
<li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Us</a></li>
<li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
</ul>
</div>
</div>

<div className="border-t border-gray-800 mt-12 pt-8 text-center">
<p className="text-gray-400">
© 2025 EduNexus - Greenfield Tech University. All rights reserved.
</p>
</div>
</div>
</footer>
</div>
);
}

export default Index;