import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useGetProfileByEmailQuery } from "slices/profileAPI";
import { Button, Spinner, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { setProfileInfo } from "slices/profileSlice";
import { setPosts } from "slices/postsSlice";
import { useGetPostsByUserQuery } from "slices/postsAPI";
import Post from "@/components/Post";
import Link from "next/dist/client/link";

export default function Profile() {

  const dispatch = useDispatch()
  const router = useRouter()
  const { email } = router.query
  const user = useSelector(state => state.auth.user)
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const [sameUser, setSameUser] = useState(false)

  useEffect(() => {



    if (email && user !== null && email === user.userdata.email) {
      setSameUser(true)
      if (!isLoading && !isFetching) {
        dispatch(setProfileInfo({ data }))
      }
    }

    // if (!postsIsLoading && !postsIsFetching) {
    //   dispatch(setPosts({ postsData }))
    // }
  })

  const {
    data,
    error,
    isLoading,
    isError,
    isFetching
  } = useGetProfileByEmailQuery(`${email}`)
  
  const {
    data: postsData,
    error: postsError,
    isLoading: postsIsLoading,
    isError: postsIsError,
    isFetching: postsIsFetching
  } = useGetPostsByUserQuery(`${email}`)

  useEffect(() => {
    if (isError === true) {
      console.log(error)
    }
  }, [isError])
  useEffect(() => {
    if (postsIsError === true) {
      console.log(postsError)
    }
  }, [postsIsError])

  const handleEditButton = () => {
    router.replace(`edit/${email}`, undefined, { shallow: true })
  }

  return (
    <>
      {/* <div>
        <h3>Profile Page</h3>
      </div>
      <br /> */}

      

      <>
      {isLoading || isFetching || data === undefined ? 
        (
          <Spinner animation="border" variant="success" />
        ) : (
          <Card className={"mt-4"}>
            {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
            {sameUser && 
              <Card.Header>
                <Button onClick={handleEditButton} style={{ position: 'right', }}>Edit Profile</Button>
              </Card.Header>
            }

            <Card.Body>
              <Card.Title>{data.profile.display_name}</Card.Title>
              <Card.Text>
                <small>Bio:</small>
                <br />
                {data.profile.bio}
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              
              <ListGroupItem>
                <small>First Name:</small>
                <br />
                {data.profile.first_name}
              </ListGroupItem>
              <ListGroupItem>
                <small>Last Name:</small>
                <br />
                {data.profile.last_name}
              </ListGroupItem>

              {!sameUser && (
                <ListGroupItem>
                  <Link href={`/messages/direct/${data.profile.email}`} passHref>
                    <Button variant="primary">
                      Send Message
                    </Button>
                  </Link>
                </ListGroupItem>
              )}
            </ListGroup>
          </Card>
        )
      }
      </>

      <br />

      <>
      {postsIsLoading || postsIsFetching || postsData === undefined ?
        (
          <Spinner animation="border" variant="success" />
        ) : (
          <>
            <h3>Posts from {data.profile.display_name}</h3>
            {postsData.posts.map(post => (
              <Post key={post.id} post={post} isOwner={sameUser}/>
            ))}
          </>
        )
      }
      {postsIsError && (
        <h5>No posts found</h5>
      )}
      </>

    </>
  )
}
