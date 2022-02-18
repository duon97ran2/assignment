import cateSelect from "../components/cateSelect";
import Footer from "../components/footer";
import Header from "../components/header";
import homeProduct from "../components/homeProduct";

const productPage = {
  async render() {
    let data = [];
    if (localStorage.getItem("cateProducts")) {
      data = JSON.parse(localStorage.getItem("cateProducts"));
    }
    // if (data) {
    //   data.forEach((item) => {
    //     const product = item.products;
    //     ketqua += homeProduct.render(product);
    //   });
    // }
    return `${Header.render()}
    <div class="grid grid-cols-4">
      <div class="col-span-1">
        ${await cateSelect.render()} 
      </div>
      <div class="col-span-3">
      <div class="grid grid-cols-3 gap-6 p-6" id="productList">
        ${data.map((item) => `${homeProduct.render(item.products)}`).join("")}
      </div> 
      </div>
    </div>
        
    ${Footer.render()}`;
  },
  afterRender() {
    Header.afterRender();
    cateSelect.afterRender();
    homeProduct.afterRender();
  },
};
export default productPage;