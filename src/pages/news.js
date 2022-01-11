import Footer from "../components/footer";
import Header from "../components/header";

const NewsPage = {
  render(){
    return `${Header.render()} <h1>Tuyển dụng</h1> ${Footer.render()}`
  }
}
export default NewsPage;