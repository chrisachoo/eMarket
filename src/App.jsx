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
import { distance } from './components/hooks/useLoacation'
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'

function App() {
  const [isCategory, setIsCategory] = useState()
  const [malls, setMalls] = useState([])
  const { getAllCategory } = useShop()
  const location = useLocation()

  const [locationPosition, setLocationPosition] = useState({})
  const locationTotal = trialDetail.locations.length

  // get closest final object:
  // locationTotal is the length of Location, only if it's not empty
  const getFinalTrial = () => {
    if (trialDetail && locationTotal >= 1) {
      const trialLatitude = trialDetail.location.map(el => el.latitude)
      const trialLongitude = trialDetail.location.map(el => el.longitude)
      distanceArray = trialLatitude.map((lat, idx) => {
        const log = trialLongitude[idx]
        return distance(
          locationPosition.defaultLatitude,
          locationPosition.defaultLongitude,
          lat, log
        )
      })

      // Above returns an Array, then find the shortest distance, and get the index of this distance
      // display this index value from Trial object
      const closest = Math.min(...distanceArray)
      console.log({ closest })
      const closestLocationIndex = distanceArray.IndexOf(closest)
      return trialDetail.locations[closestLocationIndex]
    }
    return {}
  }

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


    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser')
    } else {
      navigator.geolocation.getCurrentPosition(position => {
        setLocationPosition({
          ...position,
          defaultLatitude: position.coords.latitude,
          defaultLongitude: position.coords.longitude
        })
      })
    }

    fetchAllData()
  }, [])

  console.log({ locationPosition })
  return (
    <>
      {
        location.pathname !== '/signup' && location.pathname !== '/signin' &&
        location.pathname !== '/admin/dashboard' && location.pathname !== '/payment-checkout' && <Navigation />
      }
      <Routes>
        <Route path='/' element={<Onboarding category={isCategory} malls={malls} />} />
        <Route path='/signup' element={<Singup />} />
        <Route path='/signin' element={<Singin />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/cart' element={<ViewCart />} />
        <Route path='/prod-list' element={<ProductList />} />
        <Route path='/payment-checkout' element={<Checkout />} />
        <Route path='/view product' element={<Compare />} />

        <Route path='/admin/dashboard' element={<Dashboard malls={malls} />} />
      </Routes>

      {
        location.pathname !== '/signup' && location.pathname !== '/signin' &&
        location.pathname !== '/admin/dashboard' && location.pathname !== '/payment-checkout' && <Footer />
      }
    </>
  )
}

export default App
