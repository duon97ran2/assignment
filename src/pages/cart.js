import cartTable from "../components/cartTable";
import menu from "../components/menu";

const cartList = {
  render() {
    return /* html */`
    <div class="relative bg-[#1D1D1D] h-[60px]">
    ${menu.render()}</div>
    <div class="h-screen ">
        ${cartTable.render()}
        </div>
    `;
  },
  afterRender() {
    menu.afterRender();
    cartTable.afterRender();
  },
};
export default cartList;