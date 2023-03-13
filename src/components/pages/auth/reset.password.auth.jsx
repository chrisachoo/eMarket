import { useSignin } from '../../hooks/useSignin'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Field required'),
});

const ResetPassword = () => {

  const { resetPasswords, isLoading, error } = useSignin()

  return (
    <div className="grid-cols">
      <div className="bg-base-300">
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={ResetPasswordSchema}
          onSubmit={values => {
            resetPasswords( values.email)
          }}
        >
          {({ errors, touched }) => (
            <Form className="grid-cols-one">
              <div className="text-styl">
                <h2 className="heading-h2">Reset password</h2>
                <p className="text-sm">
                  Enter the email associated with your account and we'll send an email with instructions to reset your password.
                </p>
              </div>
              {error && <div className='error'>{error}</div>}

              <Field name="email" type="email" placeholder="Email" className="input input-bordered input-primary w-full"
                autoComplete="none"
              />
              {errors.email && touched.email ? (<div className="text-orange-600">{errors.email}</div>) : null}

              <button className="btn btn-primary" type="submit" disabled={isLoading}>
                Send Instruction
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="bg-base-100 grid-cols-two">
        <img src={`https://images.pexels.com/photos/2882630/pexels-photo-2882630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} alt="shopping" />
      </div>
    </div>
  )
}

export default ResetPassword