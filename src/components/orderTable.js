import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { getAllOrders, removeOrder, updateOrder } from "../api/orders";
import { reRender } from "../utils/rerender";

const orderTable = {
  async render() {
    const status = [
      "Canceled",
      "Pending",
      "Confirmed",
      "Completed",
    ];
    const color = [
      "border-red-400 text-red-400  ",
      "border-yellow-400 text-yellow-400 ",
      "border-cyan-400 text-cyan-400",
      "border-green-400 text-green-400",
    ];
    const { data } = await getAllOrders();
    return /* html */`            <table class="min-w-full divide-y divide-gray-200 table-auto" id="table-post">
    <thead class="bg-gray-50">
      <tr>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          ID
        </th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Buyer
        </th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Email
        </th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Phone Numbers
        </th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Address
        </th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Order Status
        </th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Order Total
        </th>
        <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
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
    ${post.buyer}
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
          ${post.phonenumber}
          </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <div>
      <div class="text-sm font-medium text-gray-900">
          ${post.address}
          </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <div>
      <div class="text-sm ${color[post.status]} text-center uppercase font-semibold rounded-md font-medium p-2 border-2 ">
          ${status[post.status]}
          </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <div>
      <div class="text-sm font-medium text-gray-900">
          ${post.total.toLocaleString("de-DE", {
    style: "currency",
    currency: "VND",
  })}
          </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
    <div class="${(post.status === 0 || post.status === 3) ? "hidden" : ""}">
    ${(post.status === 2) ? `<button data-id="${post.id}"  <button data-id="${post.id}" class="btn complete text-green-600 hover:text-green-900 font-medium">Complete</button>` : `<button data-id="${post.id}"  <button data-id="${post.id}" class="btn confirm text-cyan-600 hover:text-cyan-900 font-medium">Confirm</button>`}
    </div>
    <div class="${(post.status === 2 || post.status === 3) ? "hidden" : ""}">
    ${(post.status === 0) ? `<button data-id="${post.id}" class="btn remove text-red-600 hover:text-red-900 font-medium">Remove</button>` : `<button data-id="${post.id}" class="btn cancel text-red-600 hover:text-red-900 font-medium">Cancel</button>`}
    </div>
      <a href="/#admin/orders/${post.id}/detail" class="edit-btn text-indigo-600 hover:text-indigo-900">Detail</a>
    </td>
  </tr>
    `).join("")
}  
    </tbody>
  </table>`;
  },
  afterRender() {
    const confirm = (message, id, post) => {
      Swal.fire({
        title: "Cập nhật trạng thái đơn hàng",
        text: message,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có, làm đi!",
        cancelButtonText: "Chưa, để suy nghĩ đã!",
      }).then((result) => {
        if (result.isConfirmed) {
          if (post) {
            updateOrder(post, id).then(() => {
              Swal.fire(
                "Cập nhật thành công!",
                "Trạng thái đơn hàng đă được cập nhật",
                "success",
              );
            }).then(() => {
              reRender(orderTable, "#table-post");
            }).catch(() => {
              Swal.fire(
                "Cập nhật thất bại!",
                "Có lỗi xảy ra.",
                "failed",
              );
            });
          } else {
            removeOrder(id).then(() => {
              Swal.fire(
                "Xóa thành công!",
                "Đơn hàng đã bị xóa",
                "success",
              );
            }).then(() => {
              reRender(orderTable, "#table-post");
            }).catch(() => {
              Swal.fire(
                "Cập nhật thất bại!",
                "Có lỗi xảy ra.",
                "failed",
              );
            });
          }
        }
      });
    };
    const btns = document.querySelectorAll(".btn");
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const { id } = btn.dataset;
        if (btn.classList.contains("confirm")) {
          confirm("Xác nhận đơn hàng?", id, { status: 2 });
        } else if (btn.classList.contains("cancel")) {
          confirm("Hủy đơn hàng?", id, { status: 0 });
        } else if (btn.classList.contains("complete")) {
          confirm("Hoàn đơn thành đơn hàng?", id, { status: 3 });
        } else {
          confirm("Xoá đơn hàng này?", id);
        }
      });
    });
  },
};
export default orderTable;