/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../../services/api';

interface RegisterFormProps {
  onRegisterSuccess?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegisterSuccess }) => {
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    course: '',
    password: '',
    confirmPassword: ''
  });

  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    if (apiError) {
      setApiError('');
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          photo: 'Please select a valid image file'
        }));
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          photo: 'Image size must be less than 5MB'
        }));
        return;
      }

      setProfilePhoto(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      if (errors.photo) {
        setErrors(prev => ({
          ...prev,
          photo: ''
        }));
      }
    }
  };

  const removePhoto = () => {
    setProfilePhoto(null);
    setPhotoPreview(null);
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    if (!formData.course) {
      newErrors.course = 'Please select a course';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      setApiError('');
      
      try {
        // Map course value to correct type
        let courseLevel: 'Foundation' | 'Intermediate' | 'Final' = 'Foundation';
        if (formData.course === 'intermediate') courseLevel = 'Intermediate';
        if (formData.course === 'final') courseLevel = 'Final';
        if (formData.course === 'foundation') courseLevel = 'Foundation';

        const userData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          course: courseLevel,
          password: formData.password,
        };

        console.log('Submitting registration:', { ...userData, password: '[HIDDEN]' });

        const response = await authAPI.register(userData, profilePhoto);

        console.log('Registration response:', response);

        if (response.success) {
          login(response.data.user);
          alert(`Welcome to CaVerse, ${formData.firstName}! Your account has been created successfully.`);
          
          // Call success callback if provided
          if (onRegisterSuccess) {
            onRegisterSuccess();
          }

          // Redirect to dashboard or home page
          // window.location.href = '/dashboard';
        }
      } catch (error: any) {
        console.error('Registration error:', error);
        setApiError(error || 'Registration failed. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <section
        style={{
          minHeight: '100vh',
          background: '#f8fafc',
          padding: '80px 20px',
          fontFamily: '"Outfit", system-ui, sans-serif',
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div
              style={{
                display: 'inline-block',
                padding: '8px 24px',
                background: '#eff6ff',
                borderRadius: '9999px',
                fontSize: '14px',
                fontWeight: 500,
                color: '#1e40af',
                marginBottom: '16px',
                border: '1px solid #dbeafe',
              }}
            >
              Join CaVerse
            </div>
            <h1
              style={{
                fontSize: '36px',
                fontWeight: 700,
                color: '#0f172a',
                margin: '0 0 12px',
                letterSpacing: '-0.02em',
              }}
            >
              Create Your Account
            </h1>
            <p
              style={{
                fontSize: '16px',
                color: '#475569',
                margin: 0,
                fontWeight: 500,
              }}
            >
              Start your CA journey with expert guidance
            </p>
          </div>

          {/* Form Card */}
          <div
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 4px 20px rgba(15, 23, 42, 0.08)',
              border: '1px solid #e2e8f0',
            }}
          >
            {/* API Error Message */}
            {apiError && (
              <div
                style={{
                  padding: '12px 16px',
                  background: '#fee2e2',
                  border: '1px solid #fecaca',
                  borderRadius: '12px',
                  marginBottom: '20px',
                }}
              >
                <p style={{ color: '#dc2626', fontSize: '14px', margin: 0 }}>
                  {apiError}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Profile Photo Upload */}
                <div style={{ textAlign: 'center' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#0f172a',
                      marginBottom: '16px',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    Profile Photo (Optional)
                  </label>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                    <div
                      style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        border: '3px solid #e2e8f0',
                        overflow: 'hidden',
                        background: photoPreview ? `url(${photoPreview})` : '#f1f5f9',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    >
                      {!photoPreview && (
                        <svg
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#94a3b8"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                      {!photoPreview ? (
                        <label
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 20px',
                            background: isSubmitting ? '#cbd5e1' : '#2563eb',
                            color: 'white',
                            borderRadius: '10px',
                            fontSize: '14px',
                            fontWeight: 600,
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            boxShadow: '0 2px 8px rgba(37, 99, 235, 0.2)',
                            opacity: isSubmitting ? 0.6 : 1,
                          }}
                          onMouseEnter={(e) => {
                            if (!isSubmitting) {
                              e.currentTarget.style.background = '#1d4ed8';
                              e.currentTarget.style.transform = 'translateY(-2px)';
                              e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isSubmitting) {
                              e.currentTarget.style.background = '#2563eb';
                              e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = '0 2px 8px rgba(37, 99, 235, 0.2)';
                            }
                          }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                          </svg>
                          Upload Photo
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            disabled={isSubmitting}
                            style={{ display: 'none' }}
                          />
                        </label>
                      ) : (
                        <>
                          <label
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '8px',
                              padding: '10px 20px',
                              background: '#f1f5f9',
                              color: '#475569',
                              borderRadius: '10px',
                              fontSize: '14px',
                              fontWeight: 600,
                              cursor: isSubmitting ? 'not-allowed' : 'pointer',
                              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                              border: '1px solid #e2e8f0',
                              opacity: isSubmitting ? 0.6 : 1,
                            }}
                            onMouseEnter={(e) => {
                              if (!isSubmitting) {
                                e.currentTarget.style.background = '#e2e8f0';
                                e.currentTarget.style.borderColor = '#cbd5e1';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isSubmitting) {
                                e.currentTarget.style.background = '#f1f5f9';
                                e.currentTarget.style.borderColor = '#e2e8f0';
                              }
                            }}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                              <polyline points="17 8 12 3 7 8"></polyline>
                              <line x1="12" y1="3" x2="12" y2="15"></line>
                            </svg>
                            Change Photo
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handlePhotoChange}
                              disabled={isSubmitting}
                              style={{ display: 'none' }}
                            />
                          </label>
                          <button
                            type="button"
                            onClick={removePhoto}
                            disabled={isSubmitting}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '8px',
                              padding: '10px 20px',
                              background: '#fee2e2',
                              color: '#dc2626',
                              border: '1px solid #fecaca',
                              borderRadius: '10px',
                              fontSize: '14px',
                              fontWeight: 600,
                              cursor: isSubmitting ? 'not-allowed' : 'pointer',
                              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                              opacity: isSubmitting ? 0.6 : 1,
                            }}
                            onMouseEnter={(e) => {
                              if (!isSubmitting) {
                                e.currentTarget.style.background = '#fecaca';
                                e.currentTarget.style.borderColor = '#fca5a5';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isSubmitting) {
                                e.currentTarget.style.background = '#fee2e2';
                                e.currentTarget.style.borderColor = '#fecaca';
                              }
                            }}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                            Remove
                          </button>
                        </>
                      )}
                    </div>

                    {errors.photo && (
                      <span style={{ fontSize: '12px', color: '#dc2626', marginTop: '-8px', display: 'block' }}>
                        {errors.photo}
                      </span>
                    )}

                    <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>
                      JPG, PNG or GIF. Max size 5MB
                    </p>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #e2e8f0', margin: '8px 0' }} />

                {/* Name Fields */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#0f172a',
                        marginBottom: '8px',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter first name"
                      disabled={isSubmitting}
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        border: errors.firstName ? '2px solid #dc2626' : '2px solid #e2e8f0',
                        borderRadius: '12px',
                        fontSize: '15px',
                        color: '#0f172a',
                        backgroundColor: isSubmitting ? '#f9fafb' : 'white',
                        outline: 'none',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxSizing: 'border-box',
                        opacity: isSubmitting ? 0.6 : 1,
                      }}
                      onFocus={(e) => {
                        if (!errors.firstName && !isSubmitting) {
                          e.target.style.borderColor = '#2563eb';
                          e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                        }
                      }}
                      onBlur={(e) => {
                        if (!errors.firstName) {
                          e.target.style.borderColor = '#e2e8f0';
                          e.target.style.boxShadow = 'none';
                        }
                      }}
                    />
                    {errors.firstName && (
                      <span style={{ fontSize: '12px', color: '#dc2626', marginTop: '4px', display: 'block' }}>
                        {errors.firstName}
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#0f172a',
                        marginBottom: '8px',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter last name"
                      disabled={isSubmitting}
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        border: errors.lastName ? '2px solid #dc2626' : '2px solid #e2e8f0',
                        borderRadius: '12px',
                        fontSize: '15px',
                        color: '#0f172a',
                        backgroundColor: isSubmitting ? '#f9fafb' : 'white',
                        outline: 'none',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxSizing: 'border-box',
                        opacity: isSubmitting ? 0.6 : 1,
                      }}
                      onFocus={(e) => {
                        if (!errors.lastName && !isSubmitting) {
                          e.target.style.borderColor = '#2563eb';
                          e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                        }
                      }}
                      onBlur={(e) => {
                        if (!errors.lastName) {
                          e.target.style.borderColor = '#e2e8f0';
                          e.target.style.boxShadow = 'none';
                        }
                      }}
                    />
                    {errors.lastName && (
                      <span style={{ fontSize: '12px', color: '#dc2626', marginTop: '4px', display: 'block' }}>
                        {errors.lastName}
                      </span>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#0f172a',
                      marginBottom: '8px',
                      letterSpacing: '-0.01em',
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
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      border: errors.email ? '2px solid #dc2626' : '2px solid #e2e8f0',
                      borderRadius: '12px',
                      fontSize: '15px',
                      color: '#0f172a',
                      backgroundColor: isSubmitting ? '#f9fafb' : 'white',
                      outline: 'none',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxSizing: 'border-box',
                      opacity: isSubmitting ? 0.6 : 1,
                    }}
                    onFocus={(e) => {
                      if (!errors.email && !isSubmitting) {
                        e.target.style.borderColor = '#2563eb';
                        e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.email) {
                        e.target.style.borderColor = '#e2e8f0';
                        e.target.style.boxShadow = 'none';
                      }
                    }}
                  />
                  {errors.email && (
                    <span style={{ fontSize: '12px', color: '#dc2626', marginTop: '4px', display: 'block' }}>
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#0f172a',
                      marginBottom: '8px',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      border: errors.phone ? '2px solid #dc2626' : '2px solid #e2e8f0',
                      borderRadius: '12px',
                      fontSize: '15px',
                      color: '#0f172a',
                      backgroundColor: isSubmitting ? '#f9fafb' : 'white',
                      outline: 'none',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxSizing: 'border-box',
                      opacity: isSubmitting ? 0.6 : 1,
                    }}
                    onFocus={(e) => {
                      if (!errors.phone && !isSubmitting) {
                        e.target.style.borderColor = '#2563eb';
                        e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.phone) {
                        e.target.style.borderColor = '#e2e8f0';
                        e.target.style.boxShadow = 'none';
                      }
                    }}
                  />
                  {errors.phone && (
                    <span style={{ fontSize: '12px', color: '#dc2626', marginTop: '4px', display: 'block' }}>
                      {errors.phone}
                    </span>
                  )}
                </div>

                {/* Course Selection */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#0f172a',
                      marginBottom: '8px',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    Select Course *
                  </label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    style={{
                      width: '100%',
                      padding: '14px 16px',
                      border: errors.course ? '2px solid #dc2626' : '2px solid #e2e8f0',
                      borderRadius: '12px',
                      fontSize: '15px',
                      color: formData.course ? '#0f172a' : '#94a3b8',
                      backgroundColor: isSubmitting ? '#f9fafb' : 'white',
                      outline: 'none',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      boxSizing: 'border-box',
                      opacity: isSubmitting ? 0.6 : 1,
                    }}
                    onFocus={(e) => {
                      if (!errors.course && !isSubmitting) {
                        e.target.style.borderColor = '#2563eb';
                        e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                      }
                    }}
                    onBlur={(e) => {
                      if (!errors.course) {
                        e.target.style.borderColor = '#e2e8f0';
                        e.target.style.boxShadow = 'none';
                      }
                    }}
                  >
                    <option value="">Choose your course level</option>
                    <option value="foundation">CA Foundation</option>
                    <option value="intermediate">CA Intermediate</option>
                    <option value="final">CA Final</option>
                  </select>
                  {errors.course && (
                    <span style={{ fontSize: '12px', color: '#dc2626', marginTop: '4px', display: 'block' }}>
                      {errors.course}
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
                      color: '#0f172a',
                      marginBottom: '8px',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    Create Password *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Minimum 6 characters"
                      disabled={isSubmitting}
                      style={{
                        width: '100%',
                        padding: '14px 50px 14px 16px',
                        border: errors.password ? '2px solid #dc2626' : '2px solid #e2e8f0',
                        borderRadius: '12px',
                        fontSize: '15px',
                        color: '#0f172a',
                        backgroundColor: isSubmitting ? '#f9fafb' : 'white',
                        outline: 'none',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxSizing: 'border-box',
                        opacity: isSubmitting ? 0.6 : 1,
                      }}
                      onFocus={(e) => {
                        if (!errors.password && !isSubmitting) {
                          e.target.style.borderColor = '#2563eb';
                          e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                        }
                      }}
                      onBlur={(e) => {
                        if (!errors.password) {
                          e.target.style.borderColor = '#e2e8f0';
                          e.target.style.boxShadow = 'none';
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isSubmitting}
                      style={{
                        position: 'absolute',
                        right: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'transparent',
                        border: 'none',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        color: '#64748b',
                        fontSize: '20px',
                        transition: 'color 0.2s ease',
                        opacity: isSubmitting ? 0.4 : 1,
                      }}
                      onMouseEnter={(e) => {
                        if (!isSubmitting) {
                          e.currentTarget.style.color = '#2563eb';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSubmitting) {
                          e.currentTarget.style.color = '#64748b';
                        }
                      }}
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                  {errors.password && (
                    <span style={{ fontSize: '12px', color: '#dc2626', marginTop: '4px', display: 'block' }}>
                      {errors.password}
                    </span>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#0f172a',
                      marginBottom: '8px',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    Confirm Password *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter your password"
                      disabled={isSubmitting}
                      style={{
                        width: '100%',
                        padding: '14px 50px 14px 16px',
                        border: errors.confirmPassword ? '2px solid #dc2626' : '2px solid #e2e8f0',
                        borderRadius: '12px',
                        fontSize: '15px',
                        color: '#0f172a',
                        backgroundColor: isSubmitting ? '#f9fafb' : 'white',
                        outline: 'none',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxSizing: 'border-box',
                        opacity: isSubmitting ? 0.6 : 1,
                      }}
                      onFocus={(e) => {
                        if (!errors.confirmPassword && !isSubmitting) {
                          e.target.style.borderColor = '#2563eb';
                          e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                        }
                      }}
                      onBlur={(e) => {
                        if (!errors.confirmPassword) {
                          e.target.style.borderColor = '#e2e8f0';
                          e.target.style.boxShadow = 'none';
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={isSubmitting}
                      style={{
                        position: 'absolute',
                        right: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'transparent',
                        border: 'none',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        color: '#64748b',
                        fontSize: '20px',
                        transition: 'color 0.2s ease',
                        opacity: isSubmitting ? 0.4 : 1,
                      }}
                      onMouseEnter={(e) => {
                        if (!isSubmitting) {
                          e.currentTarget.style.color = '#2563eb';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSubmitting) {
                          e.currentTarget.style.color = '#64748b';
                        }
                      }}
                    >
                      {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <span style={{ fontSize: '12px', color: '#dc2626', marginTop: '4px', display: 'block' }}>
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: isSubmitting ? '#cbd5e1' : '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    marginTop: '8px',
                    letterSpacing: '-0.01em',
                    boxShadow: isSubmitting ? 'none' : '0 4px 15px rgba(37, 99, 235, 0.25)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.background = '#1d4ed8';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 30px rgba(37, 99, 235, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.background = '#2563eb';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(37, 99, 235, 0.25)';
                    }
                  }}
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </button>

                {/* Login Link */}
                <div style={{ textAlign: 'center', marginTop: '8px' }}>
                  <p style={{ fontSize: '14px', color: '#64748b', margin: 0, fontWeight: 500 }}>
                    Already have an account?{' '}
                    <a
                      href="#signin"
                      style={{
                        color: '#2563eb',
                        fontWeight: 600,
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#1d4ed8';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#2563eb';
                      }}
                    >
                      Sign In
                    </a>
                  </p>
                </div>
              </div>
            </form>
          </div>

          {/* Footer Note */}
          <div
            style={{
              textAlign: 'center',
              marginTop: '32px',
              padding: '20px',
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(15, 23, 42, 0.06)',
              border: '1px solid #e2e8f0',
            }}
          >
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.6, fontWeight: 500 }}>
              By creating an account, you agree to CaVerse's Terms of Service and Privacy Policy.
              <br />
              Get access to expert mentorship, comprehensive test series, and personalized study plans.
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

export default RegisterForm;