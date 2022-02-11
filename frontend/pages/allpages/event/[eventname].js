import React from "react";
import Link from "next/dist/client/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetEventsDetailsQuery, useDeleteEventMutation, useDeleteNotificationMutation  } from "slices/eventApi";
import { setCurrEvent } from "slices/eventSlice";

const EventProfile = (props) => {
  const router = useRouter();
  const { eventname } = router.query;
  const dispatch = useDispatch();
  
  const access_token = useSelector((state) => state.auth.access);
  const userid = useSelector((state) => state.auth.user.userdata.id);
  const currPageAuthor = useSelector((state) => state.page.currPageAuthor);

  const eventBody = {
    eventName: eventname,
    access_token: access_token,
  };

  const { data, isSuccess, isError, error, isLoading } =
    useGetEventsDetailsQuery(eventBody);

  const [deleteEvent,{isSuccess: deleteEventIsSuccess, isError:deleteEventIsError, error:deleteEventError, isLoading:deleteEventIsLoading}] =
    useDeleteEventMutation();

  const [deleteNotification,{}] = useDeleteNotificationMutation()

  useEffect(() => {

    if(isSuccess){
        dispatch(setCurrEvent(data));

    };

    if (isError) {
      return <p>Something went wrong</p>;
    }
  }, [isSuccess, isError]);

  const handleDeleteEvent= async (e)=>{
    e.preventDefault();

    const deleteBody={
        eventName: eventname,
        access_token: access_token,
    }
    await deleteEvent(deleteBody);

  };

  useEffect(async () => {
      if(deleteEventIsSuccess){

       const deleteNotificationBody={

        eventName: eventname,
        access_token: access_token,
        }

        await deleteNotification(deleteNotificationBody);
        router.replace(`/allpages/${data.authorPage}/`)
      };

  }, [deleteEventIsSuccess])

  return (<div>

      { isSuccess && (
          <div>
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="card-title"> {data.eventName} </h2>
              <p className="card-text">{data.eventDescription}</p>
              <p className="card-text">Time : {data.eventTime}</p>
              <p className="card-text">Date : {data.eventDate}</p>
              <p className="card-text">Location : {data.location}</p>
              <p className="card-text">Arranged By : {data.authorPage}</p>
              
              

              <div className="row">
                <div className="col-md-2">
                  {userid == currPageAuthor && (
                    <div>
                      <Link
                        href={`/allpages/event/edit/${data.eventName}/`}
                      >
                        <button className="btn btn-secondary">Edit Event Details</button>
                      </Link>
                    </div>
                  )}
                </div>
                <div className="col-md-2">
                  {userid == currPageAuthor && (
                    <div>
                      <button
                        onClick={handleDeleteEvent}
                        className="btn btn-danger"
                      >
                        Delete Event
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
            </div>
          </div>

        </div>
      )

      }
  </div>);
};

export default EventProfile;
