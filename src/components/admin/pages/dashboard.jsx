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

const Dashboard = ({ malls }) => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { logout } = useLogout()
  const { getAllCategory, shopShops } = useShop()
  const { usersReport, productsReport, isGenerating } = useReport()
  const [shops, setShops,] = useState()
  const { user } = useAuthContext()
  console.log('response: ', state)
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
      console.log('shops: ', shops)
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

  const generateRepost = async () => {
    const res = await usersReport()
    console.log({ res })
  }

  const generateProducts = async () => {
    await productsReport()
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
          <li>
            <a href="https://e-mall-backend.herokuapp.com/report/generate-product-report" download>
              <TbReport className="h-5 w-5" />
              Products Report
            </a>
          </li>
          <li>
            <a href='https://e-mall-backend.herokuapp.com/report/generate-sales-report' download>
              <BsFillFileBarGraphFill className="h-5 w-5" />
              Sales Report
            </a>
          </li>
          <li onClick={() => setActiveTab("add-shops")}>
            <a>
              <FaShoppingBasket className="h-5 w-5" />
              Add shops
            </a>
          </li>
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
                <a href="https://e-mall-backend.herokuapp.com/report/generate-user-report/1" target="_black">
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
        </div>
      </div>

    </>
  )
}

export default Dashboard