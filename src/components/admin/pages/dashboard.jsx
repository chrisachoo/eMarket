import { useState } from 'react'
import { useLogout } from '../../hooks/useLogout'
import { useLocation, useNavigate } from 'react-router-dom'
import { HiUsers, HiShoppingCart } from 'react-icons/hi'
import { FaSignOutAlt, FaFileInvoice, FaTags, FaHome } from 'react-icons/fa'
import { AiFillEdit } from 'react-icons/ai'
import { ImBin2 } from 'react-icons/im'
import Upload from './components/upload'
import { GrStatusGoodSmall } from 'react-icons/gr'
import { MdOutlineProductionQuantityLimits } from 'react-icons/md'
import { useShop } from '../../hooks/useShop'
import { TbReport } from 'react-icons/tb'
// import './dashboard.css'
import { useEffect } from 'react'
import { useReport } from '../hook/useReport'
import { useAuthContext } from '../../hooks/useAuthContext'
import AddShops from './components/addshops'
import { FaShoppingBasket } from 'react-icons/fa'
import { BsFillFileBarGraphFill } from 'react-icons/bs'
import ProductsReport from './components/products.report'
import ShopsReport from './components/shops.report'
const BASE_URL = import.meta.env.VITE_URL_STRING;

const Dashboard = ({ malls }) => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { logout } = useLogout()
  const { getAllCategory, shopShops } = useShop()
  const { productsReport, isGenerating, shopSalesReport } = useReport()
  const [shops, setShops,] = useState()
  const [isProducts, setIsProducts] = useState()
  const [isSales, setIsSales] = useState()
  const { user } = useAuthContext()
  const numberFormatter = Intl.NumberFormat('en-US')

  const handleSignout = () => {
    navigate('/')
    logout()
  }

  const [options, setOptions] = useState()
  useEffect(() => {
    const fetchCategories = async () => {
      const results = await getAllCategory()
      if (results.length > 0) {
        setOptions(results)
      }
    }

    const fetchShops = async () => {
      const shops = await shopShops()
      if (shops.length > 0) {
        setShops(shops)
      }
    }

    fetchCategories()
    fetchShops()
  }, [])


  const mallsData = malls
  const [activeTab, setActiveTab] = useState('home')
  const [pages, setPageNumber] = useState(0)
  const perPage = 7
  const pageVisited = pages * perPage

  const productsreport = async () => {
    const res = await productsReport()
    if (res) {
      setIsProducts(res)
      setActiveTab('products')
    }
  }

  const salesShopReport = async () => {
    setActiveTab('shop')
    const res = await shopSalesReport()
    if (res) {
      setIsSales(res)
    }
  }


  return (
    <>

      <div className="p-5 admin-flex">
        <ul className="menu bg-base-100 p-2 rounded-box">
          <li onClick={() => setActiveTab('home')}>
            <a>
              <FaHome className="h-5 w-5" />
              Users
            </a>
          </li>
          {/* <li onClick={() => setActiveTab('add-products')}>
            <a>
              <MdOutlineProductionQuantityLimits className="h-5 w-5" />
              Add product
            </a>
          </li> */}
          <li onClick={productsreport}>
            <a>
              <TbReport className="h-5 w-5" />
              Products Report
            </a>
          </li>
          <li>
            <a href={`${BASE_URL}/report/generate-sales-report`} target="_black" download>
              <BsFillFileBarGraphFill className="h-5 w-5" />
              Sales Report
            </a>
          </li>
          <li onClick={salesShopReport}>
            <a>
              <BsFillFileBarGraphFill className="h-5 w-5" />
              Profit Sales
            </a>
          </li>
          {/* <li onClick={() => setActiveTab("add-shops")}>
            <a>
              <FaShoppingBasket className="h-5 w-5" />
              Add shops
            </a>
          </li> */}
          <li onClick={handleSignout}>
            <a>
              <FaSignOutAlt className="h-5 w-5" />
              Logout
            </a>
          </li>
        </ul>
        <div>
          {activeTab === 'home' && (
            <div className="overflow-x-auto">
              <table className="table table-compact w-full">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                  </tr>
                </thead>
                <tbody>
                  {state.slice(pageVisited, pageVisited + perPage)
                    .map((x) => {
                      return (
                        <tr key={x.id}>
                          <td>{x.first_name}</td>
                          <td>{x.last_name}</td>
                          <td>{x.email}</td>
                          <td>{x.cellno}</td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>

              <div style={{ margin: "16px 0", float: "right" }}>
                <a href={`${BASE_URL}/report/generate-user-report/1`} target="_black">
                  <button className="btn btn-primary" type="submit"
                    disabled={isGenerating}
                  >
                    Generate report
                  </button>
                </a>
              </div>
            </div>

          )}
          {activeTab === 'add-products' && <Upload data={options} shops={shops} />}
          {activeTab === 'add-shops' && <AddShops cate={options} data={mallsData} />}
          {activeTab === 'products' && <ProductsReport products={isProducts} />}
          {activeTab === 'shop' && <ShopsReport sales={isSales} />}
        </div>
      </div>
    </>
  )
}

export default Dashboard