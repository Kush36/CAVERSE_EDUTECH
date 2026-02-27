import BreadcrumbCoursesDetailsTwo from "../../common/breadcrumb/BreadcrumbCoursesDetailsTwo";
import MarqueeOne from "../../common/MarqueeOne";
import Preloader from "../../common/Preloader";
import ScrollTop from "../../common/ScrollTop";
import FooterTwo from "../../layouts/footers/FooterTwo";
import HeaderTwo from "../../layouts/headers/HeaderTwo";
import RelatedCourses from "../courses-details/RelatedCourses";
import CoursesDetailsTwoArea from "./CoursesDetailsTwoArea";

const CoursesDetailsTwo = () => {
	return (
		<>
		<Preloader />
			<HeaderTwo />
			<BreadcrumbCoursesDetailsTwo />
			<CoursesDetailsTwoArea />
			<RelatedCourses />
			<MarqueeOne style_2={true} />
			<FooterTwo />
			<ScrollTop />
		</>
	);
};

export default CoursesDetailsTwo;
