import toastr from "toastr";
import axios from "axios";
import "toastr/build/toastr.min.css";
import { getProduct, updateProduct } from "../../api/products";
import Nav from "../../components/nav";
import { getAllCategories } from "../../api/categories";

const editProducts = {
  async loadSelectCate(productData) {
    const { data } = await getAllCategories();
    return data.length > 0 ? data.map((cate) => `
      <option value="${cate.id}" ${productData.data.categoryId == cate.id ? "selected" : ""}>${cate.name}</option>
  `) : "";
  },
  async render(id) {
    const productData = await getProduct(id);
    return /* html */`${Nav.render()}
    <header class="bg-white shadow mb-7">
              <div class="max-w-7xl flex justify-between mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 class="text-3xl font-bold text-gray-900">
                  Cập nhật sản phẩm
                </h1>
                <a name="" id="" class="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" href="/admin/products" role="button">Danh sách sản phẩm</a>
              </div>
              
    </header>
<div>
<div class="md:grid md:grid-cols-3 md:gap-6">
  <div class="md:col-span-1 px-6">
    <div class="px-4 sm:px-0">      
    <h1 class="font-semibold">Cập nhật sản phẩm</h1>      
    <p class="mt-1 text-sm text-gray-600">
      Cập nhật thông tin cho sản phẩm
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
                Tên sản phẩm
              </label>
              <div class="mt-1 flex rounded-md shadow-sm">
                <input type="text" name="company-website" id="post-name" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300" value="${productData.data.name}" placeholder="Nhập tên sản phẩm">
              </div>
            </div>
            <div class="col-span-3 sm:col-span-2">
              <label for="company-website" class="block text-sm font-medium text-gray-700">
                Ảnh
              </label>
              <div class="mt-1 flex rounded-md shadow-sm">
                <input type="file" name="post-img" id="post-img" class="block w-full text-sm text-slate-500 file:mr-4 
                file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100 
                "/>
                <input type="hidden" id="imageOld" value="${productData.data.image}">
              </div>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-6">
            <div class="col-span-3 sm:col-span-2">
              <label for="company-website" class="block text-sm font-medium text-gray-700">
                Giá thành
              </label>
              <div class="mt-1 flex rounded-md shadow-sm">
                <input type="number" value="${productData.data.price}" min="0" max="100000000" step="1000" name="company-website" id="price" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300" placeholder="Nhập giá sản phẩm">
              </div>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-6">
            <div class="col-span-3 sm:col-span-2">
              <label for="company-website" class="block text-sm font-medium text-gray-700">
                Số lượng
              </label>
              <div class="mt-1 flex rounded-md shadow-sm">
                <input type="number" min="1" max="100" value="${productData.data.quantity}" name="company-website" id="quantity" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300" placeholder="Nhập số lượng sản phẩm">
              </div>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-6">
            <div class="col-span-3 sm:col-span-2">
              <label for="company-website" class="block text-sm font-medium text-gray-700">
                Danh mục
              </label>
              <div class="mt-1 flex rounded-md shadow-sm">
              <select name="category_id" id="category_id" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300">
              ${await this.loadSelectCate(productData)}
              </select>
              </div>
            </div>
          </div>
          <div>
            <label for="about" class="block text-sm font-medium text-gray-700">
              Mô tả
            </label>
            <div class="mt-1">
              <textarea id="post-desc" name="about" rows="3" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="Mô tả sản phẩm.">${productData.data.desc}</textarea>
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
  afterRender(id) {
    const formAdd = document.querySelector("#form-add");
    const postImg = document.querySelector("#post-img");
    const CLOUDINARY_API = "https://api.cloudinary.com/v1_1/duongtaph13276/image/upload";
    const CLOUDINARY_PRESET = "z8ujiqif";
    formAdd.addEventListener("submit", async (e) => {
      e.preventDefault();
      const file = postImg.files[0];
      let updateImg;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_PRESET);
        const { data } = await axios.post(CLOUDINARY_API, formData, {
          headers: {
            "content-type": "application/x-www-formencoded",
          },
        });
        updateImg = data.url;
      } else {
        updateImg = document.querySelector("#imageOld").value;
      }
      const newProduct = {
        name: document.querySelector("#post-name").value,
        image: updateImg,
        price: document.querySelector("#price").value,
        quantity: document.querySelector("#quantity").value,
        categoryId: +document.querySelector("#category_id").value,
        desc: document.querySelector("#post-desc").value,
      };
      updateProduct(newProduct, id).then(() => {
        toastr.success("Cập nhật sản phẩm thành công");
        setTimeout(() => {
          document.location.href = "/admin/products";
        }, 2000);
      }).catch((error) => {
        toastr.error(error.response.data);
      });
    });
  },
};
export default editProducts;