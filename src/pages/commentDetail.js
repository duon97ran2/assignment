import Swal from "sweetalert2";
import { getCommentByProduct, removeComment } from "../api/comments";
import Nav from "../components/nav";
import "sweetalert2/dist/sweetalert2.min.css";
import { reRender } from "../utils/rerender";

const commentDetail = {
  async render(id) {
    const productId = +id;
    const { data } = await getCommentByProduct(productId);
    console.log(data);
    return /* html */`${Nav.render()}
    <main>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8" >
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div id="tableCate" class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"><table class="min-w-full divide-y divide-gray-200 table-auto" id="table-post">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                id
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contents
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
            <div>
            <div class="text-sm font-medium text-gray-900">
                ${post.username}
                </div>
            </div>
          </td>
          <td class="px-6 py-4 text-center whitespace-nowrap">
            <div>
            <div class="text-sm font-medium text-gray-900">
                ${post.content}
                </div>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
          <button data-id="${post.id}" class=" remove font-medium text-indigo-600 p-4 ">Xóa</button>
          </td>
        </tr>
          `).join("")
}  
          </tbody>
        </table>
          </div>
        </div>
      </div>
    </div>
    </div>
            </main>
    `;
  },
  afterRender(id) {
    const productId = +id;
    const removeBtns = document.querySelectorAll(".remove");
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
            removeComment(id).then(() => {
              Swal.fire(
                "Xóa thành công!",
                "Danh mục đã đuọc xóa.",
                "success",
              );
              reRender(commentDetail, "#app", productId);
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
export default commentDetail;