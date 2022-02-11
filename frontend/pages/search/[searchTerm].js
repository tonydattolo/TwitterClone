import Post from "@/components/Post"
import { useState, useEffect } from "react"
import { Spinner, Card } from "react-bootstrap"
import { useRouter } from "next/router"
import Head from "next/head"
import Link from "next/dist/client/link"
import { useMainSearchQuery } from "slices/searchAPI"

export default function SearchPage() {
  const router = useRouter()
  const search_term = router.query.searchTerm

  const {
    data: searchPostsData,
    loading: searchPostsLoading,
    error: searchPostsError,
    isLoading: searchPostsIsLoading,
    isError: searchPostsIsError,
    isFetching: searchPostsIsFetching,
  } = useMainSearchQuery(`${search_term}`)

  return (
    <>
      <Head>
        {/* <title>Search results for {search_term}</title> */}
        <title>Search results for </title>
      </Head>

      <h2>Showing Search Results for: {search_term}</h2>
      <br />
      {searchPostsIsLoading || searchPostsIsFetching || searchPostsData === undefined ? (
        <Spinner animation="border" variant="warning" />
        ) : (
        <>
          <h3>Profiles containing: {search_term}</h3>
          {searchPostsData.profiles.length === 0 ? (
            <p>No profiles found</p>
          ) : (
            <>
              {searchPostsData.profiles.map((profile) => (

                <Card key={profile.id} style={{ width: '18rem' }}>
                  <Card.Body>
                    <Card.Title>{profile.display_name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{profile.email}</Card.Subtitle>
                    <Card.Text>
                      {profile.bio}
                    </Card.Text>
                    <Link href={`/profile/${profile.email}`} passHref>
                      <Card.Link>View Profile</Card.Link>
                    </Link>
                  </Card.Body>
                </Card>
                // <ul key={profile.id}>
                //   <li>
                //     <a href={`/profile/${profile.id}`}>{profile.name}</a>
                //     {profile.user.email}
                //   </li>
                // </ul>
              ))}
            </>
            )
          }

          <h3>Posts containing: {search_term}</h3>
          {searchPostsData.posts.length === 0 ? (
            <p>No posts found</p>
          ) : (
              <>
                {searchPostsData.posts.map(post => (
                  <Post key={post.id} post={post} />
                ))}
              </>
            )
          }
        </>
        )
      }
      
      {/* {!searchPostsIsLoading && searchPostsData !== undefined && searchPostsData.posts.length === 0 && (
        <h3>No results found for: {search_term}</h3>
      )} */}

      {searchPostsIsError && <p>Error: {searchPostsError}</p>}

    </>
  )
}