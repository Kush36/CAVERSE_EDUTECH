import { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.message) {
      setToastType('error');
      setToastMessage('Please fill in all required fields (Name, Email, Message)');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setToastType('error');
      setToastMessage('Please enter a valid email address');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'b4f5e5c7-cce3-48f1-8c7d-a632fb2ba1f9',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject || `New Message from ${formData.name}`,
          message: formData.message,
          from_name: 'CaVerse Contact Form',
          to_email: 'officialcaverse@gmail.com'
        })
      });

      const result = await response.json();

      if (result.success) {
        setToastType('success');
        setToastMessage('Message sent successfully! We\'ll get back to you soon.');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 5000);
        
        // Clear form
        setFormData({
          name: '',
          phone: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setToastType('error');
      setToastMessage('Failed to send message. Please try again or email us directly at officialcaverse@gmail.com');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>
        {`
          .premium-contact-form-section {
            position: relative;
            overflow: hidden;
          }

          .premium-form-container {
            background: linear-gradient(145deg, #ffffff, #f8f9fa);
            border-radius: 30px;
            padding: 60px 50px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(0, 0, 0, 0.05);
            position: relative;
            overflow: hidden;
          }

          .premium-form-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 6px;
            background: linear-gradient(90deg, #667eea, #764ba2, #f7931e);
          }

          .premium-form-title {
            text-align: center;
            margin-bottom: 50px;
            position: relative;
          }

          .premium-form-title h2 {
            font-size: 42px;
            font-weight: 700;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 15px;
          }

          .premium-form-title p {
            color: #718096;
            font-size: 16px;
            max-width: 600px;
            margin: 0 auto;
          }

          .premium-input-wrapper {
            position: relative;
            margin-bottom: 25px;
          }

          .premium-input,
          .premium-textarea {
            width: 100%;
            padding: 18px 24px;
            background: #ffffff;
            border: 2px solid rgba(0, 0, 0, 0.08);
            border-radius: 16px;
            font-size: 15px;
            font-weight: 500;
            color: #2d3748 !important;
            transition: all 0.3s ease;
            outline: none;
            -webkit-text-fill-color: #2d3748;
          }

          .premium-input::placeholder,
          .premium-textarea::placeholder {
            color: #a0aec0;
            font-weight: 500;
          }

          .premium-input:focus,
          .premium-textarea:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
            transform: translateY(-2px);
          }

          .premium-input:disabled,
          .premium-textarea:disabled {
            background: #f7fafc;
            cursor: not-allowed;
            opacity: 0.6;
          }

          .premium-textarea {
            min-height: 160px;
            resize: vertical;
          }

          .premium-submit-btn {
            width: 100%;
            padding: 20px 40px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #ffffff;
            border: none;
            border-radius: 16px;
            font-size: 16px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            cursor: pointer;
            transition: all 0.4s ease;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
            position: relative;
            overflow: hidden;
          }

          .premium-submit-btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            transition: left 0.5s ease;
          }

          .premium-submit-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
          }

          .premium-submit-btn:hover::before {
            left: 100%;
          }

          .premium-submit-btn:active {
            transform: translateY(-1px);
          }

          .premium-submit-btn:disabled {
            background: linear-gradient(135deg, #a0aec0 0%, #718096 100%);
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
          }

          .premium-submit-btn:disabled::before {
            display: none;
          }

          .premium-toast {
            position: fixed;
            bottom: 40px;
            right: 40px;
            z-index: 9999;
            padding: 20px 30px;
            border-radius: 16px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            color: #ffffff;
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 15px;
            animation: slideIn 0.4s ease, slideOut 0.4s ease 3.6s;
            min-width: 320px;
          }

          @keyframes slideIn {
            from {
              transform: translateX(400px);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }

          @keyframes slideOut {
            from {
              transform: translateX(0);
              opacity: 1;
            }
            to {
              transform: translateX(400px);
              opacity: 0;
            }
          }

          .premium-toast.success {
            background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
          }

          .premium-toast.error {
            background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
          }

          .premium-toast-icon {
            font-size: 24px;
            flex-shrink: 0;
          }

          .premium-required {
            color: #f56565;
            margin-left: 4px;
          }

          .premium-helper-text {
            color: #718096;
            font-size: 13px;
            margin-top: 30px;
            text-align: center;
          }

          .premium-loading-spinner {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: #ffffff;
            animation: spin 0.8s linear infinite;
            margin-right: 10px;
          }

          @keyframes spin {
            to { transform: rotate(360deg); }
          }

          @media (max-width: 768px) {
            .premium-form-container {
              padding: 40px 25px;
              border-radius: 20px;
            }

            .premium-form-title h2 {
              font-size: 32px;
            }

            .premium-toast {
              bottom: 20px;
              right: 20px;
              left: 20px;
              min-width: auto;
            }

            @keyframes slideIn {
              from {
                transform: translateY(400px);
                opacity: 0;
              }
              to {
                transform: translateY(0);
                opacity: 1;
              }
            }

            @keyframes slideOut {
              from {
                transform: translateY(0);
                opacity: 1;
              }
              to {
                transform: translateY(400px);
                opacity: 0;
              }
            }
          }
        `}
      </style>

      <section className="contact-section-2 premium-contact-form-section section-padding pt-0">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="premium-form-container wow fadeInUp" data-wow-delay=".2s">
                <div className="premium-form-title">
                  <h2>Send Us Message</h2>
                  <p>Have any questions or feedback? We'd love to hear from you!</p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="row g-4">
                    <div className="col-lg-6 wow fadeInUp" data-wow-delay=".3s">
                      <div className="premium-input-wrapper">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Full Name *"
                          className="premium-input"
                          disabled={isSubmitting}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 wow fadeInUp" data-wow-delay=".4s">
                      <div className="premium-input-wrapper">
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Phone Number"
                          className="premium-input"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 wow fadeInUp" data-wow-delay=".3s">
                      <div className="premium-input-wrapper">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Email Address *"
                          className="premium-input"
                          disabled={isSubmitting}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 wow fadeInUp" data-wow-delay=".4s">
                      <div className="premium-input-wrapper">
                        <input
                          type="text"
                          name="subject"
                          id="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Subject"
                          className="premium-input"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12 wow fadeInUp" data-wow-delay=".3s">
                      <div className="premium-input-wrapper">
                        <textarea
                          name="message"
                          id="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Write your message here... *"
                          className="premium-textarea"
                          disabled={isSubmitting}
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-lg-12 wow fadeInUp" data-wow-delay=".4s">
                      <button
                        type="submit"
                        className="premium-submit-btn"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="premium-loading-spinner"></span>
                            Sending...
                          </>
                        ) : (
                          'Send Us Message'
                        )}
                      </button>
                    </div>
                  </div>
                  <p className="premium-helper-text">
                    Fields marked with <span className="premium-required">*</span> are required
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Toast Notification */}
        {showToast && (
          <div className={`premium-toast ${toastType}`}>
            <div className="premium-toast-icon">
              {toastType === 'success' ? '✓' : '✕'}
            </div>
            <span>{toastMessage}</span>
          </div>
        )}
      </section>
    </>
  );
};

export default ContactForm;