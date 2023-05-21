import React from 'react'
import { Link, useNavigate } from "react-router-dom"

const TermsOfUse = () => {
  return (
    <div className="p-10 bg-base-200 text-base-content">
      <div className="mb-4">
        <h5 className="mb-2 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">Data Retention</h5>
        <p className="mb-1 text-gray-500 dark:text-gray-400">
          We retain your personal information for as long as it is required for our platform, our products or our services to you, and how long it is necessary to fulfil our contractual obligation with any orders you place with us.
          You may request that we remove this personal information from our system by filling in our contact form, located over here:
          <a href="https://e-market.vercel.app/contacts" target="_blank" class="mx-1 inline-flex items-center text-blue-600 hover:underline">
            See our guideline
            <svg class="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
          </a>
        </p>
        <p className="mb-3 text-gray-500 dark:text-gray-400">
          By using our website, you grant us consent to retaining your personal information for no longer than as is necessary to fulfil the obligations outlined above.
        </p>
      </div>
      <div className="mb-4">
        <h5 className="mb-2 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">Do we use cookies?</h5>
        <p className="mb-1 text-gray-500 dark:text-gray-400">
          Yes (Cookies are small files that a site or its service provider transfers to your computers hard drive through your Web browser (if you allow) that enables the sites or service providers systems to recognize your browser and capture and remember certain information
        </p>
        <p className="mb-1 text-gray-500 dark:text-gray-400">
          We use cookies to help us remember and process the items in your shopping cart, understand and save your preferences for future visits and compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future. We may contract with third-party service providers to assist us in better understanding our site visitors. These service providers are not permitted to use the information collected on our behalf except to help us conduct and improve our business.
        </p>
        <p className="mb-1 text-gray-500 dark:text-gray-400">
          If you prefer, you can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies via your browser settings. Like most websites, if you turn your cookies off, some of our services may not function properly. However, you can still place orders by contacting customer service.
        </p>
      </div>

      <div className="mb-4">
        <h5 className="mb-2 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Do we disclose any information to outside parties?
        </h5>
        <p className="mb-1 text-gray-500 dark:text-gray-400">
          We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential. We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others rights, property, or safety. However, non-personally identifiable visitor information may be provided to other parties for marketing, advertising, or other uses.
        </p>
      </div>
    </div>
  )
}

export default TermsOfUse