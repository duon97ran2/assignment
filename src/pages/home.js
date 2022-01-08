import banner from "../components/banner";
import Footer from "../components/footer";
import Header from "../components/header";
import NewsList from "../components/news";

const Homepage = {
  print() {
    return ` 
    ${Header.print()}
    <main>
    <div>
      ${banner.print()}
    </div>
    <h1 class="uppercase my-6 text-2xl font-bold">Tin tức học tập</h1>
    ${NewsList.print()}
    <h1 class="uppercase my-6 text-2xl font-bold">Hoạt động sinh viên</h1>
    ${NewsList.print()}
  </main>
    ${Footer.print()}
  `;
  }
}
export default Homepage;