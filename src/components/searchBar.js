import { searchProduct } from "../api/products";
import { priceLoad } from "../utils";

const searchBar = {
  render() {
    return `
    <label class="relative block">
    <span class="sr-only">Search</span>
    <span class="absolute inset-y-0 left-0 flex items-center pl-2 ">
      <i class="fa fa-search text-slate-400" aria-hidden="true"></i>
    </span>
    <input id="search" class="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for anything..." type="text" name="search"/>
    </label>
    <div class="result bg-slate-100 shadow-xl z-50">
    </div> 
    `;
  },
  afterRender() {
    document.querySelector("#search").addEventListener("keyup", async () => {
      const products = await searchProduct(document.querySelector("#search").value);
      if (document.querySelector("#search").value) {
        document.querySelector(".result").innerHTML = products.data.length > 0 ? products.data.map((product) => `
      <a href="#/productDetail/${product.id}" class="flex items-center p-2">
      <img src="${product.image}" class="w-10 h-10" alt="">
      <div class="ml-5"><h2 class="font-medium text-2xl capitalize">${product.name}</h2><h2 class="font-medium text-orange-500">Giá: ${priceLoad(product.price, product.discount).toLocaleString("de-DE", {
  style: "currency",
  currency: "VND",
})}</h2></div></a> 
      `).join("") : "<h2 class=\"p-2\">No data found</h2>";
      } else {
        document.querySelector(".result").innerHTML = "";
      }
    });
  },
};
export default searchBar;