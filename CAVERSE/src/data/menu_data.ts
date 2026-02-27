/* eslint-disable @typescript-eslint/no-explicit-any */
interface DataType {
  id: number;
  title?: string;
  link: string;
  icon: string;
  img_dropdown?: boolean;
  has_dropdown?: boolean;
  has_dropdown_inner?: boolean;
  sub_menus?: {
    link?: string;
    title?: string;
    title2?: string | any;
    btn_title?: string;
    one_page_link?: string | any;
    one_page_title?: string;
    demo_img?: string | any;
    inner_menu?: boolean;
    inner_menus?: {
      link?: string;
      title?: string;
    }[];
  }[];
}

// menu data
const menu_data: DataType[] = [
  {
    id: 1,
    title: "Home",
    link: "/",
    icon: "fas fa-home-lg",
    sub_menus: [{ link: "/", title: "Online Course" }],
  },
  {
    id: 2,
    title: "Test_Series",
    link: "/courses",
    icon: "fas fa-book",
    sub_menus: [{ link: "/courses", title: "Test_Series" }],
  },
  {
    id: 3,
    title: "Events",
    link: "/event",
    icon: "fas fa-gift",
    sub_menus: [{ link: "/event", title: "event" }],
  },
  // {
  //   id: 4,
  //   title: "Buy_Now",
  //   link: "#",
  //   icon: "fas fa-shopping-bag",
  //   has_dropdown: true,
  //   sub_menus: [
  //     { link: "/shop-list", title: "Test Series" },
  //     { link: "/shop-cart", title: "Cart" },
  //     { link: "/checkout", title: "Checkout" },
  //   ],
  // },
  {
    id: 5,
    title: "Pages",
    link: "#",
    icon: "fas fa-file-alt",
    has_dropdown: true,
    // has_dropdown_inner: true,
    sub_menus: [
      { link: "/about", title: "About" },
      { link: "/news", title: "Blog" },
      // { link: "/gallery", title: "Gallery" },
      { link: "/pricing", title: "Pricing Plan" },
      { link: "/faq", title: "Faqs" },
      { link: "/sign-in", title: "Sign In" },
      { link: "/register", title: "register" },
    ],
  },
  {
    id: 6,
    title: "Contact",
    link: "/contact",
    icon: "fas fa-phone-rotary",
    has_dropdown: false,
  },
  {
    id: 7,
    title: "Dashboard",
    link: "/dashboard",
    icon: "fas fa-user",
    has_dropdown: false,
  },

];
export default menu_data;
