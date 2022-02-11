import router from "next/router";
import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import { useGetAllFollowersQuery } from 'slices/pageApi'

import {
  useCreateEventMutation,
  useCreateNotificationMutation,
} from "slices/eventApi";

const NewEvent = () => {

  const currentUser = useSelector((state) => state.auth.user.userdata.id);

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = String(today.getFullYear());
  // console.log(yyyy,mm,dd);

  const hour = String(today.getHours()); // => 9
  const min = String(today.getMinutes()); // =>  30
  const sec = String(today.getSeconds()); // => 51

  // console.log(hour);
  // console.log(min);

  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // console.log("date:", date);
  // console.log("Time: ",time);

  const currPageName = useSelector((state) => state.page.currPageName);
  const access_token = useSelector((state) => state.auth.access);
  // console.log("Inside CreatePage:", currPageName);

  const [createEvent, { isSuccess, isError, error, isLoading }] =
    useCreateEventMutation();

    const getFollowersBody={
      pageName:currPageName,
      access_token:access_token,
    }

   const {data: followersData, isSuccess: getFolllowersIsSuccess} = useGetAllFollowersQuery(getFollowersBody);
   

  //  useEffect(() => {
  //    if (getFolllowersIsSuccess){

  //      console.log("Followers: ",data);
  //    }
  //  }, [getFolllowersIsSuccess]);


  const [
    createNotification,
    {
      isSuccess: createNotificationIsSuccess,
      isError: createNotificationIsError,
      error: createNotificationError,
      isLoading: createNotificationisLoading,
    },
  ] = useCreateNotificationMutation();

  const handleEventNameChange = (e) => {
    setEventName(e.target.value);
  };

  const handleEventDescriptionChange = (e) => {
    setEventDescription(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleCreateNewEventSubmit = async (e) => {
    e.preventDefault();
    const createEventBody = {
      eventName: eventName,
      authorPage: currPageName,
      eventDescription: eventDescription,
      location: location,
      eventDate: date,
      eventTime: time,
      access_token: access_token,
    };

    await createEvent(createEventBody);
  };

  useEffect( async () => {
    if (isSuccess && getFolllowersIsSuccess ) {
      const notificationBody={
        userIDs:followersData,
        eventName:eventName,
        pageName:currPageName,
        access_token: access_token,
      }
      await createNotification(notificationBody);
      
      router.replace(`/allpages/event/${eventName}/`);
    }

    if (isError) {
      return (
        <div>
          <p>Something went wrong</p>
          <p>{error}</p>
        </div>
      );
    }
  }, [isSuccess, isError, getFolllowersIsSuccess]);

  return (
    <div>
      <div>
        <h3>Create New Event</h3>

        <Form>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Event Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Event Name"
              name="Text"
              onChange={handleEventNameChange}
              value={eventName}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Event Description</Form.Label>
            <Form.Control
              placeholder="Event Description"
              name="event-description"
              onChange={handleEventDescriptionChange}
              value={eventDescription}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="test"
              placeholder="Enter Location"
              name="location"
              onChange={handleLocationChange}
              value={location}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Time</Form.Label>
            <Form.Control
              type="time"
              name="time"
              min={`${hour}:${min}`}
              onChange={handleTimeChange}
              value={time}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              min={`${yyyy}-${mm}-${dd}`}
              onChange={handleDateChange}
              value={date}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            onClick={handleCreateNewEventSubmit}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default NewEvent;
