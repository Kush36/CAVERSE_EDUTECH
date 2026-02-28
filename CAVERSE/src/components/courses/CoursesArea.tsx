import React, { useState } from 'react';

interface Plan {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  features: string[];
  isRecommended?: boolean;
  scheduleUrl?: string;
  buyUrl?: string;
}

interface Subject {
  id: string;
  name: string;
  description: string;
  topics: string[];
  price: number;
  originalPrice: number;
}

interface CartItem {
  id: string;
  type: 'plan' | 'subject';
  name: string;
  subtitle?: string;
  price: number;
  originalPrice: number;
  quantity: number;
  category: string; // foundation, intermediate-g1, intermediate-g2, final-g1, final-g2
}

const plansData = {
  foundation: [
    {
      id: 'plan-foundation-basic',
      title: 'Foundation (Basic)',
      subtitle: 'Detailed Revision Exam Series - New Course',
      price: 5200,
      originalPrice: 10400,
      features: [
        'Chapter-wise & Full Syllabus Tests',
        'ICAI Pattern Based Questions',
        'Detailed Evaluation with Remarks',
        'Rank Predictor & Performance Report'
      ],
      scheduleUrl: '/schedule/foundation-basic',
      buyUrl: '/checkout/foundation-basic'
    },
    {
      id: 'plan-foundation-premium',
      title: 'Foundation (Premium)',
      subtitle: 'Most Popular Test Series',
      price: 6200,
      originalPrice: 12400,
      isRecommended: true,
      features: [
        'Unit Wise Test Papers',
        '4 Chapter-Wise Tests per Subject',
        'Target Based Approach',
        'Evaluation in 24 hours'
      ],
      scheduleUrl: '/schedule/foundation-premium',
      buyUrl: '/checkout/foundation-premium'
    }
  ],
  intermediate: [
    {
      id: 'plan-intermediate-advanced',
      title: 'Intermediate (Basic)',
      subtitle: 'Advanced Practice Test Series',
      price: 6500,
      originalPrice: 14000,
      features: [
        'Group-wise Test Series',
        'ICAI Level Questions',
        'Detailed Answer Evaluation',
        'Performance Analytics'
      ],
      scheduleUrl: '/schedule/intermediate-advanced',
      buyUrl: '/checkout/intermediate-advanced'
    },
    {
      id: 'plan-intermediate-revision',
      title: 'Intermediate(Premium)',
      subtitle: 'Revision Test Pack',
      price: 7200,
      originalPrice: 16400,
       isRecommended: true,
      features: [
        'Chapter-wise Tests',
        'Concept Clarity Focus',
        'Quick Evaluation'
      ],
      scheduleUrl: '/schedule/intermediate-revision',
      buyUrl: '/checkout/intermediate-revision'
    }
  ],
  final: [
    {
      id: 'plan-final-ranker',
      title: 'Final(Basic)',
      subtitle: 'CA Final Ranker Test Series',
      price: 8000,
      originalPrice: 25000,
      features: [
        'Case Study Based Questions',
        'ICAI MTP & RTP Pattern',
        'Rank Prediction',
        'Personal Mentor Feedback'
      ],
      scheduleUrl: '/schedule/final-ranker',
      buyUrl: '/checkout/final-ranker'
    },
    {
      id: 'plan-final-fasttrack',
      title: 'Final(Premium)',
      subtitle: 'Fast Track Revision Series',
      price: 9800,
      originalPrice: 19600,
       isRecommended: true,
      features: [
        'Full Syllabus Mock Tests',
        'Exam-Oriented Evaluation',
        'Quick Reports'
      ],
      scheduleUrl: '/schedule/final-fasttrack',
      buyUrl: '/checkout/final-fasttrack'
    }
  ]
};

const foundationSubjects: Subject[] = [
  {
    id: 'foundation-accounting',
    name: 'Accounting',
    description: 'Master the principles and practices of accounting',
    price: 1500,
    originalPrice: 3000,
    topics: [
      'Theoretical Framework',
      'Accounting Process & Bank Reconciliation',
      'Inventories & Depreciation',
      'Financial Statements of Sole Proprietorship',
      'Bills of Exchange & Consignment',
      'Partnership Accounts & Admission of Partner'
    ]
  },
  {
    id: 'foundation-business-laws',
    name: 'Business Laws',
    description: 'Understanding legal framework and business correspondence',
    price: 1400,
    originalPrice: 2800,
    topics: [
      'Indian Contract Act, 1872',
      'Sale of Goods Act, 1930',
      'Indian Partnership Act, 1932',
      'Limited Liability Partnership Act, 2008',
      'Business Correspondence',
      'Drafting of Business Letters & Reports'
    ]
  },
  {
    id: 'foundation-quantitative',
    name: 'Quantitative Aptitude',
    description: 'Mathematics, Statistics, and Logical Reasoning',
    price: 1600,
    originalPrice: 3200,
    topics: [
      'Ratio, Proportion & Indices',
      'Equations & Linear Inequalities',
      'Time Value of Money',
      'Probability & Expected Value',
      'Correlation & Regression',
      'Logical Reasoning & Data Interpretation'
    ]
  },
  {
    id: 'foundation-economics',
    name: 'Business Economics',
    description: 'Economic principles and business studies',
    price: 1500,
    originalPrice: 3000,
    topics: [
      'Introduction to Microeconomics',
      'Theory of Demand & Supply',
      'Theory of Production & Cost',
      'Price Determination in Different Markets',
      'Nature and Purpose of Business',
      'Forms of Business Organisation'
    ]
  }
];

const intermediateGroups = {
  group1: [
    {
      id: 'intermediate-g1-accounting',
      name: 'Accounting',
      description: 'Advanced accounting concepts and standards',
      price: 2200,
      originalPrice: 4400,
      topics: [
        'Accounting Standards',
        'Partnership Accounts',
        'Accounting for Share Capital',
        'Debentures & Redemption',
        'Cash Flow Statements',
        'Financial Statements Analysis'
      ]
    },
    {
      id: 'intermediate-g1-corporate-law',
      name: 'Corporate Law',
      description: 'Companies Act and corporate legal framework',
      price: 2100,
      originalPrice: 4200,
      topics: [
        'Companies Act, 2013 - Part I',
        'Incorporation of Company',
        'Share Capital & Debentures',
        'Prospectus & Allotment',
        'Acceptance of Deposits',
        'Board Meetings & Powers'
      ]
    },
    {
      id: 'intermediate-g1-cost-management',
      name: 'Cost & Management Accounting',
      description: 'Cost accounting and management decision-making',
      price: 2300,
      originalPrice: 4600,
      topics: [
        'Introduction to Cost Accounting',
        'Material & Labour Costing',
        'Overheads & Activity Based Costing',
        'Cost Accounting Systems',
        'Standard Costing & Variance Analysis',
        'Marginal Costing & Decision Making'
      ]
    }
  ],
  group2: [
    {
      id: 'intermediate-g2-taxation',
      name: 'Taxation',
      description: 'Income Tax and GST fundamentals',
      price: 2400,
      originalPrice: 4800,
      topics: [
        'Basic Concepts of Income Tax',
        'Residence & Scope of Total Income',
        'Income from Salaries',
        'Income from House Property',
        'Business & Profession Income',
        'GST - Basic Concepts & Registration'
      ]
    },
    {
      id: 'intermediate-g2-advanced-accounting',
      name: 'Advanced Accounting',
      description: 'Complex accounting scenarios and consolidation',
      price: 2300,
      originalPrice: 4600,
      topics: [
        'Accounting for Amalgamation',
        'Internal Reconstruction',
        'Accounting for Branches',
        'Consolidated Financial Statements',
        'Valuation of Goodwill & Shares',
        'Liquidation of Companies'
      ]
    },
    {
      id: 'intermediate-g2-auditing',
      name: 'Auditing & Assurance',
      description: 'Auditing principles and standards',
      price: 2200,
      originalPrice: 4400,
      topics: [
        'Nature, Objective & Scope of Audit',
        'Audit Planning & Documentation',
        'Risk Assessment & Internal Control',
        'Audit Evidence & Sampling',
        'Audit of Items of Financial Statements',
        'Audit Report & Certificate'
      ]
    }
  ]
};

const finalGroups = {
  group1: [
    {
      id: 'final-g1-financial-reporting',
      name: 'Financial Reporting',
      description: 'Advanced financial reporting and Ind AS',
      price: 3200,
      originalPrice: 6400,
      topics: [
        'Framework for Preparation of Financial Statements',
        'Ind AS - Presentation & Disclosures',
        'Consolidated Financial Statements',
        'Business Combinations',
        'Revenue Recognition',
        'Share-based Payments'
      ]
    },
    {
      id: 'final-g1-strategic-management',
      name: 'Strategic Management',
      description: 'Strategic planning and corporate strategy',
      price: 3000,
      originalPrice: 6000,
      topics: [
        'Strategic Management Process',
        'Dynamics of Competitive Strategy',
        'Strategic Analysis & Planning',
        'Formulation of Functional Strategy',
        'Organizational Structure & Design',
        'Strategic Implementation & Control'
      ]
    },
    {
      id: 'final-g1-advanced-auditing',
      name: 'Advanced Auditing',
      description: 'Complex auditing scenarios and practices',
      price: 3100,
      originalPrice: 6200,
      topics: [
        'Company Audit',
        'Audit of Banks & Insurance Companies',
        'Audit of Public Sector Undertakings',
        'Audit Reports & Certificates',
        'Statutory Compliance & Investigation',
        'Internal Audit & Management Audit'
      ]
    }
  ],
  group2: [
    {
      id: 'final-g2-corporate-law',
      name: 'Corporate Law',
      description: 'Advanced corporate and allied laws',
      price: 3000,
      originalPrice: 6000,
      topics: [
        'Compromises & Arrangements',
        'Prevention of Oppression & Mismanagement',
        'Winding Up of Companies',
        'National Company Law Tribunal',
        'Securities Laws - SEBI Act',
        'Offences & Penalties'
      ]
    },
    {
      id: 'final-g2-advanced-management',
      name: 'Advanced Management Accounting',
      description: 'Strategic cost management and performance evaluation',
      price: 3200,
      originalPrice: 6400,
      topics: [
        'Throughput & Target Costing',
        'Life Cycle Costing & Value Chain Analysis',
        'Strategic Cost Management',
        'Budgetary Control Systems',
        'Standard Costing & Variance Analysis',
        'Performance Measurement & Evaluation'
      ]
    },
    {
      id: 'final-g2-information-systems',
      name: 'Information Systems',
      description: 'IT systems and digital business environment',
      price: 2900,
      originalPrice: 5800,
      topics: [
        'Business Information Systems',
        'Information Systems & IT Fundamentals',
        'E-Commerce & M-Commerce',
        'Business Process Automation',
        'Emerging Technologies',
        'Information Security & Cyber Laws'
      ]
    }
  ]
};

const scheduleData = {
  foundation: {
    examDate: 'June 2026',
    testDates: [
      { date: '15 Feb 2026', topic: 'Principles and Practice of Accounting' },
      { date: '22 Feb 2026', topic: 'Business Laws & Business Correspondence' },
      { date: '01 Mar 2026', topic: 'Business Mathematics and Statistics' },
      { date: '08 Mar 2026', topic: 'Business Economics & Business Studies' },
      { date: '15 Mar 2026', topic: 'Full Syllabus Mock Test 1' },
      { date: '22 Mar 2026', topic: 'Full Syllabus Mock Test 2' }
    ]
  },
  intermediate: {
    examDate: 'June 2026',
    testDates: [
      { date: '10 Feb 2026', topic: 'Accounting - Group 1' },
      { date: '17 Feb 2026', topic: 'Corporate Law - Group 1' },
      { date: '24 Feb 2026', topic: 'Cost & Management Accounting - Group 1' },
      { date: '03 Mar 2026', topic: 'Taxation - Group 1' },
      { date: '10 Mar 2026', topic: 'Advanced Accounting - Group 2' },
      { date: '17 Mar 2026', topic: 'Auditing - Group 2' }
    ]
  },
  final: {
    examDate: 'June 2026',
    testDates: [
      { date: '08 Feb 2026', topic: 'Financial Reporting - Group 1' },
      { date: '15 Feb 2026', topic: 'Strategic Management - Group 1' },
      { date: '22 Feb 2026', topic: 'Advanced Auditing - Group 1' },
      { date: '01 Mar 2026', topic: 'Corporate Law - Group 1' },
      { date: '08 Mar 2026', topic: 'Advanced Management Accounting - Group 2' },
      { date: '15 Mar 2026', topic: 'Information Systems - Group 2' }
    ]
  }
};

const CoursesArea: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'foundation' | 'intermediate' | 'final'>('foundation');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<keyof typeof scheduleData>('foundation');
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_selectedPlan, _setSelectedPlan] = useState<Plan | null>(null);
  const [showExploreModal, setShowExploreModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<'group1' | 'group2' | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCartModal, setShowCartModal] = useState(false);

  const currentPlans = plansData[selectedTab] || [];

  const discountPercent = (price: number, original: number) =>
    Math.round(((original - price) / original) * 100);

  const addToCart = (item: CartItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartOriginalTotal = () => {
    return cart.reduce((total, item) => total + (item.originalPrice * item.quantity), 0);
  };

  const handleBuyNow = (plan: Plan) => {
    const category = selectedTab;
    addToCart({
      id: plan.id,
      type: 'plan',
      name: plan.title,
      subtitle: plan.subtitle,
      price: plan.price,
      originalPrice: plan.originalPrice,
      quantity: 1,
      category
    });
    setShowCartModal(true);
  };

  const handleAddSubjectToCart = (subject: Subject, category: string) => {
    addToCart({
      id: subject.id,
      type: 'subject',
      name: subject.name,
      subtitle: subject.description,
      price: subject.price,
      originalPrice: subject.originalPrice,
      quantity: 1,
      category
    });
  };

  const handleBuySubject = (subject: Subject, category: string) => {
    handleAddSubjectToCart(subject, category);
    setShowCartModal(true);
    setShowExploreModal(false);
  };

  const handleViewSchedule = (courseType: keyof typeof scheduleData) => {
    setSelectedSchedule(courseType);
    setShowScheduleModal(true);
  };

  const handleExploreMore = () => {
    setShowExploreModal(true);
    if (selectedTab !== 'foundation') {
      setSelectedGroup('group1');
    }
  };

  const handleProceedToCheckout = () => {
    setShowCartModal(false);
    setShowCheckoutModal(true);
  };

  const handleProceedToPayment = () => {
    alert(`Processing payment for ₹${getCartTotal().toLocaleString('en-IN')}`);
    setCart([]);
    setShowCheckoutModal(false);
  };

  const getExploreContent = () => {
    if (selectedTab === 'foundation') {
      return foundationSubjects;
    } else if (selectedTab === 'intermediate') {
      return selectedGroup === 'group1' ? intermediateGroups.group1 : intermediateGroups.group2;
    } else {
      return selectedGroup === 'group1' ? finalGroups.group1 : finalGroups.group2;
    }
  };

  const getCategoryLabel = () => {
    if (selectedTab === 'foundation') return 'foundation';
    return `${selectedTab}-${selectedGroup}`;
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e8e5f2 0%, #f5f3f9 50%, #ede9f5 100%)',
        fontFamily: '"Outfit", system-ui, sans-serif',
        padding: '60px 16px',
      }}
    >
      {/* Shopping Cart Icon */}
      <div
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 999,
        }}
      >
        <button
          onClick={() => setShowCartModal(true)}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: '#5b4d8f',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(91,77,143,0.3)',
            position: 'relative',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 6px 30px rgba(91,77,143,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(91,77,143,0.3)';
          }}
        >
          <span style={{ fontSize: '24px', color: 'white' }}>🛒</span>
          {cart.length > 0 && (
            <div
              style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: '#ff4757',
                color: 'white',
                fontSize: '12px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </div>
          )}
        </button>
      </div>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <div
          style={{
            display: 'inline-block',
            padding: '8px 24px',
            background: 'white',
            borderRadius: '9999px',
            fontSize: '14px',
            fontWeight: 500,
            color: '#5b4d8f',
            marginBottom: '24px',
            boxShadow: '0 2px 8px rgba(91,77,143,0.1)',
          }}
        >
          Test Series Plans
        </div>

        <h1
          style={{
            fontSize: 'clamp(28px, 5.5vw, 44px)',
            fontWeight: 700,
            color: '#1a1a2e',
            margin: '0 0 32px',
            lineHeight: 1.15,
          }}
        >
          CA {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)} Test Series
          <br />
          June / December Attempt
        </h1>

        {/* Tabs */}
        <div
          style={{
            display: 'inline-flex',
            background: 'white',
            borderRadius: '9999px',
            padding: '6px',
            boxShadow: '0 4px 16px rgba(91,77,143,0.12)',
            gap: '4px',
          }}
        >
          {(['foundation', 'intermediate', 'final'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              style={{
                padding: '12px 28px',
                border: 'none',
                borderRadius: '9999px',
                background: selectedTab === tab ? '#5b4d8f' : 'transparent',
                color: selectedTab === tab ? 'white' : '#555',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              {tab === 'foundation' ? 'Foundation' : tab === 'intermediate' ? 'Intermediate' : 'Final'}
            </button>
          ))}
        </div>
      </div>

      {/* Explore More Button */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <button
          onClick={handleExploreMore}
          style={{
            padding: '14px 32px',
            background: 'white',
            color: '#5b4d8f',
            border: '2px solid #5b4d8f',
            borderRadius: '14px',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(91,77,143,0.15)',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#5b4d8f';
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(91,77,143,0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'white';
            e.currentTarget.style.color = '#5b4d8f';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(91,77,143,0.15)';
          }}
        >
          📚 Explore {selectedTab === 'foundation' ? 'Subjects' : 'Course Groups'} →
        </button>
      </div>

      {/* Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '28px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {currentPlans.map((plan, index) => (
          <div
            key={index}
            style={{
              background: 'white',
              borderRadius: '24px',
              padding: '32px 28px',
              boxShadow: plan.isRecommended
                ? '0 10px 40px rgba(91,77,143,0.18)'
                : '0 6px 20px rgba(0,0,0,0.07)',
              border: plan.isRecommended ? '3px solid #5b4d8f' : '1px solid #f0f0f0',
              position: 'relative',
              transition: 'all 0.3s ease',
              transform: plan.isRecommended ? 'scale(1.03)' : 'scale(1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px) scale(1.04)';
              e.currentTarget.style.boxShadow = plan.isRecommended
                ? '0 20px 50px rgba(91,77,143,0.28)'
                : '0 12px 36px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = plan.isRecommended ? 'scale(1.03)' : 'scale(1)';
              e.currentTarget.style.boxShadow = plan.isRecommended
                ? '0 10px 40px rgba(91,77,143,0.18)'
                : '0 6px 20px rgba(0,0,0,0.07)';
            }}
          >
            {plan.isRecommended && (
              <div
                style={{
                  position: 'absolute',
                  top: '-14px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#5b4d8f',
                  color: 'white',
                  padding: '6px 18px',
                  borderRadius: '9999px',
                  fontSize: '13px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 12px rgba(91,77,143,0.3)',
                }}
              >
                <span style={{ fontSize: '15px' }}>★</span> Most Recommended
              </div>
            )}

            <div style={{ marginTop: plan.isRecommended ? '20px' : '0' }}>
              <h2
                style={{
                  fontSize: '26px',
                  fontWeight: 700,
                  color: '#1a1a2e',
                  margin: '0 0 8px',
                }}
              >
                {plan.title}
              </h2>

              <p
                style={{
                  fontSize: '14px',
                  color: '#666',
                  margin: '0 0 20px',
                  lineHeight: 1.45,
                }}
              >
                {plan.subtitle}
              </p>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '24px' }}>
                <span
                  style={{
                    fontSize: '38px',
                    fontWeight: 800,
                    color: '#1a1a2e',
                  }}
                >
                  ₹{plan.price.toLocaleString('en-IN')}
                </span>
                <span
                  style={{
                    fontSize: '18px',
                    color: '#888',
                    textDecoration: 'line-through',
                  }}
                >
                  ₹{plan.originalPrice.toLocaleString('en-IN')}
                </span>
                <span
                  style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#2e7d32',
                  }}
                >
                  {discountPercent(plan.price, plan.originalPrice)}% OFF
                </span>
              </div>

              <button
                style={{
                  width: '100%',
                  padding: '16px',
                  background: '#5b4d8f',
                  color: 'white',
                  border: 'none',
                  borderRadius: '14px',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  marginBottom: '12px',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#483a72';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#5b4d8f';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onClick={() => handleBuyNow(plan)}
              >
                Add to Cart & Buy
              </button>

              <button
                style={{
                  width: '100%',
                  padding: '16px',
                  background: 'transparent',
                  color: '#5b4d8f',
                  border: '2px solid #d8d0f0',
                  borderRadius: '14px',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f8f6ff';
                  e.currentTarget.style.borderColor = '#5b4d8f';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = '#d8d0f0';
                }}
                onClick={() => handleViewSchedule(selectedTab)}
              >
                View Schedule
              </button>

              <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {plan.features.map((feature, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div
                      style={{
                        minWidth: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        background: '#5b4d8f',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '3px',
                      }}
                    >
                      <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                        <path
                          d="M1 5L5 9L13 1"
                          stroke="white"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span style={{ fontSize: '14.5px', color: '#333', lineHeight: 1.5 }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Explore More Modal */}
      {showExploreModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
            overflowY: 'auto',
          }}
          onClick={() => setShowExploreModal(false)}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '24px',
              padding: '40px',
              maxWidth: '1000px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              position: 'relative',
              margin: '20px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'transparent',
                border: 'none',
                fontSize: '28px',
                cursor: 'pointer',
                color: '#666',
                lineHeight: 1,
              }}
              onClick={() => setShowExploreModal(false)}
            >
              ×
            </button>

            <h2
              style={{
                fontSize: '32px',
                fontWeight: 700,
                color: '#1a1a2e',
                marginBottom: '8px',
              }}
            >
              {selectedTab === 'foundation' ? 'Foundation Subjects' : `${selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)} Course Structure`}
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: '#666',
                marginBottom: '32px',
              }}
            >
              {selectedTab === 'foundation' 
                ? 'Explore and purchase individual subjects' 
                : 'Choose from Group 1 or Group 2 Test Series'}
            </p>

            {/* Group Selector for Intermediate/Final */}
            {selectedTab !== 'foundation' && (
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  marginBottom: '32px',
                  justifyContent: 'center',
                }}
              >
                <button
                  onClick={() => setSelectedGroup('group1')}
                  style={{
                    padding: '12px 32px',
                    border: 'none',
                    borderRadius: '12px',
                    background: selectedGroup === 'group1' ? '#5b4d8f' : '#f0f0f0',
                    color: selectedGroup === 'group1' ? 'white' : '#555',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                >
                  Group 1
                </button>
                <button
                  onClick={() => setSelectedGroup('group2')}
                  style={{
                    padding: '12px 32px',
                    border: 'none',
                    borderRadius: '12px',
                    background: selectedGroup === 'group2' ? '#5b4d8f' : '#f0f0f0',
                    color: selectedGroup === 'group2' ? 'white' : '#555',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                >
                  Group 2
                </button>
              </div>
            )}

            {/* Subjects Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
              }}
            >
              {getExploreContent().map((subject, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '24px',
                    background: '#f8f6ff',
                    borderRadius: '16px',
                    border: '1px solid #e8e5f2',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(91,77,143,0.15)';
                    e.currentTarget.style.borderColor = '#5b4d8f';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = '#e8e5f2';
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '12px',
                    }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: '#5b4d8f',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                        color: 'white',
                        fontWeight: 700,
                      }}
                    >
                      {idx + 1}
                    </div>
                    <h3
                      style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        color: '#1a1a2e',
                        margin: 0,
                      }}
                    >
                      {subject.name}
                    </h3>
                  </div>

                  <p
                    style={{
                      fontSize: '13px',
                      color: '#666',
                      marginBottom: '12px',
                      lineHeight: 1.5,
                    }}
                  >
                    {subject.description}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '8px',
                      marginBottom: '16px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '24px',
                        fontWeight: 700,
                        color: '#5b4d8f',
                      }}
                    >
                      ₹{subject.price.toLocaleString('en-IN')}
                    </span>
                    <span
                      style={{
                        fontSize: '14px',
                        color: '#888',
                        textDecoration: 'line-through',
                      }}
                    >
                      ₹{subject.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#2e7d32',
                      }}
                    >
                      50% OFF
                    </span>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      gap: '8px',
                      marginBottom: '16px',
                    }}
                  >
                    <button
                      onClick={() => handleBuySubject(subject, getCategoryLabel())}
                      style={{
                        flex: 1,
                        padding: '12px',
                        background: '#5b4d8f',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.25s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#483a72';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#5b4d8f';
                      }}
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={() => handleAddSubjectToCart(subject, getCategoryLabel())}
                      style={{
                        flex: 1,
                        padding: '12px',
                        background: 'transparent',
                        color: '#5b4d8f',
                        border: '2px solid #5b4d8f',
                        borderRadius: '10px',
                        fontSize: '14px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.25s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#f8f6ff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                    }}
                  >
                    {subject.topics.slice(0, 4).map((topic, topicIdx) => (
                      <div
                        key={topicIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '8px',
                        }}
                      >
                        <span
                          style={{
                            color: '#5b4d8f',
                            fontSize: '12px',
                            marginTop: '2px',
                          }}
                        >
                          ▸
                        </span>
                        <span
                          style={{
                            fontSize: '12px',
                            color: '#444',
                            lineHeight: 1.4,
                          }}
                        >
                          {topic}
                        </span>
                      </div>
                    ))}
                    {subject.topics.length > 4 && (
                      <span
                        style={{
                          fontSize: '12px',
                          color: '#888',
                          fontStyle: 'italic',
                          marginLeft: '20px',
                        }}
                      >
                        +{subject.topics.length - 4} more topics
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Shopping Cart Modal */}
      {showCartModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1001,
            padding: '20px',
          }}
          onClick={() => setShowCartModal(false)}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '24px',
              padding: '40px',
              maxWidth: '700px',
              width: '100%',
              maxHeight: '80vh',
              overflowY: 'auto',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'transparent',
                border: 'none',
                fontSize: '28px',
                cursor: 'pointer',
                color: '#666',
                lineHeight: 1,
              }}
              onClick={() => setShowCartModal(false)}
            >
              ×
            </button>

            <h2
              style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#1a1a2e',
                marginBottom: '8px',
              }}
            >
              Shopping Cart
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: '#666',
                marginBottom: '32px',
              }}
            >
              {cart.length === 0 ? 'Your cart is empty' : `${cart.reduce((sum, item) => sum + item.quantity, 0)} items in cart`}
            </p>

            {cart.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '60px 20px',
                }}
              >
                <div style={{ fontSize: '64px', marginBottom: '20px' }}>🛒</div>
                <p style={{ fontSize: '18px', color: '#666' }}>
                  Start adding Test_Series to your cart!
                </p>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        padding: '20px',
                        background: '#f8f6ff',
                        borderRadius: '16px',
                        border: '1px solid #e8e5f2',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <div style={{ flex: 1 }}>
                          <h3
                            style={{
                              fontSize: '18px',
                              fontWeight: 700,
                              color: '#1a1a2e',
                              margin: '0 0 4px',
                            }}
                          >
                            {item.name}
                          </h3>
                          {item.subtitle && (
                            <p
                              style={{
                                fontSize: '13px',
                                color: '#666',
                                margin: '0 0 8px',
                              }}
                            >
                              {item.subtitle}
                            </p>
                          )}
                          <span
                            style={{
                              display: 'inline-block',
                              padding: '4px 12px',
                              background: '#5b4d8f',
                              color: 'white',
                              borderRadius: '6px',
                              fontSize: '11px',
                              fontWeight: 600,
                              textTransform: 'uppercase',
                            }}
                          >
                            {item.category.replace('-', ' ')}
                          </span>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '20px',
                            color: '#999',
                            padding: '0',
                            width: '30px',
                            height: '30px',
                          }}
                        >
                          ×
                        </button>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '8px 16px',
                            background: 'white',
                            borderRadius: '10px',
                            border: '1px solid #e8e5f2',
                          }}
                        >
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              fontSize: '16px',
                              color: '#5b4d8f',
                              fontWeight: 700,
                            }}
                          >
                            −
                          </button>
                          <span
                            style={{
                              minWidth: '30px',
                              textAlign: 'center',
                              fontSize: '16px',
                              fontWeight: 600,
                            }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              fontSize: '16px',
                              color: '#5b4d8f',
                              fontWeight: 700,
                            }}
                          >
                            +
                          </button>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                          <div
                            style={{
                              fontSize: '20px',
                              fontWeight: 700,
                              color: '#5b4d8f',
                            }}
                          >
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </div>
                          <div
                            style={{
                              fontSize: '12px',
                              color: '#888',
                              textDecoration: 'line-through',
                            }}
                          >
                            ₹{(item.originalPrice * item.quantity).toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    padding: '24px',
                    background: '#f8f6ff',
                    borderRadius: '16px',
                    marginBottom: '24px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                    }}
                  >
                    <span style={{ color: '#666' }}>Subtotal:</span>
                    <span style={{ fontWeight: 600 }}>
                      ₹{getCartOriginalTotal().toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '12px',
                    }}
                  >
                    <span style={{ color: '#666' }}>Discount:</span>
                    <span style={{ color: '#2e7d32', fontWeight: 600 }}>
                      - ₹{(getCartOriginalTotal() - getCartTotal()).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      paddingTop: '12px',
                      borderTop: '2px solid #e8e5f2',
                    }}
                  >
                    <span style={{ fontSize: '20px', fontWeight: 700 }}>Total:</span>
                    <span style={{ fontSize: '24px', fontWeight: 800, color: '#5b4d8f' }}>
                      ₹{getCartTotal().toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <button
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: '#5b4d8f',
                    color: 'white',
                    border: 'none',
                    borderRadius: '14px',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    marginBottom: '12px',
                  }}
                  onClick={handleProceedToCheckout}
                >
                  Proceed to Checkout
                </button>
                <button
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: 'transparent',
                    color: '#5b4d8f',
                    border: '2px solid #d8d0f0',
                    borderRadius: '14px',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                  onClick={() => setShowCartModal(false)}
                >
                  Continue Shopping
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {showScheduleModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
          onClick={() => setShowScheduleModal(false)}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '24px',
              padding: '40px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '80vh',
              overflowY: 'auto',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'transparent',
                border: 'none',
                fontSize: '28px',
                cursor: 'pointer',
                color: '#666',
                lineHeight: 1,
              }}
              onClick={() => setShowScheduleModal(false)}
            >
              ×
            </button>

            <h2
              style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#1a1a2e',
                marginBottom: '8px',
              }}
            >
              Test Schedule
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: '#666',
                marginBottom: '32px',
              }}
            >
              {selectedSchedule.charAt(0).toUpperCase() + selectedSchedule.slice(1)} - {scheduleData[selectedSchedule].examDate}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {scheduleData[selectedSchedule].testDates.map((test, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '20px',
                    background: '#f8f6ff',
                    borderRadius: '16px',
                    border: '1px solid #e8e5f2',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '16px',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: '15px',
                        fontWeight: 700,
                        color: '#5b4d8f',
                        marginBottom: '4px',
                      }}
                    >
                      {test.date}
                    </div>
                    <div
                      style={{
                        fontSize: '14px',
                        color: '#333',
                      }}
                    >
                      {test.topic}
                    </div>
                  </div>
                  <div
                    style={{
                      padding: '6px 12px',
                      background: '#5b4d8f',
                      color: 'white',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  >
                    Test {idx + 1}
                  </div>
                </div>
              ))}
            </div>

            <button
              style={{
                width: '100%',
                padding: '16px',
                background: '#5b4d8f',
                color: 'white',
                border: 'none',
                borderRadius: '14px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                marginTop: '24px',
              }}
              onClick={() => {
                alert('Schedule downloaded!');
                setShowScheduleModal(false);
              }}
            >
              Download Schedule PDF
            </button>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1002,
            padding: '20px',
          }}
          onClick={() => setShowCheckoutModal(false)}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '24px',
              padding: '40px',
              maxWidth: '500px',
              width: '100%',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'transparent',
                border: 'none',
                fontSize: '28px',
                cursor: 'pointer',
                color: '#666',
                lineHeight: 1,
              }}
              onClick={() => setShowCheckoutModal(false)}
            >
              ×
            </button>

            <h2
              style={{
                fontSize: '28px',
                fontWeight: 700,
                color: '#1a1a2e',
                marginBottom: '8px',
              }}
            >
              Checkout
            </h2>
            <p
              style={{
                fontSize: '16px',
                color: '#666',
                marginBottom: '32px',
              }}
            >
              Complete your purchase
            </p>

            <div
              style={{
                padding: '24px',
                background: '#f8f6ff',
                borderRadius: '16px',
                marginBottom: '24px',
              }}
            >
              <h3
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#1a1a2e',
                  marginBottom: '16px',
                }}
              >
                Order Summary
              </h3>

              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '12px',
                    fontSize: '14px',
                  }}
                >
                  <span style={{ color: '#666' }}>
                    {item.name} × {item.quantity}
                  </span>
                  <span style={{ fontWeight: 600 }}>
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}

              <div style={{ borderTop: '1px solid #e8e5f2', paddingTop: '16px', marginTop: '16px' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '8px',
                  }}
                >
                  <span style={{ color: '#666' }}>Original Price:</span>
                  <span style={{ textDecoration: 'line-through', color: '#888' }}>
                    ₹{getCartOriginalTotal().toLocaleString('en-IN')}
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '8px',
                  }}
                >
                  <span style={{ color: '#666' }}>Discount:</span>
                  <span style={{ color: '#2e7d32', fontWeight: 600 }}>
                    - ₹{(getCartOriginalTotal() - getCartTotal()).toLocaleString('en-IN')}
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '16px',
                    borderTop: '1px solid #e8e5f2',
                  }}
                >
                  <span style={{ fontSize: '18px', fontWeight: 700 }}>Total:</span>
                  <span style={{ fontSize: '24px', fontWeight: 800, color: '#5b4d8f' }}>
                    ₹{getCartTotal().toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            <button
              style={{
                width: '100%',
                padding: '16px',
                background: '#5b4d8f',
                color: 'white',
                border: 'none',
                borderRadius: '14px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                marginBottom: '12px',
              }}
              onClick={handleProceedToPayment}
            >
              Proceed to Payment
            </button>
            <button
              style={{
                width: '100%',
                padding: '16px',
                background: 'transparent',
                color: '#5b4d8f',
                border: '2px solid #d8d0f0',
                borderRadius: '14px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
              onClick={() => {
                setShowCheckoutModal(false);
                setShowCartModal(true);
              }}
            >
              Back to Cart
            </button>
          </div>
        </div>
      )}

      {/* Google Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
    </div>
  );
};

export default CoursesArea;