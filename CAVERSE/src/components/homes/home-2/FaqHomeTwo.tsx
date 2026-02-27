const FaqHomeTwo = () => {
  return (
    <>
      <section className="faq-section fix section-padding pt-0">
        <div className="container">
          <div className="faq-wrapper">
            <div className="row g-4 align-items-center">
              <div className="col-lg-6">
                <div className="faq-image-items">
                  <div className="row g-4 align-items-center">
                    <div className="col-md-6 d-none d-md-block">
                      <div className="faq-image wow img-custom-anim-left">
                        <img
                          src="assets/img/faq/01.jpg"
                          alt="img"
                          height="100"
                          width="100"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div
                        className="faq-image style-2 d-none d-md-block wow img-custom-anim-top"
                        data-wow-duration="1.5s"
                        data-wow-delay="0.3s"
                      >
                        <img src="assets/img/faq/02.jpg" alt="img" />
                      </div>
                      <div
                        className="faq-image wow img-custom-anim-bottom"
                        data-wow-duration="1.5s"
                        data-wow-delay="0.5s"
                      >
                        <img src="assets/img/faq/03.jpg" alt="img" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="faq-content">
                  <div className="section-title">
                    <h6 className="wow fadeInUp">Questions CA Students Ask Before Joining
</h6>
                    <h2 className="wow fadeInUp" data-wow-delay=".3s">
                      Asked Questions?
                    </h2>
                  </div>
                  <div className="faq-items mb-0 mt-4 mt-md-0">
                    <div className="accordion" id="accordionExample">
                      <div
                        className="accordion-item wow fadeInUp"
                        data-wow-delay=".2s"
                      >
                        <h2 className="accordion-header" id="headingOne">
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            Is this test series as per ICAI exam pattern?
                          </button>
                        </h2>
                        <div
                          id="collapseOne"
                          className="accordion-collapse collapse show"
                          aria-labelledby="headingOne"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <p>
                              Yes. All tests are strictly designed as per the
                              latest ICAI syllabus, paper pattern, and marking
                              approach.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="accordion-item wow fadeInUp"
                        data-wow-delay=".4s"
                      >
                        <h2 className="accordion-header" id="headingTwo">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                          >
                            How will my answers be evaluated?
                          </button>
                        </h2>
                        <div
                          id="collapseTwo"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingTwo"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <p>
                              Each answer is checked by experienced CA
                              evaluators with proper marks, remarks, and
                              improvement suggestions—just like ICAI checking.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="accordion-item wow fadeInUp"
                        data-wow-delay=".6s"
                      >
                        <h2 className="accordion-header" id="headingthree">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapsethree"
                            aria-expanded="false"
                            aria-controls="collapsethree"
                          >
                            Will I get mentorship or only test marks?
                          </button>
                        </h2>
                        <div
                          id="collapsethree"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingthree"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <p>
                              You get both. Along with evaluation, you receive
                              mentor guidance on answer writing, revision
                              strategy, and performance improvement.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div
                        className="accordion-item mb-0 wow fadeInUp"
                        data-wow-delay=".8s"
                      >
                        <h2 className="accordion-header" id="headingfour">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapsefour"
                            aria-expanded="false"
                            aria-controls="collapsefour"
                          >
                            Will this actually help improve my marks?
                          </button>
                        </h2>
                        <div
                          id="collapsefour"
                          className="accordion-collapse collapse"
                          aria-labelledby="headingfour"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            <p>
                              Yes. Regular test writing, detailed feedback, and
                              mentor correction help you identify mistakes and
                              convert effort into marks.
                            </p>
                          </div>
                        </div>
                      </div>
                      <p >Designed for students who are serious about clearing CA, not just attempting exams.
</p>
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

export default FaqHomeTwo;
