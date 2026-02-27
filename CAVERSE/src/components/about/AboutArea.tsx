import { useNavigate } from "react-router-dom";
import Count from "../../common/Count";

const AboutArea = () => {
  const navigate = useNavigate();
  return (
    <>
      <section 
        className="about-section fix"
        style={{
          background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f1f3f5 100%)',
          padding: '100px 0',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background Decorative Elements */}
        <div 
          style={{
            position: 'absolute',
            top: '10%',
            right: '-5%',
            width: '300px',
            height: '300px',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%)',
            borderRadius: '50%',
            filter: 'blur(60px)',
            zIndex: 0
          }}
        />
        <div 
          style={{
            position: 'absolute',
            bottom: '15%',
            left: '-3%',
            width: '250px',
            height: '250px',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%)',
            borderRadius: '50%',
            filter: 'blur(50px)',
            zIndex: 0
          }}
        />

        <div className="about-wrapper-5" style={{ position: 'relative', zIndex: 1 }}>
          <div className="container">
            <div className="row g-5 align-items-center">
              {/* Left Column - Content */}
              <div className="col-lg-6">
                <div className="section-title mb-4">
                  {/* Badge */}
                  <div 
                    className="wow fadeInUp"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 20px',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                      borderRadius: '50px',
                      marginBottom: '24px',
                      boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
                    }}
                  >
                    <span style={{ fontSize: '20px' }}>🎯</span>
                    <h6 
                      style={{
                        margin: 0,
                        color: '#ffffff',
                        fontSize: '14px',
                        fontWeight: 600,
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase'
                      }}
                    >
                      About CaVerse
                    </h6>
                  </div>

                  {/* Main Heading */}
                  <h2 
                    className="wow fadeInUp" 
                    data-wow-delay=".2s"
                    style={{
                      fontSize: 'clamp(32px, 5vw, 48px)',
                      fontWeight: 800,
                      lineHeight: '1.2',
                      color: '#1a1a2e',
                      marginBottom: '24px',
                      background: 'linear-gradient(135deg, #1a1a2e 0%, #2563eb 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    Empowering CA Aspirants to
                    <span style={{ display: 'block', marginTop: '8px' }}>
                      Achieve Excellence
                    </span>
                  </h2>

                  {/* Description */}
                  <p 
                    className="wow fadeInUp" 
                    data-wow-delay=".3s"
                    style={{
                      fontSize: '17px',
                      lineHeight: '1.8',
                      color: '#4b5563',
                      marginBottom: '32px'
                    }}
                  >
                    CaVerse is India's most comprehensive platform for CA exam preparation,
                    offering cutting-edge test series, expert guidance, and personalized
                    learning paths to help you conquer every level of the CA examination journey.
                  </p>

                  {/* Feature Highlights */}
                  <div 
                    className="wow fadeInUp" 
                    data-wow-delay=".4s"
                    style={{ marginBottom: '32px' }}
                  >
                    {[
                      { icon: '✓', text: 'AI-Powered Mock Tests & Analytics', color: '#3b82f6' },
                      { icon: '✓', text: 'Expert Faculty from Top CA Institutes', color: '#10b981' },
                      { icon: '✓', text: 'Real Exam Pattern & Difficulty Level', color: '#8b5cf6' },
                      { icon: '✓', text: '24/7 Doubt Resolution Support', color: '#f59e0b' }
                    ].map((feature, index) => (
                      <div 
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          marginBottom: '16px'
                        }}
                      >
                        <div 
                          style={{
                            width: '28px',
                            height: '28px',
                            background: `${feature.color}15`,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}
                        >
                          <span style={{ color: feature.color, fontWeight: 700, fontSize: '16px' }}>
                            {feature.icon}
                          </span>
                        </div>
                        <span 
                          style={{
                            fontSize: '15px',
                            color: '#374151',
                            fontWeight: 500
                          }}
                        >
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div 
                    className="wow fadeInUp" 
                    data-wow-delay=".5s"
                    style={{
                      display: 'flex',
                      gap: '16px',
                      flexWrap: 'wrap'
                    }}
                  >
                    <button
                      style={{
                        padding: '16px 32px',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '16px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.5)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.4)';
                      }}
                      onClick={() => navigate("/register")}
                    >
                      Start Free Trial
                      <span>→</span>
                    </button>
                    <button
                      style={{
                        padding: '16px 32px',
                        background: 'white',
                        color: '#3b82f6',
                        border: '2px solid #3b82f6',
                        borderRadius: '12px',
                        fontSize: '16px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = '#eff6ff';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'white';
                      }}
                     onClick={() => navigate("/courses")}
                    >
                      View Test Series
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column - Stats & Achievements */}
              <div className="col-lg-6">
                <div className="about-content">
                  {/* Main Stats Card */}
                  <div 
                    className="wow fadeInUp" 
                    data-wow-delay=".3s"
                    style={{
                      background: 'white',
                      borderRadius: '24px',
                      padding: '40px',
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                      marginBottom: '24px',
                      border: '1px solid #e5e7eb'
                    }}
                  >
                    <div className="counter-box-items">
                      <div 
                        className="counter-content"
                        style={{
                          textAlign: 'center',
                          marginBottom: '24px'
                        }}
                      >
                        <div 
                          style={{
                            display: 'inline-block',
                            padding: '20px',
                            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                            borderRadius: '20px',
                            marginBottom: '16px',
                            boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)'
                          }}
                        >
                          <span style={{ fontSize: '40px' }}>🏆</span>
                        </div>
                        <h2 
                          style={{
                            fontSize: '56px',
                            fontWeight: 800,
                            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            marginBottom: '8px'
                          }}
                        >
                          {/* <Count number={10} text='+' /> */}
                        </h2>
                        <p 
                          style={{
                            fontSize: '18px',
                            fontWeight: 600,
                            color: '#1f2937',
                            margin: 0
                          }}
                        >
                          Excellence in CA Coaching
                        </p>
                      </div>

                      <p 
                        className="text"
                        style={{
                          fontSize: '15px',
                          lineHeight: '1.8',
                          color: '#6b7280',
                          textAlign: 'center',
                          padding: '0 20px'
                        }}
                      >
                        Trusted by thousands of CA students across India, CaVerse has
                        consistently delivered exceptional results with our scientifically
                        designed test series and mentorship programs.
                      </p>
                    </div>
                  </div>

                  {/* Additional Stats Grid */}
                  <div 
                    className="wow fadeInUp" 
                    data-wow-delay=".4s"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: '16px'
                    }}
                  >
                    {[
                      { number: 12500, suffix: '+', label: 'Active Students', icon: '👨‍🎓', color: '#3b82f6' },
                      { number: 90, suffix: '%', label: 'Success Rate', icon: '📊', color: '#10b981' },
                      { number: 100, suffix: '+', label: 'Mock Tests', icon: '📝', color: '#8b5cf6' },
                      { number: 150, suffix: '+', label: 'Expert Faculty', icon: '👩‍🏫', color: '#f59e0b' }
                    ].map((stat, index) => (
                      <div 
                        key={index}
                        style={{
                          background: 'white',
                          borderRadius: '16px',
                          padding: '24px',
                          textAlign: 'center',
                          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.06)',
                          border: '1px solid #e5e7eb',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = 'translateY(-5px)';
                          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.06)';
                        }}
                      >
                        <div 
                          style={{
                            fontSize: '32px',
                            marginBottom: '8px'
                          }}
                        >
                          {stat.icon}
                        </div>
                        <h3 
                          style={{
                            fontSize: '32px',
                            fontWeight: 800,
                            color: stat.color,
                            margin: '0 0 4px',
                            lineHeight: 1
                          }}
                        >
                          <Count number={stat.number} text={stat.suffix} />
                        </h3>
                        <p 
                          style={{
                            fontSize: '13px',
                            fontWeight: 600,
                            color: '#6b7280',
                            margin: 0,
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                          }}
                        >
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Trust Badges */}
                  <div 
                    className="wow fadeInUp" 
                    data-wow-delay=".5s"
                    style={{
                      marginTop: '24px',
                      padding: '24px',
                      background: 'linear-gradient(135deg, #eff6ff 0%, #f0f9ff 100%)',
                      borderRadius: '16px',
                      border: '1px solid #bfdbfe'
                    }}
                  >
                    <div 
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '16px',
                        flexWrap: 'wrap'
                      }}
                    >
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', marginBottom: '4px' }}>⭐</div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#1e40af' }}>
                          4.9/5 Rating
                        </div>
                      </div>
                      <div 
                        style={{
                          width: '1px',
                          height: '40px',
                          background: '#93c5fd'
                        }}
                      />
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', marginBottom: '4px' }}>🎓</div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#1e40af' }}>
                          Students Love
                        </div>
                      </div>
                      <div 
                        style={{
                          width: '1px',
                          height: '40px',
                          background: '#93c5fd'
                        }}
                      />
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '24px', marginBottom: '4px' }}>🏅</div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#1e40af' }}>
                          Award Winning
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section - Key Differentiators */}
            <div 
              className="row mt-5 wow fadeInUp" 
              data-wow-delay=".6s"
            >
              <div className="col-12">
                <div 
                  style={{
                    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                    borderRadius: '24px',
                    padding: '48px',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Decorative Elements */}
                  <div 
                    style={{
                      position: 'absolute',
                      top: '-50px',
                      right: '-50px',
                      width: '200px',
                      height: '200px',
                      background: 'rgba(59, 130, 246, 0.1)',
                      borderRadius: '50%',
                      filter: 'blur(40px)'
                    }}
                  />

                  <h3 
                    style={{
                      fontSize: '28px',
                      fontWeight: 700,
                      color: 'white',
                      textAlign: 'center',
                      marginBottom: '40px'
                    }}
                  >
                    Why Choose CaVerse?
                  </h3>

                  <div 
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                      gap: '24px'
                    }}
                  >
                    {[
                      {
                        icon: '🎯',
                        title: 'Exam-Oriented Approach',
                        description: 'Questions designed by CA rankers to match actual exam patterns'
                      },
                      {
                        icon: '📈',
                        title: 'Performance Analytics',
                        description: 'Detailed insights and progress tracking with AI-powered recommendations'
                      },
                      {
                        icon: '💡',
                        title: 'Adaptive Learning',
                        description: 'Personalized test series based on your strengths and weaknesses'
                      },
                      {
                        icon: '🤝',
                        title: 'Peer Comparison',
                        description: 'Compare your performance with thousands of CA aspirants nationwide'
                      }
                    ].map((item, index) => (
                      <div 
                        key={index}
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          backdropFilter: 'blur(10px)',
                          borderRadius: '16px',
                          padding: '24px',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                          e.currentTarget.style.transform = 'translateY(-5px)';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <div 
                          style={{
                            fontSize: '40px',
                            marginBottom: '16px'
                          }}
                        >
                          {item.icon}
                        </div>
                        <h4 
                          style={{
                            fontSize: '18px',
                            fontWeight: 700,
                            color: 'white',
                            marginBottom: '8px'
                          }}
                        >
                          {item.title}
                        </h4>
                        <p 
                          style={{
                            fontSize: '14px',
                            color: '#cbd5e1',
                            margin: 0,
                            lineHeight: '1.6'
                          }}
                        >
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutArea;