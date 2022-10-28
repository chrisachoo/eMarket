import { useSignin } from '../../hooks/useSignin'
import { Formik, Form, Field } from 'formik';
import { Link } from "react-router-dom"
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Field required'),
  password: Yup.string()
    .min(8, 'Password too short! minimum 8 characters password contains a combination of uppercase and lowercase letter and number are required.')
    .max(14, 'Password too long! minimum 14 characters password contains a combination of uppercase and lowercase')
    .required('Field required')
});

const Signin = () => {

  const { signin, isLoading, error } = useSignin()

  return (
    <div className="grid-cols">
      <div className="bg-base-300">
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={values => {
            const username = values.email
            const password = values.password
            signin(username, password)
          }}
        >
          {({ errors, touched }) => (
            <Form className="grid-cols-one">
              <div className="text-styl">
                <h2 className="heading-h2">Login to your account</h2>
                <p className="text-sm">
                  Thank you for get back to eMarket, lets access the best prices recommende for you
                </p>
              </div>
              {error && <div className='error'>{error}</div>}

              <Field name="email" type="email" placeholder="Email" className="input input-bordered input-primary w-full" />
              {errors.email && touched.email ? (<div className="text-orange-600">{errors.email}</div>) : null}
              <Field name="password" type="password" placeholder="Password" className="input input-bordered input-primary w-full" />
              {errors.password && touched.password ? (<div className="text-orange-600">{errors.password}</div>) : null}

              <span className="span-text"><Link className="link link-primary">Reset password</Link></span>
              <button className="btn btn-primary" type="submit" disabled={isLoading}>
                Sign in
              </button>
              <span className="span-text">Don't have an accout yet?<Link className="link link-primary" to='/signup'>Join eMarket</Link></span>
            </Form>
          )}
        </Formik>
      </div>
      <div className="bg-base-100 grid-cols-two">
        <img src={`https://images.pexels.com/photos/5868740/pexels-photo-5868740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} alt="shopping" />
      </div>
    </div>
  )
}

export default Signin