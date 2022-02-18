const adHeader = {
  render() {
    return `
    <header class="bg-white shadow">
              <div class="max-w-7xl flex justify-between mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 class="text-3xl font-bold capitalize text-gray-900">
                  ${window.location.href.replace(`${window.location.origin}/#admin/`, "")}
                </h1>
                <a name="" id="add-btn" class="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" href="${window.location.href}/add" role="button">Add ${window.location.href.replace(`${window.location.origin}/#admin/`, "")}</a>
              </div>
              
    </header>`;
  },
};
export default adHeader;