import { createStore, StoreOptions } from "vuex";

import cartModule from "@/store/cart";
import productsModule from "@/store/products";

export interface RootState {}

export const store = createStore<StoreOptions<RootState>>({
  modules: {
    cart: cartModule,
    products: productsModule,
  },
});
