const NewsDetail = {
  render(id){
    return fetch(`https://61e7a9b2e32cd90017acbc21.mockapi.io/news/${id}`).then((response)=>response.json()).then((data)=>`
    <h1>${data.title}</h1>
    <img src="${data.img}"/>
    <p>${data.desc}</p>    `);
  },
};
export default NewsDetail;