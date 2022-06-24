class Cart {
    constructor(data) {
        this.data = data;
        this.carts = localStorage.getItem('carts') ? JSON.parse(localStorage.getItem('carts')) : [];
        this.span = document.createElement('span');
        this.render();
    }
    render() {
        const cart = document.querySelector('.cart');
        this.span.style.fontSize = '1.5rem';
        this.span.style.color = 'white';
        this.span.style.display = 'flex';
        this.span.style.justifyContent = 'center';
        this.span.style.alignItems = 'center';
        this.span.style.width = '40px';
        this.span.style.height = '40px';
        this.span.style.borderRadius = '50%';
        this.span.style.backgroundColor = 'crimson';
        const totalQtyInCart = this.carts.reduce((acc, item) => acc + item.qtySelected, 0);
        this.span.innerText = totalQtyInCart.toString();
        totalQtyInCart >= 1 ? cart === null || cart === void 0 ? void 0 : cart.append(this.span) : this.span.remove();
    }
    addToCartHandler(qtySelected) {
        const cardItems = document.querySelectorAll('.cardContainer .cardItem');
        const addBtns = document.querySelectorAll('.addToCard');
        const buttonsContainer = document.querySelectorAll('.buttonsContainer');
        const numQtys = document.querySelectorAll('.numQty');
        cardItems.forEach((item, idx) => {
            item.addEventListener('click', () => {
                var _a, _b;
                numQtys[idx].innerText = qtySelected.toString();
                (_a = addBtns[idx]) === null || _a === void 0 ? void 0 : _a.classList.add('d-none');
                (_b = buttonsContainer[idx]) === null || _b === void 0 ? void 0 : _b.classList.remove('d-none');
                const foundItem = this.data.find(dt => dt.id === Number(item.dataset.id));
                const foundItemAddedInLS = this.carts.find(c => c.id === (foundItem === null || foundItem === void 0 ? void 0 : foundItem.id));
                if (foundItem === undefined) {
                    return;
                }
                if (foundItemAddedInLS) {
                    foundItemAddedInLS.qtySelected = qtySelected;
                    // init qty to 1
                    qtySelected = 1;
                }
                else {
                    foundItem.qtySelected = 1;
                    this.carts.push(foundItem);
                    // init qty to 1
                    qtySelected = 1;
                }
                localStorage.setItem('carts', JSON.stringify(this.carts));
                this.render();
            });
        });
    }
    changeQtyHandler() {
        const buttonsContainer = document.querySelectorAll('.buttonsContainer');
        const addBtns = document.querySelectorAll('.addToCard');
        buttonsContainer.forEach((btnC, idx) => {
            let qtySelected = 1;
            btnC.addEventListener('click', e => {
                var _a;
                let evt = e.target;
                if (evt.innerText === '+') {
                    qtySelected++;
                }
                else if (evt.innerText === '-') {
                    qtySelected > 1 && qtySelected--;
                }
                else if (evt.classList.contains('remove')) {
                    e.stopPropagation();
                    const cardItem = document.querySelectorAll('.cardItem')[idx];
                    const foundItemAddedInLS = this.carts.find(c => c.id === Number(cardItem.dataset.id));
                    if (foundItemAddedInLS) {
                        this.removeCartHandler(foundItemAddedInLS.id);
                        addBtns[idx].classList.remove('d-none');
                        (_a = buttonsContainer[idx]) === null || _a === void 0 ? void 0 : _a.classList.add('d-none');
                    }
                }
                this.addToCartHandler(qtySelected);
                // if using input field
                // let evt = e.target as HTMLInputElement;
                // this.addToCartHandler(Number(evt.value))
            });
        });
    }
    removeCartHandler(id) {
        const newCarts = this.carts.filter(c => c.id !== id);
        this.carts = newCarts;
        localStorage.setItem('carts', JSON.stringify(this.carts));
        this.render();
    }
}
export default Cart;
