import toastr from "toastr";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { getOrder, updateOrder } from "../../api/orders";
import Nav from "../../components/nav";
import "toastr/build/toastr.min.css";
import { reRender } from "../../utils/rerender";
import orderTable from "../../components/orderTable";
import { priceLoad } from "../../utils";
import { getAllProducts, getProduct } from "../../api/products";

const orderDetail = {
  async render(id) {
    const { data } = await getOrder(id);
    const status = [
      "Canceled",
      "Pending",
      "Confirmed",
      "Completed",
    ];
    const productData = await getAllProducts();
    return /* html */`${Nav.render()}
    <header class="bg-white shadow mb-7">
              <div class="max-w-7xl flex justify-between mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 class="text-3xl font-bold text-gray-900">
                  Thông tin đơn hàng
                </h1>
                <a name="" id="" class="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" href="/#admin/orders" role="button">Danh sách đơn hàng</a>
              </div>
              
    </header>



    <div class="grid grid-cols-2">
    <div>
    <div class="px-4">
    <h1 class="font-semibold">Thông tin người mua</h1>      
    <p class="mt-1 text-sm text-gray-600">
      Đơn hàng mã: ${data.ordercode}<br>
      Trạng thái: ${status[data.status]}
    </p>
  </div>
      <form action="#" method="POST" id="form-edit">
        <div class="shadow sm:rounded-md sm:overflow-hidden">
          <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
            <div class="grid grid-cols-3 gap-6">
              <div class="col-span-3 sm:col-span-2">
                <label for="company-website" class="block text-sm font-medium text-gray-700">
                  Tên người mua
                </label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <input ${data.status === 1 ? "" : "disabled"} type="text" name="company-website" id="buyer" value="${data.buyer}" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300" placeholder="Nhập tên người mua">
                </div>
              </div>
              <div class="col-span-3 sm:col-span-2">
                <label for="company-website" class="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <input ${data.status === 1 ? "" : "disabled"} type="email" name="company-website" id="email-address" value="${data.email}" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300" placeholder="Nhập địa chỉ mail">
                </div>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-6">
              <div class="col-span-3 sm:col-span-2">
                <label for="company-website" class="block text-sm font-medium text-gray-700">
                Số điện thoại
                </label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <input ${data.status === 1 ? "" : "disabled"} type="text" name="company-website" id="phonenumber" value="${data.phonenumber}" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300" placeholder="Nhập số điện thoại">
                </div>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-6">
              <div class="col-span-3 sm:col-span-2">
                <label for="company-website" class="block text-sm font-medium text-gray-700">
                Địa chỉ
                </label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <input ${data.status === 1 ? "" : "disabled"} type="text" name="company-website" id="address" value="${data.address}" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300" placeholder="Địa chỉ giao hàng">
                </div>
              </div>
            </div>
          </div>
  
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${data.status === 1 ? "" : "hidden"}">
              Lưu
            </button>
          </div>
        </div>
      </form>
    </div>
    <div>
    <h1 class="font-semibold px-4 mb-3">Sản phẩm trong đơn hàng</h1> 
    <div class="max-h-[400px] overflow-y-auto">
    <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button class="btn-add inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${data.status === 1 ? "" : "hidden"}">
              <i class="fa fa-plus-square mr-2" aria-hidden="true"></i> Thêm sản phẩm mới
            </button>
    </div>
    <div class="">
    <form action="#" method="POST" class="hidden" id="form-add">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div class="grid grid-cols-3 gap-6">
            <div class="col-span-3 sm:col-span-2">
              <label for="company-website" class="block text-sm font-medium text-gray-700">
                Chọn sản phẩm
              </label>
              <div class="mt-1 flex rounded-md shadow-sm">
              <select name="category_id" id="product-select" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300">
              <option  disabled selected>Chọn sản phẩm</option>
              ${productData.data.map((product) => `<option value="${product.id}" data-product="${JSON.stringify(product)}">${product.name} 
              (Giá : ${priceLoad(product.price, product.discount).toLocaleString("de-DE", {
    style: "currency",
    currency: "VND",
  })})</option>`).join("")}
              </select>
              </div>
            </div>
            <div>
            <label for="company-website" class="block text-sm font-medium text-gray-700">
            Số lượng
            </label>
            <div class="mt-1 flex rounded-md shadow-sm">
                  <input type="number" name="company-website" id="number" value="1" max="99" min="1" step="1" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300" placeholder="Nhập số điện thoại">
                </div>
            </div>
            </div>
            </div>
            <div class="px-4 bg-gray-50 text-right sm:px-6">
            <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${data.status === 1 ? "" : "hidden"}">
              Thêm
            </button>
          </div>
            </div>
    </form>
    <div class="max-h-[400px] overflow-y-auto">
      
      <table class="min-w-full divide-y divide-gray-200 table-auto text-center" id="table-post">
    <thead class="bg-gray-50">
      <tr>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
         Sản phẩm
        </th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Giá
        </th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Số lượng
        </th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Action
        </th>

      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
    ${data.products.map((post) => /* html */`
    <tr>
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="flex items-center">
      <img class="imgPreview w-10 h-10 mr-2" src="${post.image}" alt="">
        <div class="">
          <div class="text-sm font-medium text-gray-900">${post.name}
          </div>
        </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <div>
      <div class="text-sm font-medium text-gray-900">
          ${priceLoad(post.price, post.discount).toLocaleString("de-DE", {
    style: "currency",
    currency: "VND",
  })}
          </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <div>
      <div class="text-sm font-medium text-gray-900">
          ${post.number}
          </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-left text-sm font-medium ">
      <button class="btn btn-remove text-indigo-600 hover:text-indigo-900 font-medium ${(data.status !== 1) ? "hidden" : ""}" data-id="${post.id}">Remove</button>
    </td>
  </tr>
    `).join("")
}  
    </tbody>
    <tfoot>
    <tr>
    <td class="px-6 py-4 whitespace-nowrap">
      <div>
      <div class="text-sm font-medium text-gray-900">
      Tổng:
          </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <div>
      <div class="text-sm font-medium text-gray-900">
      ${data.total.toLocaleString("de-DE", {
    style: "currency",
    currency: "VND",
  })}
          </div>
      </div>
    </td>
  </tr>
    </tfoot>
    
  </table>
    </div>
    </div>
  </div>
`;
  },
  async afterRender(id) {
    const { data } = await getOrder(id);
    const { products } = data;
    let newProducts = [];
    document.querySelector(".btn-add").addEventListener("click", () => {
      document.querySelector("#form-add").classList.toggle("hidden");
    });
    document.querySelector("#form-add").addEventListener("submit", async (e) => {
      e.preventDefault();
      let newNumber = 0;
      let newTotal = 0;
      const productSelectId = +document.querySelector("#product-select").value;
      const number = +document.querySelector("#number").value;
      const selectedProduct = await getProduct(productSelectId);
      const existedProduct = products.find((product) => product.id === productSelectId);
      if (existedProduct) {
        newNumber += (data.number + number);
        // eslint-disable-next-line max-len
        newTotal += data.total + priceLoad(selectedProduct.data.price, selectedProduct.data.discount) * newNumber;
        updateOrder({ number: newNumber, total: newTotal }, id).then(() => { reRender(orderDetail, "#app", id); }).then(() => {
          Swal.fire({
            title: "Xoá thành công",
            text: "Sản phẩm bị xóa khỏi đơn",
            icon: "success",
          });
        }).catch((error) => {
          Swal.fire({
            title: "Thêm thất bại",
            text: error.response.data,
            icon: "success",
          });
        });
      } else {
        newProducts = products;
        newTotal += (data.total + priceLoad(selectedProduct.data.price, selectedProduct.data.discount) * number);
        // console.log(selectedProduct);
        // updateOrder({ number, total: newTotal }, id).then(() => { reRender(orderDetail, "#app", id); }).then(() => {
        //   Swal.fire({
        //     title: "Xoá thành công",
        //     text: "Sản phẩm bị xóa khỏi đơn",
        //     icon: "success",
        //   });
        // }).catch((error) => {
        //   Swal.fire({
        //     title: "Thêm thất bại",
        //     text: error.response.data,
        //     icon: "success",
        //   });
        // });
      }

      // console.log(productSelect.options[productSelect.selectedIndex]);
    });
    document.querySelector("#form-edit").addEventListener("submit", (e) => {
      e.preventDefault();
      const newOrderDetail = {
        buyer: document.querySelector("#buyer").value,
        email: document.querySelector("#email-address").value,
        phonenumber: document.querySelector("#phonenumber").value,
        address: document.querySelector("#address").value,
      };
      updateOrder(newOrderDetail, id).then(() => {
        toastr.success("Cập nhật thông tin thành công");
        setTimeout(() => {
          document.location.href = "#admin/orders";
        }, 2000);
      }).then(
        reRender(orderTable, "#table-post"),
      ).catch((error) => {
        toastr.error(error.response.data);
      });
    });
    const removeBtns = document.querySelectorAll(".btn-remove");
    removeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const btnid = +btn.dataset.id;
        Swal.fire({
          title: "Xóa sản phẩm này khỏi đơn?",
          text: "Sản phẩm sẽ bị xóa hoàn toàn khỏi khỏi đơn hàng",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Có, làm đi!",
          cancelButtonText: "Chưa, để suy nghĩ đã!",
        }).then((result) => {
          if (result.isConfirmed) {
            newProducts = products.filter((product) => product.id !== btnid);
            let newTotal = 0;
            newProducts.forEach((product) => {
              newTotal += priceLoad(+product.price, +product.discount) * product.number;
            });
            updateOrder({ products: newProducts, total: newTotal }, id).then(() => { reRender(orderDetail, "#app", id); }).then(() => {
              Swal.fire({
                title: "Xoá thành công",
                text: "Sản phẩm bị xóa khỏi đơn",
                icon: "success",
              });
            }).catch((error) => {
              Swal.fire({
                title: "Xoá thất bại",
                text: error.response.data,
                icon: "success",
              });
            });
          }
        });
      });
    });
  },
};
export default orderDetail;