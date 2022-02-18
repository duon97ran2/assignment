import cateSelect from "../components/cateSelect";
import Footer from "../components/footer";
import Header from "../components/header";

const productPage = {
  async render() {
    return `${Header.render()}
    ${await cateSelect.render()}
    ${Footer.render()}`;
  },
  afterRender() {
    Header.afterRender();
    cateSelect.afterRender();
  },
};
export default productPage;