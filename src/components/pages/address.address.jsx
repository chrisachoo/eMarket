import React from 'react'
import PlacesAutocomplete from 'react-places-autocomplete'
import scriptLoader from 'react-async-script-loader'
import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
// const google = window.google

const Address = ({ isScriptLoaded, isScriptLoadSucceed }) => {
  const [address, setAddress] = useState('')
  // const searchOptions = {
  //   location: new window.google.maps.LatLng(-28.47926, 24.67271),
  //   radius: 2000,
  //   ypes: ['address']
  // }

  const { user } = useAuthContext()
  const handleChange = (value) => {
    setAddress(value)
  }

  const handleSelect = (value) => {
    setAddress(value)
    console.log({ value })
    if (address) {
      sessionStorage.setItem('address', JSON.stringify(address))
    }
  }

  if (isScriptLoaded && isScriptLoadSucceed) {
    return (
      <div>
        <PlacesAutocomplete value={address} onChange={handleChange}
          onSelect={handleSelect}
          highlightFirstSuggestion={true}>
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input {...getInputProps({
                placeholder: 'Enter address ...'
              })}
                className="input input-bordered input-primary w-full"
              />
              <div>
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const style = suggestion.active ?
                    { backgroundColor: '#a83232', cursor: 'pointer', padding: '8px', marginTop: '8px' } :
                    { backgroundColor: '#ffffff', cursor: 'pointer', padding: '8px', marginTop: '8px' }

                  return (
                    <div key={suggestion.id} {...getSuggestionItemProps(suggestion, { style })}>
                      {suggestion.description}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>)
  } else {
    return <div></div>
  }
}

export default scriptLoader([`https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_APP_GOOGLE_MAP_API}&libraries=places`
])(Address)