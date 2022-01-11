import Footer from "../components/footer";
import Header from "../components/header";

const ForumsPage = {
  render(){
    return `
    ${Header.render()}
    <h1>Góc sinh viên</h1>
    ${Footer.render()} 
    `
  }
}
export default ForumsPage;