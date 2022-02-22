import cateSelect from "../components/cateSelect";
import Footer from "../components/footer";
import Header from "../components/header";

const productPage = {
  async render(id) {
    return `${Header.render()}
    ${await cateSelect.render(id)}
    ${Footer.render()}`;
  },
  afterRender() {
    Header.afterRender();
    cateSelect.afterRender();
  },
};
export default productPage;