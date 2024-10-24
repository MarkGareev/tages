import type { IProduct } from "~/types/types";

export const useProductStore = defineStore("productStore", () => {
  const config = useRuntimeConfig();
  const API_ROUTE = config.public.api_route;
  const materialStore = useMaterialStore();
  const listProducts = reactive<IProduct[]>([]);

  async function fetchProducts(params: string = "") {
    listProducts.length = 0; // Очищаем массив, если снова делаем запрос (например с другой страницы)
    const { data } = await useAsyncData<IProduct[]>("products", () =>
      $fetch(API_ROUTE + "/items" + params)
    );
    data.value?.forEach((product: IProduct) => {
      listProducts.push({
        ...product,
        isFavorite: false,
        isInCart: false,
      });
    });
  }

  function updateProductsStatus() {
    const inCart: string[] = JSON.parse(localStorage.getItem("inCart") || "[]");
    const favorite: string[] = JSON.parse(
      localStorage.getItem("favorite") || "[]"
    );

    listProducts.forEach((product: IProduct) => {
      product.isInCart = inCart.includes(product.id);
      product.isFavorite = favorite.includes(product.id);
    });
  }

  function sortProducts(items: IProduct[]) {
    if (materialStore.sortBy === "asc") {
      const itemsCopy = [...items];
      return itemsCopy.sort(
        (a: IProduct, b: IProduct) =>
          a.price.current_price - b.price.current_price
      );
    } else if (materialStore.sortBy === "desc") {
      const itemsCopy = [...items];
      return itemsCopy.sort(
        (a: IProduct, b: IProduct) =>
          b.price.current_price - a.price.current_price
      );
    } else return items;
  }

  function filterProducts(items: IProduct[]) {
    if (Number(materialStore.filterBy) === 0) {
      return items;
    }
    return items.filter(
      (product) => product.material === Number(materialStore.filterBy)
    );
  }

  const getProducts = computed<IProduct[]>(() =>
    sortProducts(filterProducts(listProducts))
  );

  return {
    fetchProducts,
    getProducts,
    updateProductsStatus,
  };
});
