// import BreadcrumbEvent from "../../common/breadcrumb/BreadcrumbEvent";
// import MarqueeOne from "../../common/MarqueeOne";
import Preloader from "../../common/Preloader";
import ScrollTop from "../../common/ScrollTop";
import FooterTwo from "../../layouts/footers/FooterTwo";
import HeaderTwo from "../../layouts/headers/HeaderTwo";
import Dashboard from "./dashboard";
 

const dashboardArea = () => {
    return (
        <>
        <Preloader />
            <HeaderTwo />
            {/* <BreadcrumbEvent title="Contact" subtitle="Contact" /> */}
            <Dashboard />
            {/* <MarqueeOne style_2={true} /> */}
            <FooterTwo />
            <ScrollTop />
        </>
    );
};

export default dashboardArea;
