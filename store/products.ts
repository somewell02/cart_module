import { Module } from "vuex";
import { Product } from "@/types/product";
import { getProducts } from "@/data/api/productsApi";
import { RootState } from "@/store/index";

interface ProductState {
  products: Product[];
}

const productsModule: Module<ProductState, RootState> = {
  state: () => ({
    products: [],
  }),
  getters: {
    getProducts(state: ProductState) {
      return state.products;
    },
    getProductById(state: ProductState) {
      return (id: number) =>
        state.products.find((product) => product.id === id);
    },
  },
  mutations: {
    setProducts(state: ProductState, products: Product[]) {
      state.products = products;
    },
  },
  actions: {
    async initProducts(context) {
      try {
        const products = await getProducts();
        context.commit("setProducts", products);
      } catch (error) {
        console.error((error as Error).message);
      }
    },
  },
  namespaced: true,
};

export default productsModule;
