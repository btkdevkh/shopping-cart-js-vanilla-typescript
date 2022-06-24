class CardList {
    constructor(data) {
        this.data = data;
        this.render();
    }
    render() {
        const cardContainer = document.querySelector('.cardContainer');
        let template = '';
        this.data.forEach(dt => {
            template += `
        <div class="cardItem card p-2" data-id="${dt.id}">
          <img src="${dt.path}" class="img-fluid" alt="${dt.name}">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <h5 class="card-title">${dt.name}</h5>
              <p class="card-text">${dt.price.toFixed(2)}€</p>
            </div>
            <button class="addToCard btn btn-primary mt-3 w-100">Ajouter</button>

            <div class="buttonsContainer text-center d-none">
              <!-- if using input field -->
              <!--<input 
                class="numQty form-control" 
                type="number" 
                value="1"
                min="1"
                max="100"
              />-->

              <!-- if using simple buttons -->
              <button class="minus btn btn-primary mt-3">-</button>
              <span class="numQty btn btn-secondary mt-3">1</span>
              <button class="plus btn btn-primary mt-3">+</button>

              <button class="remove btn btn-danger mt-3">
                SUP
              </button>
            </div>
          </div>
        </div>
      `;
        });
        cardContainer.innerHTML = template;
    }
}
export default CardList;
