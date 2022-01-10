import Footer from "../components/footer";
import Header from "../components/header";

const ContactPage = {
  print(){
    return `${Header.print()} <h1>Chương trình đào tạo</h1> ${Footer.print()}`
  }
}
export default ContactPage;