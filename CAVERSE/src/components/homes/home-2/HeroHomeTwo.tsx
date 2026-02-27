import { useState } from "react";
import { Link } from "react-router-dom";
// import Count from "../../../common/Count";
import VideoPopup from "../../../modals/VideoPopup";

const HeroHomeTwo = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <section className="hero-section hero-2 fix">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="hero-content">
                <h1 className="wow fadeInUp" data-wow-delay=".3s">
                  Clear, Structured ,Exam-Focused CA Preparation with
                  <span>
                    CaVerse{" "}
                    <img
                      src="assets/img/hero/bar-shape-2.png"
                      alt="shape-img"
                    />
                  </span>
                </h1>
                <p className="wow fadeInUp" data-wow-delay=".5s">
                 We help CA Foundation, Inter & Final students to prepare with clarity, discipline, and proven exam strategy—so effort finally turns into marks.
                </p>
                <div className="hero-button">
                  <Link
                    to="/courses"
                    className="theme-btn wow fadeInUp"
                    data-wow-delay=".3s"
                  >
                    Get My Test Plan
                  </Link>
                  <span
                    className="button-text wow fadeInUp"
                    data-wow-delay=".5s"
                  >
                    <a
                      onClick={() => setIsVideoOpen(true)}
                      style={{ cursor: "pointer" }}
                      className="video-btn video-popup"
                    >
                      <i className="fas fa-play"></i>
                    </a>
                    <span className="ms-3 d-line">Play Video</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-image-items">
                <div className="hero-image p-10">
                  <img
                    src="assets/img/hero/hero-2.png"
                    alt="Professional educator or student engaging with online learning platform, representing quality digital education in a modern classroom environment"
                    className="wow img-custom-anim-left"
                    data-wow-duration="1.5s"
                    data-wow-delay="0.1s"
                    width="500"
                    height="500"
                  />
                  <div className="hero-shape ">
                    <img
                      src="assets/img/hero/hero-shape.png"
                      alt="Decorative geometric shape element enhancing the hero section design"
                      className="wow img-custom-anim-top"
                      data-wow-duration="1.5s"
                      data-wow-delay="0.2s"
                    />
                  </div>
                  {/* <div className="counter-box float-bob-y">
                                    <p>Best Test Series for</p>
                                    <h2><span className="odometer" data-count="2800">
                                        <Count number={99} text='%' />
                                        </span></h2>
                                    <p>Selection</p>
                                </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* video modal start */}
      <VideoPopup
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
        videoId={"3EUxZANXXXc"}
      />
      {/* video modal end */}
    </>
  );
};

export default HeroHomeTwo;
