import BreadcrumbEvent from "../../common/breadcrumb/BreadcrumbEvent";
import MarqueeOne from "../../common/MarqueeOne";
import Preloader from "../../common/Preloader";
import ScrollTop from "../../common/ScrollTop";
import FooterTwo from "../../layouts/footers/FooterTwo";
import HeaderOne from "../../layouts/headers/HeaderOne";
import NewsDetailsArea from "./NewsDetailsArea";

 

const NewsDetails = () => {
	return (
		<>
		<Preloader />
			<HeaderOne />
			<BreadcrumbEvent title="Blog Details" subtitle="Blog Details" />
			<NewsDetailsArea />
			<MarqueeOne style_2={true} />
			<FooterTwo />
			<ScrollTop />
		</>
	);
};

export default NewsDetails;
