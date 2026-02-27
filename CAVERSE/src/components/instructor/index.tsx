import BreadcrumbEvent from "../../common/breadcrumb/BreadcrumbEvent";
import MarqueeOne from "../../common/MarqueeOne";
import Preloader from "../../common/Preloader";
import ScrollTop from "../../common/ScrollTop";
import FooterTwo from "../../layouts/footers/FooterTwo";
import HeaderOne from "../../layouts/headers/HeaderOne";
import InstructorArea from "./InstructorArea";

 

const Instructor = () => {
  return (
    <>
    <Preloader />
      <HeaderOne />
			<BreadcrumbEvent title="Instructor" subtitle="Instructor" />
      <InstructorArea />       
			<MarqueeOne style_2={true} />
			<FooterTwo />
      <ScrollTop />
    </>
  );
};

export default Instructor;