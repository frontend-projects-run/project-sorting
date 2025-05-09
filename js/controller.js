import { Model } from "./model.js";
import { View } from "./view.js";

const model = new Model();
const view = new View();

init();

async function init() {
  await model.loadingData();
  const sortingElements = view.sortingElements();
  model.updateFromUrl(sortingElements);
  sortProduct();
  addEventListeners();
}
function addEventListeners() {
  view.elements.sortTypeSelect.addEventListener("change", sortProduct);
  view.elements.sortCategorySelect.addEventListener("change", sortProduct);
  view.elements.sortOrderSelect.addEventListener("change", sortProduct);
  view.elements.filterInut.addEventListener("input", filterProducts);
  view.elements.form.addEventListener("submit", resetForm);
}

function sortProduct() {
  const sortingValue = view.sortingElementsValue();
  const sortingData = model.sortingProducts(sortingValue);
  view.renderProducts(sortingData);
  model.updateUrl(sortingValue);
}

function filterProducts() {
  const value = this.value.toLowerCase();
  model.filterSearch(value);
  sortProduct();
}
async function resetForm(e) {
  e.preventDefault();
  const sortingElements = view.sortingElements();
  model.resetFilter(sortingElements);
  sortProduct();
}
