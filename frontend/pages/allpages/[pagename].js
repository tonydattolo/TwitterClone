import Link from "next/dist/client/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCurrPage, setCurrPageAuthor, currPageDetails } from "slices/pageSlice";

import {
  useGetPageDetailsQuery,
  useFollowPageMutation,
  useDeletePageMutation,
  useCheckUserIsFollowerQuery,
  useUnFollowPageMutation,
} from "slices/pageApi";

import { useGetEventsByPageQuery } from "slices/eventApi";
import Event from "@/components/Event";

const AllPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { pagename } = router.query;

  dispatch(setCurrPage(pagename));

  const access_token = useSelector((state) => state.auth.access);
  const userid = useSelector((state) => state.auth.user.userdata.id);
  const userEmail = useSelector((state) => state.auth.user.userdata.email);

  const [
    deleteFollower,
    {
      isSuccess: deleteFollowerIsSuccess,
      isLoading: deleteFollowerIsLoading,
      isError: deleteFollowerIsError,
      error: deleteFollowerError,
    },
  ] = useUnFollowPageMutation();

  const checkIsFollowerBody = {
    pageName: pagename,
    userID: userid,
    access_token: access_token,
  };

  const {
    data: checkIsFollowerData,
    isSuccess: checkIsFollowerIsSuccess,
    isLoading: checkIsFollowerIsLoading,
    isError: checkIsFollowerIsError,
    error: checkIsFollowerError,
    isFetching: checkIsFollowerIsFetching,
  } = useCheckUserIsFollowerQuery(checkIsFollowerBody);

  const body = {
    pageName: pagename,
    access_token: access_token,
  };

  const responseInfo = useGetPageDetailsQuery(body);

  useEffect(() => {
    if (responseInfo.isSuccess) {
      dispatch(setCurrPageAuthor(responseInfo.data.pageAuthor));
      dispatch(currPageDetails(responseInfo.data));
    }
  }, [responseInfo.isSuccess]);

  const getAllEventDetailsBody = {
    authorPage: pagename,
    access_token: access_token,
  };

  const {
    data: eventsData,
    isSuccess,
    isError,
    error,
    isLoading,
  } = useGetEventsByPageQuery(getAllEventDetailsBody);

  const [followPage, { responseFollow }] = useFollowPageMutation();

  const [deletePage, { responseDelete }] = useDeletePageMutation();

  const handleFollow = async (ev) => {
    ev.preventDefault();
    const bodyFollow = {
      pageName: pagename,
      access_token: access_token,
      userId: userid,
      userEmail: userEmail,
    };

    await followPage(bodyFollow);
  };

  const handleUnfollow = async (e) => {
    e.preventDefault();

    const unfollowBody={
      pageName: pagename,
      access_token: access_token,
      userID: userid,

    }
    await deleteFollower(unfollowBody);

  };

  const handleDeletePage = async (ev) => {
    ev.preventDefault();
    const bodyDelete = {
      pageName: pagename,
      access_token: access_token,
    };
    if (deletePage(body)) {
      <script>
        function myFunction() {alert("Your Page was successfully deleted.")}
      </script>;

      router.push("/");
    }
  };

  return (
    <div>
      {responseInfo.status === "fulfilled" && responseInfo.data.length != 0 && (
        <div>
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="card-title"> {responseInfo.data.pageName} </h2>
              <p className="card-text">{responseInfo.data.pageDescription}</p>
              <p className="card-text">
                Contact : {responseInfo.data.pageEmail}
              </p>
              {/* <p className="card-text">
                Owner Email: {responseInfo.data.pageEmail} */}

                {/* Owner Email: {responseInfo.data.ownerEmail}
                Owner Username: {responseInfo.data.ownerUsername} */}
              {/* </p> */}

              <div className="row">
                <div className="col-md-2">
                  <Link
                    href={`/allpages/followers/${responseInfo.data.pageName}`}
                  >
                    <button className="btn btn-primary">Followers</button>
                  </Link>
                </div>
                {checkIsFollowerIsSuccess && (
                  <div className="col-md-2">
                    <button
                      className="btn btn-success"
                      onClick={
                        checkIsFollowerData.isFollower === "True"
                          ? handleUnfollow
                          : handleFollow
                      }
                    >
                      {checkIsFollowerData.isFollower === "True"
                        ? "Unfollow"
                        : "Follow"}
                    </button>
                  </div>
                )}
                <div className="col-md-2">
                  {userid == responseInfo.data.pageAuthor && (
                    <div>
                      <Link
                        href={`/allpages/edit/${responseInfo.data.pageName}`}
                      >
                        <button className="btn btn-secondary">Edit</button>
                      </Link>
                    </div>
                  )}
                </div>
                <div className="col-md-2">
                  {userid == responseInfo.data.pageAuthor && (
                    <div>
                      <button
                        onClick={handleDeletePage}
                        className="btn btn-danger"
                      >
                        Delete Page
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <br />

              <div className="row">
                <div className="col-md-2">
                  {userid == responseInfo.data.pageAuthor && (
                    <div>
                      <Link href={`/allpages/event/newevent`}>
                        <button className="btn btn-secondary">
                          Create Event
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3>My Events</h3>
            {isSuccess &&
              eventsData.map((event, index) => {
                return (
                  <Event
                    key={index}
                    eventName={event.eventName}
                    eventDescription={event.eventDescription}
                    location={event.location}
                    eventDate={event.eventDate}
                    eventTime={event.eventTime}
                  />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPage;
