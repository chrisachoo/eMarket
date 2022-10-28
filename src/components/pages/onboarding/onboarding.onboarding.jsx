import { useShop } from '../../hooks/useShop'


const Onboarding = ({ category }) => {

  const { getProducts } = useShop()
  const fetchProducts = async (data) => {
    console.log({ data })
    const category_id = data.id
    await getProducts(category_id)
  }

  return (
    <>
      <div className="p-5 grid-items">
        <ul className="menu bg-base-300 rounded-box">
          {category ?
            <div>
              {category.map((x) => {
                return (
                  <li key={x.id} onClick={() => fetchProducts(x)} className="hover-bordered"><a>{x.name}</a></li>
                )
              })}
            </div> : <div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-slate-700 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-700 rounded"></div>
                  </div>
                </div>
              </div>
            </div>}
        </ul>
        <div className="grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">
          Search
        </div>
      </div>
    </>
  )
}

export default Onboarding