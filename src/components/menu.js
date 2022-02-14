import { reRender } from "../utils/rerender";

const menu = {
  render() {
    return /* html */` <div class="menu__bar">
    <div class="logo">
      <span>KEYBOARD.vn</span>
    </div>
    <ul class="flex">
      <li><a href="/" class="nav-item__link">Trang chủ</a></li>
      <li><a href="/tuyen-sinh" class="nav-item__link">Sản phẩm</a></li>
      <li><a href="/chuong-trinh-dao-tao" class="nav-item__link">Khuyến mãi</a></li>
      <li><a href="/tuyen-dung" class="nav-item__link">Tin tức</a></li>
      ${localStorage.getItem("user") ? `
      <div class="dropdown">
      <li><a href="/signin" class="nav-item__link text-center" id="user-name"><i class="fa fa-user" aria-hidden="true"></i> Đăng nhập</a>
      <div class="sub-menu">
      <ul>
      <div class="square">
      </div>
            <li><a href="/admin/dashboard">Quản trị</a></li>
            <li id="sign-out"><a href="">Đăng xuất</a></li>
          </ul>
        </div>
      </li></div>` : "<li><a href=\"/signin\" class=\"nav-item__link text-center\"><i class=\"fa fa-user\" aria-hidden=\"true\"></i> Đăng nhập</a></li>"}
      <li><a href="/signup" class="nav-item__link"><i class="fa fa-cart-arrow-down" aria-hidden="true"></i> Giỏ
          hàng</a></li>
    </ul>
  </div>`;
  },
  afterRender() {
    const username = document.querySelector("#user-name");
    const signout = document.querySelector("#sign-out");
    if (username) {
      username.innerHTML = JSON.parse(localStorage.getItem("user")).username;
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