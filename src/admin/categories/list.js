import toastr from "toastr";
import adHeader from "../../components/adheader";
import Nav from "../../components/nav";
import "toastr/build/toastr.min.css";
import { addCategory } from "../../api/categories";
import tableCate from "../../components/tableCate";
import { reRender } from "../../utils/rerender";

const cateLIst = {
  async render() {
    return /* html */`
    <div class="min-h-full">
    ${Nav.render()}
    ${adHeader.render()}
    <div class="mt-5 md:mt-0 md:col-span-2">
    <form action="#" method="POST" class="hidden" id="form-add">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div class="grid grid-cols-3 gap-6">
            <div class="col-span-3 sm:col-span-2">
              <label for="company-website" class="block text-sm font-medium text-gray-700">
                Thêm danh mục
              </label>
              <div class="mt-1 flex rounded-md shadow-sm">
                <input type="text" name="company-website" id="cate-name" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300" placeholder="Tên danh mục">
              </div>
            </div>
            <div class="flex items-end">
            <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Save
          </button>
            </div>
          </div>
      </div>
    </form>
  </div>
    <main>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8" >
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div id="tableCate" class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            ${await tableCate.render()}
          </div>
        </div>
      </div>
    </div>
    </div>
            </main>
</div>`;
  },
  afterRender() {
    Nav.afterRender();
    const addBtn = document.querySelector("#add-btn");
    const formAdd = document.querySelector("#form-add");
    addBtn.addEventListener("click", (e) => {
      e.preventDefault();
      formAdd.classList.toggle("hidden");
    });
    formAdd.addEventListener("submit", (e) => {
      e.preventDefault();
      addCategory({
        name: document.querySelector("#cate-name").value,
      }).then(() => {
        toastr.success("Thêm thành công");
        reRender(tableCate, "#tableCate");
      });
    });
    tableCate.afterRender();
  },
};
export default cateLIst;