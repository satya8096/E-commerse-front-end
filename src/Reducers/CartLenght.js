import CheckAuth from './CheckAuth';

export default async function CartLenght() {
    const user = await CheckAuth(localStorage.getItem('user'));
    const cart = user.cart;
    let length = cart.length;
    let countEle = document.getElementById("cart-count");
    countEle.innerHTML = length;
    return countEle
}
