const Checkout = () => {
  return (
    <>
      <div className="flex flex-col w-full border-opacity-50">
        <div className="grid card place-items-center">
          <ul className="steps steps-vertical lg:steps-horizontal">
            <li className="step step-primary">Payment</li>
            <li className="step step-primary">Shiiping address</li>
            <li className="step">Purchase</li>
            <li className="step">Review</li>
          </ul>
        </div>
        <div className="divider"></div>
        <div className="grid h-20 bg-base-300 place-items-center">
          <div className="active">
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout