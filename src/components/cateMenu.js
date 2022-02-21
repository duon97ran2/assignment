import { getAllCategories } from "../api/categories";

const cateMenu = {
  async render() {
    const { data } = await getAllCategories();
    return `
    <div class="grid grid-cols-3 gap-8  px-4 py-6 relative">
    ${data.slice(0, 3).map((item) => `<a href="/#sanpham/${item.id}">
    <div class="grid bg-white grid-cols-2 shadow-2xl  max-h-[250px] cate-item scale-105 hover:scale-110 ease-linear duration-200 shadow-black">
    <div class="overflow-hidden">
      <img src="https://picsum.photos/1000/1000" class="w-full h-full  object-cover" alt="">  
    </div>
    <div >
      
        <h1 class='text-left drop-shadow-xl font-bold mt-5 ml-6 text-2xl mb-2'>${item.name}</h1>
      
      <p class="text-sm mx-6 line-clamp ">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia, maiores.</p>
    </div>      
  </div></a>
    `).join("")}
    
  </div>
    `;
  },
};
export default cateMenu;