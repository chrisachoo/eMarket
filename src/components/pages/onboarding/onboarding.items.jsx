import { HiOutlineArrowNarrowLeft } from "react-icons/hi"
import { Link, useNavigate } from "react-router-dom"
import React, { useState } from 'react'
import { useCart } from 'react-use-cart'
import { checkout } from '../../hooks/useCheckout'
import emptycart from '../../../assets/empty-cart.png'
import { ToastContainer, toast } from 'react-toastify';

const ViewCart = () => {

  const {
    isEmpty,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
    emptyCart
  } = useCart()

  const { checkUser } = checkout()
  const navigate = useNavigate()
  const [value, setValue] = useState(1);

  let price = 0
  for (let j = 0; j < items.length; j++) {
    price = price + items[j].price
  }

  const numberFormatter = Intl.NumberFormat('en-US')
  const formatted = numberFormatter.format(price)

  const handlePass = async () => {
    await checkUser()
  }

  if (isEmpty) return (
    <div className="cart__boundry w-full p-4">
      <img src={emptycart} alt="empty" />
      <div className="info__text">
        <p className="text-2xl text-white">Your cart is empty</p>
        <p className="text-sm font-light">Looks like you haven't made your choice yet...</p>
      </div>
    </div>
  )

  return (
    <section className="cart-item">
      <div className="flex flex-col max-w-3xl p-6 space-y-4 sm:p-10 dark:text-gray-100">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          <button onClick={() => emptyCart()} type="button" class="text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2">
            <svg class="w-5 h-5 mr-2 -ml-1" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
            </svg>
            Empty Cart
          </button>
        </div>
        <ul className="flex flex-col divide-y divide-gray-700">
          {items.map((item) => (
            <li className="flex flex-col py-6 sm:flex-row sm:justify-between" key={item.id}>
              <div className="flex w-full space-x-2 sm:space-x-4">
                <img className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500"
                  src={item.picture_url} alt="Polaroid camera"
                />
                <div className="flex flex-col justify-between w-full pb-4">
                  <div className="custom-class space-x-2">
                    <div className="space-y-1">
                      <h2 className="text-md font-semibold leading-snug sm:pr-8">{item.name}</h2>
                      <p className="text-sm dark:text-gray-400">{item.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold">R {numberFormatter.format(item.price * item.quantity)}</p>
                    </div>
                  </div>
                  <div className="flex text-sm divide-x mt-1" style={{ color: "red", gap: "5px" }}>

                    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                      <button type="button" class="px-3 py-2 text-xs font-medium text-cente rounded-lg focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</button>
                      <span className="quantity">{item.quantity}</span>
                      <button type="button" class="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>

                    <div style={{ display: "flex", paddingLeft: "6px" }}>
                      <button type="button" className="flex items-center px-2 py-1 pl-0 space-x-1"
                        onClick={() => removeItem(item.id)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
                          <path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
                          <rect width="32" height="200" x="168" y="216"></rect>
                          <rect width="32" height="200" x="240" y="216"></rect>
                          <rect width="32" height="200" x="312" y="216"></rect>
                          <path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
                        </svg>
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="space-y-1 text-right">
          <p>Total amount:
            <span className="font-semibold"> R {formatted}</span>
          </p>
          <p className="text-sm dark:text-gray-400">Not including taxes and delivery costs</p>
        </div>
        <div className="flex justify-end space-x-4">
          <button type="button" className="px-6 py-2 border rounded-md dark:border-violet-400"
            onClick={() => navigate(-1)}
          >
            Back
            <span className="sr-only sm:not-sr-only"> to shopping</span>
          </button>
          <button type="button" className="px-6 py-2 border rounded-md dark:bg-violet-400 dark:text-gray-900 dark:border-violet-400"
            onClick={handlePass}
          >
            <span className="sr-only sm:not-sr-only">Continue to </span>Checkout
          </button>
        </div>
      </div>
      <ToastContainer />
    </section>
  )
}

export default ViewCart