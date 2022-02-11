import router from "next/router";
import React, { useState, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useEditEventMutation,useUpdateNotificationMutation } from "slices/eventApi";


function EditEvent(props) {

  const currentUser = useSelector((state) => state.auth.user.userdata.id);

    const {editEvent} = router.query;
    const currPageName = useSelector((state) => state.page.currPageName);
    const access_token = useSelector((state) => state.auth.access);
    const currEventDetails = useSelector((state)=>state.event.currEvent);
    // console.log(editEvent);

    const [editEventDetails, {isSuccess, isLoading, isError, error}] = useEditEventMutation();
    const [updateNotification, {}] = useUpdateNotificationMutation();

    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = String(today.getFullYear());
    // console.log(yyyy,mm,dd);
    
    const hour = String(today.getHours()); // => 9
    const min = String(today.getMinutes()); // =>  30
    const sec = String(today.getSeconds()); // => 51

    const [editedEventName, setEventName] = useState(currEventDetails.eventName);
    const [editedEventDescription, setEventDescription] = useState(currEventDetails.eventDescription);
    const [editedLocation, setLocation] = useState(currEventDetails.location);
    const [editedDate, setDate] = useState(currEventDetails.eventDate);
    const [editedTime, setTime] = useState(currEventDetails.eventTime);

    const handleEventNameChange=(e)=>{
        setEventName(e.target.value);
    };

    const handleEventDescriptionChange=(e)=>{
        setEventDescription(e.target.value);
    };

    const handleLocationChange=(e)=>{
        setLocation(e.target.value);
    };
    const handleDateChange=(e)=>{
        setDate(e.target.value);
    };

    const handleTimeChange=(e)=>{
        setTime(e.target.value);
    };


    const handleEditEventSubmit= async (e)=>{
        e.preventDefault();

        const editEventBody={
            eventName: editedEventName,
            currEventName: currEventDetails.eventName,
            eventDescription: editedEventDescription,
            location: editedLocation,
            eventDate: editedDate,
            eventTime: editedTime,
            access_token: access_token,
        }

        await editEventDetails(editEventBody);
    };

    useEffect(async () => {
        
        if(isSuccess){

          const updateNotificationBody={
            userID:currentUser,
            eventName:editEvent,
            editedEventName: editedEventName,
            pageName:currPageName,
            access_token: access_token,
          }
            await updateNotification(updateNotificationBody);
            router.replace(`/allpages/event/${editedEventName}/`)
        };

    }, [isSuccess])

   
    return (
        
    <div>
     <div>
      <h4>Edit Event Details</h4>

      <Form>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Event Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Event Name"
            name="Text"
            onChange={handleEventNameChange}
            value={editedEventName}
          
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Event Description</Form.Label>
          <Form.Control
            placeholder="Event Description"
            name="event-description"
            onChange={handleEventDescriptionChange}
            value={editedEventDescription}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="test"
            placeholder="Enter Location"
            name="location"
            onChange={handleLocationChange}
            value={editedLocation}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="time"
            name="time"
            min={`${hour}:${min}`}
            onChange={handleTimeChange}
            value={editedTime}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            min={`${yyyy}-${mm}-${dd}`}
            onChange={handleDateChange}
            value={editedDate}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick={handleEditEventSubmit}
        >
          Submit
        </Button>
      </Form>
    </div>

  </div>
    )
};


export default EditEvent;

