import Nav from "../../components/nav";
import orderTable from "../../components/orderTable";

const orderList = {
  async render() {
    return `
      ${Nav.render()}
      <header class="bg-white shadow">
              <div class="max-w-7xl flex justify-between mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 class="text-3xl font-bold capitalize text-gray-900">
                  ${window.location.href.replace(`${window.location.origin}/#admin/`, "")}
                </h1>
              </div>
              
      </header>
      <div class=" w-full overflow-x-auto">
      ${await orderTable.render()}</div>
      `;
  },
  afterRender() {
    Nav.afterRender();
    orderTable.afterRender();
  },
};
export default orderList;