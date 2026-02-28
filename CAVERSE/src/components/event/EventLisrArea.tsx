/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
// import NiceSelect from "../../ui/NiceSelect";

const EventListArea = () => {
//   const selectHandler = (_e: any) => { };

  // Replace this URL with your actual Google Form URL
  const googleFormUrl = "https://forms.gle/HuWo6SKiKUPrCGAN8";

  const handleJoinFree = (_eventName: string) => {
    // Open Google Form in new tab with event name pre-filled if needed
    window.open(googleFormUrl, '_blank');
  };

  return (
    <>
        <section className="event-list-section fix section-padding pt-0">
            <div className="container">
                <div className="event-list-wrapper">
                    <div className="event-list-top-area">
                        {/* <div className="search-widget">
                            <input type="text" placeholder="Find event" />
                            <div className="sub-icon"><i className="fal fa-search"></i></div>
                        </div> */}
                        {/* <div className="form-clt"> 
                            <NiceSelect
                          className="category"
                          options={[
                            { value: "01", text: "Event Location" },
                            { value: "02", text: "Telegram" },
                            { value: "03", text: "Discord" },
                          ]}
                          defaultCurrent={0}
                          onChange={selectHandler}
                          name=""
                          placeholder="" />
                        </div> */}
                        {/* <div className="form-clt"> 
                            <NiceSelect
                          className="category"
                          options={[
                            { value: "01", text: "Category" },
                            { value: "02", text: "Free Events" },
                          ]}
                          defaultCurrent={0}
                          onChange={selectHandler}
                          name=""
                          placeholder="" />
                        </div> */}
                        {/* <div className="event-button-top">
                            <button type="submit" className="theme-btn">Find Event</button>
                        </div> */}
                    </div>
                    <div className="event-list-items">
                        <div className="event-content">
                            <div className="content">
                                <div className="date">
                                    <h2>28</h2>
                                    <span>Feb 2026</span>
                                </div>
                                <div className="title-text">
                                    <h4><Link to="/event-details">Interactive Study Collaborate Conquer</Link></h4>
                                    <ul className="post-time">
                                        <li><i className="fab fa-telegram"></i> Telegram</li>
                                        <li><i className="fab fa-discord"></i> Discord</li>
                                        <li><i className="far fa-clock"></i> 09:30am</li>
                                        <li><i className="fas fa-tag"></i> FREE</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="event-image">
                            <img src="assets/img/event/list/01.jpg" alt="img" />
                        </div>
                        <div className="event-btn"> 
                            <button 
                                onClick={() => handleJoinFree("Interactive Study Collaborate Conquer")} 
                                className="theme-btn"
                            >
                                Join Free
                            </button>
                        </div>
                    </div>
                    <div className="event-list-items">
                        <div className="event-content">
                            <div className="content">
                                <div className="date">
                                    <h2>15</h2>
                                    <span>Mar 2026</span>
                                </div>
                                <div className="title-text">
                                    <h4><Link to="/event-details">Time Management Skills for Learning</Link></h4>
                                    <ul className="post-time">
                                        <li><i className="fab fa-telegram"></i> Telegram</li>
                                        <li><i className="fab fa-discord"></i> Discord</li>
                                        <li><i className="far fa-clock"></i> 09:30am</li>
                                        <li><i className="fas fa-tag"></i> FREE</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="event-image">
                            <img src="assets/img/event/list/02.jpg" alt="img" />
                        </div>
                        <div className="event-btn"> 
                            <button 
                                onClick={() => handleJoinFree("Time Management Skills for Learning")} 
                                className="theme-btn"
                            >
                                Join Free
                            </button>
                        </div>
                    </div>
                    <div className="event-list-items">
                        <div className="event-content">
                            <div className="content">
                                <div className="date">
                                    <h2>30</h2>
                                    <span>Mar 2026</span>
                                </div>
                                <div className="title-text">
                                    <h4><Link to="/event-details">Boost Memory Study Hacks Work</Link></h4>
                                    <ul className="post-time">
                                        <li><i className="fab fa-telegram"></i> Telegram</li>
                                        <li><i className="fab fa-discord"></i> Discord</li>
                                        <li><i className="far fa-clock"></i> 09:30am</li>
                                        <li><i className="fas fa-tag"></i> FREE</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="event-image">
                            <img src="assets/img/event/list/03.jpg" alt="img" />
                        </div>
                        <div className="event-btn"> 
                            <button 
                                onClick={() => handleJoinFree("Boost Memory Study Hacks Work")} 
                                className="theme-btn"
                            >
                                Join Free
                            </button>
                        </div>
                    </div>
                    <div className="event-list-items">
                        <div className="event-content">
                            <div className="content">
                                <div className="date">
                                    <h2>14</h2>
                                    <span>Apr 2026</span>
                                </div>
                                <div className="title-text">
                                    <h4><Link to="/event-details">Note-Taking Mastery Best Techniques</Link></h4>
                                    <ul className="post-time">
                                        <li><i className="fab fa-telegram"></i> Telegram</li>
                                        <li><i className="fab fa-discord"></i> Discord</li>
                                        <li><i className="far fa-clock"></i> 09:30am</li>
                                        <li><i className="fas fa-tag"></i> FREE</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="event-image">
                            <img src="assets/img/event/list/04.jpg" alt="img" />
                        </div>
                        <div className="event-btn"> 
                            <button 
                                onClick={() => handleJoinFree("Note-Taking Mastery Best Techniques")} 
                                className="theme-btn"
                            >
                                Join Free
                            </button>
                        </div>
                    </div>
                    {/* <div className="event-button">
                        <Link to="/event-details" className="theme-btn">View All Events</Link>
                    </div> */}
                </div>
            </div>
        </section>
    </>
  );
};

export default EventListArea;