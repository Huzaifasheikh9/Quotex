import React, { useState } from 'react';
import { auth } from '../firebase'; // Import Firebase auth methods
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);
  const router = useRouter();

  // Handle the form submission (sign up or sign in)
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent the form from reloading the page
    console.log("Form submitted");  // Debugging log

    try {
      if (isSignUp) {
        console.log("Creating user..."); // Debugging log
        await createUserWithEmailAndPassword(auth, email, password);
        await auth.currentUser.updateProfile({ displayName: fullName });
        router.push('/dashboard');
      } else {
        console.log("Signing in..."); // Debugging log
        await signInWithEmailAndPassword(auth, email, password);
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error:', error.message); // Debugging log
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>

        {/* Form for Sign Up or Sign In */}
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-600">Full Name</label>
              <input
                type="text"
                id="fullName"
                className="w-full mt-2 p-3 border border-gray-300 rounded-md"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              className="w-full mt-2 p-3 border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        {/* Toggle between Sign Up and Sign In forms */}
        <button
          onClick={() => {
            setIsSignUp(!isSignUp);  // Toggle between forms
            console.log(`Toggled: ${!isSignUp}`);  // Debugging log
          }}
          className="mt-4 text-sm text-blue-600 hover:text-blue-800 w-full"
        >
          {isSignUp ? 'Already have an account? Sign In' : 'Create an account'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
