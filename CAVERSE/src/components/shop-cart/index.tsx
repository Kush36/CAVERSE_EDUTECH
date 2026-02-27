import BreadcrumbShop from "../../common/breadcrumb/BreadcrumbShop";
import MarqueeOne from "../../common/MarqueeOne";
import Preloader from "../../common/Preloader";
import ScrollTop from "../../common/ScrollTop";
import FooterTwo from "../../layouts/footers/FooterTwo";
import HeaderTwo from "../../layouts/headers/HeaderTwo";
import ShopCartArea from "./ShopCartArea";

 

const ShopCart = () => {
  return (
    <>
    <Preloader />
       <HeaderTwo />
      <BreadcrumbShop title="Shop Cart" subtitle="Shop Cart" />
      <ShopCartArea />
      <MarqueeOne style_2={true} />
      <FooterTwo />
      <ScrollTop />
    </>
  );
};

export default ShopCart;