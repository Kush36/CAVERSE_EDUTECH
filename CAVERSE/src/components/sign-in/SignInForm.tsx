import React, { useState } from 'react';

const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      setTimeout(() => {
        console.log('Sign in:', formData);
        alert(`Welcome back! You've successfully signed in.`);
        
        setFormData({
          email: '',
          password: '',
          rememberMe: false
        });
        setIsSubmitting(false);
      }, 1500);
    }
  };

  const handleForgotPassword = () => {
    alert('Password reset link will be sent to your email address.');
  };

  return (
    <>
      <section
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #e8e5f2 0%, #f5f3f9 50%, #ede9f5 100%)',
          padding: '80px 20px',
          fontFamily: '"Outfit", system-ui, sans-serif',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ maxWidth: '500px', width: '100%' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div
              style={{
                display: 'inline-block',
                padding: '8px 24px',
                background: 'white',
                borderRadius: '9999px',
                fontSize: '14px',
                fontWeight: 500,
                color: '#5b4d8f',
                marginBottom: '16px',
                boxShadow: '0 2px 8px rgba(91,77,143,0.1)',
              }}
            >
              Welcome Back
            </div>
            <h1
              style={{
                fontSize: '36px',
                fontWeight: 700,
                color: '#1a1a2e',
                margin: '0 0 12px',
              }}
            >
              Sign In to CaVerse
            </h1>
            <p
              style={{
                fontSize: '16px',
                color: '#555',
                margin: 0,
              }}
            >
              Continue your CA preparation journey
            </p>
          </div>

          {/* Form Card */}
          <div
            style={{
              background: 'white',
              borderRadius: '24px',
              padding: '40px',
              boxShadow: '0 10px 40px rgba(91,77,143,0.12)',
            }}
          >
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Email */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#1a1a2e',
                      marginBottom: '8px',
                    }}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      border: errors.email ? '2px solid #ff4757' : '2px solid #e8e5f2',
                      borderRadius: '12px',
                      fontSize: '15px',
                      color: '#1a1a2e',
                      backgroundColor: 'white',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                    }}
                    onFocus={(e) => {
                      if (!errors.email) {
                        e.target.style.borderColor = '#5b4d8f';
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.email) {
                        e.target.style.borderColor = '#e8e5f2';
                      }
                    }}
                  />
                  {errors.email && (
                    <span style={{ fontSize: '12px', color: '#ff4757', marginTop: '4px', display: 'block' }}>
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#1a1a2e',
                      marginBottom: '8px',
                    }}
                  >
                    Password *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      style={{
                        width: '100%',
                        padding: '14px 50px 14px 16px',
                        border: errors.password ? '2px solid #ff4757' : '2px solid #e8e5f2',
                        borderRadius: '12px',
                        fontSize: '15px',
                        color: '#1a1a2e',
                        backgroundColor: 'white',
                        outline: 'none',
                        transition: 'all 0.3s ease',
                      }}
                      onFocus={(e) => {
                        if (!errors.password) {
                          e.target.style.borderColor = '#5b4d8f';
                        }
                      }}
                      onBlur={(e) => {
                        if (!errors.password) {
                          e.target.style.borderColor = '#e8e5f2';
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#5b4d8f',
                        fontSize: '18px',
                      }}
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                  {errors.password && (
                    <span style={{ fontSize: '12px', color: '#ff4757', marginTop: '4px', display: 'block' }}>
                      {errors.password}
                    </span>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px',
                  }}
                >
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      color: '#555',
                    }}
                  >
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      style={{
                        width: '18px',
                        height: '18px',
                        cursor: 'pointer',
                        accentColor: '#5b4d8f',
                      }}
                    />
                    Remember Me
                  </label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#5b4d8f',
                      fontSize: '14px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textDecoration: 'none',
                      padding: 0,
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLButtonElement).style.textDecoration = 'underline';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLButtonElement).style.textDecoration = 'none';
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: isSubmitting ? '#ccc' : '#5b4d8f',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    marginTop: '8px',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      (e.target as HTMLButtonElement).style.background = '#483a72';
                      (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
                      (e.target as HTMLButtonElement).style.boxShadow = '0 6px 20px rgba(91,77,143,0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      (e.target as HTMLButtonElement).style.background = '#5b4d8f';
                      (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
                      (e.target as HTMLButtonElement).style.boxShadow = 'none';
                    }
                  }}
                >
                  {isSubmitting ? 'Signing In...' : 'Sign In'}
                </button>

                {/* Divider */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    margin: '8px 0',
                  }}
                >
                  <div style={{ flex: 1, height: '1px', background: '#e8e5f2' }}></div>
                  <span style={{ fontSize: '14px', color: '#999' }}>OR</span>
                  <div style={{ flex: 1, height: '1px', background: '#e8e5f2' }}></div>
                </div>

                {/* Social Login Buttons */}
                {/* <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <button
                    type="button"
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: 'white',
                      color: '#333',
                      border: '2px solid #e8e5f2',
                      borderRadius: '12px',
                      fontSize: '15px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLButtonElement).style.borderColor = '#5b4d8f';
                      (e.target as HTMLButtonElement).style.background = '#f8f6ff';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLButtonElement).style.borderColor = '#e8e5f2';
                      (e.target as HTMLButtonElement).style.background = 'white';
                    }}
                  >
                    <span style={{ fontSize: '20px' }}>🔵</span>
                    Continue with Google
                  </button>
                </div> */}

                {/* Register Link */}
                <div style={{ textAlign: 'center', marginTop: '8px' }}>
                  <p style={{ fontSize: '14px', color: '#555', margin: 0 }}>
                    Don't have an account?{' '}
                    <a
                      href="/register"
                      style={{
                        color: '#5b4d8f',
                        fontWeight: 600,
                        textDecoration: 'none',
                      }}
                    >
                      Create Account
                    </a>
                  </p>
                </div>
              </div>
            </form>
          </div>

          {/* Security Note */}
          <div
            style={{
              textAlign: 'center',
              marginTop: '32px',
              padding: '16px 20px',
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(91,77,143,0.08)',
            }}
          >
            <p style={{ fontSize: '13px', color: '#555', margin: 0, lineHeight: 1.6 }}>
              🔒 Your information is secure and encrypted
            </p>
          </div>
        </div>
      </section>

      {/* Google Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
    </>
  );
};

export default SignInForm;