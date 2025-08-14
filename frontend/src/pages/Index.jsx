import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  BookOpen,
  Users,
  Calendar,
  Award,
  Menu,
  X,
  Bell,
  MessageSquare,
  BarChart3,
  Play,
  Star,
  Shield,
  CheckCircle,
  ArrowRight,
  Clock,
  FileText,
  GraduationCap,
  Settings,
  Sparkles,
  Target,
  Zap,
  Globe,
  TrendingUp,
  Building,
  Heart,
  Lightbulb,
  Eye,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState('student');
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
    <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] via-[#c7d2fe] to-[#a5b4fc]">
      {/* Enhanced Navigation with Animations */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${
        scrollY > 50 ? 'bg-white/95 backdrop-blur-lg shadow-md border-b border-gray-100' : 'bg-white/90 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center py-4">
            {/* Animated Logo */}
            <div className="flex items-center space-x-3 animate-fade-in-left">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm transform hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">EduNexus</span>
                <p className="text-xs text-blue-600 font-medium -mt-0.5">Greenfield Tech University</p>
              </div>
            </div>

            {/* Animated Navigation */}
            <div className="hidden md:flex items-center space-x-8 animate-fade-in-right">
              {['Home', 'Features', 'About', 'Contact'].map((item, index) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative text-gray-600 hover:text-blue-600 font-medium transition-all duration-300 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
              <button
                onClick={navigateToLogin}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-sm hover:shadow-lg transform hover:-translate-y-1"
              >
                Login
              </button>
            </div>

            {/* Mobile Menu with Animation */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors animate-fade-in"
            >
              <div className="relative w-5 h-5">
                <Menu className={`w-5 h-5 absolute transition-all duration-300 ${isMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`} />
                <X className={`w-5 h-5 absolute transition-all duration-300 ${isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Animated Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white/95 backdrop-blur-lg border-t border-gray-100 shadow-lg">
            <div className="px-6 py-6 space-y-4">
              {['Home', 'Features', 'About', 'Contact'].map((item, index) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-gray-600 hover:text-blue-600 font-medium transform translate-x-0 hover:translate-x-2 transition-all duration-300"
                  style={{ 
                    animation: isMenuOpen ? `slideInLeft 0.3s ease-out ${index * 0.1}s both` : 'none' 
                  }}
                >
                  {item}
                </a>
              ))}
              <button
                onClick={navigateToLogin}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                style={{ 
                  animation: isMenuOpen ? 'slideInLeft 0.3s ease-out 0.4s both' : 'none' 
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Animated Hero Section with Subtle Background Elements */}
      <section id="home" className="relative pt-28 pb-16 overflow-hidden">
        {/* Subtle Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating Geometric Shapes */}
          <div className="absolute top-20 right-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-float-gentle"></div>
          <div className="absolute top-40 left-20 w-24 h-24 bg-blue-200 rounded-lg opacity-15 animate-float-gentle" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-32 right-1/4 w-20 h-20 bg-blue-50 rounded-full opacity-25 animate-float-gentle" style={{ animationDelay: '4s' }}></div>
          
          {/* Animated Decorative Icons */}
          <div className="absolute top-32 left-10 opacity-10 animate-bounce-gentle">
            <BookOpen className="w-16 h-16 text-blue-400" />
          </div>
          
          <div className="absolute bottom-40 right-16 opacity-15 animate-spin-slow">
            <Target className="w-12 h-12 text-blue-300" />
          </div>

          <div className="absolute top-1/2 right-10 opacity-20 animate-pulse-gentle">
            <Sparkles className="w-10 h-10 text-blue-500" />
          </div>

          <div className="absolute bottom-20 left-1/4 opacity-12 animate-bounce-gentle" style={{ animationDelay: '3s' }}>
            <Zap className="w-14 h-14 text-blue-400" />
          </div>

          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-12 h-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="border-r border-blue-200 h-full"></div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-medium text-sm border border-blue-100 animate-fade-in-up">
              <Award className="w-4 h-4 mr-2 animate-pulse" />
              Advanced Campus Management System
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-900 leading-tight animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                EDUNEXUS
              </h1>
              <h2 className="text-2xl md:text-3xl text-blue-600 font-semibold animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                Smart University Platform
              </h2>
            </div>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              Experience seamless academic management at{' '}
              <span className="font-semibold text-blue-600 animate-glow">Greenfield Tech University</span>
              . Our integrated platform serves both students and faculty with intuitive dashboards and powerful tools.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
              <button
                onClick={navigateToLogin}
                className="group bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center justify-center animate-button-pulse"
              >
                Access Platform
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button className="group border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-blue-300 hover:text-blue-600 transition-all duration-300 flex items-center justify-center">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                View Demo
              </button>
            </div>

            {/* Enhanced Animated Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 mt-12 border-t border-gray-100 animate-fade-in-up" style={{ animationDelay: '1s' }}>
              {[
                { number: '25,000+', label: 'Students' },
                { number: '50+', label: 'Programs' },
                { number: '98%', label: 'Success Rate' }
              ].map((stat, index) => (
                <div key={index} className="text-center group animate-bounce-in animate-count-up" style={{ animationDelay: `${1.2 + index * 0.2}s` }}>
                  <div className="text-3xl font-bold text-blue-600 mb-1 group-hover:scale-110 transition-transform duration-300">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Animated Feature Icons Row */}
            <div className="flex justify-center items-center space-x-6 pt-8 opacity-40 animate-fade-in-up" style={{ animationDelay: '1.6s' }}>
              {[Shield, Users, BarChart3, MessageSquare, Calendar].map((Icon, index) => (
                <div key={index} className="animate-icon-float" style={{ animationDelay: `${index * 0.2}s` }}>
                  <Icon className="w-8 h-8 text-blue-400 hover:text-blue-600 hover:scale-125 transition-all duration-300 cursor-pointer" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Animated Dual Dashboard Preview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tailored Dashboards for Everyone
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Different interfaces designed specifically for students and faculty members
            </p>
          </div>

          {/* Animated Dashboard Tabs */}
          <div className="flex justify-center mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white rounded-lg p-1 shadow-md border border-gray-200">
              <button
                onClick={() => setActiveTab('student')}
                className={`px-6 py-3 rounded-md font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeTab === 'student'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <GraduationCap className="w-5 h-5 inline mr-2" />
                Student Dashboard
              </button>
              <button
                onClick={() => setActiveTab('faculty')}
                className={`px-6 py-3 rounded-md font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeTab === 'faculty'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Users className="w-5 h-5 inline mr-2" />
                Faculty Dashboard
              </button>
            </div>
          </div>

          {/* Student Dashboard with Animations */}
          {activeTab === 'student' && (
            <div className="max-w-5xl mx-auto animate-slide-in-right">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transform hover:scale-105 transition-transform duration-500">
                {/* Animated Dashboard Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-white animate-fade-in-left">
                      <GraduationCap className="w-6 h-6 mr-3 animate-bounce" />
                      <h3 className="text-xl font-semibold">Student Portal</h3>
                    </div>
                    <div className="flex items-center space-x-3 animate-fade-in-right">
                      <Bell className="w-5 h-5 text-white hover:animate-ring cursor-pointer" />
                      <Settings className="w-5 h-5 text-white hover:rotate-180 transition-transform duration-300 cursor-pointer" />
                    </div>
                  </div>
                </div>

                {/* Animated Dashboard Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content with Stagger Animation */}
                    <div className="lg:col-span-2 space-y-6">
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 animate-fade-in-up hover:shadow-md transition-shadow duration-300" style={{ animationDelay: '0.1s' }}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4 animate-pulse">
                              <Calendar className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 text-lg">Next Class</h4>
                              <p className="text-gray-600">Advanced Computing - Room 204</p>
                              <p className="text-blue-600 font-semibold">Today, 2:30 PM</p>
                            </div>
                          </div>
                          <CheckCircle className="w-6 h-6 text-green-500 animate-bounce" />
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-xl p-6 animate-fade-in-up hover:shadow-md transition-shadow duration-300" style={{ animationDelay: '0.2s' }}>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold text-gray-900">Recent Activity</h4>
                          <span className="text-blue-600 text-sm font-medium hover:scale-110 transition-transform duration-300 cursor-pointer">View All</span>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg transform hover:scale-105 transition-transform duration-300">
                            <span className="text-gray-900">Assignment: Data Structures</span>
                            <span className="text-green-600 font-semibold">Submitted ✓</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg transform hover:scale-105 transition-transform duration-300">
                            <span className="text-gray-900">Quiz: Algorithms</span>
                            <span className="text-yellow-600 font-semibold">Due Tomorrow</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Animated Sidebar */}
                    <div className="space-y-6">
                      <div className="bg-white border border-gray-200 rounded-xl p-6 text-center animate-fade-in-up hover:shadow-md transition-all duration-300 group" style={{ animationDelay: '0.3s' }}>
                        <Award className="w-8 h-8 text-blue-600 mx-auto mb-3 group-hover:rotate-12 transition-transform duration-300" />
                        <h4 className="font-bold text-gray-900 mb-2">Current GPA</h4>
                        <div className="text-3xl font-bold text-blue-600 group-hover:scale-110 transition-transform duration-300">3.85</div>
                      </div>
                      
                      <div className="bg-white border border-gray-200 rounded-xl p-6 text-center animate-fade-in-up hover:shadow-md transition-all duration-300 group" style={{ animationDelay: '0.4s' }}>
                        <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-3 group-hover:rotate-12 transition-transform duration-300" />
                        <h4 className="font-bold text-gray-900 mb-2">Credits</h4>
                        <div className="text-3xl font-bold text-blue-600 group-hover:scale-110 transition-transform duration-300">142</div>
                      </div>

                      <div className="bg-green-50 border border-green-200 rounded-xl p-4 animate-fade-in-up animate-pulse" style={{ animationDelay: '0.5s' }}>
                        <p className="text-center text-green-700 font-semibold text-sm">
                          ✅ All assignments up to date
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Faculty Dashboard with Animations */}
          {activeTab === 'faculty' && (
            <div className="max-w-5xl mx-auto animate-slide-in-left">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transform hover:scale-105 transition-transform duration-500">
                {/* Animated Dashboard Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-white animate-fade-in-left">
                      <Users className="w-6 h-6 mr-3 animate-bounce" />
                      <h3 className="text-xl font-semibold">Faculty Portal</h3>
                    </div>
                    <div className="flex items-center space-x-3 animate-fade-in-right">
                      <MessageSquare className="w-5 h-5 text-white hover:scale-110 transition-transform duration-300 cursor-pointer" />
                      <Bell className="w-5 h-5 text-white hover:animate-ring cursor-pointer" />
                      <Settings className="w-5 h-5 text-white hover:rotate-180 transition-transform duration-300 cursor-pointer" />
                    </div>
                  </div>
                </div>

                {/* Animated Dashboard Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content with Stagger Animation */}
                    <div className="lg:col-span-2 space-y-6">
                      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 animate-fade-in-up hover:shadow-md transition-shadow duration-300" style={{ animationDelay: '0.1s' }}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mr-4 animate-pulse">
                              <Clock className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 text-lg">Next Class</h4>
                              <p className="text-gray-600">Advanced Computing - CS301</p>
                              <p className="text-indigo-600 font-semibold">Today, 2:30 PM - Room 204</p>
                            </div>
                          </div>
                          <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold animate-bounce">
                            45 Students
                          </span>
                        </div>
                      </div>

                      <div className="bg-white border border-gray-200 rounded-xl p-6 animate-fade-in-up hover:shadow-md transition-shadow duration-300" style={{ animationDelay: '0.2s' }}>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold text-gray-900">Course Management</h4>
                          <span className="text-indigo-600 text-sm font-medium hover:scale-110 transition-transform duration-300 cursor-pointer">Manage All</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-blue-50 rounded-lg transform hover:scale-105 transition-transform duration-300">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-900">CS301 - Advanced Computing</span>
                              <span className="text-blue-600 text-sm">45 students</span>
                            </div>
                            <p className="text-sm text-gray-600">3 pending assignments to grade</p>
                          </div>
                          <div className="p-4 bg-green-50 rounded-lg transform hover:scale-105 transition-transform duration-300">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-900">CS201 - Data Structures</span>
                              <span className="text-green-600 text-sm">38 students</span>
                            </div>
                            <p className="text-sm text-gray-600">All assignments graded ✓</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Animated Sidebar */}
                    <div className="space-y-6">
                      <div className="bg-white border border-gray-200 rounded-xl p-6 text-center animate-fade-in-up hover:shadow-md transition-all duration-300 group" style={{ animationDelay: '0.3s' }}>
                        <Users className="w-8 h-8 text-indigo-600 mx-auto mb-3 group-hover:rotate-12 transition-transform duration-300" />
                        <h4 className="font-bold text-gray-900 mb-2">Total Students</h4>
                        <div className="text-3xl font-bold text-indigo-600 group-hover:scale-110 transition-transform duration-300">183</div>
                      </div>
                      
                      <div className="bg-white border border-gray-200 rounded-xl p-6 text-center animate-fade-in-up hover:shadow-md transition-all duration-300 group" style={{ animationDelay: '0.4s' }}>
                        <FileText className="w-8 h-8 text-indigo-600 mx-auto mb-3 group-hover:rotate-12 transition-transform duration-300" />
                        <h4 className="font-bold text-gray-900 mb-2">Pending Reviews</h4>
                        <div className="text-3xl font-bold text-indigo-600 group-hover:scale-110 transition-transform duration-300">12</div>
                      </div>

                      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 animate-fade-in-up animate-pulse" style={{ animationDelay: '0.5s' }}>
                        <p className="text-center text-orange-700 font-semibold text-sm">
                          📋 3 assignments need grading
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section id="about" className="py-20  relative overflow-hidden">
        {/* Modern Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-100/20 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in-up">
           
            <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Redefining Academic
              <span className="block bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 bg-clip-text text-transparent">
                Excellence
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Where innovation meets education, creating tomorrow's leaders through cutting-edge technology and academic excellence.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-16">
            {/* Left Column - Key Metrics */}
            <div className="xl:col-span-1 space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {/* Vision Card */}
              <div className="group relative bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                  <p className="text-gray-600 leading-relaxed">Pioneering the future of higher education through innovative technology and transformative learning experiences.</p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { number: '65+', label: 'Countries', icon: Globe, color: 'from-emerald-500 to-teal-600' },
                  { number: '#1', label: 'Ranking', icon: Award, color: 'from-amber-500 to-orange-600' },
                  { number: '200+', label: 'Awards', icon: Star, color: 'from-purple-500 to-indigo-600' },
                  { number: '98%', label: 'Success', icon: TrendingUp, color: 'from-rose-500 to-pink-600' }
                ].map((stat, index) => (
                  <div key={index} className="group bg-white/70 backdrop-blur-sm rounded-xl p-6 text-center shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
                    <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Center Column - Main Feature */}
            <div className="xl:col-span-1 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-2xl overflow-hidden group hover:scale-105 transition-transform duration-500">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 right-4 w-32 h-32 border border-white/20 rounded-full"></div>
                  <div className="absolute bottom-4 left-4 w-24 h-24 border border-white/20 rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 w-40 h-40 border border-white/10 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>

                <div className="relative">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform duration-500">
                    <Building className="w-10 h-10 text-white" />
                  </div>

                  <h3 className="text-3xl font-bold mb-6 leading-tight">
                    Excellence Since
                    <span className="block text-4xl">1985</span>
                  </h3>

                  <p className="text-blue-100 mb-8 leading-relaxed">
                    Four decades of academic leadership, innovation, and student success across global campuses.
                  </p>

                  <div className="space-y-4">
                    {[
                      { label: 'Academic Programs', value: '200+' },
                      { label: 'Research Centers', value: '50+' },
                      { label: 'Global Partnerships', value: '300+' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-white/20 last:border-b-0">
                        <span className="text-blue-100 font-medium">{item.label}</span>
                        <span className="text-2xl font-bold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Quick Facts */}
            <div className="xl:col-span-1 space-y-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              {/* Mission Card */}
              <div className="group relative bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                  <p className="text-gray-600 leading-relaxed">Empowering minds through innovative education, research excellence, and global collaboration for a better tomorrow.</p>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                <h4 className="text-xl font-bold text-gray-900 mb-6">Connect With Us</h4>
                <div className="space-y-4">
                  {[
                    { icon: Phone, text: '(+91) 8989898989', color: 'text-green-600' },
                    { icon: Mail, text: 'info@greentech.edu', color: 'text-blue-600' },
                    { icon: MapPin, text: 'Greentech Campus', color: 'text-purple-600' }
                  ].map((contact, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-white/50 transition-colors group cursor-pointer">
                      <div className={`w-10 h-10 ${contact.color} bg-opacity-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <contact.icon className={`w-5 h-5 ${contact.color}`} />
                      </div>
                      <span className="text-gray-700 font-medium">{contact.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row - Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            {[
              {
                icon: Lightbulb,
                title: 'Innovation',
                description: 'Pioneering new frontiers in education technology and pedagogical excellence.',
                color: 'from-yellow-400 to-orange-500'
              },
              {
                icon: Users,
                title: 'Community',
                description: 'Building inclusive environments where diverse minds collaborate and thrive.',
                color: 'from-blue-500 to-cyan-600'
              },
              {
                icon: Target,
                title: 'Excellence',
                description: 'Pursuing the highest standards in academics, research, and student success.',
                color: 'from-purple-500 to-pink-600'
              }
            ].map((value, index) => (
              <div key={index} className="group relative bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Animated Stats Section */}
           <section className="py-16 bg-white overflow-hidden">
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      {[
        { number: '25,000+', label: 'Active Students', icon: Users },
        { number: '1,200+', label: 'Faculty Members', icon: Award },
        { number: '50+', label: 'Academic Programs', icon: BookOpen },
        { number: '98%', label: 'Success Rate', icon: Star }
      ].map((stat, index) => (
        <div key={index} className="text-blue-600 animate-fade-in-up group" style={{ animationDelay: `${index * 0.2}s` }}>
          <div className="w-16 h-16 bg-blue-100 border-2 border-blue-200 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300">
            <stat.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
          </div>
          <div className="text-3xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300 text-blue-600">{stat.number}</div>
          <div className="text-gray-600">{stat.label}</div>
        </div>
      ))}
    </div>
  </div>
</section>
    
      {/* Animated Features Section */}
      <section id='features' className="py-16  overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Platform Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need for modern academic management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Secure Examinations',
                description: 'Advanced AI proctoring with comprehensive security features'
              },
              {
                icon: BarChart3,
                title: 'Performance Analytics',
                description: 'Real-time insights and detailed progress tracking'
              },
              {
                icon: MessageSquare,
                title: 'Communication Hub',
                description: 'Integrated messaging for seamless collaboration'
              },
              {
                icon: BookOpen,
                title: 'Course Management',
                description: 'Complete curriculum and assignment management tools'
              },
              {
                icon: Calendar,
                title: 'Smart Scheduling',
                description: 'Intelligent timetable and resource management'
              },
              {
                icon: Users,
                title: 'User Management',
                description: 'Comprehensive student and faculty administration'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-500 group animate-slide-in-bottom transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:rotate-12 transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* Animated Footer */}
      <footer id='contact' className="py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 animate-fade-in-up">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6 animate-fade-in-left">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center hover:rotate-12 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">E</span>
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

      {/* Enhanced Custom Styles for Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-left {
          0% {
            opacity: 0;
            transform: translateX(-30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-right {
          0% {
            opacity: 0;
            transform: translateX(30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-left {
          0% {
            opacity: 0;
            transform: translateX(-100px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          0% {
            opacity: 0;
            transform: translateX(100px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-bottom {
          0% {
            opacity: 0;
            transform: translateY(50px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(50px);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes ring {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-15deg);
          }
          75% {
            transform: rotate(15deg);
          }
        }

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

        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse-gentle {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }

        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 5px rgba(59, 130, 246, 0.3);
          }
          50% {
            text-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
          }
        }

        @keyframes button-pulse {
          0%, 100% {
            box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.1);
          }
          50% {
            box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3);
          }
        }

        @keyframes text-shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes count-up {
          0% {
            transform: scale(0.8);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes icon-float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out forwards;
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out forwards;
        }

        .animate-slide-in-bottom {
          animation: slide-in-bottom 0.6s ease-out forwards;
        }

        .animate-bounce-in {
          animation: bounce-in 0.8s ease-out forwards;
        }

        .animate-ring:hover {
          animation: ring 0.5s ease-in-out;
        }

        .animate-fade-in {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animate-float-gentle {
          animation: float-gentle 6s ease-in-out infinite;
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 4s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }

        .animate-pulse-gentle {
          animation: pulse-gentle 3s ease-in-out infinite;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        .animate-button-pulse {
          animation: button-pulse 2s ease-in-out infinite;
        }

        .animate-text-shimmer {
          background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.4), transparent);
          background-size: 200% 100%;
          animation: text-shimmer 2s ease-in-out infinite;
        }

        .animate-count-up {
          animation: count-up 0.6s ease-out forwards;
        }

        .animate-icon-float {
          animation: icon-float 3s ease-in-out infinite;
        }

        /* Initial state for animated elements */
        .animate-fade-in-up,
        .animate-fade-in-left,
        .animate-fade-in-right,
        .animate-slide-in-left,
        .animate-slide-in-right,
        .animate-slide-in-bottom,
        .animate-bounce-in {
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

export default Index;
