import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../redux/features/auth/authApi';
import { toast } from 'react-hot-toast';

const RegisterPage = () => {
      const [email, setEmail] = useState('');
      const [fullName, setFullName] = useState('');
      const [password, setPassword] = useState('');
      const [errorMsg, setErrorMsg] = useState('');

      const [registerUser, { isLoading }] = useRegisterUserMutation();
      const navigate = useNavigate();

      const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            setErrorMsg('');

            try {
                  const data = {
                        email,
                        password,
                        name: fullName,
                  };
                  const res = await registerUser(data).unwrap();
                  if (res.success) {
                        navigate('/login');
                        toast.success(res.message || 'Registration successful!');
                  }
            } catch (err: any) {
                  console.error('Registration failed:', err);
                  setErrorMsg(err?.data?.message || 'Registration failed. Please try again.');
                  toast.error(err?.data?.message || 'Registration failed. Please try again.');
            }
      };

      return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                  <div className="w-full max-w-[350px]">
                        {/* Main Card */}
                        <div className="bg-white border border-gray-300 p-8 flex flex-col items-center mb-3">
                              <h1 className="text-3xl font-serif mb-4 mt-2 italic">Comments System</h1>
                              <p className="text-gray-400 font-semibold text-center mb-4 leading-5">
                                    Sign up to see comments from your friends.
                              </p>

                              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
                                    <input
                                          type="text"
                                          placeholder="Your full name"
                                          value={fullName}
                                          onChange={(e) => setFullName(e.target.value)}
                                          className="w-full bg-gray-50 border border-gray-200 rounded-sm px-2 py-2 text-xs focus:outline-none focus:border-gray-400 placeholder-gray-500"
                                          required
                                    />
                                    <input
                                          type="email"
                                          placeholder="Your email"
                                          value={email}
                                          onChange={(e) => setEmail(e.target.value)}
                                          className="w-full bg-gray-50 border border-gray-200 rounded-sm px-2 py-2 text-xs focus:outline-none focus:border-gray-400 placeholder-gray-500"
                                          required
                                    />

                                    <input
                                          type="password"
                                          placeholder="Password"
                                          value={password}
                                          onChange={(e) => setPassword(e.target.value)}
                                          className="w-full bg-gray-50 border border-gray-200 rounded-sm px-2 py-2 text-xs focus:outline-none focus:border-gray-400 placeholder-gray-500"
                                          required
                                    />

                                    <p className="text-[10px] text-gray-400 text-center my-2">
                                          People who use our service may have uploaded your contact information to
                                          Comments System.{' '}
                                          <a href="#" className="font-semibold text-gray-500">
                                                Learn More
                                          </a>
                                    </p>
                                    <p className="text-[10px] text-gray-400 text-center mb-2">
                                          By signing up, you agree to our{' '}
                                          <a href="#" className="font-semibold text-gray-500">
                                                Terms
                                          </a>
                                          ,{' '}
                                          <a href="#" className="font-semibold text-gray-500">
                                                Privacy Policy
                                          </a>{' '}
                                          and{' '}
                                          <a href="#" className="font-semibold text-gray-500">
                                                Cookies Policy
                                          </a>
                                          .
                                    </p>

                                    <button
                                          type="submit"
                                          disabled={isLoading}
                                          className={`w-full cursor-pointer bg-[#0095f6] text-white text-sm font-semibold py-1.5 rounded-[4px] mt-2 ${
                                                isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#1877f2]'
                                          }`}
                                    >
                                          {isLoading ? 'Signing up...' : 'Sign up'}
                                    </button>

                                    {errorMsg && (
                                          <div className="text-red-500 text-xs text-center mt-2">{errorMsg}</div>
                                    )}
                              </form>
                        </div>

                        {/* Login Link Box */}
                        <div className="bg-white border border-gray-300 py-5 text-center">
                              <span className="text-sm">Have an account? </span>
                              <Link to="/login" className="text-[#0095f6] text-sm font-semibold">
                                    Log in
                              </Link>
                        </div>
                  </div>
            </div>
      );
};

export default RegisterPage;
