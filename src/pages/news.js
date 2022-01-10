import Footer from "../components/footer";
import Header from "../components/header";

const NewsPage = {
  print(){
    return `${Header.print()} <h1>Tuyển dụng</h1> ${Footer.print()}`
  }
}
export default NewsPage;