const Header = {
  render(){
    return /*html*/`<header>
    <div class="bg-orange-600 flex justify-end">
      <ul class="flex">
        <li><a href="/signin" class="nav-item__link">Đăng nhập</a></li>
        <li><a href="/signup" class="nav-item__link">Đăng ký</a></li>
        <li><a href="/admin/dashboard" class="nav-item__link">Admin</a></li>
      </ul>
    </div>
    <div class="bg-blue-900 py-4">
      <a href=""><img src="./asset/images/logo.81e2f86a (1).png"  alt="" class="mx-auto  w-40"></a>
    </div>
    <div class="bg-orange-600 flex">
      <ul class="flex">
        <li><a href="/" class="nav-item__link">Trang chủ</a></li>
        <li><a href="/tuyen-sinh" class="nav-item__link">Tuyển sinh</a></li>
        <li><a href="/chuong-trinh-dao-tao" class="nav-item__link">Chương trình đào tạo</a></li>
        <li><a href="/tuyen-dung" class="nav-item__link">Tuyển dụng</a></li>
        <li><a href="/goc-sinh-vien" class="nav-item__link">Góc sinh viên</a></li>
      </ul>
      <label for="search-bar">
        <input type="text" class="block my-2 focus:outline-none  focus:border-0 border-0 p-0 mx-12 w-56 bg-white" name="" id="">
      </label>
      <button class="bg-blue-900 border border-white text-white px-3 my-2">Tìm kiếm</button>
    </div>
  </header>`;
  }
}
export default Header;