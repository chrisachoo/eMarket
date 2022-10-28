
import { Rings } from 'react-loader-spinner'

const Loader = () => {
  return (
    <div className='loading-container'>
      <Rings
        height="100"
        width="100"
        color="#FFBB00"
        radius="6"
        wrapperStyle={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%'
        }}
        wrapperClass="loading"
        visible={true}
        ariaLabel="rings-loading"
      />
    </div>
  )
}

export default Loader