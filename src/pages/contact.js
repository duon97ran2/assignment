import Footer from "../components/footer";
import Header from "../components/header";

const ContactPage = {
  render(){
    return `${Header.render()} <h1>Chương trình đào tạo</h1> ${Footer.render()}`
  }
}
export default ContactPage;