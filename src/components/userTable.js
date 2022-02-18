import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { getAllUsers, removeUser } from "../api/users";
import { reRender } from "../utils/rerender";

const userTable = {
  async render() {
    const users = await getAllUsers();
    return /* html */ `
    <table class="min-w-full divide-y divide-gray-200 table-auto" id="table-post">
    <thead class="bg-gray-50">
      <tr>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          id
        </th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Avatar
        </th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Username
        </th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Email
        </th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Role
        </th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Action
        </th>

      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
    ${users.data.map((post) => /* html */`
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
          <img class="h-10 w-10 rounded-full" src="${(post.avatar) ?? "https://picsum.photos/1000/1000"}" alt="">
        </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <div>
      <div class="text-sm font-medium text-gray-900">
          ${post.username}
          </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <div>
      <div class="text-sm font-medium text-gray-900">
          ${post.email}
          </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <div>
      <div class="text-sm font-medium text-gray-900">
          ${post.role}
          </div>
      </div>
    </td>
    <td ${(JSON.parse(localStorage.getItem("user")).id === post.id) ? "hidden" : ""} class="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
      <a href="/admin/users/${post.id}/edit" class="edit-btn text-indigo-600 hover:text-indigo-900">Edit</a>
      <button data-id="${post.id}" class="btn btn-remove text-indigo-600 hover:text-indigo-900 font-medium ">Remove</button>
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
            removeUser(id).then(() => {
              Swal.fire(
                "Xóa thành công!",
                "Người dùng đã bị xóa.",
                "success",
              ); reRender(userTable, "#userTable");
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
export default userTable;