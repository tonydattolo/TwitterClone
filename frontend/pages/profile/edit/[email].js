import { Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLoginUserMutation, useGoogleLoginQuery, useGoogleAuthMutation, useLoadUserQuery } from "slices/authAPI";
import { selectAccess, selectCurrentUser, setToken, setUser } from "slices/authSlice";
import { Form } from "react-bootstrap";
import Link from "next/dist/client/link";
import { useUpdateProfileMutation } from "slices/profileAPI";

export default function Profile() {

  const dispatch = useDispatch()
  const router = useRouter()
  const { email } = router.query
  const user = useSelector(state => state.auth.user)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const [sameUser, setSameUser] = useState(false)


  // const [userCreate, { isSuccess, isLoading, isError }] = useUserCreateMutation()
  const [updateProfile, { isSuccess, isLoading, isError, error }] = useUpdateProfileMutation()

  useEffect(() => {
    if (email && email === user.userdata.email) {
      setSameUser(true)
    }
  })

  useEffect(() => {
    // check if user is logged in, if not push them away from this page
    if (user === null || isAuthenticated === false) {
      router.push('/', undefined, { shallow: true})
    }
    if (email === user.userdata.email) {
      setSameUser(true)
    }
  }, [user, isAuthenticated])

  useEffect(() => {
    if (isSuccess === true) {
      // router.replace(`/profile/${email}`, undefined, { shallow: true})
      router.replace(`/profile/${email}`, undefined, { shallow: true})
    }
  }, [isSuccess])

  const [profileUpdateFormData, setProfileUpdateFormData] = useState({
    first_name: '',
    last_name: '',
    bio: '',
    locations: '',
    display_name: ''
  })
  const {
    first_name,
    last_name,
    bio,
    locations,
    display_name
  } = profileUpdateFormData

  const handleProfileUpdateFormChange = e => {
    setProfileUpdateFormData({
      ...profileUpdateFormData,
      [e.target.name]: e.target.value
    })
  }

  const handleUpdateProfile = async () => {
    try {
      // call post request
      await updateProfile({ email, display_name, first_name, last_name, bio })
      if (isError) {
        console.log(error)
      }
      // if successful go back to profile
    } catch (err) {
      console.log(err)
    }
  }

  const authInfo = () => (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>display name</Form.Label>
          <Form.Control 
            type="text"
            placeholder=""
            name='display_name'
            onChange={handleProfileUpdateFormChange}
            value={display_name}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>first name</Form.Label>
          <Form.Control
            type="text"
            placeholder="" 
            name='first_name'
            onChange={handleProfileUpdateFormChange}
            value={first_name}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>last name</Form.Label>
          <Form.Control
            type="text"
            placeholder="" 
            name='last_name'
            onChange={handleProfileUpdateFormChange}
            value={last_name}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBio">
          <Form.Label>bio</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="" 
            name='bio'
            onChange={handleProfileUpdateFormChange}
            value={bio}
          />
        </Form.Group>
        
        {/* add support for profile background picker? */}
        {/* <Form.Label htmlFor="exampleColorInput">Color picker</Form.Label>
          <Form.Control
            type="color"
            id="exampleColorInput"
            defaultValue="#563d7c"
            title="Choose your color"
          /> */}


      </Form>
      <br />
      <Button onClick={handleUpdateProfile}>submit changes</Button>
    </>
  )
  const guestInfo = () => (
    <>
      <h5>not authorized</h5>
    </>
  )

  return (
    <>
      <div>
        <h3>Edit Profile Page</h3>
      </div>

      {sameUser && !isLoading ? authInfo() : guestInfo()}

      {isLoading && 
        <Spinner animation="border" variant="success" />

      }
      
    </>
  );
}
