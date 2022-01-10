import Footer from "../components/footer";
import Header from "../components/header";

const ForumsPage = {
  print(){
    return `
    ${Header.print()}
    <h1>Góc sinh viên</h1>
    ${Footer.print()} 
    `
  }
}
export default ForumsPage;