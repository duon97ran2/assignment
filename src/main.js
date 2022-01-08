import Navigo from "navigo";
import AboutPage from "./pages/about";
import Homepage from "./pages/home";
const router = new Navigo("/");
// router.on("/",function(){
//   console.log('Homepage');
// });
const render = (content) => {
  document.getElementById("app").innerHTML = content.print();
};
router.on(
  {
    "/": () => {
      render(Homepage);
    },
    "/about": () => {
      render(AboutPage);
    }
  }
)
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
