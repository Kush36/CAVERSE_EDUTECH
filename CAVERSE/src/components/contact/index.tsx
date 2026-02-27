import BreadcrumbEvent from "../../common/breadcrumb/BreadcrumbEvent";
import MarqueeOne from "../../common/MarqueeOne";
import Preloader from "../../common/Preloader";
import ScrollTop from "../../common/ScrollTop";
import FooterTwo from "../../layouts/footers/FooterTwo";
import HeaderTwo from "../../layouts/headers/HeaderTwo";
import ContactArea from "./ContactArea";
import ContactForm from "./ContactForm";
import MapArea from "./MapArea";

 

const Contact = () => {
	return (
		<>
		<Preloader />
			<HeaderTwo />
			<BreadcrumbEvent title="Contact" subtitle="Contact" />
			<ContactArea />
      <MapArea />
      <ContactForm />
			<MarqueeOne style_2={true} />
			<FooterTwo />
			<ScrollTop />
		</>
	);
};

export default Contact;
