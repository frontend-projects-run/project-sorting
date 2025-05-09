import { Model } from "./model.js";
import { View } from "./view.js";

const model = new Model();
const view = new View();

init();

async function init() {
  await model.loadingData();
  view.renderProducts(model.data);
  addEventListeners();
}
function addEventListeners() {
  view.elements.sortTypeSelect.addEventListener("change", sortProduct);
  view.elements.sortCategorySelect.addEventListener("change", sortProduct);
  view.elements.sortOrderSelect.addEventListener("change", sortProduct);
  view.elements.filterInut.addEventListener("input", filterProducts);
}

function sortProduct() {
  const sortingValue = view.sortingElementsValue();
  const sortingData = model.sortingProducts(sortingValue);
  view.renderProducts(sortingData);
}

function filterProducts() {
  const value = this.value.toLowerCase();
  model.filterSearch(value);
  sortProduct();

  //console.log(model.data);
}
