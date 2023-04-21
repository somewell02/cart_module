export const productDisplayPrice = (price: number, quantity = 1): string => {
  if (price === undefined || Number.isNaN(price)) return "-";

  const resultPrice = price * quantity;
  return resultPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export const productDisplayPriceRub = (price: number, quantity = 1): string =>
  `${productDisplayPrice(price, quantity)} ₽`;

export const productDisplayPriceEur = (price: number, quantity = 1): string =>
  `${productDisplayPrice(price, quantity)} €`;

export const productDisplayPriceRubPerOne = (price: number): string =>
  `${productDisplayPrice(price, 1)} ₽/шт.`;
