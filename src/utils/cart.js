import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

let cart = [];
if (localStorage.getItem("cart")) {
  cart = JSON.parse(localStorage.getItem("cart"));
} else {
  cart = [];
}
export const addTocart = (newProduct, next) => {
  if (!localStorage.getItem("cart")) {
    cart = [];
  }
  const existProduct = cart.find((product) => product.id === +newProduct.id);
  if (!existProduct) {
    cart.push(newProduct);
  } else {
    existProduct.number += newProduct.number;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  next();
};
export const increaseItemNumber = (id, next) => {
  // eslint-disable-next-line no-plusplus
  cart.find((product) => product.id === +id).number++;
  localStorage.setItem("cart", JSON.stringify(cart));
  next();
};

export const removeCartItem = (id, next) => {
  Swal.fire({
    title: "Xóa sản phẩm này khỏi giỏ?",
    text: "Sản phẩm này sẽ bị xóa khỏi giỏ",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Có, xóa đi",
  }).then((result) => {
    if (result.isConfirmed) {
      cart = cart.filter((item) => item.id !== +id);
      if (cart.length > 0) {
        localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        localStorage.removeItem("cart");
      }
      Swal.fire(
        "Xoá thành công",
        "Sản phẩm đã được xóa khỏi giỏ",
        "success",
      ).then(next());
    } else {
      const currentItem = cart.find((product) => product.id === +id);
      if (currentItem.number < 1) {
        currentItem.number = 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        next();
      }
    }
  });
};

export const decreaseItemNumber = (id, next) => {
  const currentItem = cart.find((product) => product.id === +id);
  // eslint-disable-next-line no-plusplus
  currentItem.number--;
  if (currentItem.number < 1) {
    removeCartItem(id, () => { next(); });
  }
  if (cart.length > 0) {
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    localStorage.removeItem("cart");
  }
  next();
};