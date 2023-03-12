import { useCart } from "react-use-cart";
import { Address } from "..";
import FedEx from "../../../assets/FedEx.png";
import DHL from "../../../assets/DHL.png";
import PayPal from "../../../assets/paypal-seeklogo.com.svg";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup"
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext"
import { checkout } from "../../hooks/useCheckout"
import { AnimateButton } from "../..";
import moment from 'moment/moment'
const regex = new RegExp(/^4[0-9]{12}(?:[0-9]{3})?$/);

const CheckoutSchema = Yup.object().shape({
  cardHolder: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Field required'),
  cvv: Yup.number()
    .required(),
  card_number: Yup.number()
    .required('Field required')
})

const Checkout = () => {
  const numberFormatter = Intl.NumberFormat("en-US");
  const { checkoutProducts, proceedCheckout, isLoading } = checkout()
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const [validate, setValidate] = useState(null)
  const {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem
  } = useCart();
  console.log({ items })
  const dateRegex = new RegExp('[0-9]{2}/[0-9]{2}')
  const lengthRegex = new RegExp('^[0-9]{16}$')
  const cvvRegex = new RegExp('^[1-9]{3}$')
  const today = moment().format('MM')
  const currentYear = moment().format('YY')
  const email = user ? user.email : null

  const quantity = items.map(element => {
    return element.quantity
  })

  const product_id = items.map(element => {
    return element.id
  })

  const prices = items.map(element => {
    return element.price
  })

  const shop_id = items.map(element => {
    return element.shop_id
  })

  const price = prices.reduce((accumulate, value) => {
    return accumulate + value
  }, 0)
  const totalDue = price + 99


  return (
    <>
      <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          eMarket
        </Link>
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                  href="#"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </a>
                <span className="font-semibold text-gray-900">Shop</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                  href="#"
                >
                  2
                </a>
                <span className="font-semibold text-gray-900">Shipping</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                  href="#"
                >
                  3
                </a>
                <span className="font-semibold text-gray-500">Payment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {items.map((element) => {
              return (
                <div
                  className="flex flex-col rounded-lg bg-white sm:flex-row"
                  key={element.id}
                >
                  <img
                    className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                    src={element.picture_url}
                    alt=""
                  />
                  <div className="flex w-full flex-col px-4 py-4">
                    {/* <span className="font-semibold">{element.description}</span> */}
                    <span className="float-right text-gray-400">
                      {element.name}
                    </span>
                    <p className="text-lg font-bold">
                      R {numberFormatter.format(element.price)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0" style={{ height: "fit-content" }}>
          <p className="text-xl font-medium">Payment Details</p>
          <p className="text-gray-400">
            Complete your order by providing your payment details.
          </p>

          <Formik
            initialValues={{
              cardHolder: "",
              card_number: "",
              exp_date: "",
              cvv: "",
            }}
            validationSchema={CheckoutSchema}
            onSubmit={values => {
              console.log({ values })
              const { cardHolder: fullName, card_number, exp_date, cvv } = values

              if (!lengthRegex.test(card_number)) {
                setValidate("Warning! Card number must be 16 numbers in length")
              } else
                if (card_number == '5490997771092064') {
                  setValidate('Warning! This credit card number is associated with a scam attempt')
                } else
                  if (!dateRegex.test(exp_date)) {
                    setValidate('Invalid date format')
                  } else
                    if (dateRegex.test(exp_date)) {
                      const month = exp_date.split('/')[0]
                      const year = exp_date.split('/')[1]

                      if (month > 12) {
                        setValidate('Nice try! 😎 we have no month beyond 12 month and the format should be: MM/YY')
                      } else
                        if (month <= 0) {
                          setValidate(`There's no such month ZERO`)
                        }
                        else
                          if (year <= 21) {
                            setValidate(`Card you trying to use has expired or choose another year and month if you think it's a TYPO`)
                          } else
                            if (month <= today && year <= currentYear) {
                              setValidate(`Card you trying to use has expired or choose another year and month if you think it's a TYPO`)
                            }
                            else
                              if (!cvvRegex.test(cvv)) {
                                setValidate('CVV number too long, must be 3 digits in length')
                              } 
                                else {
                                  proceedCheckout(product_id, shop_id, quantity, totalDue, fullName)
                                  checkoutProducts(card_number, exp_date, cvv)
                                }
                    }
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="">
                  <label
                    htmlFor="email"
                    className="mt-4 mb-2 block text-sm font-medium"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <Field
                      type="text"
                      id="email"
                      name="email"
                      value={email}
                      disabled={true}
                      className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="your.email@gmail.com"
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="w-full rounded-md paypal">
                    <img src={PayPal} alt="PayPal" />
                  </div>

                  {validate && <div className='status'>{validate}</div>}


                  <label
                    htmlFor="card-holder"
                    className="mt-4 mb-2 block text-sm font-medium"
                  >
                    Card Holder
                  </label>
                  <div className="relative">
                    <Field
                      type="text"
                      id="card-holder"
                      name="cardHolder"
                      className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Your full name here"
                    />
                    {errors.cardHolder && touched.cardHolder ? (<div className="text-orange-600">{errors.cardHolder}</div>) : null}

                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <label
                    htmlFor="card-no"
                    className="mt-4 mb-2 block text-sm font-medium"
                  >
                    Card Details
                  </label>
                  <div className="flex">
                    <div className="relative w-7/12 flex-shrink-0">
                      <Field
                        type="tel"
                        id="card-no"
                        name="card_number"
                        className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="xxxx-xxxx-xxxx-xxxx"
                        maxLength={16}
                      />
                      <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                        <svg
                          className="h-4 w-4 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                          <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                        </svg>
                      </div>
                    </div>
                    <Field
                      type="text"
                      name="exp_date"
                      className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="MM/YY"
                      pattern='[0-9]{2}/[0-9]{2}'
                      maxLength={5}
                      required
                    />
                    <Field
                      type="text"
                      name="cvv"
                      className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="CVV"
                      maxLength={3}
                    />
                  </div>
                  {errors.cvv && touched.cvv ? (<div className="text-orange-600">{errors.cvv}</div>) : null}
                  {errors.card_number && touched.card_number ? (<div className="text-orange-600">{errors.card_number}</div>) : null}

                  {/* <label
                    htmlFor="billing-address"
                    className="mt-4 mb-2 block text-sm font-medium"
                  >
                    Billing Address
                  </label>
                  <Address className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" /> */}
                  <div className="flex flex-col sm:flex-row"></div>

                  <div className="mt-6 border-t border-b py-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">Subtotal</p>
                      <p className="font-semibold text-gray-900">R {numberFormatter.format(price)}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">Delivery</p>
                      <p className="font-semibold text-gray-900">R 99.00</p>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">Total</p>
                    <p className="text-2xl font-semibold text-gray-900">R {numberFormatter.format(price + 99.00)}</p>
                  </div>
                </div>
                <AnimateButton
                  btnName={`Place Order`}
                  isLoading={isLoading}
                />
              </Form>
            )}
          </Formik>
          <button type="button" className="mb-4 w-full px-6 py-2 border rounded-md dark:border-violet-400"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
