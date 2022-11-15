import { useState, useEffect } from 'react'
import { Navigation, Footer } from './components'
import {
  Onboarding,
  Singup,
  Singin,
  Profile,
  ViewCart,
  ProductList,
  Checkout,
  Compare
} from './components/pages'
import { useShop } from './components/hooks/useShop'
import { Dashboard } from './components/admin'
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'

function App() {
  const [isCategory, setIsCategory] = useState()
  const [malls, setMalls] = useState([])
  const { getAllCategory } = useShop()
  const location = useLocation()

  useEffect(() => {
    const fetchAllData = async () => {
      const category = await getAllCategory()
      console.log({ category })
      if (category) {
        setIsCategory(category)
      }
    }

    fetch('https://e-mall-backend.herokuapp.com/mall/get-malls')
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        throw res
      }).then(data => {
        setMalls(data)
      })

    fetchAllData()
  }, [])

  return (
    <>
      {
        location.pathname !== '/signup' && location.pathname !== '/signin' &&
        location.pathname !== '/admin/dashboard' && <Navigation />
      }
      <Routes>
        <Route path='/' element={<Onboarding category={isCategory} malls={malls}/>} />
        <Route path='/signup' element={<Singup />} />
        <Route path='/signin' element={<Singin />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/cart' element={<ViewCart />} />
        <Route path='/prod-list' element={<ProductList />} />
        <Route path='/payment-checkout' element={<Checkout />} />
        <Route path='/view product' element={<Compare />} />

        <Route path='/admin/dashboard' element={<Dashboard malls={malls}/>} />
      </Routes>

      {
        location.pathname !== '/signup' && location.pathname !== '/signin' &&
        location.pathname !== '/admin/dashboard' && <Footer />
      }
    </>
  )
}

export default App
