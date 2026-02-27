import BreadcrumbCourses from "../../common/breadcrumb/BreadcrumbCourses";
import MarqueeOne from "../../common/MarqueeOne";
import Preloader from "../../common/Preloader";
import ScrollTop from "../../common/ScrollTop";
import FooterTwo from "../../layouts/footers/FooterTwo";
import HeaderTwo from "../../layouts/headers/HeaderTwo";
import CoursesArea from "./CoursesArea";

 
const Courses = () => {
  return (
		<>
		<Preloader />
			<HeaderTwo />
			<BreadcrumbCourses title="All Test_Series" subtitle="Courses" />
			<CoursesArea />
			<MarqueeOne style_2={true} />
			<FooterTwo />
			<ScrollTop />
		</>
	);
};

export default Courses;