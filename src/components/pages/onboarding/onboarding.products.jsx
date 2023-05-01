import { useLocation, useNavigate } from "react-router-dom"
import { useCart } from 'react-use-cart'
import { useCheaper } from '../../hooks/useCheepr'
import { Loader } from '../..'
import { useAuthContext } from "../../hooks/useAuthContext"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ListProducts = () => {

  const { state } = useLocation()
  const { addItem } = useCart()
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const { getCheaperProduct, loading } = useCheaper()

  const numberFormatter = Intl.NumberFormat('en-US')

  const addToCart = (item) => {
    addItem(item)
  }

  const viewItem = async (item) => {
    console.log({ item })
    const product_id = item.id
    const shop_id = item.shop_id
    const product_name = item.name

    if (user) {
      await getCheaperProduct(product_name, product_id, shop_id)
    } else {
      navigate('/signin')
    }
  }

  return (
    <>
      {loading ? <Loader /> : null}

      <div className="flex-cards-items">

        {state.map((x) => {
          return (
            <div key={x.id} className="w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
              <h4 className="text-lg px-5 pt-5 text-orange-300" onClick={() => viewItem(x)} style={{ cursor: "pointer" }}>
                View Product
              </h4>
              <a style={{ display: "flex", justifyContent: "center" }}>
                <img className="p-8 rounded-t-lg" style={{ objectFit: "fill", width: "100%", maxHeight: "300px" }} src={x.picture_url} alt="product image" />
              </a>
              <div className="px-5 pb-5">
                <a>
                  <p className="text-base text-white">
                    {x.name}
                  </p>
                </a>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-indigo-500 text-2xl font-medium">R {numberFormatter.format(x.price)}</p>
                  <button className="btn text-white bg-blue-700 hover:bg-blue-800"
                    onClick={() => addToCart(x)}
                  >
                    Add to cart
                  </button>
                </div>

              </div>
            </div>
          )
        })}

      </div>
      <ToastContainer />
    </>
  )
}

export default ListProducts