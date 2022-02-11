import { Button, Spinner, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useCreatePostMutation } from "slices/postsAPI";
import { selectCurrentUser, selectAccess } from "slices/authSlice";

export default function NewPost() {
  const router = useRouter()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.auth.user)
  const access_token = useSelector(state => state.auth.access)
  const [
    createPost, {
      loading: createPostLoading,
      error: createPostError,
      data: createPostData,
      isLoading: createPostIsLoading,
      isSuccess: createPostIsSuccess,
      isError: createPostIsError,
    }
  ] = useCreatePostMutation()
  
  /*
  useEffect(() => {
    if (currentUser === null | currentUser === undefined) {
        router.push("/login", undefined, { shallow: true })
      }
  }, [currentUser])
  */
  
  var post_author = ""
  useEffect(() => {
    if (currentUser !== undefined && currentUser !== null) {
      post_author = currentUser.userdata.email
    }
  }, [currentUser])

  useEffect(() => {
    console.log(`access_token: ${access_token}`)
  }, [access_token])
  
  const [createPostFormData, setCreatePostFormData] = useState({
    // post_author: "",
    post_text: "",
  })
  const { post_text } = createPostFormData
  
  const handleCreatePostFormDataChange = (e) => {
    setCreatePostFormData({
      ...createPostFormData,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    if (createPostIsSuccess) {
      router.push("/", undefined, { shallow: true })
    }
  }, [createPostIsSuccess])

  /*
  useEffect(() => {
    if (!currentUser) {
      alert("You must be logged in to create a post!");
      router.push("/login", undefined, { shallow: true })
    }
  }, [currentUser])
  */

  
  useEffect(() => {
    if (createPostIsError) {
      // alert("Error creating post!");
      console.log(createPostError)
    }
  }, [createPostIsError])
  
  const handleCreatePost = async () => {
    try {

      if (post_text.length < 1) {
        alert("Post must contain some text!")
        return
      }
      console.log(`post_author: ${post_author}`)
      console.log(`post_text: ${post_text}`)
      console.log(`accesss_token: ${access_token}`)
      await createPost({ post_author, post_text, access_token })

      if (createPostData.status === "success") {
        console.log("Successfully created post!")
        router.push(`/profile/${currentUser.userdata.email}`, undefined, { shallow: true })
      }
        

      if (createPostIsError) {
        console.log(`createPostError: ${createPostError}`)
      }
    } catch (error) {
      console.log(`fallback error on createPost: ${error}`)
    }
  }

  // const handleCreatePost = async () => {
  //   const body = JSON.stringify({ post_author, post_text })
  //   try {
  //     const request = await fetch('http://localhost:8000/posts/create/', {
  //       method: 'POST',
  //       headers: {
  //         'Authorization': `JWT ${access_token}`,
  //         'Content-Type': 'application/json'
  //       },
  //       body
  //     })

  //     if (request.status === 201) {
  //       router.push(`/profile/${currentUser.userdata.email}`, undefined, { shallow: true })
  //     }

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <>
      <h3>Create New Post</h3>
      <br />
      {createPostIsLoading || currentUser === undefined || currentUser === null ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
        ) : (
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control 
                type="email" 
                placeholder={`${currentUser.userdata.email}`}
                // placeholder={`${post_author}`}
                readOnly
                plaintext
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Control 
                placeholder='What is on your mind?' 
                as="textarea" 
                rows={3}
                onChange={handleCreatePostFormDataChange}
                name="post_text"
                value={post_text}
                type="text"
                style={{ resize: "none", height: "100px" }}
                />
            </Form.Group>
            <Button 
              variant="primary" 
              onClick={() => handleCreatePost()}
              >
              Post
            </Button>
          </Form>
        )      
      } 
    </>
  )
}
