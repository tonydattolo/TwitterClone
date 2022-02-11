import { Button, Spinner, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";
import { useResendActivationEmailMutation } from "slices/authAPI";
import { selectCurrentUser } from "slices/authSlice";
import { Form } from "react-bootstrap";
import Link from "next/dist/client/link";

export default function resendActivation() {
  const user = useSelector(selectCurrentUser)
  if (user) {
    router.push('/')
  }

  // const dispatch = useDispatch()
  const router = useRouter()
  
  const [resendActivationEmail, { isSuccess, isLoading, isError, data, error }] = useResendActivationEmailMutation()

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

  const handleresendActivation = async () => {
    try {
      await resendActivationEmail({ email })
      // await resendActivationEmail(email).unwrap()
      // .then((payload) => console.log('fulfilled', payload))
      // .catch((error) => console.log('rejected', error))

      if (isSuccess) {
        alert('Success, Please check your email!')
      }        
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div>
        <h3>Resend Email Activation Link</h3>
      </div>

      {isSuccess && <Alert variant="success">Success! Check your email</Alert>}
      {isError && <Alert variant="danger">{"Check you typed the correct email, or are not already an active member"}</Alert>}

      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control 
            type="email"
            placeholder="Enter Email"
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
          // onSubmit={handleresendActivation}
          onClick={handleresendActivation}
        >
          Resend
        </Button>
        )}

        <Form.Text>
          Don't have an account yet?
          <Link href='signup'>Sign up here</Link>
        </Form.Text>
      </Form>
    </>
  );
}
