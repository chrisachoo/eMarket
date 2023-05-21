import { useSignup } from '../../hooks/useSignup'
import { Formik, Form, Field } from 'formik';
import { Link } from "react-router-dom"
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Field required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Field required'),
  email: Yup.string().email('Invalid email').required('Field required'),
  cellNumber: Yup.number().required('Field required').positive().integer(),
  password: Yup.string()
    .min(8, 'Password too short! minimum 8 characters password contains a combination of uppercase and lowercase letter and number are required.')
    .max(14, 'Password too long! minimum 14 characters password contains a combination of uppercase and lowercase')
    .required('Field required')
});

const Signup = () => {
  const usertype = 'shopper'
  const { signup, isLoading, error } = useSignup()

  return (
    <>
      <div className="grid-cols">
        <div className="bg-base-300">
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              cellNumber: '',
              password: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={values => {
              const cellno = '0' + values.cellNumber
              const first_name = values.firstName
              const last_name = values.lastName
              const email = values.email
              const password = values.password
              signup(first_name, last_name, email, cellno, usertype, password)
            }}
          >
            {({ errors, touched }) => (
              <Form className="grid-cols-one">
                <div className="text-styl">
                  <h2 className="heading-h2">Register</h2>
                  <p className="text-sm">
                    Let's get you all set up so you can verify your
                    account and begin setting up your profile
                  </p>
                </div>
                {error && <div className='error'>{error}</div>}
                <div className="flex-items">
                  <Field name="firstName" type="text" placeholder="First Name" className="input input-bordered input-primary w-full" />
                  <Field name="lastName" type="text" placeholder="Last Name" className="input input-bordered input-primary w-full" />
                </div>
                {errors.lastName && touched.lastName ? (<div className="text-orange-600">{errors.lastName}</div>) : null}
                <Field name="email" type="email" placeholder="Email" className="input input-bordered input-primary w-full" />
                {errors.email && touched.email ? (<div className="text-orange-600">{errors.email}</div>) : null}
                <Field name="cellNumber" type="number" placeholder="Cell Number" className="input input-bordered input-primary w-full" />
                {errors.cellNumber && touched.cellNumber ? (<div className="text-orange-600">{errors.cellNumber}</div>) : null}
                <Field name="password" type="password" placeholder="Password" className="input input-bordered input-primary w-full" />
                {errors.password && touched.password ? (<div className="text-orange-600">{errors.password}</div>) : null}
                <button className="btn btn-primary" type="submit" disabled={isLoading}>
                  Create Account
                </button>
                <span className="span-text">Already have an account<Link className="link link-primary" to='/signin'>Sign in</Link></span>
              </Form>
            )}
          </Formik>
        </div>
        <div className="bg-base-100 grid-cols-two">
          <img src={`https://images.pexels.com/photos/5614119/pexels-photo-5614119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} alt="shopping" />
        </div>
      </div>
    </>
  )
}

export default Signup