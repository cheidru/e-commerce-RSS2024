/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LineItem = {
  id: string;
  productId: string;
  name: string;
  productType: string;
  variant: string;
  quantity: number;
  totalPrice: number;
  discountedPricePerQuantity: number;
};

export type TotalPrice = {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
};

export type Cart = {
  id: string;
  version: string;
  createdAt: string;
  lastModifiedAt: string;
  lineItems: LineItem[];
  cartState: string;
  totalPrice: TotalPrice;
  origin: string;
};

type CartState = {
  cart: Cart;
};

export const cartInitial: Cart = {
  id: '',
  version: '',
  createdAt: '',
  lastModifiedAt: '',
  lineItems: [],
  cartState: '',
  totalPrice: {
    type: '',
    currencyCode: '',
    centAmount: 0,
    fractionDigits: 0,
  },
  origin: '',
};

const initialState: CartState = {
  cart: { ...cartInitial },
};

const someTokenCart = localStorage.getItem('tokenCart');
if (someTokenCart) {
  const savedTokenCart = JSON.parse(someTokenCart);
  initialState.cart.id = savedTokenCart;
}

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<Cart>) {
      state.cart = action.payload;
      localStorage.setItem('tokenCart', JSON.stringify(action.payload.id));
    },
    clearCart(state) {
      localStorage.setItem('tokenCart', '');
      state.cart = { ...cartInitial };
    },
  },
});

export const { setCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
