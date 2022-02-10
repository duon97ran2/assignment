import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { get, update } from "../../api/news";
import Nav from "../../components/nav";

const newsEdit = {
  async render(id) {
    const { data } = await get(id);
    return /* html */`
    ${Nav.render()}
    <header class="bg-white shadow mb-7">
              <div class="max-w-7xl flex justify-between mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 class="text-3xl font-bold text-gray-900">
                Chỉnh sửa sửa bài viết
                </h1>
                <a name="" id="" class="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" href="/admin/news" role="button">Danh sách bài viết</a>
              </div>
              
    </header>
<div>
<div class="md:grid md:grid-cols-3 md:gap-6">
  <div class="md:col-span-1">
    <div class="px-4 sm:px-0">
      <p class="mt-1 text-sm text-gray-600">
        Cập nhật bài viết của bạn
      </p>
    </div>
  </div>
  <div class="mt-5 md:mt-0 md:col-span-2">
    <form action="#" id="form-update" method="POST">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div class="grid grid-cols-3 gap-6">
            <div class="col-span-3 sm:col-span-2">
              <label for="company-website" class="block text-sm font-medium text-gray-700">
                Tiêu đề
              </label>
              <div class="mt-1 flex rounded-md shadow-sm">
                <input type="text" name="company-website" id="post-name" value="${data.title}" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300" placeholder="Your name">
              </div>
            </div>
            <div class="col-span-3 sm:col-span-2">
              <label for="company-website" class="block text-sm font-medium text-gray-700">
                Ảnh
              </label>
              <div class="mt-1 flex rounded-md shadow-sm">
                <span class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  Img
                </span>
                <input type="text" name="company-website" id="post-img" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" value="${data.img}" placeholder="www.example.com">
              </div>
            </div>
          </div>

          <div>
            <label for="about" class="block text-sm font-medium text-gray-700">
              Nội dung
            </label>
            <div class="mt-1">
              <textarea id="post-desc" name="about" rows="3" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="you@example.com">${data.desc}</textarea>
            </div>
            <p class="mt-2 text-sm text-gray-500">
              Nội dung bài viết của bạn
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">
              Photo
            </label>
            <div class="mt-1 flex items-center">
              <div class="flex-shrink-0 h-10 w-10">
              <img class="h-10 w-10 rounded-full" src="${data.img}" alt="">
              </div>
              <button type="button" class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Change
              </button>
            </div>
          </div>
        </div>
        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Save
          </button>
        </div>
      </div>
    </form>
  </div>
</div>
</div>

    `;
  },
  afterRender(id) {
    const formAdd = document.querySelector("#form-update");
    formAdd.addEventListener("submit", (e) => {
      e.preventDefault();
      const postUpdate = {
        title: document.querySelector("#post-name").value,
        img: document.querySelector("#post-img").value,
        desc: document.querySelector("#post-desc").value,
      };
      update(postUpdate, id).then(() => {
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Đã cập nhật bài viết!",
        });
        window.location.replace("/admin/news");
      }).catch(() => {
        Swal.fire({
          icon: "error",
          title: "Thất bại",
          text: "Chưa thể cập nhật bài viết!",
        });
        window.location.reload(true);
      });
    });
  },
};
export default newsEdit;