import Swiper, { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getAllProducts } from "../api/products";
import homeProduct from "./homeProduct";

const productSlide = {
  async render() {
    let newData = [];
    const { data } = await getAllProducts();
    newData = data.filter((item) => item.discount > 20);
    return `
    <div class="swiper my-6 ">
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
      <!-- Slides -->
      ${homeProduct.render(newData)}
    </div>
    <!-- If we need pagination -->
    <div class="swiper-pagination"></div>
  
    <!-- If we need navigation buttons -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  
    <!-- If we need scrollbar -->
    <div class="swiper-scrollbar"></div>
  </div>
    `;
  },
  afterRender() {
    const swiper = new Swiper(".swiper", {
      // Optional parameters
      direction: "horizontal",
      loop: true,
      spaceBetween: 10,
      modules: [Pagination, Navigation],
      // If we need pagination
      pagination: {
        el: ".swiper-pagination",
      },
      slidesPerView: 4,
      // Navigation arrows
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      // And if we need scrollbar
      // scrollbar: {
      //   el: ".swiper-scrollbar",
      // },
    });
  },
};
export default productSlide;