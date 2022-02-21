import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { getProduct } from "../api/products";
import menu from "../components/menu";
import { priceLoad } from "../utils";
import { addTocart } from "../utils/cart";
import { reRender } from "../utils/rerender";

const productDetail = {
  async render(id) {
    const { data } = await getProduct(id);
    return /* html */`
    <div class="relative bg-[#1D1D1D] h-[60px]">
    ${menu.render()}</div>
    <div class="flex items-center h-screen">
    <div class="grid grid-cols-2 min-h-[500px] drop-shadow-2xl bg-[#1D1D1D]">
    <div class="flex items-center bg-white">
      <img src="${data.image}" class="object-cover h-full w-full" alt=""></div>
    <div class="item-detail">
      <h1>${data.name}</h1>
      <span>Mô tả:<br> ${data.desc}.</span>
      <h3>${(priceLoad(data.price, data.discount)).toLocaleString("de-DE", {
    style: "currency",
    currency: "VND",
  })}<span class="text-xl pl-2 text-slate-600 line-through"> ${(+data.price).toLocaleString("de-DE", {
  style: "currency",
  currency: "VND",
})}</span></h3>
        <input type="number" id="inputValue" min="1" value="1" max="99" class="w-fit text-orange-500 bg-transparent border-2 rounded-md border-orange-500">
      <button id="btnBuy">Mua ngay</button>
    </div>
    </div></div>
    `;
  },
  afterRender(id) {
    menu.afterRender();
    const btnBuy = document.querySelector("#btnBuy");
    const inputValue = document.querySelector("#inputValue");
    btnBuy.addEventListener("click", async () => {
      const { data } = await getProduct(id);
      addTocart({ ...data, number: +inputValue.value }, () => {
        toastr.success("Thêm vào giỏ thành công");
        reRender(menu, ".menu__bar");
      });
    });
  },
};
export default productDetail;