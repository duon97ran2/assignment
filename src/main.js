import Navigo from "navigo";
import DashBoard from "./admin/dashboard";
import addNews from "./admin/news/add";
import newsEdit from "./admin/news/edit";
import News from "./admin/news/news";
import notFound from "./pages/404";
import AboutPage from "./pages/about";
import ContactPage from "./pages/contact";
import ForumsPage from "./pages/forums";
import Homepage from "./pages/home";
import NewsPage from "./pages/news";
import NewsDetail from "./pages/newsDetail";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
const router = new Navigo("/",{linksSelector:"a"});
// router.on("/",function(){
//   console.log('Homepage');
// });
const print = (content) => {
  document.getElementById("app").innerHTML = content;
};
router.on(
  {
    "": () => {
      print(Homepage.render());
    },
    "/tuyen-sinh": () => {
      print(AboutPage.render());
    },
    "/chuong-trinh-dao-tao": () => {
      print(ContactPage.render());
    },
    "/tuyen-dung": () => {
      print(NewsPage.render());
    },
    "/tuyen-dung/:id": ({data}) => {
      const {id}=data;
      print(NewsDetail.render(id));
    },
    "/goc-sinh-vien": () => {
      print(ForumsPage.render());
    },
    "/signin": ()=> {
      print(SignIn.render());
    },
    "/signup": ()=> {
      print(SignUp.render());
    },
    "/admin/dashboard": ()=> {
      print(DashBoard.render());
    },
    "/admin/news": ()=> {
      print(News.render());
    },
    "/admin/news/add": ()=> {
      print(addNews.render());
    },
    "/admin/news/:id/edit": ({data})=> {
      const {id}=data
      print(newsEdit.render(id));
    }
  }
)
router.notFound(()=>{
  print(notFound.render());
})
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
