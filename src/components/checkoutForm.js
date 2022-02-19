import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { addOrder } from "../api/orders";
import { reRender } from "../utils/rerender";
import cartTable from "./cartTable";

const checkoutForm = {
  render() {
    return `
    <h1>Thông tin thanh toán</h1>
    <form action="" method="post" id="checkout-form">
    <div class="form-info">
      <label for="name">Tên người mua</label>
      <input type="text" id="name" placeholder="Nhập tên người mua">
    </div>
    <div class="form-info">
        <label for="address">Địa chỉ giao hàng</label>
      <input type="text" id="address" placeholder="Nhập địa chỉ giao hàng">
    </div>
    <div class="form-info">
        <label for="email">Email</label>
        <input type="email" id="email" placeholder="Nhập địa chỉ email">
    </div>
    <div class="form-info">
        <label for="name">Số điện thoại</label>
        <input type="text" id="phone-number" placeholder="Nhập số điện thoại">
    </div>
    <div class="form-info">
        <label for="name">Tổng tiền : <span id="total"></span></label>
        <input type="hidden" id="price-total">
        <input type="hidden" id="status" value="1">
    </div>
    <button id="checkoutBtn" type="submit">Thanh toán</button>
    </form>
    `;
  },
  afterRender() {
    function makeid(length) {
      let result = "";
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random()
   * charactersLength));
      }
      return result;
    }
    document.querySelector("#checkout-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const newOrder = {
        ordercode: makeid(5),
        buyer: document.querySelector("#name").value,
        address: document.querySelector("#address").value,
        phonenumber: document.querySelector("#phone-number").value,
        total: +document.querySelector("#price-total").value,
        status: +document.querySelector("#status").value,
        products: JSON.parse(localStorage.getItem("cart")),
      };
      addOrder(newOrder).then(() => {
        toastr.success("Thanh toán thành công");
        localStorage.removeItem("cart");
      }).then(() => {
        reRender(cartTable, "#table-post");
      }).catch((error) => {
        toastr.error(error.response.data);
      });
    });
  },
};
export default checkoutForm;