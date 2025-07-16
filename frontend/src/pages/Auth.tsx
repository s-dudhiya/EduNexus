import React from 'react';
import { AuthForm } from '@/components/auth/AuthForm';
import Footer from '@/components/Footer';

const Auth = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <AuthForm />
      <Footer />
    </div>
  );
};

export default Auth;