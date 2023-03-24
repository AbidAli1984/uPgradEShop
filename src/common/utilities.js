export const Utilities = {
  getEmptyProduct: () => {
    return {
      id: "",
      name: "",
      category: "",
      manufacturer: "",
      availableItems: "",
      price: "",
      imageUrl: "",
      description: "",
    };
  },
  getFilteredData: (arr, value) => {
    return arr.filter((val) => {
      return (val.value || val) === value;
    });
  },
  sortByField: (arr, key, type) => {
    if (!key || typeof arr[0] !== "object") return;

    if (type === "DESC") {
      arr.sort((a, b) => {
        return b[key] - a[key];
      });
    } else {
      arr.sort((a, b) => {
        return a[key] - b[key];
      });
    }

    return arr;
  },
  sortBy: (arr, type) => {
    if (type === "DESC") {
      arr.sort((a, b) => {
        return b - a;
      });
      return;
    }

    arr.sort((a, b) => {
      return a - b;
    });
  },
};
