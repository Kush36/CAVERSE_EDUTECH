import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// Razorpay types
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

interface CartItem {
  id: string;
  type: 'plan' | 'subject';
  name: string;
  subtitle?: string;
  price: number;
  originalPrice: number;
  quantity: number;
  category: string;
}

interface LocationState {
  cart?: CartItem[];
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

const CheckoutArea = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  const cartItems = state?.cart || [];

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'India',
    state: '',
    city: '',
    address: '',
    pincode: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    cardName: '',
    saveCard: false,
    agreeToTerms: false
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{code: string, discount: number} | null>(null);
  const [isPromoApplying, setIsPromoApplying] = useState(false);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Available promo codes
  const promoCodes = {
    'WELCOME10': { discount: 10, description: '10% off on your first purchase' },
    'SAVE20': { discount: 20, description: '20% off on orders above ₹10,000' },
    'STUDENT25': { discount: 25, description: '25% off for students' },
    'NEWYEAR30': { discount: 30, description: '30% New Year special offer' }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartOriginalTotal = () => {
    return cartItems.reduce((total, item) => total + (item.originalPrice * item.quantity), 0);
  };

  const getTotalSavings = () => {
    return getCartOriginalTotal() - getCartTotal();
  };

  const getPromoDiscount = () => {
    if (!appliedPromo) return 0;
    return Math.round((getCartTotal() * appliedPromo.discount) / 100);
  };

  const getFinalTotal = () => {
    const subtotal = getCartTotal() - getPromoDiscount();
    const tax = Math.round(subtotal * 0.18);
    return subtotal + tax;
  };

  const getTaxAmount = () => {
    const subtotal = getCartTotal() - getPromoDiscount();
    return Math.round(subtotal * 0.18);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Invalid pincode';
    }
    if (!formData.agreeToTerms) newErrors.terms = 'You must agree to terms and conditions';

    if (selectedPaymentMethod === 'card') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
      if (!formData.cvc.trim()) newErrors.cvc = 'CVC is required';
      if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  const handleApplyPromo = () => {
    setIsPromoApplying(true);
    
    setTimeout(() => {
      const promo = promoCodes[promoCode.toUpperCase() as keyof typeof promoCodes];
      
      if (promo) {
        // Check minimum order for SAVE20
        if (promoCode.toUpperCase() === 'SAVE20' && getCartTotal() < 10000) {
          alert('This promo code requires a minimum order of ₹10,000');
          setIsPromoApplying(false);
          return;
        }
        
        setAppliedPromo({
          code: promoCode.toUpperCase(),
          discount: promo.discount
        });
        alert(`Promo code applied! You saved ${promo.discount}%`);
      } else {
        alert('Invalid promo code');
      }
      setIsPromoApplying(false);
    }, 500);
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode('');
  };

  // Razorpay Integration
  const initiateRazorpayPayment = async () => {
    const options = {
      key: 'rzp_test_YOUR_KEY_HERE', // Replace with your Razorpay key
      amount: getFinalTotal() * 100, // Amount in paise
      currency: 'INR',
      name: 'EduLearn Platform',
      description: 'Course Purchase',
      image: '/logo.png',
      order_id: '', // Will be generated from backend
      handler: function (response: RazorpayResponse) {
        handlePaymentSuccess(response);
      },
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phone
      },
      notes: {
        address: formData.address,
        items: cartItems.map(item => item.name).join(', ')
      },
      theme: {
        color: '#5b4d8f'
      },
      modal: {
        ondismiss: function() {
          setIsProcessing(false);
          alert('Payment cancelled');
        }
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const handlePaymentSuccess = async (response: RazorpayResponse) => {
    try {
      // In production, verify payment on backend
      console.log('Payment Success:', response);
      
      // Store order details
      const orderDetails = {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount: getFinalTotal(),
        items: cartItems,
        customerInfo: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          address: formData.address
        },
        paymentMethod: selectedPaymentMethod,
        timestamp: new Date().toISOString()
      };

      // Save to localStorage (in production, save to database)
      localStorage.setItem('lastOrder', JSON.stringify(orderDetails));
      
      // Send confirmation email (in production)
      await sendConfirmationEmail(orderDetails);
      
      // Redirect to success page
      navigate('/payment-success', { 
        state: { orderDetails },
        replace: true 
      });
      
    } catch (error) {
      console.error('Payment verification failed:', error);
      alert('Payment verification failed. Please contact support.');
      setIsProcessing(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sendConfirmationEmail = async (orderDetails: any) => {
    // In production, this would call your backend API
    console.log('Sending confirmation email...', orderDetails);
    
    // Simulate API call
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedPaymentMethod) {
      alert('Please select a payment method');
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    if (!validateForm()) {
      alert('Please fill all required fields correctly');
      return;
    }

    setIsProcessing(true);

    try {
      // Handle different payment methods
      switch (selectedPaymentMethod) {
        case 'razorpay':
        case 'upi':
        case 'netbanking':
        case 'wallet':
          // Use Razorpay for these methods
          await initiateRazorpayPayment();
          break;
          
        case 'card':
          // Direct card payment simulation
          setTimeout(() => {
            const mockResponse = {
              razorpay_payment_id: 'pay_' + Math.random().toString(36).substr(2, 9),
              razorpay_order_id: 'order_' + Math.random().toString(36).substr(2, 9),
              razorpay_signature: 'sig_' + Math.random().toString(36).substr(2, 9)
            };
            handlePaymentSuccess(mockResponse);
          }, 2000);
          break;
          
        case 'paytm':
          alert('Redirecting to Paytm...');
          setIsProcessing(false);
          break;
          
        default:
          alert('Please select a valid payment method');
          setIsProcessing(false);
      }
    } catch (error) {
      console.error('Payment initiation failed:', error);
      alert('Payment initiation failed. Please try again.');
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  return (
    <section 
      className="checkout-section fix section-padding"
      style={{
        background: 'linear-gradient(135deg, #e8e5f2 0%, #f5f3f9 50%, #ede9f5 100%)',
        fontFamily: '"Outfit", system-ui, sans-serif',
        minHeight: '100vh',
        paddingTop: '80px',
        paddingBottom: '80px'
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            {/* Page Header */}
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
              <div
                style={{
                  display: 'inline-block',
                  padding: '8px 24px',
                  background: 'white',
                  borderRadius: '9999px',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#5b4d8f',
                  marginBottom: '20px',
                  boxShadow: '0 2px 8px rgba(91,77,143,0.1)',
                }}
              >
                🔒 Secure Checkout
              </div>
              <h1
                style={{
                  fontSize: 'clamp(28px, 5vw, 40px)',
                  fontWeight: 700,
                  color: '#1a1a2e',
                  margin: 0
                }}
              >
                Complete Your Purchase
              </h1>
              <p style={{ color: '#666', marginTop: '12px', fontSize: '16px' }}>
                Just a few steps away from accessing world-class education
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row g-4">
                {/* Left Column - Payment Methods & Billing */}
                <div className="col-lg-8">
                  <div className="row g-4">
                    {/* Payment Method Selection */}
                    <div className="col-12">
                      <div 
                        style={{
                          background: 'white',
                          borderRadius: '20px',
                          padding: '32px',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
                        }}
                      >
                        <h4 
                          style={{
                            fontSize: '22px',
                            fontWeight: 700,
                            color: '#1a1a2e',
                            marginBottom: '8px'
                          }}
                        >
                          Select Payment Method
                        </h4>
                        <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>
                          Choose your preferred payment method
                        </p>
                        <div className="row g-3">
                          {[
                            { id: 'razorpay', label: 'Razorpay', icon: '⚡', popular: true },
                            { id: 'upi', label: 'UPI', icon: '📱', popular: true },
                            { id: 'card', label: 'Card', icon: '💳', popular: false },
                            { id: 'netbanking', label: 'Net Banking', icon: '🏦', popular: false },
                            { id: 'wallet', label: 'Wallet', icon: '💰', popular: false },
                            { id: 'paytm', label: 'Paytm', icon: '🔵', popular: false }
                          ].map((method) => (
                            <div className="col-md-4 col-6" key={method.id}>
                              <div
                                onClick={() => handlePaymentMethodChange(method.id)}
                                style={{
                                  padding: '16px',
                                  border: selectedPaymentMethod === method.id ? '2px solid #5b4d8f' : '2px solid #e8e5f2',
                                  borderRadius: '12px',
                                  cursor: 'pointer',
                                  transition: 'all 0.3s ease',
                                  background: selectedPaymentMethod === method.id ? '#f8f6ff' : 'white',
                                  textAlign: 'center',
                                  position: 'relative'
                                }}
                              >
                                {method.popular && (
                                  <div
                                    style={{
                                      position: 'absolute',
                                      top: '-8px',
                                      right: '8px',
                                      background: '#22c55e',
                                      color: 'white',
                                      fontSize: '9px',
                                      padding: '3px 8px',
                                      borderRadius: '6px',
                                      fontWeight: 600,
                                      textTransform: 'uppercase'
                                    }}
                                  >
                                    Popular
                                  </div>
                                )}
                                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{method.icon}</div>
                                <div 
                                  style={{
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    color: selectedPaymentMethod === method.id ? '#5b4d8f' : '#666'
                                  }}
                                >
                                  {method.label}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Billing Information */}
                    <div className="col-12">
                      <div 
                        style={{
                          background: 'white',
                          borderRadius: '20px',
                          padding: '32px',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
                        }}
                      >
                        <h4 
                          style={{
                            fontSize: '22px',
                            fontWeight: 700,
                            color: '#1a1a2e',
                            marginBottom: '24px'
                          }}
                        >
                          Billing Information
                        </h4>
                        <div className="row g-3">
                          <div className="col-md-6">
                            <label 
                              htmlFor="firstName"
                              style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: 600,
                                color: '#333',
                                marginBottom: '8px'
                              }}
                            >
                              First Name *
                            </label>
                            <input
                              type="text"
                              name="firstName"
                              id="firstName"
                              required
                              value={formData.firstName}
                              onChange={handleInputChange}
                              placeholder="Enter first name"
                              style={{
                                width: '100%',
                                padding: '14px 16px',
                                border: errors.firstName ? '1px solid #ef4444' : '1px solid #e8e5f2',
                                borderRadius: '10px',
                                fontSize: '15px',
                                outline: 'none'
                              }}
                            />
                            {errors.firstName && (
                              <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                                {errors.firstName}
                              </span>
                            )}
                          </div>
                          <div className="col-md-6">
                            <label 
                              htmlFor="lastName"
                              style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: 600,
                                color: '#333',
                                marginBottom: '8px'
                              }}
                            >
                              Last Name *
                            </label>
                            <input
                              type="text"
                              name="lastName"
                              id="lastName"
                              required
                              value={formData.lastName}
                              onChange={handleInputChange}
                              placeholder="Enter last name"
                              style={{
                                width: '100%',
                                padding: '14px 16px',
                                border: errors.lastName ? '1px solid #ef4444' : '1px solid #e8e5f2',
                                borderRadius: '10px',
                                fontSize: '15px',
                                outline: 'none'
                              }}
                            />
                            {errors.lastName && (
                              <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                                {errors.lastName}
                              </span>
                            )}
                          </div>
                          <div className="col-md-6">
                            <label 
                              htmlFor="email"
                              style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: 600,
                                color: '#333',
                                marginBottom: '8px'
                              }}
                            >
                              Email Address *
                            </label>
                            <input
                              type="email"
                              name="email"
                              id="email"
                              required
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="your.email@example.com"
                              style={{
                                width: '100%',
                                padding: '14px 16px',
                                border: errors.email ? '1px solid #ef4444' : '1px solid #e8e5f2',
                                borderRadius: '10px',
                                fontSize: '15px',
                                outline: 'none'
                              }}
                            />
                            {errors.email && (
                              <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                                {errors.email}
                              </span>
                            )}
                          </div>
                          <div className="col-md-6">
                            <label 
                              htmlFor="phone"
                              style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: 600,
                                color: '#333',
                                marginBottom: '8px'
                              }}
                            >
                              Phone Number *
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              id="phone"
                              required
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="10-digit mobile number"
                              maxLength={10}
                              style={{
                                width: '100%',
                                padding: '14px 16px',
                                border: errors.phone ? '1px solid #ef4444' : '1px solid #e8e5f2',
                                borderRadius: '10px',
                                fontSize: '15px',
                                outline: 'none'
                              }}
                            />
                            {errors.phone && (
                              <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                                {errors.phone}
                              </span>
                            )}
                          </div>
                          <div className="col-12">
                            <label 
                              htmlFor="address"
                              style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: 600,
                                color: '#333',
                                marginBottom: '8px'
                              }}
                            >
                              Address *
                            </label>
                            <textarea
                              name="address"
                              id="address"
                              required
                              value={formData.address}
                              onChange={handleInputChange}
                              placeholder="House number, street name, area"
                              rows={2}
                              style={{
                                width: '100%',
                                padding: '14px 16px',
                                border: errors.address ? '1px solid #ef4444' : '1px solid #e8e5f2',
                                borderRadius: '10px',
                                fontSize: '15px',
                                outline: 'none',
                                resize: 'vertical'
                              }}
                            />
                            {errors.address && (
                              <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                                {errors.address}
                              </span>
                            )}
                          </div>
                          <div className="col-md-4">
                            <label 
                              htmlFor="city"
                              style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: 600,
                                color: '#333',
                                marginBottom: '8px'
                              }}
                            >
                              City *
                            </label>
                            <input
                              type="text"
                              name="city"
                              id="city"
                              required
                              value={formData.city}
                              onChange={handleInputChange}
                              placeholder="City"
                              style={{
                                width: '100%',
                                padding: '14px 16px',
                                border: errors.city ? '1px solid #ef4444' : '1px solid #e8e5f2',
                                borderRadius: '10px',
                                fontSize: '15px',
                                outline: 'none'
                              }}
                            />
                            {errors.city && (
                              <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                                {errors.city}
                              </span>
                            )}
                          </div>
                          <div className="col-md-4">
                            <label 
                              htmlFor="state"
                              style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: 600,
                                color: '#333',
                                marginBottom: '8px'
                              }}
                            >
                              State *
                            </label>
                            <input
                              type="text"
                              name="state"
                              id="state"
                              required
                              value={formData.state}
                              onChange={handleInputChange}
                              placeholder="State"
                              style={{
                                width: '100%',
                                padding: '14px 16px',
                                border: errors.state ? '1px solid #ef4444' : '1px solid #e8e5f2',
                                borderRadius: '10px',
                                fontSize: '15px',
                                outline: 'none'
                              }}
                            />
                            {errors.state && (
                              <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                                {errors.state}
                              </span>
                            )}
                          </div>
                          <div className="col-md-4">
                            <label 
                              htmlFor="pincode"
                              style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: 600,
                                color: '#333',
                                marginBottom: '8px'
                              }}
                            >
                              Pincode *
                            </label>
                            <input
                              type="text"
                              name="pincode"
                              id="pincode"
                              required
                              value={formData.pincode}
                              onChange={handleInputChange}
                              placeholder="6-digit pincode"
                              maxLength={6}
                              style={{
                                width: '100%',
                                padding: '14px 16px',
                                border: errors.pincode ? '1px solid #ef4444' : '1px solid #e8e5f2',
                                borderRadius: '10px',
                                fontSize: '15px',
                                outline: 'none'
                              }}
                            />
                            {errors.pincode && (
                              <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                                {errors.pincode}
                              </span>
                            )}
                          </div>
                          <div className="col-md-6">
                            <label 
                              htmlFor="country"
                              style={{
                                display: 'block',
                                fontSize: '14px',
                                fontWeight: 600,
                                color: '#333',
                                marginBottom: '8px'
                              }}
                            >
                              Country *
                            </label>
                            <select
                              name="country"
                              id="country"
                              required
                              value={formData.country}
                              onChange={handleInputChange}
                              style={{
                                width: '100%',
                                padding: '14px 16px',
                                border: '1px solid #e8e5f2',
                                borderRadius: '10px',
                                fontSize: '15px',
                                outline: 'none',
                                backgroundColor: 'white'
                              }}
                            >
                              <option value="India">India</option>
                              <option value="USA">USA</option>
                              <option value="UK">UK</option>
                              <option value="Australia">Australia</option>
                              <option value="Canada">Canada</option>
                            </select>
                          </div>
                        </div>

                        {/* Terms and Conditions */}
                        <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e8e5f2' }}>
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                            <input
                              type="checkbox"
                              name="agreeToTerms"
                              id="agreeToTerms"
                              checked={formData.agreeToTerms}
                              onChange={handleInputChange}
                              style={{ 
                                width: '18px', 
                                height: '18px', 
                                cursor: 'pointer',
                                marginTop: '2px'
                              }}
                            />
                            <label htmlFor="agreeToTerms" style={{ fontSize: '14px', color: '#666', cursor: 'pointer', margin: 0, lineHeight: '1.5' }}>
                              I agree to the{' '}
                              <a href="/terms" style={{ color: '#5b4d8f', textDecoration: 'none', fontWeight: 600 }}>
                                Terms and Conditions
                              </a>
                              {' '}and{' '}
                              <a href="/privacy" style={{ color: '#5b4d8f', textDecoration: 'none', fontWeight: 600 }}>
                                Privacy Policy
                              </a>
                            </label>
                          </div>
                          {errors.terms && (
                            <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '8px', display: 'block', marginLeft: '30px' }}>
                              {errors.terms}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Card Details (shown only when card payment is selected) */}
                    {selectedPaymentMethod === 'card' && (
                      <div className="col-12">
                        <div 
                          style={{
                            background: 'white',
                            borderRadius: '20px',
                            padding: '32px',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
                          }}
                        >
                          <h4 
                            style={{
                              fontSize: '22px',
                              fontWeight: 700,
                              color: '#1a1a2e',
                              marginBottom: '24px'
                            }}
                          >
                            Card Details
                          </h4>
                          <div className="row g-3">
                            <div className="col-12">
                              <label htmlFor="cardNumber" style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>
                                Card Number *
                              </label>
                              <input
                                type="text"
                                name="cardNumber"
                                id="cardNumber"
                                value={formData.cardNumber}
                                onChange={(e) => {
                                  const formatted = formatCardNumber(e.target.value);
                                  setFormData(prev => ({ ...prev, cardNumber: formatted }));
                                }}
                                placeholder="0000 0000 0000 0000"
                                maxLength={19}
                                style={{
                                  width: '100%',
                                  padding: '14px 16px',
                                  border: errors.cardNumber ? '1px solid #ef4444' : '1px solid #e8e5f2',
                                  borderRadius: '10px',
                                  fontSize: '15px',
                                  outline: 'none'
                                }}
                              />
                              {errors.cardNumber && (
                                <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                                  {errors.cardNumber}
                                </span>
                              )}
                            </div>
                            <div className="col-md-6">
                              <label htmlFor="expiryDate" style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>
                                Expiry Date *
                              </label>
                              <input
                                type="text"
                                name="expiryDate"
                                id="expiryDate"
                                value={formData.expiryDate}
                                onChange={(e) => {
                                  const formatted = formatExpiryDate(e.target.value);
                                  setFormData(prev => ({ ...prev, expiryDate: formatted }));
                                }}
                                placeholder="MM/YY"
                                maxLength={5}
                                style={{
                                  width: '100%',
                                  padding: '14px 16px',
                                  border: errors.expiryDate ? '1px solid #ef4444' : '1px solid #e8e5f2',
                                  borderRadius: '10px',
                                  fontSize: '15px',
                                  outline: 'none'
                                }}
                              />
                              {errors.expiryDate && (
                                <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                                  {errors.expiryDate}
                                </span>
                              )}
                            </div>
                            <div className="col-md-6">
                              <label htmlFor="cvc" style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>
                                CVC / CVV *
                              </label>
                              <input
                                type="text"
                                name="cvc"
                                id="cvc"
                                value={formData.cvc}
                                onChange={handleInputChange}
                                placeholder="123"
                                maxLength={3}
                                style={{
                                  width: '100%',
                                  padding: '14px 16px',
                                  border: errors.cvc ? '1px solid #ef4444' : '1px solid #e8e5f2',
                                  borderRadius: '10px',
                                  fontSize: '15px',
                                  outline: 'none'
                                }}
                              />
                              {errors.cvc && (
                                <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                                  {errors.cvc}
                                </span>
                              )}
                            </div>
                            <div className="col-12">
                              <label htmlFor="cardName" style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>
                                Name on Card *
                              </label>
                              <input
                                type="text"
                                name="cardName"
                                id="cardName"
                                value={formData.cardName}
                                onChange={handleInputChange}
                                placeholder="John Doe"
                                style={{
                                  width: '100%',
                                  padding: '14px 16px',
                                  border: errors.cardName ? '1px solid #ef4444' : '1px solid #e8e5f2',
                                  borderRadius: '10px',
                                  fontSize: '15px',
                                  outline: 'none'
                                }}
                              />
                              {errors.cardName && (
                                <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', display: 'block' }}>
                                  {errors.cardName}
                                </span>
                              )}
                            </div>
                            <div className="col-12">
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <input
                                  type="checkbox"
                                  name="saveCard"
                                  id="saveCard"
                                  checked={formData.saveCard}
                                  onChange={handleInputChange}
                                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                                />
                                <label htmlFor="saveCard" style={{ fontSize: '14px', color: '#666', cursor: 'pointer', margin: 0 }}>
                                  Save card for future payments
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column - Order Summary */}
                <div className="col-lg-4">
                  <div 
                    style={{
                      background: 'white',
                      borderRadius: '20px',
                      padding: '32px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                      position: 'sticky',
                      top: '100px'
                    }}
                  >
                    <h4 
                      style={{
                        fontSize: '22px',
                        fontWeight: 700,
                        color: '#1a1a2e',
                        marginBottom: '24px'
                      }}
                    >
                      Order Summary
                    </h4>

                    {cartItems.length === 0 ? (
                      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛒</div>
                        <p style={{ color: '#666', fontSize: '15px' }}>No items in cart</p>
                        <Link 
                          to="/courses" 
                          style={{
                            display: 'inline-block',
                            marginTop: '16px',
                            padding: '12px 24px',
                            background: '#5b4d8f',
                            color: 'white',
                            borderRadius: '10px',
                            textDecoration: 'none',
                            fontSize: '14px',
                            fontWeight: 600
                          }}
                        >
                          Browse Courses
                        </Link>
                      </div>
                    ) : (
                      <>
                        {/* Cart Items */}
                        <div style={{ marginBottom: '24px', maxHeight: '300px', overflowY: 'auto' }}>
                          {cartItems.map((item) => (
                            <div 
                              key={item.id}
                              style={{
                                padding: '16px',
                                background: '#f8f6ff',
                                borderRadius: '12px',
                                marginBottom: '12px',
                                border: '1px solid #e8e5f2'
                              }}
                            >
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                                <div style={{ flex: 1 }}>
                                  <h5 style={{ fontSize: '15px', fontWeight: 700, color: '#1a1a2e', margin: '0 0 4px' }}>
                                    {item.name}
                                  </h5>
                                  {item.subtitle && (
                                    <p style={{ fontSize: '12px', color: '#666', margin: '0 0 8px' }}>
                                      {item.subtitle}
                                    </p>
                                  )}
                                  <span
                                    style={{
                                      display: 'inline-block',
                                      padding: '3px 10px',
                                      background: '#5b4d8f',
                                      color: 'white',
                                      borderRadius: '5px',
                                      fontSize: '10px',
                                      fontWeight: 600,
                                      textTransform: 'uppercase'
                                    }}
                                  >
                                    {item.category.replace('-', ' ')}
                                  </span>
                                </div>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '13px', color: '#666' }}>
                                  Qty: {item.quantity}
                                </span>
                                <div style={{ textAlign: 'right' }}>
                                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#5b4d8f' }}>
                                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                                  </div>
                                  <div style={{ fontSize: '11px', color: '#888', textDecoration: 'line-through' }}>
                                    ₹{(item.originalPrice * item.quantity).toLocaleString('en-IN')}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Promo Code */}
                        <div style={{ marginBottom: '24px' }}>
                          <label style={{ display: 'block', fontSize: '14px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>
                            Promo Code
                          </label>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <input
                              type="text"
                              value={promoCode}
                              onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                              placeholder="Enter code"
                              disabled={!!appliedPromo}
                              style={{
                                flex: 1,
                                padding: '12px 14px',
                                border: '1px solid #e8e5f2',
                                borderRadius: '10px',
                                fontSize: '14px',
                                outline: 'none',
                                textTransform: 'uppercase'
                              }}
                            />
                            {appliedPromo ? (
                              <button
                                type="button"
                                onClick={handleRemovePromo}
                                style={{
                                  padding: '12px 20px',
                                  background: '#ef4444',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '10px',
                                  fontSize: '14px',
                                  fontWeight: 600,
                                  cursor: 'pointer'
                                }}
                              >
                                Remove
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={handleApplyPromo}
                                disabled={!promoCode || isPromoApplying}
                                style={{
                                  padding: '12px 20px',
                                  background: !promoCode || isPromoApplying ? '#ccc' : '#5b4d8f',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '10px',
                                  fontSize: '14px',
                                  fontWeight: 600,
                                  cursor: !promoCode || isPromoApplying ? 'not-allowed' : 'pointer'
                                }}
                              >
                                {isPromoApplying ? 'Applying...' : 'Apply'}
                              </button>
                            )}
                          </div>
                          {appliedPromo && (
                            <div style={{ 
                              marginTop: '8px', 
                              padding: '8px 12px', 
                              background: '#d1fae5', 
                              borderRadius: '8px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px'
                            }}>
                              <span style={{ fontSize: '16px' }}>🎉</span>
                              <span style={{ fontSize: '12px', color: '#065f46', fontWeight: 600 }}>
                                {appliedPromo.code} applied! You saved {appliedPromo.discount}%
                              </span>
                            </div>
                          )}
                          
                          {/* Available Promo Codes */}
                          <details style={{ marginTop: '12px' }}>
                            <summary style={{ 
                              fontSize: '13px', 
                              color: '#5b4d8f', 
                              cursor: 'pointer',
                              fontWeight: 600,
                              userSelect: 'none'
                            }}>
                              View available codes
                            </summary>
                            <div style={{ marginTop: '12px', padding: '12px', background: '#f8f6ff', borderRadius: '10px' }}>
                              {Object.entries(promoCodes).map(([code, details]) => (
                                <div 
                                  key={code}
                                  style={{
                                    padding: '8px 0',
                                    borderBottom: '1px solid #e8e5f2',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                  }}
                                >
                                  <div>
                                    <div style={{ fontSize: '12px', fontWeight: 700, color: '#5b4d8f' }}>
                                      {code}
                                    </div>
                                    <div style={{ fontSize: '11px', color: '#666' }}>
                                      {details.description}
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setPromoCode(code);
                                      handleApplyPromo();
                                    }}
                                    style={{
                                      padding: '4px 12px',
                                      background: 'white',
                                      border: '1px solid #5b4d8f',
                                      borderRadius: '6px',
                                      fontSize: '11px',
                                      color: '#5b4d8f',
                                      fontWeight: 600,
                                      cursor: 'pointer'
                                    }}
                                  >
                                    Apply
                                  </button>
                                </div>
                              ))}
                            </div>
                          </details>
                        </div>

                        {/* Price Summary */}
                        <div 
                          style={{
                            padding: '20px',
                            background: '#f8f6ff',
                            borderRadius: '12px',
                            marginBottom: '24px'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <span style={{ color: '#666', fontSize: '14px' }}>Subtotal:</span>
                            <span style={{ fontWeight: 600, fontSize: '14px' }}>
                              ₹{getCartOriginalTotal().toLocaleString('en-IN')}
                            </span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <span style={{ color: '#666', fontSize: '14px' }}>Course Discount:</span>
                            <span style={{ color: '#2e7d32', fontWeight: 600, fontSize: '14px' }}>
                              - ₹{getTotalSavings().toLocaleString('en-IN')}
                            </span>
                          </div>
                          {appliedPromo && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                              <span style={{ color: '#666', fontSize: '14px' }}>Promo Discount ({appliedPromo.discount}%):</span>
                              <span style={{ color: '#2e7d32', fontWeight: 600, fontSize: '14px' }}>
                                - ₹{getPromoDiscount().toLocaleString('en-IN')}
                              </span>
                            </div>
                          )}
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <span style={{ color: '#666', fontSize: '14px' }}>Tax (GST 18%):</span>
                            <span style={{ fontWeight: 600, fontSize: '14px' }}>
                              ₹{getTaxAmount().toLocaleString('en-IN')}
                            </span>
                          </div>
                          <div 
                            style={{
                              borderTop: '2px solid #e8e5f2',
                              paddingTop: '12px',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}
                          >
                            <span style={{ fontSize: '18px', fontWeight: 700, color: '#1a1a2e' }}>
                              Total:
                            </span>
                            <span style={{ fontSize: '24px', fontWeight: 800, color: '#5b4d8f' }}>
                              ₹{getFinalTotal().toLocaleString('en-IN')}
                            </span>
                          </div>
                          {(getTotalSavings() + getPromoDiscount()) > 0 && (
                            <div style={{ 
                              marginTop: '12px', 
                              padding: '8px 12px', 
                              background: '#d1fae5', 
                              borderRadius: '8px',
                              textAlign: 'center'
                            }}>
                              <span style={{ fontSize: '12px', color: '#065f46', fontWeight: 600 }}>
                                🎉 You're saving ₹{(getTotalSavings() + getPromoDiscount()).toLocaleString('en-IN')} on this order!
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Payment Button */}
                        <button
                          type="submit"
                          disabled={isProcessing}
                          style={{
                            width: '100%',
                            padding: '16px',
                            background: isProcessing ? '#999' : 'linear-gradient(135deg, #5b4d8f 0%, #7b6ba8 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '16px',
                            fontWeight: 600,
                            cursor: isProcessing ? 'not-allowed' : 'pointer',
                            transition: 'all 0.3s ease',
                            marginBottom: '12px',
                            boxShadow: isProcessing ? 'none' : '0 4px 12px rgba(91,77,143,0.3)'
                          }}
                        >
                          {isProcessing ? (
                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                              <span>Processing...</span>
                              <span style={{ 
                                width: '16px', 
                                height: '16px', 
                                border: '2px solid white',
                                borderTopColor: 'transparent',
                                borderRadius: '50%',
                                animation: 'spin 1s linear infinite'
                              }} />
                            </span>
                          ) : (
                            `Pay ₹${getFinalTotal().toLocaleString('en-IN')}`
                          )}
                        </button>

                        <div style={{ textAlign: 'center' }}>
                          <Link 
                            to="/courses"
                            style={{
                              color: '#5b4d8f',
                              fontSize: '14px',
                              textDecoration: 'none',
                              fontWeight: 600
                            }}
                          >
                            ← Continue Shopping
                          </Link>
                        </div>

                        {/* Security Badges */}
                        <div style={{ marginTop: '24px' }}>
                          <div 
                            style={{
                              padding: '16px',
                              background: '#f0fdf4',
                              borderRadius: '10px',
                              textAlign: 'center',
                              border: '1px solid #86efac',
                              marginBottom: '12px'
                            }}
                          >
                            <div style={{ fontSize: '20px', marginBottom: '8px' }}>🔒</div>
                            <p style={{ fontSize: '12px', color: '#15803d', margin: 0, fontWeight: 600 }}>
                              Secure Payment Gateway
                            </p>
                            <p style={{ fontSize: '11px', color: '#16a34a', margin: '4px 0 0' }}>
                              256-bit SSL encrypted transaction
                            </p>
                          </div>
                          
                          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                            {['Visa', 'Mastercard', 'RuPay', 'UPI'].map(method => (
                              <div 
                                key={method}
                                style={{
                                  padding: '8px 12px',
                                  background: 'white',
                                  border: '1px solid #e8e5f2',
                                  borderRadius: '8px',
                                  fontSize: '11px',
                                  fontWeight: 600,
                                  color: '#666'
                                }}
                              >
                                {method}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Money Back Guarantee */}
                        <div 
                          style={{
                            marginTop: '16px',
                            padding: '12px',
                            background: '#fef3c7',
                            borderRadius: '10px',
                            border: '1px solid #fde047',
                            textAlign: 'center'
                          }}
                        >
                          <div style={{ fontSize: '16px', marginBottom: '4px' }}>✨</div>
                          <p style={{ fontSize: '11px', color: '#92400e', margin: 0, fontWeight: 600 }}>
                            30-Day Money Back Guarantee
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Google Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      {/* Spinner Animation */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default CheckoutArea;