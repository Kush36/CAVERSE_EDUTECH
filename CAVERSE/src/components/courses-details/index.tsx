import BreadcrumbCoursesDetails from "../../common/breadcrumb/BreadcrumbCoursesDetails";
import MarqueeOne from "../../common/MarqueeOne";
import Preloader from "../../common/Preloader";
import ScrollTop from "../../common/ScrollTop";
import FooterTwo from "../../layouts/footers/FooterTwo";
import HeaderTwo from "../../layouts/headers/HeaderTwo";
import CoursesDetailsArea from "./CoursesDetailsArea";
import RelatedCourses from "./RelatedCourses";

 

const CoursesDetails = () => {
  return (
    <>
    <Preloader />
    <HeaderTwo />
    <BreadcrumbCoursesDetails />
    <CoursesDetailsArea />
    <RelatedCourses />
    <MarqueeOne style_2={true} />
    <FooterTwo /> 
    <ScrollTop />     
    </>
  );
};

export default CoursesDetails;