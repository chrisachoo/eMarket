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
  Compare,
  ThankYou,
  ResetPassword
} from './components/pages'
import { useShop } from './components/hooks/useShop'
import { Dashboard, TailwindDashboard } from './components/admin'
import { distance } from './components/hooks/useLoacation'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useProducts } from './components/hooks/useProducts'
import { useMalls } from './components/hooks/useMalls'
import './App.css'

function App() {
  const [isCategory, setIsCategory] = useState()
  const [isMalls, setIsMalls] = useState([])
  const { getAllCategory } = useShop()
  const location = useLocation()
  const [products, setProducts] = useState()
  const { getAllProducts } = useProducts()
  const { malls } = useMalls()

  const trialDetail = {
    location: "",
    recruiting_status: "",
    organisation: "",
    starts: "",
    locations: [
      { latitude: -25.550396811300896, longitude: 28.089496313171768 },
      { latitude: -25.54999993605883, longitude: 28.090086392414616 },
      { latitude: -25.549651457611937, longitude: 28.09060136901478 }
    ]
  }

  const [locationPosition, setLocationPosition] = useState({})
  const [finalInfo, setFinalInfo] = useState({})
  const locationTotal = trialDetail.locations.length

  // get closest final object:
  // locationTotal is the length of Location, only if it's not empty
  // const getFinalTrial = () => {
  //   if (trialDetail && locationTotal >= 1) {
  //     const trialLatitude = trialDetail.locations.map(el => el.latitude)
  //     const trialLongitude = trialDetail.locations.map(el => el.longitude)
  //     const distanceArray = trialLatitude.map((lat, idx) => {
  //       const log = trialLongitude[idx]
  //       return distance(
  //         locationPosition.defaultLatitude,
  //         locationPosition.defaultLongitude,
  //         lat, log
  //       )
  //     })

  //     // Above returns an Array, then find the shortest distance, and get the index of this distance
  //     // display this index value from Trial object
  //     const closest = Math.min(...distanceArray)
  //     console.log({ closest })
  //     const closestLocationIndex = distanceArray.indexOf(closest)
  //     return trialDetail.locations[closestLocationIndex]
  //   }
  //   return {}
  // }

  useEffect(() => {
    const fetchAllData = async () => {
      const category = await getAllCategory()
      const product = await getAllProducts()
      const mall = await malls()
      console.log({ category })
      console.log({ product })
      if (category) {
        setIsCategory(category)
      }
      if (product) {

        const uniqueProducts = new Set()
        const unique = product.filter(element => {
          const isDuplicate = uniqueProducts.has(element.name)
          uniqueProducts.add(element.name)
          if (!isDuplicate) {
            return true
          }

          return false
        })
        setProducts(unique)
      }
      if (mall) {
        setIsMalls(mall)
      }
    }

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

  // useEffect(() => {
  //   const finalLocationInfo = getFinalTrial()

  //   setFinalInfo({
  //     ...finalLocationInfo,
  //     locationAdress: `${finalLocationInfo.city},
  //                     ${finalLocationInfo.state_province}
  //                     ${finalLocationInfo.country}`,

  //     recruitmentStatus: finalLocationInfo.recruitment_status,
  //     organisationAdress: finalLocationInfo.name,
  //   })
  // }, [getFinalTrial])

  console.log({ locationPosition })
  return (
    <>
      {
        location.pathname !== '/signup' && location.pathname !== '/signin' && location.pathname !=='/thank-you' &&
        location.pathname !== '/admin/dashboard' && location.pathname !== '/payment-checkout' && 
        location.pathname !== '/password/reset'&& <Navigation />
      }
      <Routes>
        <Route path='/' element={<Onboarding category={isCategory} product={products} />} />
        <Route path='/signup' element={<Singup />} />
        <Route path='/signin' element={<Singin />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/cart' element={<ViewCart />} />
        <Route path='/prod-list' element={<ProductList />} />
        <Route path='/payment-checkout' element={<Checkout />} />
        <Route path='/thank-you' element={<ThankYou />} />
        <Route path='/view product' element={<Compare />} />
        <Route path='/password/reset' element={<ResetPassword />} />

        <Route path='/admin/dashboard' element={<Dashboard malls={isMalls} />} />
        <Route path='/dashboard' element={<TailwindDashboard />} />
      </Routes>

      {
        location.pathname !== '/signup' && location.pathname !== '/signin' && location.pathname !=='/thank-you' &&
        location.pathname !== '/admin/dashboard' && location.pathname !== '/payment-checkout' && location.pathname !== '/password/reset'&& <Footer />
      }
    </>
  )
}

export default App
