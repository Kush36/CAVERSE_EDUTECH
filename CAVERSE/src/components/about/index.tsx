import BreadcrumbEvent from "../../common/breadcrumb/BreadcrumbEvent";
import MarqueeOne from "../../common/MarqueeOne";
import Preloader from "../../common/Preloader";
import ScrollTop from "../../common/ScrollTop";
import FooterTwo from "../../layouts/footers/FooterTwo";
import HeaderTwo from "../../layouts/headers/HeaderTwo";
import AboutArea from "./AboutArea";
import AboutCounter from "./AboutCounter";
import FeatureArea from "./FeatureArea";

 

const About = () => {
	return (
		<>
		<Preloader />
			<HeaderTwo />
			<BreadcrumbEvent title="About" subtitle="About" />
      <AboutArea />
      <FeatureArea />
      <AboutCounter />
			<MarqueeOne style_2={true} />
			<FooterTwo />
			<ScrollTop />
		</>
	);
};

export default About;
