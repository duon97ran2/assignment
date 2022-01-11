import Footer from "../components/footer";
import Header from "../components/header";

const AboutPage = {
  render(){
    return `${Header.render()} <h1>Tuyển sinh</h1> ${Footer.render()}`
  }
}
export default AboutPage;