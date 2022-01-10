import Footer from "../components/footer";
import Header from "../components/header";

const AboutPage = {
  print(){
    return `${Header.print()} <h1>Tuyển sinh</h1> ${Footer.print()}`
  }
}
export default AboutPage;