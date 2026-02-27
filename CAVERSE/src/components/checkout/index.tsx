import BreadcrumbShop from "../../common/breadcrumb/BreadcrumbShop";
import MarqueeOne from "../../common/MarqueeOne";
import Preloader from "../../common/Preloader";
import ScrollTop from "../../common/ScrollTop";
import FooterTwo from "../../layouts/footers/FooterTwo";
import HeaderTwo from "../../layouts/headers/HeaderTwo";
import CheckoutArea from "./CheckoutArea";

 
const Checkout = () => {
  return (
    <>
    <Preloader />
       <HeaderTwo />
      <BreadcrumbShop title="Checkout" subtitle="Checkout" />
      <CheckoutArea />
      <MarqueeOne style_2={true} />
      <FooterTwo />
      <ScrollTop />
    </>
  );
};

export default Checkout;