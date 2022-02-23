import { comment } from "postcss";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { getProduct } from "../api/products";
import commentsPost from "../components/commentpost";
import commnentSection from "../components/comments";
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
    <div class="flex items-center h-screen  shadow-2xl ">
    <div class="grid grid-cols-2 min-h-[500px]">
    <div class="flex items-center bg-white">
      <img src="${data.image}" class="object-cover h-full w-full" alt=""></div>
    <div class="item-detail ">
      <h1>${data.name}</h1>
      <span>Lượt xem:20</span>
      <span>Mô tả:<br> ${data.desc}.</span>
      <h3>${(priceLoad(data.price, data.discount)).toLocaleString("de-DE", {
    style: "currency",
    currency: "VND",
  })}<span class="text-xl pl-2 text-slate-600 line-through"> ${(+data.price).toLocaleString("de-DE", {
  style: "currency",
  currency: "VND",
})}</span></h3>
<div class="flex pb-4">
<button id="btnUp"><i class="fa fa-plus" aria-hidden="true"></i></button>  
<input type="number" id="inputValue" min="1" value="1" max="99" class="w-fit text-orange-500 bg-transparent text-center mx-2 text-2xl p-0 border-2 rounded-md border-orange-500">
      <button id="btnDown"><i class="fa fa-minus" aria-hidden="true"></i></button>
      </div>
      <button id="btnBuy">Mua ngay</button>
      
    </div>
    </div></div>
    <h1 class="text-slate-600 font-semibold text-2xl my-6">Bình luận về sản phẩm</h1>
    ${commnentSection.render(id)}
    <div  class="max-h-[500px] overflow-y-auto" id="comment-post">
    ${commentsPost.render(data.comments)}</div>
    `;
  },
  afterRender(id) {
    commnentSection.afterRender(id);
    commentsPost.afterRender();
    menu.afterRender();
    const btnBuy = document.querySelector("#btnBuy");
    const btnUp = document.querySelector("#btnUp");
    const btnDown = document.querySelector("#btnDown");
    const inputValue = document.querySelector("#inputValue");
    btnUp.addEventListener("click", () => {
      inputValue.value++;
    });
    btnDown.addEventListener("click", () => {
      inputValue.value--;
      if (inputValue.value == 0) {
        inputValue.value = 1;
      }
    });
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