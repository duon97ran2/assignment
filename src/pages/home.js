import { getAllProducts } from "../api/products";
import cateMenu from "../components/cateMenu";
import Footer from "../components/footer";
import Header from "../components/header";
import homeProduct from "../components/homeProduct";

const Homepage = {
  async render() {
    const { data } = await getAllProducts();

    return `<main class="bg-gradient-to-b from-orange-500 to-red-600"> 
    <div class="">
    ${Header.render()}
    </div>
    <h1 class="uppercase p-6 text-center italic  text-white text-4xl font-bold underline underline-offset-8">Danh mục</h1>
    <div class="">
    ${await cateMenu.render()}
    </div>

    
    <h1 class="uppercase p-6 text-center italic  text-white text-4xl font-bold underline underline-offset-8 ">Sản phẩm</h1>
    
    <div class="grid grid-cols-4 gap-6 p-6">
    
    ${homeProduct.render(data.slice(0, 8))}
    <div>
  </main>
  ${Footer.render()}
  `;
  },
  afterRender() {
    Header.afterRender();
    homeProduct.afterRender();
  },
};
export default Homepage;