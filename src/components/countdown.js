import { discountChange } from "../utils";
import { reRender } from "../utils/rerender";
import productSlide from "./swiper";

const coundown = {
  render() {
    return `
    <div class="flex justify-center container font-bold text-3xl">
    <h1 class="mx-2 text-orange-500 bg-white p-2 hour rounded">00</h1>
    <h1 class="mx-2 text-white p-2"> :</h1>
    <h1 class="mx-2 text-orange-500 bg-white p-2 minute rounded"> 02</h1>
    <h1 class="mx-2 text-white p-2">:</h1>
    <h1 class="mx-2 text-orange-500 bg-white p-2 second rounded">03</h1>
  </div>
    `;
  },
  afterRender() {
    const timecount = () => {
      const countDate = new Date("Febuary 28,2099 10:00:00").getTime();
      const now = new Date().getTime();
      const gap = countDate - now;
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      // const day = hour * 24;
      // const textDay = Math.floor(gap / day);
      // const textHour = Math.floor((gap % day) / hour);
      const textMinute = Math.floor((gap % hour) / minute);
      const textSecond = Math.floor((gap % minute) / second);
      document.querySelector(".hour").innerHTML = "00";
      document.querySelector(".minute").innerHTML = textMinute.toLocaleString("en-US", { minimumIntegerDigits: 2 });
      document.querySelector(".second").innerHTML = textSecond.toLocaleString("en-US", { minimumIntegerDigits: 2 });
      // if (textSecond / 60 === 0) {
      //   discountChange().then(() => {
      //     reRender(productSlide, ".swiper");
      //   });
      // }
    };
    setInterval(timecount(), 1000);
    setInterval(() => { reRender(coundown, ".container"); }, 1000);
  },
};
export default coundown;