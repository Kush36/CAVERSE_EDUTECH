/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, Send, X, Minimize2, Maximize2, BookOpen, 
  FileText, Calendar, Award, HelpCircle, TrendingUp, Clock,
  Sparkles, Bot, User as UserIcon
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
}

interface QuickAction {
  icon: React.ReactNode;
  label: string;
  query: string;
  color: string;
}

const CAChatbot: React.FC = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // CA Knowledge Base - This would typically come from an API/database
  const caKnowledgeBase = {
    // Exam Pattern & Structure
    examPattern: {
      foundation: {
        papers: 4,
        subjects: [
          'Principles and Practice of Accounting',
          'Business Laws and Business Correspondence and Reporting',
          'Business Mathematics and Logical Reasoning & Statistics',
          'Business Economics and Business and Commercial Knowledge'
        ],
        totalMarks: 400,
        passingMarks: '40% in each paper and 50% aggregate',
        duration: '3 hours per paper',
        examFrequency: 'May and November'
      },
      intermediate: {
        groups: 2,
        group1: [
          'Accounting',
          'Corporate and Other Laws',
          'Cost and Management Accounting',
          'Taxation'
        ],
        group2: [
          'Advanced Accounting',
          'Auditing and Assurance',
          'Enterprise Information Systems & Strategic Management',
          'Financial Management & Economics for Finance'
        ],
        totalMarks: 800,
        passingMarks: '40% in each paper and 50% aggregate',
        duration: '3 hours per paper',
        examFrequency: 'May and November'
      },
      final: {
        groups: 2,
        group1: [
          'Financial Reporting',
          'Strategic Financial Management',
          'Advanced Auditing and Professional Ethics',
          'Corporate and Economic Laws'
        ],
        group2: [
          'Strategic Cost Management and Performance Evaluation',
          'Elective Paper',
          'Direct Tax Laws and International Taxation',
          'Indirect Tax Laws'
        ],
        totalMarks: 800,
        passingMarks: '40% in each paper and 50% aggregate',
        duration: '3 hours per paper',
        examFrequency: 'May and November'
      }
    },

    // Study Tips & Strategies
    studyTips: [
      'Create a structured study timetable covering all subjects',
      'Focus on ICAI study material as primary resource',
      'Practice mock tests regularly to improve time management',
      'Revise important topics multiple times before exams',
      'Join study groups for peer learning and doubt clearing',
      'Stay updated with latest amendments and notifications',
      'Practice previous year question papers extensively',
      'Take regular breaks to avoid burnout'
    ],

    // Important Dates & Deadlines
    importantDates: {
      may2026: {
        examMonth: 'May 2026',
        registrationStart: 'January 1, 2026',
        registrationEnd: 'January 31, 2026',
        examStart: 'May 2, 2026',
        resultDate: 'July 15, 2026'
      },
      november2026: {
        examMonth: 'November 2026',
        registrationStart: 'July 1, 2026',
        registrationEnd: 'July 31, 2026',
        examStart: 'November 1, 2026',
        resultDate: 'January 15, 2027'
      }
    },

    // Test Series Information
    testSeries: {
      foundation: {
        totalTests: 20,
        mockTests: 8,
        chapterTests: 12,
        duration: '3 months',
        price: '₹2,999'
      },
      intermediate: {
        totalTests: 40,
        mockTests: 16,
        chapterTests: 24,
        duration: '6 months',
        price: '₹5,999'
      },
      final: {
        totalTests: 40,
        mockTests: 16,
        chapterTests: 24,
        duration: '6 months',
        price: '₹6,999'
      }
    },

    // Common Queries & Answers
    faqs: {
      'eligibility foundation': 'To appear for CA Foundation, you must have passed Class 12th or equivalent examination. You need to register with ICAI and complete 4 months of study period after registration.',
      'eligibility intermediate': 'You can appear for CA Intermediate after passing CA Foundation or through Direct Entry Scheme if you are a Commerce Graduate with 55% marks or Other Graduate with 60% marks.',
      'eligibility final': 'To appear for CA Final, you must have passed both groups of CA Intermediate and completed 3 years of articleship training.',
      'articleship': 'Articleship is mandatory practical training of 3 years that CA students must complete. It can be started after passing either one group or both groups of Intermediate.',
      'passing criteria': 'You need minimum 40% marks in each paper and 50% aggregate marks to pass CA exams at any level.',
      'attempts': 'There is no limit on the number of attempts for CA exams. You can appear as many times as needed.',
      'exemption': 'If you score 60% or more in a paper, you get exemption for that paper in the next attempt. Exemption is valid for the next 3 attempts or 18 months, whichever is earlier.',
      'study material': 'ICAI provides comprehensive study material for all levels. You should primarily focus on ICAI material along with reference books for specific subjects.',
      'coaching': 'While coaching is not mandatory, it helps in structured learning. CaVerse Edutech provides comprehensive online coaching and test series for all CA levels.',
      'difficulty': 'CA exams are challenging and require dedicated preparation. Foundation has a pass percentage of ~40%, Intermediate ~15-20%, and Final ~10-15%. But with proper preparation, anyone can clear it.'
    }
  };

  // Quick action buttons
  const quickActions: QuickAction[] = [
    {
      icon: <BookOpen size={18} />,
      label: 'Exam Pattern',
      query: 'Tell me about CA exam pattern',
      color: '#3b82f6'
    },
    {
      icon: <Calendar size={18} />,
      label: 'Important Dates',
      query: 'What are the important dates for CA exams?',
      color: '#8b5cf6'
    },
    {
      icon: <FileText size={18} />,
      label: 'Test Series',
      query: 'Tell me about CaVerse test series',
      color: '#10b981'
    },
    {
      icon: <TrendingUp size={18} />,
      label: 'Study Tips',
      query: 'Give me some study tips for CA preparation',
      color: '#f59e0b'
    }
  ];

  // AI Response Generator
  const generateResponse = (userQuery: string): { text: string; suggestions?: string[] } => {
    const query = userQuery.toLowerCase().trim();

    // Get user's course level for personalized responses
    const userLevel = user?.course || 'Foundation';

    // Greeting responses
    if (query.match(/^(hi|hello|hey|namaste|good morning|good evening)/)) {
      return {
        text: `Hello ${user?.firstName || 'there'}! 👋 I'm your CA Study Assistant. I'm here to help you with anything related to CA ${userLevel} preparation, test series, exam patterns, study tips, and more. How can I assist you today?`,
        suggestions: [
          'Tell me about exam pattern',
          'Show me test series details',
          'Important dates for exams',
          'Study tips for CA'
        ]
      };
    }

    // Exam Pattern Queries
    if (query.match(/exam pattern|paper|subject|marks/)) {
      const level = userLevel.toLowerCase() as 'foundation' | 'intermediate' | 'final';
      const pattern = caKnowledgeBase.examPattern[level];
      
      if (level === 'foundation') {
        const foundationPattern = pattern as typeof caKnowledgeBase.examPattern.foundation;
        return {
          text: `📚 **CA Foundation Exam Pattern:**\n\n` +
                `📝 Number of Papers: ${foundationPattern.papers}\n` +
                `📖 Subjects:\n${foundationPattern.subjects.map((s, i) => `   ${i + 1}. ${s}`).join('\n')}\n\n` +
                `💯 Total Marks: ${foundationPattern.totalMarks}\n` +
                `✅ Passing Criteria: ${foundationPattern.passingMarks}\n` +
                `⏰ Duration: ${foundationPattern.duration}\n` +
                `📅 Exam Frequency: ${foundationPattern.examFrequency}\n\n` +
                `Our test series is designed to match the exact exam pattern!`,
          suggestions: [
            'Tell me about test series',
            'How to prepare for Foundation',
            'Important dates'
          ]
        };
      } else if (level === 'intermediate') {
        const intermediatePattern = pattern as typeof caKnowledgeBase.examPattern.intermediate;
        return {
          text: `📚 **CA Intermediate Exam Pattern:**\n\n` +
                `📋 Total Groups: ${intermediatePattern.groups}\n\n` +
                `**Group 1:**\n${intermediatePattern.group1.map((s, i) => `   ${i + 1}. ${s}`).join('\n')}\n\n` +
                `**Group 2:**\n${intermediatePattern.group2.map((s, i) => `   ${i + 1}. ${s}`).join('\n')}\n\n` +
                `💯 Total Marks: ${intermediatePattern.totalMarks}\n` +
                `✅ Passing Criteria: ${intermediatePattern.passingMarks}\n` +
                `⏰ Duration: ${intermediatePattern.duration}\n` +
                `📅 Exam Frequency: ${intermediatePattern.examFrequency}`,
          suggestions: [
            'Show me Intermediate test series',
            'Study strategy for Intermediate',
            'Registration process'
          ]
        };
      } else {
        const finalPattern = pattern as typeof caKnowledgeBase.examPattern.final;
        return {
          text: `📚 **CA Final Exam Pattern:**\n\n` +
                `📋 Total Groups: ${finalPattern.groups}\n\n` +
                `**Group 1:**\n${finalPattern.group1.map((s, i) => `   ${i + 1}. ${s}`).join('\n')}\n\n` +
                `**Group 2:**\n${finalPattern.group2.map((s, i) => `   ${i + 1}. ${s}`).join('\n')}\n\n` +
                `💯 Total Marks: ${finalPattern.totalMarks}\n` +
                `✅ Passing Criteria: ${finalPattern.passingMarks}\n` +
                `⏰ Duration: ${finalPattern.duration}\n` +
                `📅 Exam Frequency: ${finalPattern.examFrequency}`,
          suggestions: [
            'Final test series details',
            'Elective paper options',
            'Articleship information'
          ]
        };
      }
    }

    // Test Series Queries
    if (query.match(/test series|mock test|practice|caverse test/)) {
      const level = userLevel.toLowerCase() as 'foundation' | 'intermediate' | 'final';
      const testInfo = caKnowledgeBase.testSeries[level];
      
      return {
        text: `🎯 **CaVerse Test Series for CA ${userLevel}:**\n\n` +
              `📊 Total Tests: ${testInfo.totalTests}\n` +
              `🎯 Mock Tests: ${testInfo.mockTests} (Full-length, exam pattern)\n` +
              `📝 Chapter-wise Tests: ${testInfo.chapterTests}\n` +
              `⏱️ Duration: ${testInfo.duration} access\n` +
              `💰 Price: ${testInfo.price}\n\n` +
              `**Features:**\n` +
              `✅ Detailed performance analysis\n` +
              `✅ All-India ranking\n` +
              `✅ Solutions with explanations\n` +
              `✅ Mobile & desktop access\n` +
              `✅ Progress tracking dashboard\n\n` +
              `Start your test series today from the dashboard!`,
        suggestions: [
          'How to access test series',
          'Show my test results',
          'Study tips'
        ]
      };
    }

    // Study Tips
    if (query.match(/study tip|how to study|preparation|strategy|how to prepare/)) {
      const tips = caKnowledgeBase.studyTips;
      return {
        text: `💡 **Effective Study Tips for CA ${userLevel}:**\n\n` +
              tips.map((tip, i) => `${i + 1}. ${tip}`).join('\n\n') +
              `\n\n📚 Remember: Consistency is key! Our test series helps you track your progress regularly.`,
        suggestions: [
          'Show test series',
          'Important topics to focus',
          'Time management tips'
        ]
      };
    }

    // Important Dates
    if (query.match(/important date|exam date|registration|when is exam|deadline/)) {
      const may = caKnowledgeBase.importantDates.may2026;
      const nov = caKnowledgeBase.importantDates.november2026;
      
      return {
        text: `📅 **Important Dates for CA Exams 2026:**\n\n` +
              `**May 2026 Attempt:**\n` +
              `📝 Registration: ${may.registrationStart} to ${may.registrationEnd}\n` +
              `📚 Exam Starts: ${may.examStart}\n` +
              `🎉 Expected Result: ${may.resultDate}\n\n` +
              `**November 2026 Attempt:**\n` +
              `📝 Registration: ${nov.registrationStart} to ${nov.registrationEnd}\n` +
              `📚 Exam Starts: ${nov.examStart}\n` +
              `🎉 Expected Result: ${nov.resultDate}\n\n` +
              `⚠️ Note: Start your test series preparation 3-4 months before exams!`,
        suggestions: [
          'Start test series preparation',
          'Exam preparation checklist',
          'Study schedule'
        ]
      };
    }

    // FAQ Matching
    for (const [key, answer] of Object.entries(caKnowledgeBase.faqs)) {
      if (query.includes(key) || query.match(new RegExp(key.split(' ').join('|')))) {
        return {
          text: `ℹ️ ${answer}`,
          suggestions: [
            'More FAQs',
            'Test series info',
            'Contact support'
          ]
        };
      }
    }

    // Eligibility Queries
    if (query.match(/eligib|can i|qualification|who can/)) {
      return {
        text: `📋 **CA Eligibility Criteria:**\n\n` +
              `**Foundation:** Class 12th pass\n` +
              `**Intermediate:** Foundation pass OR Commerce Graduate (55%) OR Other Graduate (60%)\n` +
              `**Final:** Intermediate pass + 3 years Articleship\n\n` +
              `You're currently enrolled in CA ${userLevel}. Keep up the great work! 💪`,
        suggestions: [
          'Registration process',
          'How to start preparation',
          'Test series benefits'
        ]
      };
    }

    // Time Management
    if (query.match(/time management|time|speed|fast/)) {
      return {
        text: `⏰ **Time Management Tips for CA Exams:**\n\n` +
              `1. Practice with timer - Use our timed mock tests\n` +
              `2. Allocate time per question based on marks\n` +
              `3. Answer easy questions first\n` +
              `4. Keep 15 minutes for revision\n` +
              `5. Don't spend too much time on one question\n` +
              `6. Practice previous year papers regularly\n\n` +
              `Our test series has built-in timers and analytics to help you improve your speed!`,
        suggestions: [
          'Start mock test',
          'View my performance',
          'More study tips'
        ]
      };
    }

    // Revision Strategy
    if (query.match(/revision|revise|remember|forget/)) {
      return {
        text: `🔄 **Effective Revision Strategy:**\n\n` +
              `1. First revision: Within 24 hours of learning\n` +
              `2. Second revision: After 7 days\n` +
              `3. Third revision: After 30 days\n` +
              `4. Make short notes for quick revision\n` +
              `5. Use mind maps and flowcharts\n` +
              `6. Practice numerical problems daily\n` +
              `7. Take chapter-wise tests after each topic\n\n` +
              `💡 Pro tip: Our test series helps you identify weak areas that need more revision!`,
        suggestions: [
          'Access chapter tests',
          'View weak areas',
          'Study schedule tips'
        ]
      };
    }

    // Performance & Results
    if (query.match(/result|performance|score|rank|marks/)) {
      return {
        text: `📊 **Track Your Performance:**\n\n` +
              `You can view your complete performance analysis in the Dashboard:\n` +
              `✅ Test-wise scores and ranks\n` +
              `✅ Subject-wise performance\n` +
              `✅ Weak area identification\n` +
              `✅ Progress trends\n` +
              `✅ All-India rankings\n\n` +
              `Go to Dashboard → My Results to see detailed analytics!`,
        suggestions: [
          'View my results',
          'Start new test',
          'Improvement tips'
        ]
      };
    }

    // Motivation & Support
    if (query.match(/motivat|stress|anxious|worried|scared|difficult|hard|can't do/)) {
      return {
        text: `💪 **You've Got This!**\n\n` +
              `Remember: Every CA was once where you are now. The journey is tough, but you're tougher! 🌟\n\n` +
              `Tips to stay motivated:\n` +
              `• Set small, achievable daily goals\n` +
              `• Celebrate small wins\n` +
              `• Join study groups for peer support\n` +
              `• Take regular breaks\n` +
              `• Talk to mentors when stuck\n\n` +
              `Our mentorship program is here to support you. Book a session anytime!`,
        suggestions: [
          'Book mentorship session',
          'Join study group',
          'Success stories'
        ]
      };
    }

    // Default Response
    return {
      text: `I understand you're asking about "${userQuery}". While I may not have specific information about this right now, I can help you with:\n\n` +
            `📚 Exam patterns and syllabus\n` +
            `📝 Test series and mock tests\n` +
            `📅 Important dates and deadlines\n` +
            `💡 Study tips and strategies\n` +
            `❓ Eligibility and registration\n` +
            `📊 Performance tracking\n\n` +
            `What would you like to know more about?`,
      suggestions: [
        'Tell me about exam pattern',
        'Show test series',
        'Study tips',
        'Contact support'
      ]
    };
  };

  // Handle sending message
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = generateResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: response.suggestions
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  // Handle quick action click
  const handleQuickAction = (query: string) => {
    setInputValue(query);
    setTimeout(() => handleSendMessage(), 100);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setTimeout(() => handleSendMessage(), 100);
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Initial welcome message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: 'welcome',
        text: `👋 Hello ${user?.firstName || 'there'}! I'm your personal CA Study Assistant powered by AI.\n\n` +
              `I'm trained on comprehensive CA content from across India and can help you with:\n\n` +
              `📚 Exam patterns & syllabus\n` +
              `📝 Test series information\n` +
              `📅 Important dates\n` +
              `💡 Study tips & strategies\n` +
              `❓ FAQs about CA exams\n` +
              `📊 Performance analysis\n\n` +
              `How can I assist you today?`,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: [
          'Tell me about exam pattern',
          'Show test series details',
          'Study tips for CA',
          'Important dates'
        ]
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, user]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  if (!isOpen) {
    return (
      <div
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '64px',
          height: '64px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 8px 32px rgba(102,126,234,0.4)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 1000,
          animation: 'pulse 2s infinite'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(102,126,234,0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(102,126,234,0.4)';
        }}
      >
        <style>{`
          @keyframes pulse {
            0%, 100% { box-shadow: 0 8px 32px rgba(102,126,234,0.4); }
            50% { box-shadow: 0 8px 32px rgba(102,126,234,0.6), 0 0 0 8px rgba(102,126,234,0.1); }
          }
        `}</style>
        <MessageCircle size={32} color="white" />
        <div style={{
          position: 'absolute',
          top: '-4px',
          right: '-4px',
          width: '20px',
          height: '20px',
          background: '#10b981',
          borderRadius: '50%',
          border: '3px solid white',
          animation: 'ping 1.5s infinite'
        }} />
        <style>{`
          @keyframes ping {
            0% { transform: scale(1); opacity: 1; }
            50%, 100% { transform: scale(1.3); opacity: 0; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: isMinimized ? '320px' : '420px',
        height: isMinimized ? '60px' : '600px',
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        zIndex: 1000,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
      }}
    >
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: isMinimized ? '20px' : '20px 20px 0 0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(10px)'
          }}>
            <Bot size={24} color="white" />
          </div>
          <div>
            <h3 style={{
              margin: 0,
              color: 'white',
              fontSize: '16px',
              fontWeight: '700'
            }}>
              CA Study Assistant
            </h3>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: '2px'
            }}>
              <div style={{
                width: '6px',
                height: '6px',
                background: '#10b981',
                borderRadius: '50%',
                animation: 'pulse 2s infinite'
              }} />
              <span style={{
                fontSize: '12px',
                color: 'rgba(255,255,255,0.9)',
                fontWeight: '500'
              }}>
                Online • AI Powered
              </span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div
            onClick={() => setIsMinimized(!isMinimized)}
            style={{
              width: '32px',
              height: '32px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          >
            {isMinimized ? <Maximize2 size={16} color="white" /> : <Minimize2 size={16} color="white" />}
          </div>
          <div
            onClick={() => setIsOpen(false)}
            style={{
              width: '32px',
              height: '32px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          >
            <X size={16} color="white" />
          </div>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Quick Actions */}
          {messages.length === 1 && (
            <div style={{
              padding: '16px',
              background: '#f9fafb',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <p style={{
                margin: '0 0 12px 0',
                fontSize: '13px',
                fontWeight: '600',
                color: '#6b7280'
              }}>
                Quick Actions:
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '8px'
              }}>
                {quickActions.map((action, index) => (
                  <div
                    key={index}
                    onClick={() => handleQuickAction(action.query)}
                    style={{
                      padding: '12px',
                      background: 'white',
                      border: `2px solid ${action.color}20`,
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${action.color}10`;
                      e.currentTarget.style.borderColor = `${action.color}40`;
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.borderColor = `${action.color}20`;
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{ color: action.color }}>
                      {action.icon}
                    </div>
                    <span style={{
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#1f2937'
                    }}>
                      {action.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Messages Area */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px',
            background: '#f9fafb'
          }}>
            {messages.map((message) => (
              <div key={message.id}>
                <div style={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  marginBottom: '16px'
                }}>
                  {message.sender === 'bot' && (
                    <div style={{
                      width: '32px',
                      height: '32px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '12px',
                      flexShrink: 0
                    }}>
                      <Bot size={18} color="white" />
                    </div>
                  )}
                  <div style={{
                    maxWidth: '80%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: message.sender === 'user' ? 'flex-end' : 'flex-start'
                  }}>
                    <div style={{
                      padding: '12px 16px',
                      borderRadius: message.sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      background: message.sender === 'user' 
                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                        : 'white',
                      color: message.sender === 'user' ? 'white' : '#1f2937',
                      fontSize: '14px',
                      lineHeight: '1.6',
                      whiteSpace: 'pre-line',
                      boxShadow: message.sender === 'bot' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none'
                    }}>
                      {message.text}
                    </div>
                    <span style={{
                      fontSize: '11px',
                      color: '#9ca3af',
                      marginTop: '4px',
                      fontWeight: '500'
                    }}>
                      {message.timestamp.toLocaleTimeString('en-US', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                  {message.sender === 'user' && (
                    <div style={{
                      width: '32px',
                      height: '32px',
                      background: '#e0e7ff',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginLeft: '12px',
                      flexShrink: 0
                    }}>
                      <UserIcon size={18} color="#667eea" />
                    </div>
                  )}
                </div>

                {/* Suggestions */}
                {message.sender === 'bot' && message.suggestions && (
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginBottom: '16px',
                    marginLeft: '44px'
                  }}>
                    {message.suggestions.map((suggestion, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSuggestionClick(suggestion)}
                        style={{
                          padding: '8px 14px',
                          background: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '20px',
                          fontSize: '12px',
                          color: '#667eea',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#667eea';
                          e.currentTarget.style.color = 'white';
                          e.currentTarget.style.borderColor = '#667eea';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'white';
                          e.currentTarget.style.color = '#667eea';
                          e.currentTarget.style.borderColor = '#e5e7eb';
                        }}
                      >
                        <Sparkles size={12} />
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Bot size={18} color="white" />
                </div>
                <div style={{
                  padding: '12px 16px',
                  background: 'white',
                  borderRadius: '16px 16px 16px 4px',
                  display: 'flex',
                  gap: '4px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}>
                  {[0, 1, 2].map(i => (
                    <div
                      key={i}
                      style={{
                        width: '8px',
                        height: '8px',
                        background: '#667eea',
                        borderRadius: '50%',
                        animation: `bounce 1.4s infinite ease-in-out`,
                        animationDelay: `${i * 0.16}s`
                      }}
                    />
                  ))}
                </div>
                <style>{`
                  @keyframes bounce {
                    0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
                    40% { transform: scale(1); opacity: 1; }
                  }
                `}</style>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{
            padding: '16px',
            background: 'white',
            borderTop: '1px solid #e5e7eb'
          }}>
            <div style={{
              display: 'flex',
              gap: '12px',
              alignItems: 'center'
            }}>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything about CA exams..."
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  fontFamily: 'inherit'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
              <div
                onClick={handleSendMessage}
                style={{
                  width: '44px',
                  height: '44px',
                  background: inputValue.trim() 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : '#e5e7eb',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s',
                  boxShadow: inputValue.trim() ? '0 4px 12px rgba(102,126,234,0.3)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (inputValue.trim()) {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <Send size={20} color={inputValue.trim() ? 'white' : '#9ca3af'} />
              </div>
            </div>
            <p style={{
              margin: '8px 0 0 0',
              fontSize: '11px',
              color: '#9ca3af',
              textAlign: 'center'
            }}>
              Powered by AI • Trained on CA content from across India
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default CAChatbot;