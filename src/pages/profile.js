const profilePage = {
  render() {
    const userData = JSON.parse(localStorage.getItem("user"));
    return /* html */`
    <header class="bg-white shadow mb-7">
              <div class="max-w-7xl flex justify-between mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 class="text-3xl font-bold text-gray-900">
                  Cập nhật người dùng
                </h1>
              </div>
              
    </header>
<div>
<div class="md:grid md:grid-cols-3 md:gap-6">
  <div class="md:col-span-1 px-6">
    <div class="px-4 sm:px-0">
      <h1 class="font-semibold">Cập nhật thông tin người dùng</h1>      
      <p class="mt-1 text-sm text-gray-600">
        Vui lòng cập nhật thông tin người dùng
      </p>
    </div>
  </div>
  <div class="mt-5 md:mt-0 md:col-span-2">
    <form action="#" method="POST" id="form-edit">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div class="grid grid-cols-3 gap-6">
            <div class="col-span-3 sm:col-span-2">
              <label for="company-website" class="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div class="mt-1 flex rounded-md shadow-sm">
                <input type="email" disabled name="company-website" id="email-address" value="${userData.email}" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300" placeholder="Nhập địa chỉ mail">
              </div>
            </div>
            <div class="col-span-3 sm:col-span-2">
              <label for="company-website" class="block text-sm font-medium text-gray-700">
                Ảnh
              </label>
              <div class="mt-1 flex rounded-md shadow-sm">
              <img class="imgPreview w-20" src="${userData.avatar}" alt="">
                <input type="file"  name="post-img" id="post-img" class="block w-full text-sm text-slate-500 file:mr-4 
                file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100
                "/>
                <input type="hidden" id="imageOld" value="${userData.avatar}">
              </div>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-6">
            <div class="col-span-3 sm:col-span-2">
              <label for="company-website" class="block text-sm font-medium text-gray-700">
              Username
              </label>
              <div class="mt-1 flex rounded-md shadow-sm">
                <input type="text" name="company-website" id="username" value="${userData.username}" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300" placeholder="Tên đăng nhập">
              </div>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-6">
            <div class="col-span-3 sm:col-span-2">
              <label for="company-website" class="block text-sm font-medium text-gray-700">
                Vai trò
              </label>
              <div class="mt-1 flex rounded-md shadow-sm">
              <select name="category_id" id="role" disabled class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300">
              <option  value="admin" ${(userData.role) == "admin" ? "selected" : ""}>Quản trị viên</option>
              <option  value="member" ${(userData.role) == "member" ? "selected" : ""}>Thành viên</option>
              </select>
              </div>
            </div>
          </div>
        </div>

        </div>
        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Lưu
          </button>
        </div>
      </div>
    </form>
  </div>
</div>
</div>
`;
  },
};
export default profilePage;