export type SortBy = "asc" | "desc" | null; // asc - по возрастанию, desc по убыванию
export type FilterBy = string | null;
export type TypeSelect = "filter" | "sort";

export interface IProduct {
  id: string;
  name: string;
  code: string | null;
  price: {
    old_price: number | null;
    current_price: number;
  };
  image: {
    url: string;
  };
  material: number;
  isFavorite?: boolean;
  isInCart?: boolean;
}

export interface IMaterial {
  id: string;
  name: string;
}
export interface IOption {
  id: FilterBy | SortBy;
  name: string;
}
export interface IFilters {
  title: string;
  type: TypeSelect;
  options: IOption[];
}
