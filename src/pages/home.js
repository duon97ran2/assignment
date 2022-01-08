import banner from "../components/banner";
import NewsList from "../components/news";

const Homepage = {
  print() {
    return ` <main>
    <div>
      ${banner.print()}
    </div>
    <h1 class="uppercase my-6 text-2xl font-bold">Tin tức học tập</h1>
    <div class="grid grid-cols-3 gap-6">
      ${NewsList.print()}
    </div>
    <h1 class="uppercase my-6 text-2xl font-bold">Hoạt động sinh viên</h1>
    <div class="grid grid-cols-3 gap-6">
      ${NewsList.print()}
    </div>
  </main>`;
  }
}
export default Homepage;