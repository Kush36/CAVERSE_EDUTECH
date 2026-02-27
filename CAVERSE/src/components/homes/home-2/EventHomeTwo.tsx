/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
 
import { useState } from 'react';
import { Link } from 'react-router-dom';

const event_data = [
  {
    id: '1', 
    date: "28",
    month: "Feb 2026",
    title: "Interactive Study Collaborate Conquer",
    description: "Master collaborative learning techniques and study strategies",
    location: "Telegram & Discord",
    time: "09:30am",
    image: "/assets/img/event/list/01.jpg",
    tag: "Study Skills"
  },
  {
    id: '2', 
    date: "15",
    month: "Mar 2026",
    title: "Time Management Skills for Learning",
    description: "Learn to balance study time and maximize productivity",
    location: "Telegram & Discord",
    time: "09:30am",
    image: "/assets/img/event/list/02.jpg",
    tag: "Productivity"
  },
  {
    id: '3', 
    date: "30",
    month: "Mar 2026",
    title: "Boost Memory Study Hacks Work",
    description: "Proven techniques to enhance memory retention and recall",
    location: "Telegram & Discord",
    time: "09:30am",
    image: "/assets/img/event/list/03.jpg",
    tag: "Memory"
  },
  {
    id: '4', 
    date: "14",
    month: "Apr 2026",
    title: "Note-Taking Mastery Best Techniques",
    description: "Transform your note-taking into a powerful learning tool",
    location: "Telegram & Discord",
    time: "09:30am",
    image: "/assets/img/event/list/04.jpg",
    tag: "Techniques"
  },
]

const EventHomeTwo = () => {
  
  // State to track the active index
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Google Form URL
  const googleFormUrl = "https://forms.gle/HuWo6SKiKUPrCGAN8";

  // Function to handle setting the active index
  const handleActive = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  // Function to handle Join Free button click
  const handleJoinFree = (eventName: string) => {
    window.open(googleFormUrl, '_blank');
  };
 
  return (
    <>
      <style>
        {`
          .premium-event-card {
            background: linear-gradient(145deg, #ffffff, #f8f9fa);
            border-radius: 20px;
            padding: 25px;
            margin-bottom: 30px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid rgba(255, 255, 255, 0.8);
            position: relative;
            overflow: hidden;
          }

          .premium-event-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, #ff6b35, #f7931e, #ffc107);
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .premium-event-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
          }

          .premium-event-card:hover::before {
            opacity: 1;
          }

          .premium-event-wrapper {
            display: flex;
            align-items: center;
            gap: 30px;
            flex-wrap: wrap;
          }

          .premium-date-box {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 16px;
            padding: 20px;
            min-width: 90px;
            text-align: center;
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
            flex-shrink: 0;
          }

          .premium-date-box h2 {
            color: #ffffff;
            font-size: 42px;
            font-weight: 700;
            margin: 0;
            line-height: 1;
          }

          .premium-date-box span {
            color: rgba(255, 255, 255, 0.9);
            font-size: 13px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            display: block;
            margin-top: 5px;
          }

          .premium-event-image {
            width: 120px;
            height: 120px;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
            flex-shrink: 0;
            position: relative;
          }

          .premium-event-image::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.2) 100%);
            pointer-events: none;
          }

          .premium-event-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.4s ease;
          }

          .premium-event-card:hover .premium-event-image img {
            transform: scale(1.1);
          }

          .premium-event-content {
            flex: 1;
            min-width: 300px;
          }

          .premium-event-tag {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #ffffff;
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 12px;
          }

          .premium-event-title {
            font-size: 22px;
            font-weight: 700;
            color: #2d3748;
            margin-bottom: 8px;
            line-height: 1.4;
            transition: color 0.3s ease;
          }

          .premium-event-card:hover .premium-event-title {
            color: #667eea;
          }

          .premium-event-description {
            color: #718096;
            font-size: 14px;
            margin-bottom: 15px;
            line-height: 1.6;
          }

          .premium-event-meta {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
            align-items: center;
          }

          .premium-meta-item {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #4a5568;
            font-size: 14px;
            font-weight: 500;
          }

          .premium-meta-item i {
            color: #667eea;
            font-size: 16px;
          }

          .premium-free-badge {
            background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
            color: #ffffff;
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            box-shadow: 0 4px 12px rgba(72, 187, 120, 0.3);
          }

          .premium-join-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #ffffff;
            border: none;
            padding: 14px 32px;
            border-radius: 12px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
            text-transform: uppercase;
            letter-spacing: 0.5px;
            flex-shrink: 0;
          }

          .premium-join-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
            background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
          }

          .premium-join-btn:active {
            transform: translateY(0);
          }

          .premium-register-btn {
            background: linear-gradient(135deg, #f7931e 0%, #ff6b35 100%);
            color: #ffffff;
            border: none;
            padding: 18px 48px;
            border-radius: 14px;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 8px 25px rgba(247, 147, 30, 0.3);
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .premium-register-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 35px rgba(247, 147, 30, 0.4);
            background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          }

          .premium-section-title h6 {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 2px;
          }

          @media (max-width: 768px) {
            .premium-event-wrapper {
              flex-direction: column;
              align-items: flex-start;
            }

            .premium-event-image {
              width: 100%;
              height: 200px;
            }

            .premium-join-btn {
              width: 100%;
            }
          }
        `}
      </style>

      <section className="event-section fix section-padding section-bg pb-0">
        <div className="container">
          <div className="section-title text-center premium-section-title">
            <h6 className="wow fadeInUp">
              Live CA Strategy Sessions & Mentorship Webinars
            </h6>
            <h2 className="wow fadeInUp" data-wow-delay=".3s">
              Exam-focused sessions designed to improve planning, answer writing, and confidence.
            </h2>
          </div>
          
          <div className="row">
            <div className="col-lg-12">
              {event_data.map((item, index) => (
                <div 
                  key={index} 
                  className="premium-event-card wow fadeInUp" 
                  data-wow-delay={`${0.1 * (index + 1)}s`}
                >
                  <div className="premium-event-wrapper">
                    <div className="premium-date-box">
                      <h2>{item.date}</h2>
                      <span>{item.month}</span>
                    </div>

                    <div className="premium-event-image">
                      <img src={item.image} alt={item.title} />
                    </div>

                    <div className="premium-event-content">
                      <span className="premium-event-tag">{item.tag}</span>
                      <h4 className="premium-event-title">
                        <Link to="/event-details">{item.title}</Link>
                      </h4>
                      <p className="premium-event-description">{item.description}</p>
                      <div className="premium-event-meta">
                        <div className="premium-meta-item">
                          <i className="fab fa-telegram"></i>
                          <span>Telegram</span>
                        </div>
                        <div className="premium-meta-item">
                          <i className="fab fa-discord"></i>
                          <span>Discord</span>
                        </div>
                        <div className="premium-meta-item">
                          <i className="far fa-clock"></i>
                          <span>{item.time}</span>
                        </div>
                        <div className="premium-free-badge">
                          <i className="fas fa-star"></i>
                          FREE
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleJoinFree(item.title)} 
                      className="premium-join-btn"
                    >
                      Join Free
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="event-button text-center mt-5 wow fadeInUp" data-wow-delay=".3s">
            <button 
              onClick={() => handleJoinFree("All Events")} 
              className="premium-register-btn"
            >
              Register Free
            </button>
          </div>
        </div>

        <div className="mycustom-marque style-two">
          <div className="scrolling-wrap style-2">
            <div className="comm">
              <div className="cmn-textslide stroke-text">Upcoming</div>
              <div className="cmn-textslide stroke-text">Events</div>
              <div className="cmn-textslide stroke-text">&</div>
              <div className="cmn-textslide stroke-text">Program</div>
            </div>
            <div className="comm">
              <div className="cmn-textslide stroke-text">Upcoming</div>
              <div className="cmn-textslide stroke-text">Events</div>
              <div className="cmn-textslide stroke-text">&</div>
              <div className="cmn-textslide stroke-text">Program</div>
            </div>
            <div className="comm">
              <div className="cmn-textslide stroke-text">Upcoming</div>
              <div className="cmn-textslide stroke-text">Events</div>
              <div className="cmn-textslide stroke-text">&</div>
              <div className="cmn-textslide stroke-text">Program</div>
            </div>
            <div className="comm">
              <div className="cmn-textslide stroke-text">Upcoming</div>
              <div className="cmn-textslide stroke-text">Events</div>
              <div className="cmn-textslide stroke-text">&</div>
              <div className="cmn-textslide stroke-text">Program</div>
            </div>
            <div className="comm">
              <div className="cmn-textslide stroke-text">Upcoming</div>
              <div className="cmn-textslide stroke-text">Events</div>
              <div className="cmn-textslide stroke-text">&</div>
              <div className="cmn-textslide stroke-text">Program</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventHomeTwo;