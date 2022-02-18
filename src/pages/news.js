import Footer from "../components/footer";
import Header from "../components/header";
import NewsList from "../components/news";

const NewsPage = {
  async render() {
    return `${Header.render()} <h1 class="uppercase my-6 text-2xl font-bold">Tin tức học tập</h1>
    ${await NewsList.render()}
    ${Footer.render()}`;
  },
  afterRender() {
    Header.afterRender();
  },
};
export default NewsPage;