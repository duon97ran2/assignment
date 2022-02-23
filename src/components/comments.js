import $ from "jquery";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import validate from "jquery-validation";
import { addComment } from "../api/comments";
import { reRender } from "../utils/rerender";
import productDetail from "../pages/productDetail";

const commnentSection = {
  render(id) {
    const userData = JSON.parse(localStorage.getItem("user"));
    return localStorage.getItem("user") ? /* html */`
    <div class="grid grid-cols-6 gap-6">
    <div class="col-span-1  overflow-hidden  text-center flex flex-col items-center">
    <img src="${userData.avatar}" class="w-32 h-32 object-cover rounded-full border-2 border-slate-600 mb-2" alt="">
    <h1 class="text-xl font-bold text-slate-600 ">${userData.username}</h1>
    </div>
    <div class="col-span-5
">
    <form action="" class="" method="post" id="form-comment">
      <textarea name="compost" id="compost" class="compost border-orange-500 border-2 rounded-md focus:border-orange-5000" rows="5 " placeholder="Viết bình luận về sản phẩm"></textarea>
      <input type="hidden" value="${userData.id}"  id="userId">
      <input type="hidden" value="${id}" id="productId">
      <input type="hidden" value="${userData.avatar}" id="userAvatar">
      <input type="hidden" value="${userData.username}" id="username">
      <button type="submit " class="bg-orange-500 text-white w-full p-5 ">Gửi bình luận</button>
    </form></div>
  </div>` : /* html */`
  <div class="text-center ${localStorage.getItem("user") ? "hidden" : ""}">
    <a href="/#signin" class="bg-orange-500 text-white p-2">Đăng nhập để bình luận</a>
  </div>
    `;
  },
  afterRender(id) {
    $("#form-comment").validate({
      rules: {
        compost: {
          required: true,
          minlength: 15,
        },
      },
      messages: {
        compost: {
          required: "Không thể gửi bình luận trống",
          minlength: "Bình luận cần tối thiểu 15 kí tự",
        },
      },
      submitHandler: () => {
        const ccjd = () => {
          const post = {
            content: $("#compost").val(),
            userId: +$("#userId").val(),
            username: $("#username").val(),
            avatar: $("#userAvatar").val(),
            productId: +$("#productId").val(),
            status: 1,
          };
          addComment(post).then(() => { toastr.success("Gửi bình luận thành công"); }).then(() => {
            reRender(productDetail, "#app", id);
          }).catch((error) => {
            toastr.error(error.response.data);
          });
        };
        ccjd();
      },
    });
  },
};
export default commnentSection;