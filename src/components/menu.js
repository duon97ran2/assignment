import { reRender } from "../utils/rerender";

const menu = {
  render() {
    return /* html */` <div class="menu__bar z-50">
    <div class="logo col-start-1">
    <a href="/#"><span class="">KEYBOARD.vn</span></a>
    </div>
    <ul class="flex capitalize col-span-2 place-content-center gap-x-6">
      <li><a href="/#" class="nav-item__link link-active">Trang chủ</a></li>
      <li><a href="/#san-pham" class="nav-item__link">Sản phẩm</a></li>
      <li><a href="/#chuong-trinh-dao-tao" class="nav-item__link">Khuyến mãi</a></li>
      <li><a href="/#tin-tuc" class="nav-item__link">Tin tức</a></li>
    </ul>
    <ul class="flex col-start-4 place-content-end">
      <li class="relative"><a href="/#" class="nav-item__link text-center " id="user-name" ><i class="fa fa-user" aria-hidden="true"></i></a><div class="dropdown">
      <div class="sub-menu min-w-[120px]">
        <div class="square">
        </div><ul>
        ${localStorage.getItem("user") ? `
            <li><a href="/#profile">Hồ sơ</a></li>
            <li><a href="/#admin/dashboard">Quản trị</a></li>
            <li id="sign-out"><a href="">Đăng xuất</a></li>
          ` : `<li><a href="/#signin">Đăng nhập</a></li>
          <li><a href="/#signup">Đăng ký</a></li>`}</ul>
      </div>
      </div></li>
      <li><a href="/#cart" title="Giỏ hàng" class="nav-item__link relative"><i class="fa fa-cart-arrow-down" aria-hidden="true"></i><div class="cart-number">${JSON.parse(localStorage.getItem("cart")) ? JSON.parse(localStorage.getItem("cart")).length : 0}</div></a>
      
      </li></ul>
  </div>`;
  },
  afterRender() {
    const username = document.querySelector("#user-name");
    const signout = document.querySelector("#sign-out");
    const links = document.querySelectorAll(".nav-item__link");
    links.forEach((link) => {
      const hrefValue = link.getAttribute("href");
      if (hrefValue != "/#") {
        const regex = new RegExp(hrefValue, "g");
        const linkPage = `/${window.location.hash}`;
        if (linkPage.match(regex)) {
          links[0].classList.remove("link-active");
          link.classList.add("link-active");
        }
      }
    });
    if (username) {
      username.innerHTML = `<span href="/#" title=" ${JSON.parse(localStorage.getItem("user")).username}">${JSON.parse(localStorage.getItem("user")).username}
      </span>`;
    }
    if (signout) {
      signout.addEventListener("click", () => {
        localStorage.removeItem("user");
        reRender(menu, ".menu");
      });
    }
  },
};
export default menu;