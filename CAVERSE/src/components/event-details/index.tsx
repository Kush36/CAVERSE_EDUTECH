import BreacrumbEventDetails from "../../common/breadcrumb/BreacrumbEventDetails";
import MarqueeOne from "../../common/MarqueeOne";
import Preloader from "../../common/Preloader";
import ScrollTop from "../../common/ScrollTop";
import FooterTwo from "../../layouts/footers/FooterTwo";
import HeaderOne from "../../layouts/headers/HeaderOne";
import EventDetailsArea from "./EventDetailsArea";

 

const EventDetails = () => {
	return (
		<>
		<Preloader />
			<HeaderOne />
      <BreacrumbEventDetails />
      <EventDetailsArea />
      <MarqueeOne style_2={true} />
			<FooterTwo />
			<ScrollTop />
		</>
	);
};

export default EventDetails;
