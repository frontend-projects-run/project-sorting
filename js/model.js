export class Model {
  constructor() {
    this.data = [];
    this.filterData = [];
  }

  async loadingData() {
    return new Promise((resolve, reject) => {
      fetch("./data.json")
        .then((res) => res.json())
        .then((data) => {
          this.data = data;
          this.filterData = [...this.data];
          resolve();
        })
        .catch((err) => {
          console.error("Ошибка загрузки данных", err);
          reject(err);
        });
    });
  }

  sortingProducts(sortingValue) {
    let { sortType, sortCategory, sortOrder } = sortingValue;
    let filterData;

    if (sortCategory !== "all") {
      filterData = this.filterData.filter((request) => {
        return request.category === sortCategory;
      });
    } else {
      filterData = [...this.filterData];
    }

    return filterData.sort((a, b) => {
      switch (sortType) {
        case "date":
          return sortOrder === "desc"
            ? Date.parse(a.date) - Date.parse(b.date)
            : Date.parse(b.date) - Date.parse(a.date);

        case "alphabet":
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();

          if (sortOrder === "desc") {
            if (nameA < nameB) {
              return 1;
            } else if (nameA > nameB) {
              return -1;
            } else {
              return 0;
            }
          } else if (sortOrder === "asc") {
            if (nameA > nameB) {
              return 1;
            } else if (nameA < nameB) {
              return -1;
            } else {
              return 0;
            }
          }

        case "price":
          const priceA = a.price;
          const priceB = b.price;
          return sortOrder === "desc" ? priceA - priceB : priceB - priceA;
      }
    });
  }

  filterSearch(value) {
    if (value === "") {
      this.filterData = [...this.data];
    } else {
      this.filterData = this.data.filter((product) =>
        product.name.toLowerCase().includes(value)
      );
    }
  }

  resetFilter(sortingElements) {
    let { sortType, sortCategory, sortOrder } = sortingElements;
    sortType.value = "price";
    sortOrder.value = "asc";
    sortCategory.value = "all";
  }

  updateUrl(sortingValue) {
    let { sortType, sortCategory, sortOrder } = sortingValue;
    const urlParams = new URLSearchParams();
    urlParams.set("sortType", sortType);
    urlParams.set("sortOrder", sortOrder);
    urlParams.set("sortCategory", sortCategory);

    window.history.replaceState(null, null, `?${urlParams.toString()}`);
  }
  updateFromUrl(sortingElements) {
    let { sortType, sortCategory, sortOrder } = sortingElements;
    const urlParams = new URLSearchParams(window.location.search);

    const sortTypeValue = urlParams.get("sortType") || "price";
    const sortOrderValue = urlParams.get("sortOrder") || "asc";
    const sortCategoryValue = urlParams.get("sortCategory") || "all";

    sortType.value = sortTypeValue;
    sortOrder.value = sortOrderValue;
    sortCategory.value = sortCategoryValue;
  }
}
