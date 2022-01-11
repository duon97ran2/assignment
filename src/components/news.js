import newsData from "../data";

const NewsList = {
  render() {
    return `
    <div class="grid grid-cols-3 gap-6">
    ${newsData.map((post) => `
    <div class=" news-item">
    <a href="/tuyen-dung/${post.id}" class="overflow-hidden mb-3 block"><img src="${post.img}" class="w-full h-full object-cover hover:scale-110 transition duration-500" alt=""></a>
    <a href=""><h2 class="news-title">${post.title}</h2></a>
    <p class="whitespace-normal">${post.desc}</p>
    </div>
    `).join("")}
    </div>
    `
    ;
  }
}
export default NewsList;