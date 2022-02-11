import { Form, Button, Spinner } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/dist/client/link";
import { useUserCreateMutation } from "slices/authAPI";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "slices/authSlice";


export default function Signup() {
  const user = useSelector(selectCurrentUser)
  if (user) {
    router.push('/')
  }
  // const dispatch = useDispatch()

  // RTK Query Signup Hook
  const [userCreate, { isSuccess, isLoading, isError }] = useUserCreateMutation()

  const router = useRouter()
  
  const [signupFormData, setSignupFormData] = useState({
    email: '',
    password: '',
    re_password: ''
  })

  const {
    email,
    password,
    re_password
  } = signupFormData
  
  // event handler for form data to update state hook
  const handleSignupFormChange = e => {
    setSignupFormData({
      ...signupFormData,
      [e.target.name]: e.target.value
    })
  }

  const handleSignupSubmit = async () => {
    try {
      await userCreate({ email, password, re_password })
      console.log(`isSuccess: ${isSuccess}`)
      console.log(`isError: ${isError}`)
      if (isError === false) {
        router.push('/signuplanding', undefined, { shallow: true })
      }
    } catch (error) {
      console.log(error)
      // alert('error signing up. see https://djoser.readthedocs.io/en/latest/base_endpoints.html#user-create ')
    }
  }

  return (
    <div>
      <h3>Signup Page</h3>

      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control 
            type="email"
            placeholder="Enter Email"
            name='email'
            onChange={handleSignupFormChange}
            value={email}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password" 
            name='password'
            onChange={handleSignupFormChange}
            value={password}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Retype Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Retype your Password"
            name='re_password'
            onChange={handleSignupFormChange}
            value={re_password}
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
          // onSubmit={handleSignupSubmit}
          onClick={handleSignupSubmit}
        >
          Submit
        </Button>
        )}


        <p>
          Already have an activated account?&ensp;
          <Link href='login'>Login Here</Link>
        </p>
        <p>
          Forget to activate?&ensp;
          <Link href='resendactivationemail'>Resend activation email</Link>
        </p>
      </Form>
    </div>
  );
}
