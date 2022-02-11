import { Button, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";
import { useResetPasswordMutation } from "slices/authAPI";
import { selectCurrentUser } from "slices/authSlice";
import { Form } from "react-bootstrap";
import Link from "next/dist/client/link";

export default function ResetPassword() {
  const user = useSelector(selectCurrentUser)
  if (user) {
    router.push('/')
  }

  // const dispatch = useDispatch()
  const router = useRouter()
  
  const [passwordResetActivationEmail, { isSuccess, isLoading, isError, data }] = useResetPasswordMutation()

  const [resendActivationFormData, setResendActivationFormData] = useState({
    email: ''
  })
  const {
    email
  } = resendActivationFormData

  const handleResendActivationFormChange = e => {
    setResendActivationFormData({
      ...resendActivationFormData,
      [e.target.name]: e.target.value
    })
  }

  const handlepasswordresetActivation = async () => {
    try {
      await passwordResetActivationEmail({ email })
      // await resendActivationEmail(email).unwrap()
      // .then((payload) => console.log('fulfilled', payload))
      // .catch((error) => console.log('rejected', error))

      if (isSuccess) {
        alert('success')
      }        
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div>
        <h4>Request Password Reset :</h4>
      </div>

      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control 
            type="email"
            placeholder="Please enter your email"
            name='email'
            onChange={handleResendActivationFormChange}
            value={email}
          />
        </Form.Group>


        {isLoading ? (
          <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button>
        ) : (
        <Button
          variant="primary"
          type="submit"
          onClick={handlepasswordresetActivation}
        >
          Reset
        </Button>
        )}

        <Form.Text>
          Don't have an account yet? 
          <Link href='/signup'>Sign up here</Link>
        </Form.Text>
      </Form>
    </>
  );
}