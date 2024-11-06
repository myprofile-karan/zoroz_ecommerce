import Layout from '../../layouts/Main';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutStatus from '../../components/checkout-status';
import CheckoutItems from '../../components/checkout/items';
import { RootState } from 'store';
import { useState, FormEvent } from 'react';
// import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

// Import actions from Redux slice
import {
  setShippingInfo,
  setPaymentMethod,
  setDeliveryMethod,
  setTotalAmount,
} from 'store/reducers/checkout';
import { clearCart } from 'store/reducers/cart';
import { useRouter } from 'next/router';

const CheckoutPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const checkoutData = useSelector((state: RootState) => state.checkout);
  const [showModal, setShowModal] = useState(false);
  const { cartItems } = useSelector((state: RootState) => state.cart);

  // Calculate total cart price
  const priceTotal = useSelector((state: RootState) => {
    const cartItems = state.cart.cartItems;
    let totalPrice = 0;
    if (cartItems.length > 0) {
      cartItems.map(item => (totalPrice += item.price * item.count));
    }
    return totalPrice;
  });

  // Dispatch action to update shipping information
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch(
      setShippingInfo({
        ...checkoutData.shippingInfo,
        [name]: value,
      })
    );
  };

  // Dispatch action to select payment method
  const handlePaymentSelect = (method: string) => {
    dispatch(setPaymentMethod(method));
    toast.success(`Payment method selected: ${method}`);
  };

  // Dispatch action to select delivery method
  const handleDeliverySelect = (provider: string, cost: number) => {
    dispatch(setDeliveryMethod({ provider, cost }));
    toast.success(`Delivery method selected: ${provider}`);
  };


  // Calculate and set the total amount
  const totalAmount = priceTotal + checkoutData.deliveryMethod.cost;
  dispatch(setTotalAmount(totalAmount));

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { shippingInfo, paymentMethod, deliveryMethod } = checkoutData;

    // Validate required fields
    if (
      !shippingInfo.email ||
      !shippingInfo.address ||
      !shippingInfo.firstName ||
      !shippingInfo.lastName ||
      !shippingInfo.city ||
      !shippingInfo.postalCode ||
      !shippingInfo.phone ||
      !shippingInfo.country
    ) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!paymentMethod) {
      toast.error('Please select a payment method');
      return;
    }

    if (!deliveryMethod.provider) {
      toast.error('Please select a delivery method');
      return;
    }

    setShowModal(true);
  };

  const handleConfirmOrder = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch(clearCart()); // Clear the cart after successful order
      setShowModal(false);
      toast.success('Order placed successfully!');
      router.push('/');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <Layout>
      <section className="cart">
        <div className="container">
          <div className="cart__intro">
            <h3 className="cart__title">Shipping and Payment</h3>
            <CheckoutStatus step="checkout" />
          </div>

          <div className="checkout-content">
            <div className="checkout__col-6">
              <div className="block">
                <h3 className="block__title">Shipping information</h3>
                <form className="form" onSubmit={handleSubmit}>
                  <div className="form__input-row form__input-row--two">
                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={checkoutData.shippingInfo.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        type="text"
                        placeholder="Address"
                        name="address"
                        value={checkoutData.shippingInfo.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form__input-row form__input-row--two">
                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        type="text"
                        placeholder="First name"
                        name="firstName"
                        value={checkoutData.shippingInfo.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        type="text"
                        placeholder="City"
                        name="city"
                        value={checkoutData.shippingInfo.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form__input-row form__input-row--two">
                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        type="text"
                        placeholder="Last name"
                        name="lastName"
                        value={checkoutData.shippingInfo.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        type="text"
                        placeholder="Postal code / ZIP"
                        name="postalCode"
                        value={checkoutData.shippingInfo.postalCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form__input-row form__input-row--two">
                    <div className="form__col">
                      <input
                        className="form__input form__input--sm"
                        type="tel"
                        placeholder="Phone number"
                        name="phone"
                        value={checkoutData.shippingInfo.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form__col">
                      <div className="select-wrapper select-form">
                        <select
                          name="country"
                          value={checkoutData.shippingInfo.country}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Country</option>
                          <option value="Argentina">Argentina</option>
                          <option value="USA">USA</option>
                          <option value="UK">UK</option>
                          <option value="Canada">Canada</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="checkout__col-4">
              <div className="block">
                <h3 className="block__title">Payment method</h3>
                <ul className="round-options round-options--three">
                  {['paypal', 'visa', 'mastercard', 'maestro', 'discover'].map((method) => (
                    <li key={method}>
                      <button
                        title={method}
                        style={{
                          margin: "5px 20px",
                          border: checkoutData.paymentMethod === method ? '3px solid #fbb03b' : 'none',
                          borderRadius: '8px',
                          padding: '5px'
                        }}
                        className={`${checkoutData.paymentMethod === method ? 'active' : ''}`}
                        onClick={() => handlePaymentSelect(method)}
                      >
                        <img src={`/images/logos/${method}.png`} alt={method} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="block">
                <h3 className="block__title">Delivery method</h3>
                <ul className="round-options round-options--two">
                  {[
                    { provider: 'inpost', cost: 20 },
                    { provider: 'dpd', cost: 12 },
                    { provider: 'dhl', cost: 15 },
                  ].map((method) => (
                    <li key={method.provider}>
                      <button
                        title={method.provider}
                        style={{
                          border: checkoutData.deliveryMethod.provider === method.provider ? '3px solid #fbb03b' : 'none',
                          borderRadius: '8px',
                          padding: '5px'
                        }}
                        className={`${checkoutData.deliveryMethod.provider === method.provider ? 'active' : ''}`}
                        onClick={() => handleDeliverySelect(method.provider, method.cost)}
                      >
                        <img src={`/images/logos/${method.provider}.svg`} alt={method.provider} />
                        <p>${method.cost}.00</p>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="checkout__col-2">
              <div className="block">
                <h3 className="block__title">Your cart</h3>
                <CheckoutItems />

                <div className="checkout-total">
                  <p>Total cost</p>
                  <h3>${totalAmount.toFixed(2)}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="cart-actions cart-actions--checkout">
            <a href="/cart" className="cart__btn-back"><i className="icon-left"></i> Back</a>
            <div className="cart-actions__items-wrapper">
              <button
                type="button"
                className="btn btn--rounded btn--yellow"
                onClick={handleSubmit}
              >
                Confirm and pay
              </button>
            </div>
          </div>

          {showModal && (
            <div className="modal-overlay">
              <div className="modal">
                <h2>Order Details</h2>
                <div className="modal-content">
                  <div className="order-details">
                    <div className='shipping' >
                      <h3>Shipping Information</h3>
                      <p> Name : {checkoutData.shippingInfo.firstName} {checkoutData.shippingInfo.lastName}</p>
                      <p style={{ width: "70%"}}> Address : {checkoutData.shippingInfo.address}</p>
                      <p> City : {checkoutData.shippingInfo.city}, {checkoutData.shippingInfo.postalCode}</p>
                      <p> Country : {checkoutData.shippingInfo.country}</p>
                      <p> Phone : {checkoutData.shippingInfo.phone}</p>
                      <p> Email : {checkoutData.shippingInfo.email}</p>
                    </div>

                    <div style={{paddingLeft:"20px"}}>
                      <h3>Products</h3>
                      {cartItems.map((item, index) => (
                        <div key={`${item.id}-${item.color}-${item.size}`}>
                          <p className='product_label'>
                            <label className='product_number'>{index + 1}</label>
                            Name: {item.name}</p>
                          <p>Color: {item.color}</p>
                          <p>Size: {item.size}</p>
                          <p>Quantity: {item.count}</p>
                          <p>Price: ${item.price * item.count}</p>
                          <hr/>
                        </div>
                      ))}

                    </div>
                    <div>

                      <h3>Payment Method</h3>
                      <p>{checkoutData.paymentMethod}</p>

                      <h3>Delivery Method</h3>
                      <p>{checkoutData.deliveryMethod.provider} - ${checkoutData.deliveryMethod.cost}</p>

                      <h3>Total Amount</h3>
                      <p>${totalAmount.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="modal-actions">
                    <button
                      className="btn btn--rounded btn--outline"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn--rounded btn--yellow"
                      onClick={handleConfirmOrder}
                    >
                      Confirm Order
                    </button>
                  </div>
                </div>
              </div>
              <style jsx>{`
    .product_label {
      position: relative;
    }
    .product_number {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20px;
      height: 20px;
      color: black;
      font-size: 12px;
      font-weight: 600;
      border-radius: 50%;
      background: #fbb03b;
      position: absolute;
      top: 0;
      left: -30px;
    }
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    .modal {
      border: 2px solid #fbb03b;
      background: white;
      padding: 2rem;
      border-radius: 8px;
      width: 90%;
      max-width: 600px;
      max-height: 90vh;
      overflow-y: auto;
    }
    .modal h2 {
      margin-bottom: 1.5rem;
      text-align: center;
    }
    .order-details {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
    .order-details div {
      width: 80%;
    }
    .order-details h3 {
      margin: 1rem 0 0.5rem;
      color: #333;
    }
    .order-details p {
      margin: 0.5rem 0;
      color: #666;
      font-size: 0.9rem;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }
    .modal-actions {
      margin-top: 2rem;
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
    }
  `}</style>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default CheckoutPage;
