import type { FilterBy, IMaterial, SortBy } from "~/types/types";

export const useMaterialStore = defineStore("materialStore", () => {
  const config = useRuntimeConfig();
  const API_ROUTE = config.public.api_route;
  const materials: IMaterial[] = [];
  const sortBy = ref<SortBy>(null);
  const filterBy = ref<FilterBy>(null);

  async function fetchMaterials(params: string = ""): Promise<void> {
    const { data } = await useAsyncData<IMaterial[]>("materials", () =>
      $fetch(API_ROUTE + "/materials" + params)
    );
    if (data.value) {
      materials.push(...data.value);
    }
  }

  function setSorting(type: SortBy): void {
    sortBy.value = type;
  }

  function setFilter(filter: FilterBy): void {
    filterBy.value = filter;
  }

  return {
    materials,
    sortBy,
    filterBy,
    fetchMaterials,
    setSorting,
    setFilter,
  };
});
