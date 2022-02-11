import { Button, Card, ListGroup } from "react-bootstrap"
import Link from "next/dist/client/link"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as faEmptyHeart, faComment } from '@fortawesome/free-regular-svg-icons'
import { faHeart as faFullHeart, faTimes, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react"
import router, { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { useDeletePostMutation } from "slices/postsAPI"
import styles from "../components/Post.module.scss"


export default function Post({ post, isOwner }) {
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(post.postLikes)
  // const [comments, setComments] = useState(post.postComments)
  const access_Token = useSelector(state => state.auth.access)

  const [ deletePost, {
    data: deletePostData,
    error: deletePostError,
    isError: deletePostIsError,
    isLoading: deletePostIsLoading,
    isSuccess: deletePostIsSuccess,
  }] = useDeletePostMutation()


  const handleLike = () => {
    setLiked(!liked)
    setLikes(liked ? likes - 1 : likes + 1)
  }
  
  const postIDtoDelete = post.id
  const handleDeletePost = async () => {
    try {
      await deletePost({ postIDtoDelete, access_Token })
      if (deletePostIsSuccess === true && deletePostIsError === false) {
        console.log("Post deleted successfully")
      }
        
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <>
      <Card className={styles.postCard}>
        <Card.Header as="h5">
          <ListGroup horizontal>
            {/* <ListGroup.Item>{post.postAuthor}</ListGroup.Item> */}
            <ListGroup.Item>
                <Link href={`/profile/${post.postAuthorEmail}/`}>
                  <div>
                    <FontAwesomeIcon icon={faUserCircle}/>
                    {"   " + post.postAuthorDisplayName}
                  </div>
                </Link>
            </ListGroup.Item>
            <ListGroup.Item style={{fontSize: "1rem",}} disabled>
              {post.postAuthorEmail}
            </ListGroup.Item>
            <ListGroup.Item>
              {new Date(post.created_at).toUTCString().substring(8,11)}
              <span>,&ensp;</span>
              
              { new Date(post.created_at).getDay().toLocaleString() }
              <span>&ensp;</span>
              
              { 
                new Date(Date.now()).getFullYear() - new Date(post.created_at).getFullYear() !== 0 ? (
                  new Date(post.created_at).getFullYear()
                ) : ( "" )
              }
            </ListGroup.Item>
            {/* <ListGroup.Item>...</ListGroup.Item> */}
            { isOwner === true &&
              <ListGroup.Item>
                <Button variant='danger' onClick={handleDeletePost}>
                  <FontAwesomeIcon icon={faTimes}/>
                </Button>
              </ListGroup.Item>
            }
          </ListGroup>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            {post.postText} 
          </Card.Text>
          <ListGroup horizontal>
            <ListGroup.Item>
                <Button variant="outline" onClick={handleLike}>
                  {liked ?
                      <FontAwesomeIcon icon={faFullHeart} /> 
                    :
                      <FontAwesomeIcon icon={faEmptyHeart} />
                  }
                  {likes}
                </Button>  
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </>
  )
}