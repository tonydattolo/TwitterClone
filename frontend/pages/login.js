import { Button, Spinner, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLoginUserMutation, useGoogleLoginQuery, useGoogleAuthMutation, useLoadUserQuery } from "slices/authAPI";
import { selectAccess, selectCurrentUser, setToken, setUser } from "slices/authSlice";
import { Form } from "react-bootstrap";
import Link from "next/dist/client/link";

export default function Login() {

  const dispatch = useDispatch()
  const router = useRouter()
  const [loginUser, { 
      isSuccess: loginIsSuccess,
      isLoading: loginIsLoading,
      isError: loginIsError,
      data: loginData,
      error: loginError
    }
  ] = useLoginUserMutation()
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  })
  const {
    email,
    password
  } = loginFormData

  const userData = useSelector(state => state.auth.user)

  useEffect(() => {
    if (userData !== null) {
      router.push("/", undefined, { shallow: true })
    }
  }, [userData])

  const handleLoginFormChange = e => {
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value
    })
  }
  
  const handleLoadUser = async (access) => {
    try {
      const response = await fetch('http://localhost:8000/auth/users/me/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${access}`,
          'Accept': 'application/json'
        }
      })

      const userdata = await response.json()
      console.log(`${userdata}`)

      if (response.status === 200) {
        dispatch(setUser({userdata}))
        // router.push(`/profile/${userdata.email}`, undefined, { shallow: true })
      }

    } catch (error) {
      console.log(error)
    }
  }

  const handleLogin = async () => {
    try {
      const jwtToken = await loginUser({ email, password }).unwrap()
      console.log(`loginUser result?: ${jwtToken}`)
      dispatch(setToken(jwtToken))

      handleLoadUser(jwtToken.access)

      if (jwtToken.status === 401) {
        console.alert('401, user not found. signup first')
      }
      if (loginIsError) {
        console.log(`loginError: ${loginError}`)
        if (loginError.status === 401) {
          console.alert('no user with that email address found, please sign up!')
        }
      }

      // router.push('/', undefined, { shallow: true })

    } catch (error) {
      console.log(error)
    }
  }

  // testing new method to handle 401 errors
  // const handleLogin = async () => {
  //   try {
  //     await loginUser({ email, password })
  //     console.log(loginData)
  //     if (loginIsSuccess) {
  //       dispatch(setToken(loginData))
  //       handleLoadUser(loginData.access)
  //     }


  //     if (loginIsError) {
  //       console.log(`loginError: ${loginError}`)
  //       if (loginError.status === 401) {
  //         console.alert('no user with that email address found, please sign up!')
  //       }
  //     }

  //     // router.push('/', undefined, { shallow: true })

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const handleGoogleLogin = async () => {

    try {
      const response = await fetch('http://localhost:8000/auth/o/google-oauth2/?redirect_uri=http://localhost:3000/google/', {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
      })

      const data = await response.json()

      router.replace(data.authorization_url, undefined, { shallow: true }); 
    } catch (error) {
      console.log(error)      
    }


  }

  return (
    <>
      <div>
        <h3>Login Page</h3>
      </div>

      {loginIsError && (
        <Alert variant="danger">
          {loginError.status}, Incorrect credentials or not signed up
        </Alert>
      )}

      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control 
            type="email"
            placeholder="Enter Email"
            name='email'
            onChange={handleLoginFormChange}
            value={email}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password" 
            name='password'
            onChange={handleLoginFormChange}
            value={password}
          />
        </Form.Group>

        <Form.Text>
          <Link href='/resetpassword'>Forgot Password?</Link>
        </Form.Text>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>

        {loginIsLoading ? (
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
          // type="submit"
          // onSubmit={handleLogin}
          onClick={handleLogin}
        >
          Login
        </Button>
        )}

        <Button
          variant="warning"
          // type="submit"
          onClick={handleGoogleLogin}
        >
          Login With Google
        </Button>

        <Form.Text>
          Don't have an account yet?
          <Link href='/signup'>Sign up here</Link>
        </Form.Text>
      </Form>
      <br />
      {/* <Button
        onClick={handleLoadUser}
      >
        load user logic testing
      </Button> */}
    </>
  );
}
