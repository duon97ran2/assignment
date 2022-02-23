import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { reRender } from "../utils/rerender";
import { removeComment } from "../api/comments";

const commentsPost = {
  render(data) {
    const dataUser = JSON.parse(localStorage.getItem("user"));
    return data.map((item) => `
    <div class="grid grid-cols-6 gap-6 m-6">
    <div class="col-span-1  overflow-hidden  text-center flex flex-col items-center">
    <img src="${item.avatar}" class="w-32 h-32 object-cover rounded-full border-2 border-slate-600 mb-2" alt="">
    <h1 class="text-xl font-bold text-slate-600 ">${item.username}</h1>
    </div>
    <div class="col-span-5 border-2 relative rounded-md border-orange-500 px-6 py-4">
    <p class="font-semibold text-md">
    ${item.content}
    </p>
    <div class="absolute bottom-0 right-0">
    <button data-id="${item.id}" class="bg-orange-500 remove ${dataUser.role === "admin" ? "" : "hidden"} text-white p-4 ">Xóa</button>
    <button class="bg-orange-500 ${localStorage.getItem("user") ? "" : "hidden"} text-white p-4">Trả lời</button></div>
    </div>
    <div class="col-span-5 col-start-2 hidden">
    <form action="" class="">
      <textarea name="" id="compost" class="compost border-orange-500 border-2 rounded-md focus:border-orange-5000"  cols="30" rows="5 " placeholder="Viết bình luận về sản phẩm"></textarea>
      <button type="submit " class="bg-orange-500 reply text-white w-full p-5 ">Phản hồi bình luận</button>
    </form>
  </div>
  </div>
    `);
  },
  afterRender() {
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
              window.location.reload();
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
export default commentsPost;