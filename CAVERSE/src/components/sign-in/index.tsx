import BreadcrumbCourses from "../../common/breadcrumb/BreadcrumbCourses";
import MarqueeOne from "../../common/MarqueeOne";
import Preloader from "../../common/Preloader";
import ScrollTop from "../../common/ScrollTop";
import FooterTwo from "../../layouts/footers/FooterTwo";
import HeaderTwo from "../../layouts/headers/HeaderTwo";
import SignInForm from "./SignInForm";

 ;

const SignIn = () => {
	return (
		<>
		<Preloader />
			<HeaderTwo />
			<BreadcrumbCourses title="Sign In" subtitle="Sign In" />
			<SignInForm />
			<MarqueeOne style_2={true} />
			<FooterTwo />
			<ScrollTop />
		</>
	);
};

export default SignIn;
