import { getAllProducts } from "../api/products";

const productList = {
  async render() {
    const { data } = await getAllProducts();
    return /* html */`            <table class="min-w-full divide-y divide-gray-200 table-auto" id="table-post">
    <thead class="bg-gray-50">
      <tr>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          id
        </th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Image
        </th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Name
        </th>
        <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
          Comments Number
        </th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
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
      <div class="flex items-center">
        <div class="flex-shrink-0 h-10 w-10">
          <img class="h-10 w-10" src="${post.image}" alt="">
        </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <div>
      <div class="text-sm font-medium text-gray-900">
          ${post.name}
          </div>
      </div>
    </td>
    <td class="px-6 py-4 text-center whitespace-nowrap">
      <div>
      <div class="text-sm font-medium text-gray-900">
          ${(post.comments).length}
          </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
      <a href="/#admin/comments/${post.id}/detail" class="edit-btn text-indigo-600 hover:text-indigo-900">View detail</a>
    </td>
  </tr>
    `).join("")
}  
    </tbody>
  </table>`;
  },
};
export default productList;