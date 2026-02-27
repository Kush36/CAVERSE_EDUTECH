import Count from "../../common/Count";

 
const AboutCounter = () => {
  return (
    <>
    <div className="counter-section-23 section-padding pt-0">
            <div className="container custom-container">
                <div className="counter-wrapper-2 bg-cover" style={{background: `url(/assets/img/counter-bg-3.jpg)`}}>
                    <div className="counter-items">
                        <div className="icon">
                            <i className="flaticon-success"></i>
                        </div>
                        <div className="content">
                            <h2><span className="odometer" data-count="12.5"> <Count number={12} text='.5k' /> </span></h2>
                            <p>Student Enrolled</p>
                        </div>
                    </div>
                    <div className="counter-items">
                        <div className="icon">
                            <i className="flaticon-medal"></i>
                        </div>
                        <div className="content">
                            <h2><span className="odometer" data-count="10"> <Count number={10} text='+' /> </span></h2>
                            <p>Awards Winning</p>
                        </div>
                    </div>
                    <div className="counter-items">
                        <div className="icon">
                            <i className="flaticon-satisfaction"></i>
                        </div>
                        <div className="content">
                            <h2><span className="odometer" data-count="90"><Count number={90} text='%' /></span></h2>
                            <p>Satisfaction Rate</p>
                        </div>
                    </div>
                    <div className="counter-items">
                        <div className="icon">
                            <i className="flaticon-instructor"></i>
                        </div>
                        <div className="content">
                            <h2><span className="odometer" data-count="150"><Count number={150} text='+' /></span></h2>
                            <p>Instructors</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
    </>
  );
};

export default AboutCounter;