import banner from "./banner";
import menu from "./menu";

const Header = {
  render() {
    return /* html */`<header>
    <div class="menu">
    ${menu.render()}
    </div>
    <div class="background">
      ${banner.render()}
    </div>
  </header>`;
  },
  afterRender() {
    menu.afterRender();
  },
};
export default Header;