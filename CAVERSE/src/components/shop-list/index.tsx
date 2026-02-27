import BreadcrumbShop from "../../common/breadcrumb/BreadcrumbShop";
import MarqueeOne from "../../common/MarqueeOne";
import Preloader from "../../common/Preloader";
import ScrollTop from "../../common/ScrollTop";
import FooterTwo from "../../layouts/footers/FooterTwo";
import HeaderTwo from "../../layouts/headers/HeaderTwo";
import ShopListArea from "./ShopListArea";

 

const ShopList = () => {
  return (
    <>
    <Preloader />
      <HeaderTwo />
      <BreadcrumbShop title="Shop Page" subtitle="Shop List View" />
      <ShopListArea />
      <MarqueeOne style_2={true} />
      <FooterTwo />
      <ScrollTop />
    </>
  );
};

export default ShopList;