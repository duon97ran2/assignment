import banner from "../components/banner";
import Footer from "../components/footer";
import Header from "../components/header";
import NewsList from "../components/news";

const Homepage = {
  async render() {
    return ` 
    ${Header.render()}
    <main>
    <div>
      ${banner.render()}
    </div>
    <h1 class="uppercase my-6 text-2xl font-bold">Tin tức học tập</h1>
    ${await NewsList.render()}
    <h1 class="uppercase my-6 text-2xl font-bold">Hoạt động sinh viên</h1>
    ${await NewsList.render()}
  </main>
    ${Footer.render()}
  `;
  }
}
export default Homepage;