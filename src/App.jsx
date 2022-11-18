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

  const [lat, setLat] = useState(null)
  const [long, setLong] = useState(null)
  const [places, setPlaces] = useState([])
  const [error, setError] = useState(null)
  const geolocationAPI = navigator.geolocation

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

  const getUserCoordinates = () => {
    if (!geolocationAPI) {
      setError('Geolocation API is not available in your browser.')
    } else {
      geolocationAPI.getCurrentPosition(position => {
        const { coords } = position;
        setLat(coords.latitude)
        setLong(coords.longitude)
      }, (error) => {
        setError('Something went wrong getting your position!')
      })
    }
  }


  const fetchNearestPlacesFromGoogle = async () => {
    const radius = 4 * 1000
    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + ',' + long + '&radius=' + radius + '&key=' + import.meta.env.VITE_APP_GOOGLE_MAP_API

    fetch(url, 
      { headers: { 'Content-Type': 'application/json','Access-Control-Allow-Origin': 'http://127.0.0.1:5173/'} 
    }).then(res => {
      return res.json()
    })
      .then(res => {
        for (let googlePlace of res.results) {
          var place = {}
          var latitude = googlePlace.geometry.location.lat
          var longitude = googlePlace.geometry.location.lng
          var coordinate = {
            latitude: latitude,
            longitude: longitude
          }

          var gallery = []
          if (googlePlace.photos) {
            for (let photo of googlePlace.photos) {
              var photoUrl = Urls.GooglePicBaseUrl + photo.photo_reference
              gallery.push(photoUrl)
            }
          }

          place['placeTypes'] = googlePlace.types
          place['coordinate'] = coordinate
          place['placeId'] = googlePlace.place_id
          place['placeName'] = googlePlace.name
          place['gallery'] = gallery

          places.push(place);
        }
        console.log(places)
      })
      .catch(error => {
        console.log(error)
      })
  }

  getUserCoordinates()
  fetchNearestPlacesFromGoogle()


  console.log({
    lat: lat,
    long: long
  })

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
