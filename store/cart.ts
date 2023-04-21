import { Module } from "vuex";
import { Cart, CartItem } from "@/types/cart";
import { RootState } from "@/store/index";
import { createOrder } from "@/data/orderApi";

const cartModule: Module<Cart, RootState> = {
  state: () => ({
    items: [
      {
        productId: "G2H1065",
        quantity: 1,
      },
      {
        productId: "BXC1065",
        quantity: 2,
      },
      {
        productId: "GHN1065",
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
        const product = rootGetters["products/getProductById"](item.productId);
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
    incItemQuantity(state: Cart, productId: string) {
      const cartItem = state.items.find((item) => item.productId === productId);
      if (cartItem) cartItem.quantity++;
    },
    decItemQuantity(state: Cart, productId: string) {
      const cartItem = state.items.find((item) => item.productId === productId);
      if (cartItem && cartItem.quantity > 1) cartItem.quantity--;
    },
    deleteItem(state: Cart, productId: string) {
      state.items = state.items.filter((item) => item.productId !== productId);
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
          user: {
            name: "Samvel",
            surname: "Grigoryan",
          },
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
