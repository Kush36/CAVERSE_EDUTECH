const ContactArea = () => {
  const contactInfo = {
    social: {
      instagram: "https://www.instagram.com/caverse",
      telegram: "https://t.me/caverse",
      youtube: "https://www.youtube.com/@caverse",
      discord: "https://discord.gg/caverse"
    },
    email: "officialcaverse@gmail.com",
    phone: "+91 95485 99125"
  };

  return (
    <>
      <style>
        {`
          .premium-contact-section {
            background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 50%, #f8f9fa 100%);
            position: relative;
            overflow: hidden;
          }

          .premium-contact-section::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(102, 126, 234, 0.05) 0%, transparent 70%);
            animation: pulse 15s ease-in-out infinite;
          }

          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }

          .premium-section-title {
            margin-bottom: 60px;
            position: relative;
            z-index: 1;
          }

          .premium-section-title h6 {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-size: 14px;
            margin-bottom: 15px;
          }

          .premium-section-title h2 {
            color: #2d3748;
            font-weight: 700;
            font-size: 42px;
            margin: 0;
          }

          .premium-contact-card {
            background: #ffffff;
            border-radius: 24px;
            padding: 45px 35px;
            text-align: center;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid rgba(0, 0, 0, 0.05);
            position: relative;
            overflow: hidden;
            height: 100%;
            min-height: 380px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .premium-contact-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 5px;
            background: linear-gradient(90deg, #667eea, #764ba2, #f7931e);
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .premium-contact-card:hover {
            transform: translateY(-15px);
            box-shadow: 0 25px 70px rgba(0, 0, 0, 0.15);
          }

          .premium-contact-card:hover::before {
            opacity: 1;
          }

          .premium-icon-wrapper {
            width: 90px;
            height: 90px;
            margin: 0 auto 25px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
            transition: all 0.4s ease;
            position: relative;
          }

          .premium-contact-card:hover .premium-icon-wrapper {
            transform: scale(1.1) rotate(5deg);
            box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
          }

          .premium-icon-wrapper i,
          .premium-icon-wrapper img {
            font-size: 40px;
            color: #ffffff;
            transition: transform 0.3s ease;
          }

          .premium-icon-wrapper img {
            width: 40px;
            height: 40px;
            filter: brightness(0) invert(1);
          }

          .premium-contact-card:hover .premium-icon-wrapper i,
          .premium-contact-card:hover .premium-icon-wrapper img {
            transform: scale(1.15);
          }

          .premium-contact-title {
            font-size: 20px;
            font-weight: 700;
            color: #2d3748;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .premium-divider {
            width: 60px;
            height: 3px;
            background: linear-gradient(90deg, #667eea, #764ba2);
            margin: 0 auto 25px;
            border-radius: 5px;
          }

          .premium-contact-details {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .premium-contact-link {
            color: #4a5568;
            font-size: 16px;
            font-weight: 600;
            line-height: 1.8;
            transition: all 0.3s ease;
            display: block;
            position: relative;
            padding: 5px 0;
          }

          .premium-contact-link:hover {
            color: #667eea;
            transform: translateX(5px);
          }

          .premium-social-links {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }

          .premium-social-link {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            background: linear-gradient(145deg, #ffffff, #f8f9fa);
            color: #4a5568;
            padding: 12px 24px;
            border-radius: 30px;
            font-size: 15px;
            font-weight: 600;
            transition: all 0.3s ease;
            border: 1px solid rgba(0, 0, 0, 0.08);
            text-decoration: none;
          }

          .premium-social-link i {
            font-size: 18px;
            transition: transform 0.3s ease;
          }

          .premium-social-link:hover {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: #ffffff;
            transform: translateX(8px);
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
            border-color: transparent;
          }

          .premium-social-link:hover i {
            transform: scale(1.2);
          }

          .premium-social-link.instagram:hover {
            background: linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045);
          }

          .premium-social-link.telegram:hover {
            background: linear-gradient(135deg, #0088cc, #00aced);
          }

          .premium-social-link.youtube:hover {
            background: linear-gradient(135deg, #ff0000, #cc0000);
          }

          .premium-social-link.discord:hover {
            background: linear-gradient(135deg, #5865f2, #7289da);
          }

          .premium-email-link,
          .premium-phone-link {
            color: #4a5568;
            font-size: 18px;
            font-weight: 600;
            transition: all 0.3s ease;
            display: inline-block;
            position: relative;
          }

          .premium-email-link::after,
          .premium-phone-link::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, #667eea, #764ba2);
            transition: width 0.3s ease;
          }

          .premium-email-link:hover,
          .premium-phone-link:hover {
            color: #667eea;
          }

          .premium-email-link:hover::after,
          .premium-phone-link:hover::after {
            width: 100%;
          }

          .premium-badge {
            display: inline-block;
            background: linear-gradient(135deg, #48bb78, #38a169);
            color: #ffffff;
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-top: 15px;
            box-shadow: 0 4px 12px rgba(72, 187, 120, 0.3);
          }

          @media (max-width: 991px) {
            .premium-section-title h2 {
              font-size: 32px;
            }

            .premium-contact-card {
              margin-bottom: 30px;
            }
          }

          @media (max-width: 576px) {
            .premium-section-title h2 {
              font-size: 28px;
            }

            .premium-contact-card {
              padding: 35px 25px;
              min-height: 350px;
            }
          }
        `}
      </style>

      <section className="contact-section premium-contact-section section-padding pt-0 fix">
        <div className="container">
          <div className="section-title premium-section-title text-center">
            <h6 className="wow fadeInUp">Get In Touch</h6>
            <h2 className="wow fadeInUp" data-wow-delay=".3s">
              Need More Information?
            </h2>
          </div>
          <div className="row">
            {/* Social Media Card */}
            <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".3s">
              <div className="premium-contact-card">
                <div className="premium-icon-wrapper">
                  <i className="fab fa-instagram"></i>
                </div>
                <h5 className="premium-contact-title">Connect with us</h5>
                <div className="premium-divider"></div>
                <div className="premium-contact-details">
                  <div className="premium-social-links">
                    <a 
                      href={contactInfo.social.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="premium-social-link instagram"
                    >
                      <i className="fab fa-instagram"></i>
                      <span>Instagram</span>
                    </a>
                    <a 
                      href={contactInfo.social.telegram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="premium-social-link telegram"
                    >
                      <i className="fab fa-telegram"></i>
                      <span>Telegram</span>
                    </a>
                    <a 
                      href={contactInfo.social.youtube} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="premium-social-link youtube"
                    >
                      <i className="fab fa-youtube"></i>
                      <span>YouTube</span>
                    </a>
                    <a 
                      href={contactInfo.social.discord} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="premium-social-link discord"
                    >
                      <i className="fab fa-discord"></i>
                      <span>Discord</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".5s">
              <div className="premium-contact-card">
                <div className="premium-icon-wrapper">
                  <i className="flaticon-send-data"></i>
                </div>
                <h5 className="premium-contact-title">Email Address</h5>
                <div className="premium-divider"></div>
                <div className="premium-contact-details">
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className="premium-email-link"
                  >
                    {contactInfo.email}
                  </a>
                  <div className="premium-badge">
                    Response within 24 hours
                  </div>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".7s">
              <div className="premium-contact-card">
                <div className="premium-icon-wrapper">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <h5 className="premium-contact-title">Emergency Contact</h5>
                <div className="premium-divider"></div>
                <div className="premium-contact-details">
                  <a 
                    href={`tel:${contactInfo.phone}`}
                    className="premium-phone-link"
                  >
                    {contactInfo.phone}
                  </a>
                  <div className="premium-badge">
                    Available 9 AM - 9 PM IST
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

export default ContactArea;