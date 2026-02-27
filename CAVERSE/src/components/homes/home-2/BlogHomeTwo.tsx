import { Link } from "react-router-dom";
const BlogHomeTwo = () => {
  return (
    <>
      <section className="news-section fix section-padding section-bg">
            <div className="container">
                <div className="section-title text-center text-center">
                    <h6 className="wow fadeInUp">
                        News & Blog 
                    </h6>
                    <h2 className="wow fadeInUp" data-wow-delay=".3s">Latest Blog & Insights</h2>
                </div>
                <div className="row">
                    <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".2s">
                        <div className="news-card-items">
                            <div className="news-image">
                                <img src="assets/img/news/04.jpg" alt="img" />
                                <img src="assets/img/news/04.jpg" alt="img" />
                                <div className="post-cat">
                                    Exams
                                </div>
                            </div>
                            <div className="news-content">
                                <ul className="post-meta">
                                    <li>
                                        <i className="far fa-calendar-alt"></i>
                                        07 April 2025
                                    </li>
                                    <li>
                                        <i className="far fa-user"></i>
                                        From - ICAI
                                    </li>
                                </ul>
                                <h5>
                                    <Link to="https://www.theaccountant-online.com/news/icai-eligibility-criteria-ca-exams/">
                                        Power Lifelong Learning
                                        Education Never Stops
                                    </Link>
                                </h5>
                                <Link to="https://www.theaccountant-online.com/news/icai-eligibility-criteria-ca-exams/" >Read More <i className="far fa-chevron-double-right"></i></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".4s">
                        <div className="news-card-items">
                            <div className="news-image">
                                <img src="assets/img/news/05.jpg" alt="img" />
                                <img src="assets/img/news/05.jpg" alt="img" />
                                <div className="post-cat">
                                    Motivation
                                </div>
                            </div>
                            <div className="news-content">
                                <ul className="post-meta">
                                    <li>
                                        <i className="far fa-calendar-alt"></i>
                                        02 feb 2026
                                    </li>
                                    <li>
                                        <i className="far fa-user"></i>
                                        From - ICAEW
                                    </li>
                                </ul>
                                <h5>
                                    <Link to="https://www.icaew.com/insights/viewpoints-on-the-news/2026/feb-2026/how-businesses-can-compete-for-accounting-talent">
                                        How to Stay Motivated during preparation
                                    </Link>
                                </h5>
                                <Link to="https://www.icaew.com/insights/viewpoints-on-the-news/2026/feb-2026/how-businesses-can-compete-for-accounting-talent" >Read More <i className="far fa-chevron-double-right"></i></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".6s">
                        <div className="news-card-items">
                            <div className="news-image">
                                <img src="assets/img/news/06.jpg" alt="img" />
                                <img src="assets/img/news/06.jpg" alt="img" />
                                <div className="post-cat">
                                    Parents_Expectation
                                </div>
                            </div>
                            <div className="news-content">
                                <ul className="post-meta">
                                    <li>
                                        <i className="far fa-calendar-alt"></i>
                                        20 Nov 2025
                                    </li>
                                    <li>
                                        <i className="far fa-user"></i>
                                        From -  NDTV
                                    </li>
                                </ul>
                                <h5>
                                    <Link to="https://www.ndtv.com/offbeat/viral-video-fathers-emotional-reaction-to-son-becoming-chartered-accountant-moves-internet-9580771">
                                        The Future of Education 
                                    </Link>
                                </h5>
                                <Link to="https://www.ndtv.com/offbeat/viral-video-fathers-emotional-reaction-to-son-becoming-chartered-accountant-moves-internet-9580771" >Read More <i className="far fa-chevron-double-right"></i></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp" data-wow-delay=".8s">
                        <div className="news-card-items">
                            <div className="news-image">
                                <img src="assets/img/news/07.jpg" alt="img" />
                                <img src="assets/img/news/07.jpg" alt="img" />
                                <div className="post-cat">
                                    Latest
                                </div>
                            </div>
                            <div className="news-content">
                                <ul className="post-meta">
                                    <li>
                                        <i className="far fa-calendar-alt"></i>
                                         Feb 2026
                                    </li>
                                    <li>
                                        <i className="far fa-user"></i>
                                        From-CFO
                                    </li>
                                </ul>
                                <h5>
                                    <Link to="https://cfo.economictimes.indiatimes.com/tag/chartered+accountants">
                                        Interactive Learning way <br />
                                         Power of CA
                                    </Link>
                                </h5>
                                <Link to="https://cfo.economictimes.indiatimes.com/tag/chartered+accountants" >Read More <i className="far fa-chevron-double-right"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  );
};

export default BlogHomeTwo;