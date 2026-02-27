import BreadcrumbCourses from "../../common/breadcrumb/BreadcrumbCourses";
import Preloader from "../../common/Preloader";
import ScrollTop from "../../common/ScrollTop";
import FooterTwo from "../../layouts/footers/FooterTwo";
import HeaderOne from "../../layouts/headers/HeaderOne";
import CoursesListArea from "./CoursesListArea";

 

const CoursesList = () => {
  return (
    <>
    <Preloader />
    <HeaderOne />
    <BreadcrumbCourses title="Courses - List View Style" subtitle="Courses List View" />
    <CoursesListArea />
    <FooterTwo />  
    <ScrollTop />    
    </>
  );
};

export default CoursesList;