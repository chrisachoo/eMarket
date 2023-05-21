import { useState } from "react";
import { saveProductsDeatils } from '../../hook/addProducts'

const AddShops = ({ cate, data }) => {
  const { addShop, isLoading } = saveProductsDeatils()
  const [form, setForm] = useState({
    name: "",
    mall_id: "",
    category_id: ""
  });

  const handleFormChange = (event) => {
    const updatedForm = { ...form }
    updatedForm[event.target.name] = event.target.value

    setForm(updatedForm)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    let { name, mall__id, category_id } = form
    await addShop(name, mall__id, category_id)
  }

  return (
    <>
      <div className="p-4 bg-base-300">
        <form className="grid-cols-cols" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Shop Name"
            className="input input-bordered input-primary w-full"
            onChange={handleFormChange}
            value={form.name}
            required={true}
            name={`name`}
          />

          <select
            className="select select-primary w-full"
            onChange={handleFormChange}
            name={`category_id`}
          >
            <option>--Please choose an option--</option>
            {cate.map((x) => {
              return (
                <option key={x.id} value={x.id}>
                  {x.name}
                </option>
              );
            })}
          </select>
          <select
            className="select select-primary w-full"
            onChange={handleFormChange}
            name={`mall_id`}
          >
            <option>--Please choose an option--</option>
            {data.map((x) => {
              return (
                <option key={x.id} value={x.id}>
                  {x.name}
                </option>
              );
            })}
          </select>

          <button className="btn btn-primary" type="submit"
            disabled={isLoading}
          >
            Add Shop
          </button>
        </form>
      </div>
    </>
  );
};

export default AddShops;
