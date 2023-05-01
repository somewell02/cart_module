import { Module } from "vuex";
import { Cart, CartItem } from "@/types/cart";
import { RootState } from "@/store/index";
import { createOrder } from "@/data/api/orderApi";

const cartModule: Module<Cart, RootState> = {
  state: () => ({
    items: [
      {
        id: 1,
        quantity: 1,
      },
      {
        id: 2,
        quantity: 2,
      },
      {
        id: 3,
        quantity: 1,
      },
    ],
    installation: false,
  }),
  getters: {
    getItemsQuantity(state: Cart) {
      return state.items.reduce(
        (res: number, item: CartItem) => res + item.quantity,
        0
      );
    },
    getItemsDisplayQuantityShort(_, getters) {
      return `${getters.getItemsQuantity} шт`;
    },
    getItemsDisplayQuantityLong(_, getters) {
      const quantity = getters.getItemsQuantity;
      const lastNum = quantity % 10;

      if (
        (quantity > 10 && [11, 12, 13, 14].includes(quantity % 100)) ||
        [5, 6, 7, 8, 9, 0].includes(lastNum)
      )
        return `${quantity} товаров`;
      else if (lastNum === 1) return `${quantity} товар`;
      else return `${quantity} товара`;
    },
    getTotalPrice(state: Cart, _, __, rootGetters) {
      return state.items.reduce((res: number, item: CartItem) => {
        const product = rootGetters["products/getProductById"](item.id);
        return res + item.quantity * product?.price;
      }, 0);
    },
    getItems(state: Cart) {
      return state.items;
    },
    getInstallation(state: Cart) {
      return state.installation;
    },
    getInstallationDisplay(state: Cart) {
      return state.installation ? "Да" : "Нет";
    },
  },
  mutations: {
    incItemQuantity(state: Cart, productId: number) {
      const cartItem = state.items.find((item) => item.id === productId);
      if (cartItem) cartItem.quantity++;
    },
    decItemQuantity(state: Cart, productId: number) {
      const cartItem = state.items.find((item) => item.id === productId);
      if (cartItem && cartItem.quantity > 1) cartItem.quantity--;
    },
    deleteItem(state: Cart, productId: number) {
      state.items = state.items.filter((item) => item.id !== productId);
    },
    clearCart(state: Cart) {
      state.items = [];
    },
    setInstallation(state: Cart, installation: boolean) {
      state.installation = installation;
    },
  },
  actions: {
    async createOrder({ state, commit }) {
      try {
        const res = await createOrder({
          products: state.items,
          installation: state.installation,
          userId: 1,
        });
        if (res) {
          commit("clearCart");
        }
      } catch (error) {
        console.error("Failed to create order:", (error as Error).message);
      }
    },
  },
  namespaced: true,
};

export default cartModule;
