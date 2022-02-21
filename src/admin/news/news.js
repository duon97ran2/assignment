import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { getAll, remove } from "../../api/news";
import adHeader from "../../components/adheader";
import Nav from "../../components/nav";
import { reRender } from "../../utils/rerender";
// import { reRender } from "../../utils/rerender";

const News = {
  async render() {
    const { data } = await getAll();
    return /* html */`
    <div class="min-h-full">
    ${Nav.render()}
    ${adHeader.render()}
    <main>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8" >
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200" id="table-post">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
              ${data.map((post) => /* html */`
              <tr>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img class="h-10 w-10 rounded-full" src="${post.img}" alt="">
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                    ${post.title}
                    </div>
                    <div class="text-sm text-gray-500">
                      jane.cooper@example.com
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-normal">
                <div class="text-sm text-gray-900">${post.desc}</div>
                <div class="text-sm text-gray-500">Optimization</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                Admin
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href="/#admin/news/${post.id}/edit" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                <button data-id="${post.id}" class="btn btn-remove text-indigo-600 hover:text-indigo-900 font-medium">Remove</button>
              </td>
            </tr>
              `).join("")
}  
               <!-- More people... -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
            </main>
          </div>
    `;
  },
  afterRender() {
    Nav.afterRender();
    const buttons = document.querySelectorAll(".btn-remove");
    buttons.forEach((button) => {
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
            remove(id).then(() => {
              Swal.fire(
                "Deleted!",
                "Your file has been deleted.",
                "success",
              );
            }).then(() => { reRender(News, "#app"); }).catch((error) => {
              Swal.fire(
                "Xóa thất bại!",
                error.response.data,
                "success",
              );
            });
          }
        });
      });
    });
  },
};
export default News;