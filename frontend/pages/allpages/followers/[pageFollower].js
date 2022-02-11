import Head from 'next/head'
// import Image from 'next/image'
import { selectAccess, selectCurrentUser, selectIsAuthenticated, selectRefresh, setUser } from 'slices/authSlice'
import { useSelector } from 'react-redux'
import { ListGroup, Spinner } from 'react-bootstrap'
import Link from 'next/dist/client/link'
import { useEffect } from 'react'
import router from 'next/router'
import { useGetAllFollowersQuery } from 'slices/pageApi'
import { useDispatch } from 'react-redux'
import DisplayFollowers from '@/components/DisplayFollowers';


import { useGetAllPostsQuery } from 'slices/postsAPI'


export default function pageFollowers() {

  const user = useSelector(selectCurrentUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const { pageFollower } = router.query;
  const access_token = useSelector((state) => state.auth.access);

  const body = {
    pageName: pageFollower,
    access_token:access_token
  }

  const requestInfo = useGetAllFollowersQuery(body);

  return (
    <div>
    { requestInfo.isSuccess && <div>
        <h2 className='mt-2 mb-5'>{pageFollower} Followers</h2>
   
        {requestInfo.data.map((follower,index) => {
            return (
            <DisplayFollowers key={index} name={follower}/>  
            )
        })}
      
      
      

        </div>
    }
</div>
  )
}
