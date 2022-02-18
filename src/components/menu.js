import { reRender } from "../utils/rerender";

const menu = {
  render() {
    return /* html */` <div class="menu__bar z-50">
    <div class="logo">
    <a href="/"><span>KEYBOARD.vn</span></a>
    </div>
    <ul class="flex capitalize">
      <li><a href="/" class="nav-item__link">Trang chủ</a></li>
      <li><a href="/san-pham" class="nav-item__link">Sản phẩm</a></li>
      <li><a href="/chuong-trinh-dao-tao" class="nav-item__link">Khuyến mãi</a></li>
      <li><a href="/tin-tuc" class="nav-item__link">Tin tức</a></li>
      ${localStorage.getItem("user") ? `
      <div class="dropdown">
      <li class=""><a href="" class="nav-item__link text-center" id="user-name"><i class="fa fa-user" aria-hidden="true"></i> Đăng nhập</a>
      <div class="sub-menu">
      <ul>
      <div class="square">
      </div>
            <li><a href="/admin/dashboard">Quản trị</a></li>
            <li id="sign-out"><a href="">Đăng xuất</a></li>
          </ul>
        </div>
      </li></div>` : "<li><a href=\"/signin\" class=\"nav-item__link text-center\"><i class=\"fa fa-user\" aria-hidden=\"true\"></i> Đăng nhập</a></li>"}
      <li><a href="/cart" class="nav-item__link"><i class="fa fa-cart-arrow-down" aria-hidden="true"></i> Giỏ
          hàng</a></li>
    </ul>
  </div>`;
  },
  afterRender() {
    const username = document.querySelector("#user-name");
    const signout = document.querySelector("#sign-out");
    if (username) {
      username.innerHTML = `<i class="fa  fa-user" aria-hidden="true"></i> <span  title=" ${JSON.parse(localStorage.getItem("user")).username}">${JSON.parse(localStorage.getItem("user")).username}
      <span>`;
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