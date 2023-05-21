import { useState } from 'react'
import { saveProductsDeatils } from '../../hook/addProducts'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Multiselect from 'multiselect-react-dropdown';

const Upload = ({ data, shops }) => {

  const [file, setFile] = useState()
  const [successful, isSuccessful] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const { saveProducts, error, isLoading } = saveProductsDeatils()
  const _url = import.meta.env.VITE_CLOUD_STRING;
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    category_id: '',
    shop_id: ''
  })

  const handleFormChange = (event) => {
    const updatedForm = { ...form }
    updatedForm[event.target.name] = event.target.value;

    setForm(updatedForm)
  }

  const handleSubmit = async (event) => {
    setIsUploading(true)
    event.preventDefault();
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "pdiwvwhw")
    let { name, description, price, quantity, category_id, shop_id } = form

    await axios.post(_url, formData).then((responce) => {
      if (responce) {
        const picture_url = responce.data.url
        saveProducts(name, description, price, quantity, category_id, shop_id, picture_url)
      }
    })
    setIsUploading(false)
  }

  return (

    <>
      <ToastContainer />
      <div className="p-4 bg-base-300">
        <div className="mb-2">
          <input
            className="block w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer"
            aria-describedby="file_input_help" id="file_input" type="file"
            onChange={(event) => { setFile(event.target.files[0]) }}
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
        </div>
        <form onSubmit={handleSubmit} className="grid-cols-cols">
          <input type="text" placeholder="Product name" className="input input-bordered input-primary w-full"
            onChange={handleFormChange}
            value={form.name}
            required={true}
            name={`name`}
          />
          <textarea className="textarea textarea-primary" placeholder="Description"
            onChange={handleFormChange}
            value={form.description}
            required={true}
            name={`description`}
          ></textarea>
          <input type="number" placeholder="Quantity" className="input input-bordered input-primary w-full"
            onChange={handleFormChange}
            value={form.quantity}
            required={true}
            name={`quantity`}
          />
          <input type="number" placeholder="Price per item" className="input input-bordered input-primary w-full"
            onChange={handleFormChange}
            value={form.price}
            required={true}
            name={`price`}
          />
          <select className="select select-primary w-full"
            onChange={handleFormChange}
            name={`category_id`}
          >
            <option>--Please choose an option--</option>
            {data.map(x => {
              return (
                <option key={x.id} value={x.id}>{x.name}</option>
              )
            })}
          </select>
          <div style={{ paddingTop: "1em" }}>
          </div>
          <select className="select select-primary w-full"
            onChange={handleFormChange}
            name={`shop_id`}
          >
            <option>--Please choose an option--</option>
            {shops.map(x => {
              return (
                <option key={x.id} value={x.id}>{x.name}</option>
              )
            })}
          </select>
          <button className="btn btn-primary" type="submit" disabled={isUploading}>
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

export default Upload;