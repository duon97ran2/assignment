import { getAllCategories, getCategoryProducts } from "../api/categories";
import homeProduct from "./homeProduct";

const cateSelect = {
  async render(id) {
    const categories = await getAllCategories();
    return /* html */`
    <div class="grid grid-cols-4">
      <div class="col-span-1">
      <div class="border-t border-gray-200 px-4 py-6">
      <h3 class="-mx-2 -my-3 flow-root">
        <!-- Expand/collapse section button -->
        <button type="button" class="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500" aria-controls="filter-section-mobile-1" aria-expanded="false">
          <span class="font-medium text-gray-900"> Category </span>
          <span class="ml-6 flex items-center">
            <!--
              Expand icon, show/hide based on section open state.
  
              Heroicon name: solid/plus-sm
            -->
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" id="show">
              <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
            </svg>
            <!--
              Collapse icon, show/hide based on section open state.
  
              Heroicon name: solid/minus-sm
            -->
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" id="hide">
              <path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" />
            </svg>
          </span>
        </button>
      </h3>
      <!-- Filter section, show/hide based on section state. -->
      <div class="pt-6" id="filter-section-mobile-1">
        <div class="space-y-6">
        ${id ? categories.data.map((category) => `
          <div class="flex items-center">
            <input id="filter-mobile-category-0" name="category[]" ${category.id === +id ? "checked" : ""} data-id="${category.id}" value="new-arrivals" type="checkbox" class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500">
            <label for="filter-mobile-category-0" class="ml-3 min-w-0 flex-1 text-gray-500"> ${category.name} </label>
          </div>
        `).join("") : categories.data.map((category) => `
        <div class="flex items-center">
          <input id="filter-mobile-category-0" name="category[]"checked  data-id="${category.id}" value="new-arrivals" type="checkbox" class="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500">
          <label for="filter-mobile-category-0" class="ml-3 min-w-0 flex-1 text-gray-500"> ${category.name} </label>
        </div>
      `).join("")}
          
        </div>
      </div>
    </div>
      </div>
      <div class="col-span-3">
      <div class="grid grid-cols-3 gap-6 p-6" id="productList">
      </div> 
      </div>
    </div>
    

    `;
  },

  afterRender(id) {
    document.querySelector("#show").addEventListener("click", () => {
      document.querySelector("#filter-section-mobile-1").classList.remove("hidden");
    });
    document.querySelector("#hide").addEventListener("click", () => {
      document.querySelector("#filter-section-mobile-1").classList.add("hidden");
    });
    let products = [];
    const checkList = document.querySelectorAll("input[name='category[]']");
    const loadProduct = async (item) => {
      const productId = item.dataset.id;
      const categoryProducts = await getCategoryProducts(productId);
      if (item.checked) {
        products.push(categoryProducts.data);
      } else {
        products = products.filter((product) => product.id !== categoryProducts.data.id);
      }
      document.querySelector("#productList").innerHTML = products.map((product) => `${homeProduct.render(product.products)}`).join("");
      homeProduct.afterRender();
    };
    checkList.forEach((checkbox) => {
      loadProduct(checkbox);
      checkbox.addEventListener("change", (e) => {
        loadProduct(e.target);
      });
    });
  },
};
export default cateSelect;