import { useNavigate } from "react-router-dom";
import "./thankyou.css"

const ThankYou = () => {
  const navigate = useNavigate()
  const navigateHome = () => {
    window.location.href = "/"
  }
  return (
    <section className="thankyou">
      <div className="content">
        <div className="wrapper-1">
          <div className="wrapper-2">
            <h1>Thank you !</h1>
            <p>Thanks for shopping with us 🤗, please comeback again.  </p>
            <p>you should receive a confirmation email soon  </p>
            <button className="go-home" onClick={navigateHome}>
              go home
            </button>
          </div>
          <div className="footer-like">
            <p>Email not received?
              <a href="#">Click here to send again</a>
            </p>
          </div>
        </div>
      </div>
      <link href="https://fonts.googleapis.com/css?family=Kaushan+Script|Source+Sans+Pro" rel="stylesheet"></link>
    </section>
  );
}

export default ThankYou;