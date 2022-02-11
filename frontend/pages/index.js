import Head from 'next/head'
// import Image from 'next/image'
import { selectAccess, selectCurrentUser, selectIsAuthenticated, selectRefresh, setUser } from 'slices/authSlice'
import { useSelector } from 'react-redux'
import { ListGroup, Spinner } from 'react-bootstrap'
import Link from 'next/dist/client/link'
import { useEffect } from 'react'
import router from 'next/router'
import { useGetUserQuery } from 'slices/authAPI'
import { useDispatch } from 'react-redux'
import Post from '@/components/Post';

import { useGetAllPostsQuery } from 'slices/postsAPI'


export default function Home() {

  const user = useSelector(selectCurrentUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  const {
    data: postsData,
    error: postsError,
    isLoading: postsIsLoading,
    isError: postsIsError,
    isFetching: postsIsFetching
  } = useGetAllPostsQuery('')

  useEffect(() => {
    if (postsIsError) {
      console.log(postsError)
    }
  }, [postsIsError])


  return (
    <div>
      <Head>
        <title>Koobecaf</title>
        <meta name="description" content="social media example" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      

      <h2>Home Page</h2>
      {/* <Page/> */}
      
      {postsIsLoading || postsIsFetching || postsData === undefined ? (
        <Spinner animation="border" variant="success" />
        ) : (
          <>
            <h3>All Posts</h3>
            {postsData.posts.map(post => (
              <Post key={post.id} post={post} />
            ))}
          </>
        )
      }
      
      

    </div>
  )
}
