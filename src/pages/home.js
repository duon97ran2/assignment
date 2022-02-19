import { getAllProducts } from "../api/products";
import Footer from "../components/footer";
import Header from "../components/header";
import homeProduct from "../components/homeProduct";

const Homepage = {
  async render() {
    const { data } = await getAllProducts();

    return ` 
    ${Header.render()}
    <main>
    <h1 class="uppercase p-6 text-center italic bg-orange-500 text-white text-4xl font-bold underline underline-offset-8">Sản phẩm</h1>
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