import BreadcrumbShop from "../../common/breadcrumb/BreadcrumbShop";
import MarqueeOne from "../../common/MarqueeOne";
import Preloader from "../../common/Preloader";
import ScrollTop from "../../common/ScrollTop";
import FooterTwo from "../../layouts/footers/FooterTwo";
import HeaderOne from "../../layouts/headers/HeaderOne";
import RealatedProducts from "./RealatedProducts";
import ShopDetailsArea from "./ShopDetailsArea";

 

const ShopDetails = () => {
  return (
    <>
    <Preloader />
      <HeaderOne />
      <BreadcrumbShop title="Shop Details" subtitle="Shop Details" />
      <ShopDetailsArea />
      <RealatedProducts />
      <MarqueeOne style_2={true} />
      <FooterTwo />
      <ScrollTop />
    </>
  );
};

export default ShopDetails;