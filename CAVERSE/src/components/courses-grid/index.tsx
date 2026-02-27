import BreadcrumbCourses from "../../common/breadcrumb/BreadcrumbCourses";
import Preloader from "../../common/Preloader";
import ScrollTop from "../../common/ScrollTop";
import FooterTwo from "../../layouts/footers/FooterTwo";
import HeaderOne from "../../layouts/headers/HeaderOne";
import CoursesGridArea from "./CoursesGridArea";

 

const CoursesGrid = () => {
  return (
    <>
    <Preloader />
    <HeaderOne />
    <BreadcrumbCourses title="Courses - Grid Style" subtitle="Courses Grid" />
    <CoursesGridArea /> 
    <FooterTwo />  
    <ScrollTop />    
    </>
  );
};

export default CoursesGrid;