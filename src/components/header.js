import banner from "./banner";
import menu from "./menu";
import searchBar from "./searchBar";

const Header = {
  render() {
    return /* html */`<header class="bg-black">
    <div class="menu">
    ${menu.render()} 
    </div>
    <div class="search-bar z-50">
      <h1>WELCOME TO <span>KEYBOARD.vn</span></h1>
      <div class="m-10 rounded-md overflow-hidden">
      ${searchBar.render()} 
       </div>
    </div>
    
    <div class="background">
      ${banner.render()}
    </div>
  </header>`;
  },
  afterRender() {
    menu.afterRender();
    searchBar.afterRender();
  },
};
export default Header;