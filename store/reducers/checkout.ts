import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ShippingInfo {
  email: string;
  address: string;
  firstName: string;
  lastName: string;
  city: string;
  postalCode: string;
  phone: string;
  country: string;
}

interface DeliveryMethod {
  provider: string;
  cost: number;
}

interface CheckoutState {
  shippingInfo: ShippingInfo;
  paymentMethod: string;
  deliveryMethod: DeliveryMethod;
  totalAmount: number;
}

const initialState: CheckoutState = {
  shippingInfo: {
    email: '',
    address: '',
    firstName: '',
    lastName: '',
    city: '',
    postalCode: '',
    phone: '',
    country: ''
  },
  paymentMethod: '',
  deliveryMethod: { provider: '', cost: 0 },
  totalAmount: 0,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setShippingInfo: (state, action: PayloadAction<ShippingInfo>) => {
      state.shippingInfo = action.payload;
    },
    setPaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
    },
    setDeliveryMethod: (state, action: PayloadAction<DeliveryMethod>) => {
      state.deliveryMethod = action.payload;
    },
    setTotalAmount: (state, action: PayloadAction<number>) => {
      state.totalAmount = action.payload;
    },
  },
});

export const {
  setShippingInfo,
  setPaymentMethod,
  setDeliveryMethod,
  setTotalAmount,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
