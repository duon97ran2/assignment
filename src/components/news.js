// import { data } from "autoprefixer";

const NewsList = {
  render() {
    return fetch('https://61e7a9b2e32cd90017acbc21.mockapi.io/news').then((response) => response.json()).then((data) => 
      `
    <div class="grid grid-cols-3 gap-6">
    ${data.map((post) => `
    <div class=" news-item">
    <a href="/tuyen-dung/${post.id}" class="overflow-hidden mb-3 block"><img src="${post.img}" class="w-full h-full object-cover hover:scale-110 transition duration-500" alt=""></a>
    <a href=""><h2 class="news-title">${post.title}</h2></a>
    <p class="whitespace-normal">${post.desc}</p>
    </div>
    `).join("")}
    </div>
    `)
  }
}
export default NewsList;