import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { getAllCategories, removeCategory } from "../api/categories";
import { reRender } from "../utils/rerender";

const tableCate = {
  async render() {
    const { data } = await getAllCategories();
    return `<table class="min-w-full divide-y divide-gray-200 table-auto" id="table-post">
    <thead class="bg-gray-50">
      <tr>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          id
        </th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Name
        </th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Action
        </th>

      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
    ${data.map((post) => /* html */`
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
      <form action="" method="post" id="edit-form">
      <div class="flex">
        <input
        id="update-name"
          class="text-sm font-medium text-gray-900 border border-slate-300 rounded-md py-2 pl-9 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          value="${post.name}">
          <button type="submit" data-id="${post.id}" class="update-btn hidden justify-center ml-3 py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cập nhật</button>
      </div>
      
    </form>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
      <a href="/admin/categories/${post.id}/edit" data-id="${post.id}" class="edit-btn text-indigo-600 hover:text-indigo-900">Edit</a>
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
    const editBtns = document.querySelectorAll(".edit-btn");
    removeBtns.forEach((button) => {
      button.addEventListener("click", () => {
        const { id } = button.dataset;
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
            removeCategory(id).then(() => {
              Swal.fire(
                "Xóa thành công!",
                "Danh mục đã đuọc xóa.",
                "success",
              );
              reRender(tableCate, "#tableCate");
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
    editBtns.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        button.closest("tr").querySelector(".update-btn").classList.toggle("hidden");
      });
    });
  },
};
export default tableCate;