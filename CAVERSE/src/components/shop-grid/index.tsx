import BreadcrumbShop from "../../common/breadcrumb/BreadcrumbShop";
import MarqueeOne from "../../common/MarqueeOne";
import Preloader from "../../common/Preloader";
import ScrollTop from "../../common/ScrollTop";
import FooterTwo from "../../layouts/footers/FooterTwo";
import HeaderOne from "../../layouts/headers/HeaderOne";
import ShopGridArea from "./ShopGridArea";

 

const ShopGrid = () => {
  return (
    <>
    <Preloader />
      <HeaderOne />
      <BreadcrumbShop title="Shop Page" subtitle="Shop" />
      <ShopGridArea />
      <MarqueeOne style_2={true} />
      <FooterTwo />
      <ScrollTop />
    </>
  );
};

export default ShopGrid;