import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { BookOpen, Loader2, Mail, Lock } from 'lucide-react';
import ErrorAlert from '../components/ErrorAlert';

const Login = () => {
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '' 
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } 
    else if (!/\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));

    if (errors[e.target.name]) {
      setErrors(prev => ({
        ...prev,
        [e.target.name]: ''
      }));
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setApiError('');

    try {
      await login(formData);
      navigate('/');

    } catch (err) {
      setApiError(err.message || 'Login failed');

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">

      <div className="w-full max-w-md">

        <div className="flex justify-center mb-8">
          <div className="bg-indigo-600 p-3 rounded-xl">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
        </div>


        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">

          <div className="px-6 py-5 border-b border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 text-center">
              Welcome Back
            </h2>

            <p className="text-sm text-slate-500 text-center mt-1">
              Sign in to manage your books
            </p>
          </div>


          <form onSubmit={handleSubmit} className="p-6 space-y-5">

            {apiError && (
              <ErrorAlert 
                message={apiError} 
                onDismiss={() => setApiError('')} 
              />
            )}


            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Email
              </label>

              <div className="relative">

                <Mail className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${
                    errors.email 
                    ? 'border-red-400 focus:ring-red-200' 
                    : 'border-slate-300 focus:ring-indigo-200 focus:border-indigo-500'
                  } outline-none focus:ring-2 transition-all text-slate-800 placeholder-slate-400`}
                />

              </div>

              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email}
                </p>
              )}

            </div>



            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                Password
              </label>


              <div className="relative">

                <Lock className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />


                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••"
                  className={`w-full pl-10 pr-20 py-2.5 rounded-lg border ${
                    errors.password 
                    ? 'border-red-400 focus:ring-red-200' 
                    : 'border-slate-300 focus:ring-indigo-200 focus:border-indigo-500'
                  } outline-none focus:ring-2 transition-all text-slate-800 placeholder-slate-400`}
                />


                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-sm text-indigo-600 font-semibold"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>


              </div>


              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password}
                </p>
              )}

            </div>



            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors disabled:opacity-60"
            >

              {
                loading 
                ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in...
                  </>
                )
                : 'Sign In'
              }

            </button>


          </form>



          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 text-center">

            <p className="text-sm text-slate-600">

              Don't have an account?{' '}

              <Link 
                to="/signup" 
                className="text-indigo-600 hover:text-indigo-700 font-semibold"
              >
                Sign up
              </Link>

            </p>

          </div>


        </div>

      </div>

    </div>
  );
};


export default Login;