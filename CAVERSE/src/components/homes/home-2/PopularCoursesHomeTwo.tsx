import { Link } from "react-router-dom";

const PopularCoursesHomeTwo = () => {
  const testSeries = [
    {
      id: 1,
      level: "Foundation",
      title: "CA Foundation Test Series",
      description: "Master the basics with comprehensive practice tests",
      icon: "📚",
      features: [
        "Chapter-wise Tests",
        "Full Syllabus Mocks",
        "ICAI Pattern",
        "Detailed Solutions"
      ],
      students: "2,500+",
      tests: "50+",
      rating: "4.8"
    },
    {
      id: 2,
      level: "Intermediate",
      title: "CA Intermediate Test Series",
      description: "Advance your preparation with expert-level practice",
      icon: "🎯",
      features: [
        "Group-wise Tests",
        "Advanced Problems",
        "Time Management",
        "Performance Analytics"
      ],
      students: "3,200+",
      tests: "75+",
      rating: "4.9",
      popular: true
    },
    {
      id: 3,
      level: "Final",
      title: "CA Final Test Series",
      description: "Excel in your final exams with intensive practice",
      icon: "🏆",
      features: [
        "Case Studies",
        "Exam Simulation",
        "Expert Evaluation",
        "Rank Prediction"
      ],
      students: "1,800+",
      tests: "100+",
      rating: "4.9"
    }
  ];

  return (
    <>
      <section
        style={{
          padding: '80px 20px',
          background: '#f8fafc',
          fontFamily: '"Outfit", system-ui, sans-serif',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
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
              Test Series
            </div>
            <h2
              style={{
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: 700,
                color: '#0f172a',
                margin: '0 0 16px',
                lineHeight: 1.2,
              }}
            >
              Choose Your CA Level
            </h2>
            <p
              style={{
                fontSize: '18px',
                color: '#475569',
                maxWidth: '600px',
                margin: '0 auto',
                lineHeight: 1.6,
              }}
            >
              Comprehensive test series designed for Foundation, Intermediate, and Final levels
            </p>
          </div>

          {/* Test Series Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px',
              marginBottom: '40px',
            }}
          >
            {testSeries.map((series) => (
              <div
                key={series.id}
                style={{
                  position: 'relative',
                  background: 'white',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: series.popular
                    ? '0 20px 60px rgba(30, 64, 175, 0.15)'
                    : '0 4px 20px rgba(15, 23, 42, 0.08)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: series.popular ? 'scale(1.03)' : 'scale(1)',
                  border: '1px solid #e2e8f0',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px) scale(1.03)';
                  e.currentTarget.style.boxShadow = '0 30px 80px rgba(37, 99, 235, 0.25)';
                  e.currentTarget.style.borderColor = '#60a5fa';
                  const header = e.currentTarget.querySelector('[data-card-header]') as HTMLElement | null;
                  if (header) {
                    header.style.background = '#1d4ed8';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = series.popular ? 'scale(1.03)' : 'scale(1)';
                  e.currentTarget.style.boxShadow = series.popular
                    ? '0 20px 60px rgba(30, 64, 175, 0.15)'
                    : '0 4px 20px rgba(15, 23, 42, 0.08)';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  const header = e.currentTarget.querySelector('[data-card-header]') as HTMLElement | null;
                  if (header) {
                    header.style.background = '#2563eb';
                  }
                }}
              >
                {/* Popular Badge */}
                {series.popular && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '20px',
                      right: '20px',
                      background: '#1e40af',
                      color: 'white',
                      padding: '6px 16px',
                      borderRadius: '9999px',
                      fontSize: '12px',
                      fontWeight: 700,
                      zIndex: 2,
                      boxShadow: '0 4px 12px rgba(30, 64, 175, 0.3)',
                    }}
                  >
                    MOST POPULAR
                  </div>
                )}

                {/* Header */}
                <div
                  data-card-header
                  style={{
                    background: '#2563eb',
                    padding: '40px 32px',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'background 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  {/* Decorative circles */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '-50px',
                      right: '-50px',
                      width: '150px',
                      height: '150px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.1)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-30px',
                      left: '-30px',
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.1)',
                    }}
                  />

                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div
                      style={{
                        fontSize: '48px',
                        marginBottom: '16px',
                      }}
                    >
                      {series.icon}
                    </div>
                    <h3
                      style={{
                        fontSize: '28px',
                        fontWeight: 700,
                        color: 'white',
                        margin: '0 0 8px',
                      }}
                    >
                      {series.level}
                    </h3>
                    <p
                      style={{
                        fontSize: '15px',
                        color: 'rgba(255,255,255,0.9)',
                        margin: 0,
                        lineHeight: 1.5,
                      }}
                    >
                      {series.description}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '32px' }}>
                  {/* Stats */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr 1fr',
                      gap: '16px',
                      marginBottom: '24px',
                      paddingBottom: '24px',
                      borderBottom: '2px solid #f1f5f9',
                    }}
                  >
                    <div style={{ textAlign: 'center' }}>
                      <div
                        style={{
                          fontSize: '22px',
                          fontWeight: 800,
                          color: '#0f172a',
                          marginBottom: '4px',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {series.students}
                      </div>
                      <div style={{ 
                        fontSize: '12px', 
                        color: '#64748b',
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}>Students</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div
                        style={{
                          fontSize: '22px',
                          fontWeight: 800,
                          color: '#0f172a',
                          marginBottom: '4px',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {series.tests}
                      </div>
                      <div style={{ 
                        fontSize: '12px', 
                        color: '#64748b',
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}>Tests</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div
                        style={{
                          fontSize: '22px',
                          fontWeight: 800,
                          color: '#0f172a',
                          marginBottom: '4px',
                          letterSpacing: '-0.02em',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '4px',
                        }}
                      >
                        <span>⭐</span> {series.rating}
                      </div>
                      <div style={{ 
                        fontSize: '12px', 
                        color: '#64748b',
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}>Rating</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '14px',
                      marginBottom: '28px',
                    }}
                  >
                    {series.features.map((feature, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          transition: 'transform 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateX(4px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateX(0)';
                        }}
                      >
                        <div
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            background: '#2563eb',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            transition: 'all 0.3s ease',
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
                        <span
                          style={{
                            fontSize: '15px',
                            color: '#1e293b',
                            fontWeight: 500,
                            letterSpacing: '-0.01em',
                          }}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link
                    to="/courses"
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '16px',
                      background: '#2563eb',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontWeight: 600,
                      textAlign: 'center',
                      textDecoration: 'none',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: '0 4px 15px rgba(37, 99, 235, 0.25)',
                      letterSpacing: '-0.01em',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#1d4ed8';
                      e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 8px 30px rgba(37, 99, 235, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#2563eb';
                      e.currentTarget.style.transform = 'translateY(0) scale(1)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(37, 99, 235, 0.25)';
                    }}
                  >
                    Explore Test Series →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div
            style={{
              textAlign: 'center',
              padding: '40px',
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(15, 23, 42, 0.08)',
              border: '1px solid #e2e8f0',
            }}
          >
            <h3
              style={{
                fontSize: '26px',
                fontWeight: 700,
                color: '#0f172a',
                margin: '0 0 12px',
                letterSpacing: '-0.02em',
              }}
            >
              Not sure which level to choose?
            </h3>
            <p
              style={{
                fontSize: '16px',
                color: '#475569',
                marginBottom: '24px',
                lineHeight: 1.6,
                fontWeight: 500,
              }}
            >
              Our expert mentors can guide you to select the right test series for your preparation
            </p>
            <Link
              to="/courses"
              style={{
                display: 'inline-block',
                padding: '14px 32px',
                background: '#2563eb',
                color: 'white',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 4px 15px rgba(37, 99, 235, 0.25)',
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1d4ed8';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(37, 99, 235, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#2563eb';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(37, 99, 235, 0.25)';
              }}
            >
              View All Test Series
            </Link>
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

export default PopularCoursesHomeTwo;