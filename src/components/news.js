// import { data } from "autoprefixer";

import { getAll } from "../api/news";

const NewsList = {
  async render() {
    const { data } = await getAll();
    return /* html */`
    <div class="grid grid-cols-3 gap-6">
    ${data.map((post) => `
    <div class=" news-item">
    <a href="/tin-tuc/${post.id}" class="overflow-hidden mb-3 block"><img src="${post.img}" class="w-full h-full object-cover hover:scale-110 transition duration-500" alt=""></a>
    <a href=""><h2 class="news-title">${post.title}</h2></a>
    <p class="whitespace-normal">${post.desc}</p>
    </div>
    `).join("")}
    </div>
    `;
  },
};
export default NewsList;