import cartList from "../pages/cart";
import { $, priceLoad } from "../utils";
import { decreaseItemNumber, increaseItemNumber, removeCartItem } from "../utils/cart";
import { reRender } from "../utils/rerender";

const cartTable = {
  render() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    return `
    <table class="min-w-full divide-y divide-gray-200 table-auto rounded-md overflow-hidden" id="table-post">
            <thead class="bg-orange-500">
                <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Tên sản phẩm</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Giá</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Số lượng</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"></th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"></th>
                </tr>
            </thead>
            <tbody>
                ${cart ? cart.map((item) => /* html */`
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap capitalize"><a href="#/productDetail/${item.id}"><h1>${item.name}</h1></a></td>
                        <td class="px-6 py-4 whitespace-nowrap" class="px-4">${priceLoad(item.price, item.discount).toLocaleString("de-DE", {
    style: "currency",
    currency: "VND",
  })}
                            
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap" class="px-4">${item.number}
                            
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <button  data-id="${item.id}" class="btn increase border drop-shadow-xl bg-slate-150 rounded-md text-gray-800 p-2"><i class="fa fa-plus " aria-hidden="true"></i></button>
                            <button  data-id="${item.id}" class="btn decrease border drop-shadow-xl bg-slate-150 rounded-md text-gray-800 p-2"><i class="fa fa-minus " aria-hidden="true"></i></</button>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <button data-id="${item.id}" class="btn remove border bg-red-500 px-4 py-3 text-white font-medium rounded-lg
                            ">Remove</button>
                        </td>
                    </tr>
                `).join("") : "<tr><td class=\"px-6 py-4 whitespace-nowrap\" colspan=\"2\" class=\"text-right\">Không có sản phẩm nào</td></tr>"}
            </tbody>
        </table>`;
  },
  afterRender() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const btns = $(".btn");
    let total = 0;
    const totalCount = () => {
      for (const item of cart) {
        total += (priceLoad(item.price, item.discount)) * (+item.number);
      }
      document.querySelector("#total").innerHTML = total.toLocaleString("de-DE", {
        style: "currency",
        currency: "VND",
      });
      document.querySelector("#price-total").value = total;
    };
    totalCount();
    btns.forEach((btn) => {
      const { id } = btn.dataset;
      btn.addEventListener("click", () => {
        if (btn.classList.contains("increase")) {
          increaseItemNumber(id, () => {
            reRender(cartTable, "#table-post");
          });
        } else if (btn.classList.contains("decrease")) {
          decreaseItemNumber(id, () => {
            reRender(cartList, "#app");
          });
        } else if (btn.classList.contains("remove")) {
          removeCartItem(id, () => {
            reRender(cartList, "#app");
          });
        }
      });
    });
  },
};
export default cartTable;