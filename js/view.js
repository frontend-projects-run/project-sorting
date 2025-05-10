export class View {
  constructor() {}

  elements = {
    productList: document.querySelector(".productList"),
    sortCategorySelect: document.querySelector("#sortCategory"),
    sortTypeSelect: document.querySelector("#sortType"),
    sortOrderSelect: document.querySelector("#sortOrder"),
    filterInut: document.querySelector("#filterInut"),
    form: document.querySelector("#form"),
  };

  highLightFilterValue(name, filterValue) {
    const lowerCaseName = name.toLowerCase();
    const lowerCaseFilterValue = filterValue.toLowerCase();
    const startIdx = lowerCaseName.indexOf(lowerCaseFilterValue);

    if (startIdx !== -1) {
      const start = name.substring(0, startIdx);
      const interVal = name.substring(startIdx, startIdx + filterValue.length);
      const end = name.substring(startIdx + filterValue.length);
      const highLightedName = `${start}<span class="active">${interVal}</span>${end}`;
      return highLightedName;
    }
    return name;
  }
  renderProducts(arrData) {
    this.elements.productList.innerHTML = "";
    arrData.forEach((product) => {
      const name = this.highLightFilterValue(
        product.name,
        this.elements.filterInut.value
      );
      if (product.id) {
        const markup = `
            <li>
             <span>${product.subtitle}</span>
             <h3>${name}</h3>
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

  sortingElements() {
    return {
      sortType: this.elements.sortTypeSelect,
      sortOrder: this.elements.sortOrderSelect,
      sortCategory: this.elements.sortCategorySelect,
    };
  }
}
