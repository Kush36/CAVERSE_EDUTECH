import BreadcrumbEvent from "../../common/breadcrumb/BreadcrumbEvent";
import MarqueeOne from "../../common/MarqueeOne";
import Preloader from "../../common/Preloader";
import ScrollTop from "../../common/ScrollTop";
import FooterTwo from "../../layouts/footers/FooterTwo";
import HeaderTwo from "../../layouts/headers/HeaderTwo";
import GalleryArea from "./GalleryArea";

 

const Gallery = () => {
	return (
		<>
		<Preloader />
			<HeaderTwo />
			<BreadcrumbEvent title="Gallery" subtitle="Gallery" />
			<GalleryArea />
			<MarqueeOne style_2={true} />
			<FooterTwo />
			<ScrollTop />
		</>
	);
};

export default Gallery;
