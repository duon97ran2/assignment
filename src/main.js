import Navigo from "navigo";
import addProducts from "./admin/products/add";
import cateLIst from "./admin/categories/list";
import DashBoard from "./admin/dashboard";
import addNews from "./admin/news/add";
import newsEdit from "./admin/news/edit";
import News from "./admin/news/news";
import productList from "./admin/products/list";
import notFound from "./pages/404";
import ContactPage from "./pages/contact";
import ForumsPage from "./pages/forums";
import Homepage from "./pages/home";
import NewsPage from "./pages/news";
import NewsDetail from "./pages/newsDetail";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import editProducts from "./admin/products/edit";
import userList from "./admin/users/list";
import addUsers from "./admin/users/add";
import editUsers from "./admin/users/edit";
import productDetail from "./pages/productDetail";
import cartList from "./pages/cart";
import productPage from "./pages/product";
import orderList from "./admin/orders/list";
import orderDetail from "./admin/orders/orderDetail";
import profilePage from "./pages/profile";

const router = new Navigo("/", { linksSelector: "a", hash: true });
// router.on("/",function(){
//   console.log('Homepage');
// });
const print = async (content, id) => {
  document.getElementById("app").innerHTML = await content.render(id);
  if (content.afterRender) {
    content.afterRender(id);
  }
};

router.on("/admin/*", () => {}, {
  before: (done) => {
    if (localStorage.getItem("user")) {
      const userRole = JSON.parse(localStorage.getItem("user")).role;
      if (userRole === "admin") {
        done();
      } else {
        document.location.href = "/";
      }
    } else {
      document.location.href = "/";
    }
  },
});
router.on(
  {
    "": () => {
      print(Homepage);
    },
    "/san-pham": () => {
      print(productPage);
    },
    "/chuong-trinh-dao-tao": () => {
      print(ContactPage);
    },
    "/tin-tuc": () => {
      print(NewsPage);
    },
    "/profile": () => {
      print(profilePage);
    },
    "/tin-tuc/:id": ({ data }) => {
      const { id } = data;
      print(NewsDetail, id);
    },
    "/productDetail/:id": ({ data }) => {
      const { id } = data;
      print(productDetail, id);
    },
    "/cart": () => {
      print(cartList);
    },
    "/goc-sinh-vien": () => {
      print(ForumsPage);
    },
    "/signin": () => {
      print(SignIn);
    },
    "/signup": () => {
      print(SignUp);
    },
    "/admin/dashboard": () => {
      print(DashBoard);
    },
    "/admin/news": () => {
      print(News);
    },
    "/admin/categories": () => {
      print(cateLIst);
    },
    "/admin/products": () => {
      print(productList);
    },
    "/admin/users": () => {
      print(userList);
    },
    "/admin/orders": () => {
      print(orderList);
    },
    "/admin/orders/:id/detail": ({ data }) => {
      const { id } = data;
      print(orderDetail, id);
    },
    "/admin/news/add": () => {
      print(addNews);
    },
    "/admin/products/add": () => {
      print(addProducts);
    },
    "/admin/users/add": () => {
      print(addUsers);
    },
    "/admin/products/:id/edit": ({ data }) => {
      const { id } = data;
      print(editProducts, id);
    },
    "/admin/users/:id/edit": ({ data }) => {
      const { id } = data;
      print(editUsers, id);
    },
    "/admin/news/:id/edit": ({ data }) => {
      const { id } = data;
      print(newsEdit, id);
    },
  },
);
router.notFound(() => {
  print(notFound);
});
router.resolve();

// import './style.css'

// document.querySelector('#app').innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `
// // es 5
// function Animal(color){
//   this.color=color;
//   this.showInfo=function(){
//     console.log(this.color);
//   }
// }
// const cat = new Animal("Mau vang");
// cat.showInfo();
// // es 6
// class conVat{
//   constructor(color){
//     this.color = color;
//   }
//   showInfo(){
//     console.log(this.color);
//   }
// }
// const cat2 = new conVat("Mau hong");
// class TuongPhep {
//   constructor(name,congVatLy,congPhep){
//     this.tenTuong=name;
//     this.congVatLyTuong=congVatLy;
//     this.congPhepTuong=congPhep;
//   }
//   showInfo(){
//     console.log(`
//       ${this.tenTuong}
//       ${this.congVatLyTuong}
//       ${this.congPhepTuong}
//     `)
//   }
// }