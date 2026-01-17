import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../redux/features/auth/authApi';
import { useAppDispatch } from '../redux/hooks';
import { setUser } from '../redux/features/auth/authSlice';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-hot-toast';

const LoginPage = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [errorMsg, setErrorMsg] = useState('');

      const [loginUser, { isLoading }] = useLoginUserMutation();
      const dispatch = useAppDispatch();
      const navigate = useNavigate();

      const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            setErrorMsg('');

            try {
                  const res = await loginUser({ email, password }).unwrap();
                  if (res?.success) {
                        const decodedUser = jwtDecode(res.data.accessToken);
                        dispatch(setUser({ user: decodedUser, token: res.data.accessToken }));
                        navigate('/');
                        toast.success(res.message || 'Login successful');
                  }
            } catch (err: any) {
                  console.error('Login failed:', err);
                  setErrorMsg(err?.data?.message || 'Login failed. Please check your credentials.');
            }
      };

      return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                  <div className="w-full max-w-[350px]">
                        {/* Main Card */}
                        <div className="bg-white border border-gray-300 p-8 flex flex-col items-center mb-3">
                              <h1 className="text-3xl font-serif mb-8 mt-2 italic">Comments System</h1>

                              <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
                                    <input
                                          type="email"
                                          placeholder="Email"
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

                                    <button
                                          type="submit"
                                          disabled={isLoading}
                                          className={`w-full cursor-pointer bg-[#0095f6] text-white text-sm font-semibold py-1.5 rounded-[4px] mt-2 ${
                                                isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#1877f2]'
                                          }`}
                                    >
                                          {isLoading ? 'Logging in...' : 'Log in'}
                                    </button>

                                    {errorMsg && (
                                          <div className="text-red-500 text-xs text-center mt-2">{errorMsg}</div>
                                    )}
                              </form>

                              <div className="flex w-full items-center gap-4 my-4">
                                    <div className="h-[1px] bg-gray-200 flex-1" />
                                    <span className="text-xs font-semibold text-gray-400 uppercase">OR</span>
                                    <div className="h-[1px] bg-gray-200 flex-1" />
                              </div>

                              <button className="text-xs text-[#00376b] hover:underline">Forgot password?</button>
                        </div>

                        {/* Sign Up Link Box */}
                        <div className="bg-white border border-gray-300 py-5 text-center">
                              <span className="text-sm">Don't have an account? </span>
                              <Link to="/register" className="text-[#0095f6] text-sm font-semibold">
                                    Sign up
                              </Link>
                        </div>
                  </div>
            </div>
      );
};

export default LoginPage;
