export class View {
  constructor() {}

  elements = {
    productList: document.querySelector(".productList"),
    sortCategorySelect: document.querySelector("#sortCategory"),
    sortTypeSelect: document.querySelector("#sortType"),
    sortOrderSelect: document.querySelector("#sortOrder"),
    filterInut: document.querySelector("#filterInut"),
  };

  renderProducts(arrData) {
    this.elements.productList.innerHTML = "";
    arrData.forEach((product) => {
      if (product.id) {
        const markup = `
            <li>
             <span>${product.subtitle}</span>
             <h3>${product.name}</h3>
             <p>Цена: ${product.price} руб</p>
             <p>Дата добавления: ${product.date}</p>
            </li>
             `;
        this.elements.productList.insertAdjacentHTML("afterbegin", markup);
      }
    });
  }

  sortingElementsValue() {
    return {
      sortType: this.elements.sortTypeSelect.value,
      sortOrder: this.elements.sortOrderSelect.value,
      sortCategory: this.elements.sortCategorySelect.value,
    };
  }
}
