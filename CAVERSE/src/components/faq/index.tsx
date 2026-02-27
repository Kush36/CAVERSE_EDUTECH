import BreadcrumbEvent from "../../common/breadcrumb/BreadcrumbEvent";
import MarqueeOne from "../../common/MarqueeOne";
import Preloader from "../../common/Preloader";
import ScrollTop from "../../common/ScrollTop";
import FooterTwo from "../../layouts/footers/FooterTwo";
import HeaderTwo from "../../layouts/headers/HeaderTwo";
import FaqArea from "./FaqArea";

 
const Faq = () => {
  return (
    <>
    <Preloader />
      <HeaderTwo />
			<BreadcrumbEvent title="Faq" subtitle="Faq" />
			<FaqArea />       
			<MarqueeOne style_2={true} />
			<FooterTwo />
      <ScrollTop />
    </>
  );
};

export default Faq;