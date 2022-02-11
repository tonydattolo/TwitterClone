import { useEffect } from "react"
import { useGetUserQuery, useGoogleAuthMutation } from "slices/authAPI"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import { setCredentials, setToken } from "slices/authSlice"
import { useSelector } from "react-redux"
import { selectCurrentUser, selectToken, selectIsAuthenticated } from "slices/authSlice"
import { Button, Spinner } from "react-bootstrap"

export default function Google() {

  const { query } = useRouter()

  const dispatch = useDispatch()

  const [googleAuth, { isSuccess, isLoading, isError, data }] = useGoogleAuthMutation()

  // const [getUser, { data }] = useGetUserQuery()
  // const router = useRouter()
  
  const user = useSelector(selectCurrentUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const token = useSelector(selectToken)
  


  useEffect(() => {
    
    
    console.log(`state: ${query.state}`)
    console.log(`code: ${query.code}`)

    const state = query.state ? query.state : null
    const code = query.code ? query.code : null

    if (state && code) {

    } else {
      //check authenticated
      //load user
      //redirect
    }


    // handleGoogleAuth()
    // handleGoogleAuthLocally()
    
  }, [query])
  
  const handleGoogleAuth = async () => {
    try {
      console.log('entered trycatch handleGoogleAuth')
      const res = await googleAuth({ stateAndCode })
      dispatch(setToken(res.data))
    
    } catch (error) {
      
    }
  }

  const handleGoogleAuthLocally = async () => {
    const details = {
      'state': query.state,
      'code': query.code
    }
    
    const formData = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');
    try {
      const request = await fetch(`http://localhost:8000/auth/o/google-oauth2/?${formData}`,{
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
      })
      const response = await request.json()
      dispatch(setToken(response))
    } catch (error) {
      
    }
  }

  // const handleGoogleAuthLocally = async () => {
  //   const details = {
  //     'state': query.state,
  //     'code': query.code
  //   }
    
  //   const formData = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');
  //   try {
  //     const request = await fetch(`http://localhost:8000/auth/o/google-oauth2/?${formData}`,{
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     },
  //     method: 'POST'
  //     })
  //     const response = await request.json()
  //     dispatch(setToken(response))
  //   } catch (error) {
      
  //   }
  // }
  
  return (
    <>
      <div>
        <h3>Google Login Page?</h3>
      </div>

      <Button
        onClick={handleGoogleAuthLocally}
      >
        try to post
      </Button>
    
      {isLoading && (
          <Spinner animation="border" variant="success" />
      )}
    
    
    
    </>
  )
}