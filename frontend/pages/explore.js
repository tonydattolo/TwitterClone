import { useGetAllProfilesQuery } from "slices/profileAPI"
import ExploreProfileCard from "@/components/ExploreProfileCard/ExploreProfileCard"
import { Tabs, Tab, Spinner, Alert } from "react-bootstrap"
import Post from "@/components/Post"
import { useGetTodaysPostsQuery } from "slices/postsAPI"


export default function Explore() {

  const {
    data: allProfilesData,
    loading: allProfilesLoading,
    error: allProfilesError,
    isLoading: allProfilesIsLoading,
    isError: allProfilesIsError,
    isSuccess: allProfilesIsSuccess,
  } = useGetAllProfilesQuery()

  const {
    data: todaysPostsData,
    loading: todaysPostsLoading,
    error: todaysPostsError,
    isLoading: todaysPostsIsLoading,
    isError: todaysPostsIsError,
    isSuccess: todaysPostsIsSuccess,
  } = useGetTodaysPostsQuery()

  return (
    <Tabs defaultActiveKey="users" id="uncontrolled-tab-example" className="mb-3 mt-4">

      <Tab eventKey="users" title="Users" style={{ display: 'flex', flexWrap: "wrap" }}>
        {allProfilesIsLoading && <Spinner animation="border" variant="primary" />}
        {allProfilesIsError && <Alert variant="danger">{allProfilesError.message ?? "error loading all profiles"}</Alert>}
        {allProfilesIsSuccess && allProfilesData.profiles.map(profile => (
          <ExploreProfileCard key={profile.id} profile={profile} />
        ))}
        {allProfilesIsSuccess && allProfilesData.profiles.length === 0 && <Alert variant="primary">No users found</Alert>}
      </Tab>

      <Tab eventKey="posts" title="Posts Today">
        {todaysPostsIsLoading && <Spinner animation="border" variant="primary" />}
        {todaysPostsIsError && <Alert variant="danger">{todaysPostsError.message ?? "error grabbing todays posts"}</Alert>}
        {/* {todaysPostsData.length === 0 && !todaysPostsIsLoading && <p>No posts today</p>} */}
        {todaysPostsIsSuccess && todaysPostsData.posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
        {todaysPostsIsSuccess && todaysPostsData.posts.length === 0 && <Alert variant="primary">No posts today</Alert>}
      </Tab>

      <Tab eventKey="surprise" title="Surprise">
        coming soon...
      </Tab>
    </Tabs>
  )
}