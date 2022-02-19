import cartTable from "../components/cartTable";
import checkoutForm from "../components/checkoutForm";
import menu from "../components/menu";

const cartList = {
  render() {
    return /* html */`
    <div class="relative bg-[#1D1D1D] h-[60px]">
    ${menu.render()}</div>
    <div class="min-h-screen bg-slate-50  p-4">
    <h1 class="uppercase pb-4 text-center italic text-orange-500 text-4xl font-bold">Giỏ hàng</h1>
    <div class="grid grid-cols-3 gap-4  rounded-md">
      <div class="col-span-2 shadow-xl bg-white rounded-md">
      ${cartTable.render()}
      </div>
      <div class="checkout-box bg-white">
      ${checkoutForm.render()}
      </div>
    </div>
        
        </div>
    `;
  },
  afterRender() {
    menu.afterRender();
    checkoutForm.afterRender();
    cartTable.afterRender();
  },
};
export default cartList;