import adHeader from "../../components/adheader";
import Nav from "../../components/nav";
import productList from "../../components/productComments";

const commentList = {
  async render() {
    return /* html */`
    <div class="min-h-full">
    ${Nav.render()}
    ${adHeader.render()}
    <main>
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8" >
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div id="tableCate" class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">${await productList.render()}
          </div>
        </div>
      </div>
    </div>
    </div>
            </main>
</div>`;
  },
};
export default commentList;