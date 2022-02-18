import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { getProduct } from "../api/products";
import { $ } from "../utils";
import { addTocart } from "../utils/cart";

const homeProduct = {
  render(data) {
    return `
    ${data ? data.map((product) => `<div class="item-box">
    <div class="overflow-hidden">
    <a href="#/productDetail/${product.id}"><img src="${product.image}" alt=""></a>
      </div>
      <a href="#/productDetail/${product.id}"><h1>${product.name} </h1></a>
      <h3>Giá: ${(+product.price).toLocaleString("de-DE", {
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
          });
        });
      }
    });
  },
};
export default homeProduct;