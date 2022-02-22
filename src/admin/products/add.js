/* eslint-disable quote-props */
import toastr from "toastr";
import axios from "axios";
import "toastr/build/toastr.min.css";
import $ from "jquery";
import validate from "jquery-validation";
import { addProduct } from "../../api/products";
import Nav from "../../components/nav";
import { getAllCategories } from "../../api/categories";
import productTable from "../../components/productTable";
import { reRender } from "../../utils/rerender";

const addProducts = {
  async loadSelectCate() {
    const { data } = await getAllCategories();
    return data.length > 0 ? data.map((cate) => `
      <option value="${cate.id}">${cate.name}</option>
  `) : "";
  },
  async render() {
    return /* html */`${Nav.render()}
    <header class="bg-white shadow mb-7">
              <div class="max-w-7xl flex justify-between mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 class="text-3xl font-bold text-gray-900">
                  Thêm sản phẩm
                </h1>
                <a name="" id="" class="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" href="#admin/products" role="button">Danh sách sản phẩm</a>
              </div>
              
    </header>
<div>
<div class="md:grid md:grid-cols-3 md:gap-6">
  <div class="md:col-span-1 px-6">
    <div class="px-4 sm:px-0">      
    <h1 class="font-semibold">Điền thông tin sản phẩm</h1>      
    <p class="mt-1 text-sm text-gray-600">
      Vui lòng điền đầy đủ thông tin sản phẩm mới
    </p>
    </div>
  </div>
  <div class="mt-5 md:mt-0 md:col-span-2">
    <form action="#" method="POST" id="form-add">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div class="grid grid-cols-3 gap-6">
            <div class="col-span-3 sm:col-span-2">
              <label for="post-name" class="block text-sm font-medium text-gray-700">
                Tên sản phẩm
              </label>
              <div class="mt-1 flex rounded-md shadow-sm">
                <input type="text" name="post-name" id="post-name" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300" placeholder="Nhập tên sản phẩm">
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
                Giá thành
              </label>
              <div class="mt-1 flex rounded-md shadow-sm">
                <input type="number" min="0" max="100000000" step="1000" name="price" id="price" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300" placeholder="Nhập giá sản phẩm">
              </div>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-6">
            <div class="col-span-3 sm:col-span-2">
              <label for="company-website" class="block text-sm font-medium text-gray-700">
                Giảm giá
              </label>
              <div class="mt-1 flex rounded-md shadow-sm">
                <input type="number" min="1" max="100" step="1" name="discount" id="discount" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300" placeholder="Nhập phần trăm giảm giá">
              </div>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-6">
            <div class="col-span-3 sm:col-span-2">
              <label for="company-website" class="block text-sm font-medium text-gray-700">
                Số lượng
              </label>
              <div class="mt-1 flex rounded-md shadow-sm">
                <input type="number" min="1" max="100" name="quantity" id="quantity" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300" placeholder="Nhập số lượng sản phẩm">
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
              <option  disabled selected>Chọn danh mục</option>
              ${await this.loadSelectCate()}
              </select>
              </div>
            </div>
          </div>
          <div>
            <label for="about" class="block text-sm font-medium text-gray-700">
              Mô tả
            </label>
            <div class="mt-1">
              <textarea id="post-desc" name="desc" rows="3" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="Mô tả sản phẩm."></textarea>
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
    const formAdd = $("#form-add");
    const postImg = document.querySelector("#post-img");
    postImg.addEventListener("change", (e) => {
      document.querySelector(".imgPreview").src = URL.createObjectURL(e.target.files[0]);
    });
    const CLOUDINARY_API = "https://api.cloudinary.com/v1_1/duongtaph13276/image/upload";
    const CLOUDINARY_PRESET = "z8ujiqif";
    formAdd.validate({
      rules: {
        "post-name": {
          required: true,
        },
        "post-img": {
          required: true,
        },
        "price": {
          required: true,
        },
        "quantity": {
          required: true,
        },
        "discount": {
          required: true,
        },
        "desc": {
          required: true,
        },
        "category_id": {
          required: true,
        },
      },
      messages: {
        "post-name": {
          required: "Không được để trống tên",
        },
        "post-img": {
          required: "Không được để trống ảnh",
        },
        "price": {
          required: "Không được để trống giá thành",
        },
        "quantity": {
          required: "Không được để trống phần số lượng",
        },
        "discount": {
          required: "Không được để trống giảm giá",
        },
        "category_id": {
          required: "Không được để trống mã sản phẩm",
        },
        "desc": {
          required: "Không được để trống mô tá",
        },
      },
      submitHandler: () => {
        const formAddSubmit = async () => {
          const file = postImg.files[0];
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", CLOUDINARY_PRESET);
          const { data } = await axios.post(CLOUDINARY_API, formData, {
            headers: {
              "content-type": "application/x-www-formencoded",
            },
          });
          const newProduct = {
            name: document.querySelector("#post-name").value,
            image: data.url,
            price: document.querySelector("#price").value,
            discount: +document.querySelector("#discount").value,
            quantity: +document.querySelector("#quantity").value,
            categoryId: +document.querySelector("#category_id").value,
            desc: document.querySelector("#post-desc").value,
          };
          addProduct(newProduct).then(() => {
            toastr.success("Thêm sản phẩm thành công");
            setTimeout(() => {
              document.location.href = "/#admin/products";
            }, 2000);
          }).then(() => {
            reRender(productTable, "#table-post");
          }).catch((error) => {
            toastr.error(error.response.data);
          });
        };
        formAddSubmit();
      },
    });
  },
};
export default addProducts;