import BreadcrumbEvent from "../../common/breadcrumb/BreadcrumbEvent";
import MarqueeOne from "../../common/MarqueeOne";
import Preloader from "../../common/Preloader";
import ScrollTop from "../../common/ScrollTop";
import FooterTwo from "../../layouts/footers/FooterTwo";
import HeaderTwo from "../../layouts/headers/HeaderTwo";
import NewsArea from "./NewsArea";

 ;

const News = () => {
	return (
		<>
		<Preloader />
			<HeaderTwo />
			<BreadcrumbEvent title="Blog" subtitle="Blog" />
			<NewsArea />       
			<MarqueeOne style_2={true} />
			<FooterTwo />
			<ScrollTop />
		</>
	);
};

export default News;
