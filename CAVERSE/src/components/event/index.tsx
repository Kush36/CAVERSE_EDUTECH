import BreadcrumbEvent from "../../common/breadcrumb/BreadcrumbEvent";
import MarqueeOne from "../../common/MarqueeOne";
import Preloader from "../../common/Preloader";
import ScrollTop from "../../common/ScrollTop";
import FooterTwo from "../../layouts/footers/FooterTwo";
import HeaderTwo from "../../layouts/headers/HeaderTwo";
import EventLisrArea from "./EventLisrArea";

 

const Event = () => {
  return (
    <>
    <Preloader />
      <HeaderTwo />
      <BreadcrumbEvent title="Event List" subtitle="Event List" />
      <EventLisrArea />
			<MarqueeOne style_2={true} />
      <FooterTwo />
      <ScrollTop />
    </>
  );
};

export default Event;