import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { add } from "../../api/news";
import Nav from "../../components/nav";

const addNews = {
  render() {
    return /* html */`
    ${Nav.render()}
    <header class="bg-white shadow mb-7">
              <div class="max-w-7xl flex justify-between mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 class="text-3xl font-bold text-gray-900">
                  Thêm bài viết
                </h1>
                <a name="" id="" class="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" href="/admin/news" role="button">Danh sách bài viết</a>
              </div>
              
    </header>
<div>
<div class="md:grid md:grid-cols-3 md:gap-6">
  <div class="md:col-span-1">
    <div class="px-4 sm:px-0">      <p class="mt-1 text-sm text-gray-600">
        Thêm bài viết mới của bạn
      </p>
    </div>
  </div>
  <div class="mt-5 md:mt-0 md:col-span-2">
    <form action="#" method="POST" id="form-add">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div class="grid grid-cols-3 gap-6">
            <div class="col-span-3 sm:col-span-2">
              <label for="company-website" class="block text-sm font-medium text-gray-700">
                Tiêu đề
              </label>
              <div class="mt-1 flex rounded-md shadow-sm">
                <input type="text" name="company-website" id="post-name" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300" placeholder="Your name">
              </div>
            </div>
            <div class="col-span-3 sm:col-span-2">
              <label for="company-website" class="block text-sm font-medium text-gray-700">
                Ảnh
              </label>
              <div class="mt-1 flex rounded-md shadow-sm">
              <img class="imgPreview w-20" src="https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc=" alt="">
                <input type="file"  name="post-img" id="post-img" class="block w-full text-sm text-slate-500 file:mr-4 
                file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100
                "/>
              </div>
            </div>
          </div>

          <div>
            <label for="about" class="block text-sm font-medium text-gray-700">
              Nội dung
            </label>
            <div class="mt-1">
              <textarea id="post-desc" name="about" rows="3" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="you@example.com"></textarea>
            </div>
            <p class="mt-2 text-sm text-gray-500">
              Brief description for your profile. URLs are hyperlinked.
            </p>
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
  afterRender() {
    const formAdd = document.querySelector("#form-add");
    const imgPost = document.querySelector("#post-img");
    const CLOUDINARY_API = "https://api.cloudinary.com/v1_1/duongtaph13276/image/upload";
    const CLOUDINARY_PRESET = "z8ujiqif";
    imgPost.addEventListener("change", (e) => {
      document.querySelector(".imgPreview").src = URL.createObjectURL(e.target.files[0]);
    });
    formAdd.addEventListener("submit", async (e) => {
      e.preventDefault();
      const file = imgPost.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_PRESET);
      const { data } = await axios.post(CLOUDINARY_API, formData, {
        headers: {
          "content-type": "application/x-www-formencoded",
        },
      });
      const postFake = {
        title: document.querySelector("#post-name").value,
        img: data.url,
        desc: document.querySelector("#post-desc").value,
      };
      add(postFake).then(() => {
        Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Đã thêm bài viết!",
        });
        window.location.replace("/admin/news");
      }).catch(() => {
        Swal.fire({
          icon: "error",
          title: "Thất bại",
          text: "Chưa thể thêm bài viết!",
        });
        window.location.reload(true);
      });
    });
  },
};
export default addNews;