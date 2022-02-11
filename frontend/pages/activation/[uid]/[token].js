import { useUserActivateMutation } from "slices/authAPI"
import { useRouter } from "next/router"
import { Button, Spinner } from "react-bootstrap"
import { useEffect } from "react"



export default function Activate() {
  
  const router = useRouter()
  // access router.query to get variables/params from your URL
  const { uid, token } = router.query
  
  const [userActivate, { isSuccess, isLoading, isError }] = useUserActivateMutation()
  
  // useEffect(() => {
  //   try {
  //     userActivate(uid, token)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }, [])

  const handleActivationClick = async () => {
    try {
      await userActivate({ uid, token })
    } catch (error) {
      console.log(error)
    }
  }

  // if activation was successful, reroute to home page
  if (isSuccess) {
    router.push('/')
  }


  return (
    <>
      <div>
        <h3>Activate Page</h3>
      </div>

      <div>
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
          onClick={handleActivationClick}
        >
          Activate User Account
        </Button>
        )}
      </div>
    </>
  )
}