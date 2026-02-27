import { Link } from "react-router-dom";

const NewsArea = () => {
  const newsData = [
    {
      id: 1,
      image: "assets/img/news/04.jpg",
      category: "Exams",
      categoryColor: "#667eea",
      date: "07 April 2025",
      source: "ICAI",
      title: "Power Lifelong Learning Education Never Stops",
      description: "Discover the latest updates on ICAI eligibility criteria for CA exams. Stay informed about the requirements and changes that affect your CA journey.",
      link: "https://www.theaccountant-online.com/news/icai-eligibility-criteria-ca-exams/"
    },
    {
      id: 2,
      image: "assets/img/news/05.jpg",
      category: "Motivation",
      categoryColor: "#48bb78",
      date: "02 Feb 2026",
      source: "ICAEW",
      title: "How to Stay Motivated during preparation",
      description: "Learn effective strategies to maintain motivation throughout your CA preparation. Expert insights on staying focused and achieving your goals.",
      link: "https://www.icaew.com/insights/viewpoints-on-the-news/2026/feb-2026/how-businesses-can-compete-for-accounting-talent"
    },
    {
      id: 3,
      image: "assets/img/news/06.jpg",
      category: "Parents Expectation",
      categoryColor: "#f7931e",
      date: "20 Nov 2025",
      source: "NDTV",
      title: "The Future of Education",
      description: "Watch the emotional moment that moved the internet - a father's reaction to his son becoming a Chartered Accountant. A testament to dedication and dreams.",
      link: "https://www.ndtv.com/offbeat/viral-video-fathers-emotional-reaction-to-son-becoming-chartered-accountant-moves-internet-9580771"
    },
    {
      id: 4,
      image: "assets/img/news/07.jpg",
      category: "Latest",
      categoryColor: "#764ba2",
      date: "Feb 2026",
      source: "CFO",
      title: "Interactive Learning way - Power of CA",
      description: "Explore the transformative power of interactive learning methods in CA education. Discover how modern techniques are reshaping accounting education.",
      link: "https://cfo.economictimes.indiatimes.com/tag/chartered+accountants"
    }
  ];

  return (
    <>
      <style>
        {`
          .premium-news-wrapper {
            background: linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%);
          }

          .premium-news-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
            margin-bottom: 40px;
          }

          .premium-news-card {
            background: #ffffff;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid rgba(0, 0, 0, 0.05);
            position: relative;
          }

          .premium-news-card:hover {
            transform: translateY(-12px);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          }

          .premium-news-image-wrapper {
            position: relative;
            overflow: hidden;
            height: 240px;
          }

          .premium-news-image-wrapper img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .premium-news-card:hover .premium-news-image-wrapper img {
            transform: scale(1.15);
          }

          .premium-news-image-wrapper::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.4) 100%);
            transition: opacity 0.3s ease;
          }

          .premium-news-card:hover .premium-news-image-wrapper::after {
            opacity: 0.7;
          }

          .premium-category-badge {
            position: absolute;
            top: 20px;
            left: 20px;
            padding: 8px 20px;
            border-radius: 25px;
            font-size: 12px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #ffffff;
            z-index: 2;
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          }

          .premium-news-content {
            padding: 30px;
          }

          .premium-news-meta {
            display: flex;
            gap: 20px;
            margin-bottom: 15px;
            flex-wrap: wrap;
          }

          .premium-meta-item {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #718096;
            font-size: 13px;
            font-weight: 500;
          }

          .premium-meta-item i {
            color: #667eea;
            font-size: 14px;
          }

          .premium-news-title {
            font-size: 20px;
            font-weight: 700;
            color: #2d3748;
            margin-bottom: 12px;
            line-height: 1.4;
            transition: color 0.3s ease;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .premium-news-title:hover {
            color: #667eea;
          }

          .premium-news-description {
            color: #718096;
            font-size: 14px;
            line-height: 1.7;
            margin-bottom: 20px;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .premium-read-more {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            color: #667eea;
            font-weight: 600;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            transition: all 0.3s ease;
            position: relative;
          }

          .premium-read-more::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, #667eea, #764ba2);
            transition: width 0.3s ease;
          }

          .premium-read-more:hover::after {
            width: 100%;
          }

          .premium-read-more:hover {
            color: #764ba2;
            transform: translateX(5px);
          }

          .premium-read-more i {
            transition: transform 0.3s ease;
          }

          .premium-read-more:hover i {
            transform: translateX(5px);
          }

          .premium-sidebar {
            position: sticky;
            top: 100px;
          }

          .premium-sidebar-widget {
            background: #ffffff;
            border-radius: 20px;
            padding: 30px;
            margin-bottom: 30px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
            border: 1px solid rgba(0, 0, 0, 0.05);
          }

          .premium-widget-title {
            font-size: 20px;
            font-weight: 700;
            color: #2d3748;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 3px solid;
            border-image: linear-gradient(90deg, #667eea, #764ba2) 1;
          }

          .premium-category-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .premium-category-list li {
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            padding: 12px 0;
            transition: padding-left 0.3s ease;
          }

          .premium-category-list li:last-child {
            border-bottom: none;
          }

          .premium-category-list li:hover {
            padding-left: 10px;
          }

          .premium-category-list a {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #4a5568;
            font-weight: 500;
            font-size: 15px;
            transition: color 0.3s ease;
          }

          .premium-category-list a:hover {
            color: #667eea;
          }

          .premium-category-count {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: #ffffff;
            padding: 4px 12px;
            border-radius: 15px;
            font-size: 12px;
            font-weight: 700;
          }

          .premium-tag-cloud {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }

          .premium-tag {
            background: linear-gradient(145deg, #ffffff, #f8f9fa);
            color: #4a5568;
            padding: 10px 20px;
            border-radius: 25px;
            font-size: 13px;
            font-weight: 600;
            transition: all 0.3s ease;
            border: 1px solid rgba(0, 0, 0, 0.08);
          }

          .premium-tag:hover {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: #ffffff;
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
          }

          .premium-pagination {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 50px;
          }

          .premium-page-link {
            width: 45px;
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #ffffff;
            border: 2px solid rgba(0, 0, 0, 0.08);
            border-radius: 12px;
            color: #4a5568;
            font-weight: 600;
            transition: all 0.3s ease;
          }

          .premium-page-link:hover,
          .premium-page-link.active {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: #ffffff;
            border-color: transparent;
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
          }

          @media (max-width: 768px) {
            .premium-news-grid {
              grid-template-columns: 1fr;
            }

            .premium-sidebar {
              position: static;
              margin-top: 40px;
            }
          }
        `}
      </style>

      <section className="blog-wrapper premium-news-wrapper section-padding pt-0">
        <div className="container">
          <div className="news-area">
            <div className="row">
              <div className="col-12 col-lg-8">
                <div className="premium-news-grid">
                  {newsData.map((item, index) => (
                    <div 
                      key={item.id} 
                      className="premium-news-card wow fadeInUp" 
                      data-wow-delay={`${0.2 * (index + 1)}s`}
                    >
                      <div className="premium-news-image-wrapper">
                        <img src={item.image} alt={item.title} />
                        <div 
                          className="premium-category-badge" 
                          style={{ backgroundColor: item.categoryColor }}
                        >
                          {item.category}
                        </div>
                      </div>
                      <div className="premium-news-content">
                        <div className="premium-news-meta">
                          <div className="premium-meta-item">
                            <i className="far fa-calendar-alt"></i>
                            <span>{item.date}</span>
                          </div>
                          <div className="premium-meta-item">
                            <i className="far fa-user"></i>
                            <span>From - {item.source}</span>
                          </div>
                        </div>
                        <h5 className="premium-news-title">
                          <Link to={item.link} target="_blank">
                            {item.title}
                          </Link>
                        </h5>
                        <p className="premium-news-description">
                          {item.description}
                        </p>
                        <Link to={item.link} target="_blank" className="premium-read-more">
                          Read More
                          <i className="far fa-chevron-double-right"></i>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="premium-pagination">
                  <a href="#" className="premium-page-link active">1</a>
                  <a href="#" className="premium-page-link">2</a>
                  <a href="#" className="premium-page-link">3</a>
                  <a href="#" className="premium-page-link">
                    <i className="far fa-arrow-right"></i>
                  </a>
                </div>
              </div>
              
              <div className="col-12 col-lg-4">
                <div className="premium-sidebar">
                  <div className="premium-sidebar-widget wow fadeInUp" data-wow-delay=".2s">
                    <h3 className="premium-widget-title">Categories</h3>
                    <ul className="premium-category-list">
                      <li>
                        <Link to="/news">
                          <span>CA Foundation</span>
                          <span className="premium-category-count">45</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/news">
                          <span>CA Intermediate</span>
                          <span className="premium-category-count">52</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/news">
                          <span>CA Final</span>
                          <span className="premium-category-count">38</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/news">
                          <span>Study Tips</span>
                          <span className="premium-category-count">67</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/news">
                          <span>Exam Updates</span>
                          <span className="premium-category-count">29</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/news">
                          <span>Mentorship</span>
                          <span className="premium-category-count">34</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="premium-sidebar-widget wow fadeInUp" data-wow-delay=".4s">
                    <h3 className="premium-widget-title">Popular Tags</h3>
                    <div className="premium-tag-cloud">
                      <Link to="/news" className="premium-tag">Test Series</Link>     
                      <Link to="/news" className="premium-tag">Mock Tests</Link>
                      <Link to="/news" className="premium-tag">Mentorship</Link>
                      <Link to="/news" className="premium-tag">Exam Strategy</Link>
                      <Link to="/news" className="premium-tag">Study Plan</Link>
                      <Link to="/news" className="premium-tag">Tips</Link>
                    </div>
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

export default NewsArea;