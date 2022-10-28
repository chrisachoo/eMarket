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
// import './dashboard.css'
import { useEffect } from 'react'
import { useReport } from '../hook/useReport'

const Dashboard = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { logout } = useLogout()
  const { getAllCategory, shopShops } = useShop()
  const { usersReport, isGenerating } = useReport()
  const [shops, setShops,] = useState()
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

  const [activeTab, setActiveTab] = useState('home')
  const [pages, setPageNumber] = useState(0)
  const perPage = 7
  const pageVisited = pages * perPage

  const generateRepost = async () => {
    await usersReport()
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
          <li onClick={() => setActiveTab('add-products')}>
            <a>
              <MdOutlineProductionQuantityLimits className="h-5 w-5" />
              Add product
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
            </div>
          )}
          {activeTab === 'add-products' && <Upload data={options} shops={shops} />}

          <div style={{ margin: "16px 0", float: "right" }}>
            <button className="btn btn-primary" type="submit"
              onClick={generateRepost}
              disabled={isGenerating}
            >
              Generate report
            </button>
          </div>
        </div>
      </div>



      {/* <section className='dashboard'>

        <div className='menu'>
          <div className='header-menu'>
            <h1>Sharp Witted</h1>
            <div className='header-menu__dashboard'>
              <h3>Dashboard</h3>
            </div>
          </div>
          <div className='menu__items'>
            <h4>management</h4>
            <div className='menu__items-list'>
              <li className={activeTab === 'home' ? 'active' : ''} onClick={() => setActiveTab('home')}><HiUsers /><p>customers</p></li>
              <li className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}><HiShoppingCart /><p>orders</p></li>
              <li className={activeTab === 'add-products' ? 'active' : ''} onClick={() => setActiveTab('add-products')}><FaTags /><p>add products</p></li>
              <li className={activeTab === 'invoices' ? 'active' : ''} onClick={() => setActiveTab('invoices')}><FaFileInvoice /><p>invoices</p></li>
            </div>
            <div className='signout'>
              <h2 onClick={handleSignout}><FaSignOutAlt />Logout</h2>
            </div>
          </div>
        </div>

        <div className='section__padding'>
          {activeTab === 'home' && (
            <div>
              <div className='flex__cards'>
                <div className='flex__cards-card'>
                  <p>Users</p>
                  <h2>{state.length}</h2>
                </div>
                <div className='flex__cards-card'>
                  <p>Sessions</p>
                  <h2>66.7</h2>
                </div>
                <div className='flex__cards-card'>
                  <p>Convension Rate</p>
                  <h2>66%</h2>
                </div>
              </div>

              <div className='users'>
                <table>
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                      <th>state</th>
                      <th>Action</th>
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
                            <td>{x.account_status ?
                              <div className='status'><GrStatusGoodSmall color='#00FFFF' /><p>active</p></div> :
                              <div className='status'><GrStatusGoodSmall color='#FF4343' /><p>disabled</p></div>}
                            </td>
                            <td><li className='action'><AiFillEdit /><span><ImBin2 color='#FFBB00' /></span></li></td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {activeTab === 'add-products' && <Upload data={options} />}
        </div>
      </section> */}
    </>
  )
}

export default Dashboard