import axios from "axios";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { addUser } from "../../api/users";
import Nav from "../../components/nav";

const addUsers = {
  async render() {
    return /* html */`${Nav.render()}
    <header class="bg-white shadow mb-7">
              <div class="max-w-7xl flex justify-between mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 class="text-3xl font-bold text-gray-900">
                  Thêm người dùng
                </h1>
                <a name="" id="" class="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" href="/admin/products" role="button">Danh sách người dùng</a>
              </div>
              
    </header>
<div>
<div class="md:grid md:grid-cols-3 md:gap-6">
  <div class="md:col-span-1 px-6">
    <div class="px-4 sm:px-0">
      <h1 class="font-semibold">Điền thông tin người dùng</h1>      
      <p class="mt-1 text-sm text-gray-600">
        Vui lòng điền đầy đủ thông tin người dùng mới
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
                Email
              </label>
              <div class="mt-1 flex rounded-md shadow-sm">
                <input type="email" name="company-website" id="email-address" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300" placeholder="Nhập địa chỉ mail">
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
          <div class="grid grid-cols-3 gap-6">
            <div class="col-span-3 sm:col-span-2">
              <label for="company-website" class="block text-sm font-medium text-gray-700">
              Username
              </label>
              <div class="mt-1 flex rounded-md shadow-sm">
                <input type="text" name="company-website" id="username" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300" placeholder="Tên đăng nhập">
              </div>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-6">
            <div class="col-span-3 sm:col-span-2">
              <label for="company-website" class="block text-sm font-medium text-gray-700">
              Mật khẩu
              </label>
              <div class="mt-1 flex rounded-md shadow-sm">
                <input type="text" name="company-website" id="password" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300" placeholder="Mật khẩu">
              </div>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-6">
            <div class="col-span-3 sm:col-span-2">
              <label for="company-website" class="block text-sm font-medium text-gray-700">
                Vai trò
              </label>
              <div class="mt-1 flex rounded-md shadow-sm">
              <select name="category_id" id="role" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300">
              <option  disabled selected>Chọn vai trò</option>
              <option  value="admin">Quản trị viên</option>
              <option  value="member">Thành viên</option>
              </select>
              </div>
            </div>
          </div>
        </div>

        </div>
        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Lưu
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
    Nav.afterRender();
    const formAdd = document.querySelector("#form-add");
    const avatar = document.querySelector("#post-img");
    const CLOUDINARY_API = "https://api.cloudinary.com/v1_1/duongtaph13276/image/upload";
    const CLOUDINARY_PRESET = "z8ujiqif";
    avatar.addEventListener("change", (e) => {
      document.querySelector(".imgPreview").src = URL.createObjectURL(e.target.files[0]);
    });
    formAdd.addEventListener("submit", async (e) => {
      e.preventDefault();
      const file = avatar.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_PRESET);
      const { data } = await axios.post(CLOUDINARY_API, formData, {
        headers: {
          "content-type": "application/x-www-formencoded",
        },
      });
      const newUser = {
        email: document.querySelector("#email-address").value,
        avatar: data.url,
        username: document.querySelector("#username").value,
        password: document.querySelector("#password").value,
        role: document.querySelector("#role").value,
      };
      addUser(newUser).then(() => {
        toastr.success("Thêm người dùng thành công");
        setTimeout(() => {
          document.location.href = "/admin/users";
        }, 2000);
      }).catch((error) => {
        toastr.error(error.response.data);
      });
    });
  },
};
export default addUsers;