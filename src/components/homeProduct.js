import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { getProduct } from "../api/products";
import { $, priceLoad } from "../utils";
import { addTocart } from "../utils/cart";
import { reRender } from "../utils/rerender";
import menu from "./menu";

const homeProduct = {
  render(data) {
    return `
    ${data ? data.map((product) => `<div class="item-box swiper-slide">
    <div class="overflow-hidden">
    <h4>${product.discount}%</h4>
    <a href="#/productDetail/${product.id}"><img src="${product.image}" alt=""></a>
      </div>
      <a href="#/productDetail/${product.id}"><h1>${product.name} </h1></a>
      <h3>Giá: ${priceLoad(product.price, product.discount).toLocaleString("de-DE", {
    style: "currency",
    currency: "VND",
  })}</h3>
      <button class="btn btnBuy" data-id="${product.id}">Mua ngay</button>
    </div>`).join("") : ""}
    `;
  },
  afterRender() {
    const btns = $(".btn");
    btns.forEach((btn) => {
      if (btn.classList.contains("btnBuy")) {
        const { id } = btn.dataset;
        btn.addEventListener("click", async () => {
          const { data } = await getProduct(id);
          addTocart({ ...data, number: 1 }, () => {
            toastr.success("Thêm sản phẩm thành công");
            reRender(menu, ".menu");
          });
        });
      }
    });
  },
};
export default homeProduct;