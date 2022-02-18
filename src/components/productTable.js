import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { getAllCategories } from "../api/categories";
import { getAllProducts, removeProduct } from "../api/products";
import { reRender } from "../utils/rerender";

const productTable = {
  async render() {
    const { data } = await getAllProducts();
    const categoriesData = await getAllCategories();
    const products = data.map((product) => {
      categoriesData.data.map((category) => {
        if (product.categoryId == category.id) {
          product.category = category.name;
        }
      });
      return product;
    });
    return /* html */`            <table class="min-w-full divide-y divide-gray-200 table-auto" id="table-post">
    <thead class="bg-gray-50">
      <tr>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          id
        </th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Image
        </th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Name
        </th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Category
        </th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Price
        </th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Discount
        </th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Quantity
        </th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Action
        </th>

      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
    ${products.map((post) => /* html */`
    <tr>
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="flex items-center">
        <div class="">
          <div class="text-sm font-medium text-gray-900">${post.id}
          </div>
        </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="flex items-center">
        <div class="flex-shrink-0 h-10 w-10">
          <img class="h-10 w-10" src="${post.image}" alt="">
        </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <div>
      <div class="text-sm font-medium text-gray-900">
          ${post.name}
          </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <div>
      <div class="text-sm font-medium text-gray-900">
          ${post.category}
          </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <div>
      <div class="text-sm font-medium text-gray-900">
          ${post.price}
          </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <div>
      <div class="text-sm font-medium text-gray-900">
          ${post.discount}
          </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <div>
      <div class="text-sm font-medium text-gray-900">
          ${post.quantity}
          </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
      <a href="/admin/products/${post.id}/edit" class="edit-btn text-indigo-600 hover:text-indigo-900">Edit</a>
      <button data-id="${post.id}" class="btn btn-remove text-indigo-600 hover:text-indigo-900 font-medium">Remove</button>
    </td>
  </tr>
    `).join("")
}  
    </tbody>
  </table>`;
  },
  afterRender() {
    const removeBtns = document.querySelectorAll(".btn-remove");
    removeBtns.forEach((button) => {
      const { id } = button.dataset;
      button.addEventListener("click", () => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            removeProduct(id).then(() => {
              Swal.fire(
                "Xóa thành công!",
                "Danh mục đã đuọc xóa.",
                "success",
              );
              reRender(productTable, "#productTable");
            }).catch(() => {
              Swal.fire(
                "Xóa thất bại!",
                "Có lỗi xảy ra.",
                "failed",
              );
            });
          }
        });
      });
    });
  },
};
export default productTable;