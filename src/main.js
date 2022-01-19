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
const print = async (content,id) => {
  document.getElementById("app").innerHTML = await content.render(id);
};
router.on(
  {
    "": () => {
      print(Homepage);
    },
    "/tuyen-sinh": () => {
      print(AboutPage);
    },
    "/chuong-trinh-dao-tao": () => {
      print(ContactPage);
    },
    "/tuyen-dung": () => {
      print(NewsPage);
    },
    "/tuyen-dung/:id": ({data}) => {
      const {id}=data;
      print(NewsDetail,id);
    },
    "/goc-sinh-vien": () => {
      print(ForumsPage);
    },
    "/signin": ()=> {
      print(SignIn);
    },
    "/signup": ()=> {
      print(SignUp);
    },
    "/admin/dashboard": ()=> {
      print(DashBoard);
    },
    "/admin/news": ()=> {
      print(News);
    },
    "/admin/news/add": ()=> {
      print(addNews);
    },
    "/admin/news/:id/edit": ({data})=> {
      const {id}=data
      print(newsEdit,id);
    }
  }
)
router.notFound(()=>{
  print(notFound);
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
