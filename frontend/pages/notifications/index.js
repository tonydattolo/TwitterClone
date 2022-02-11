import React from 'react'
import Notification from '@/components/Notification';
import { useSelector } from 'react-redux';
import { useGetEventNotificationsQuery } from 'slices/eventApi';

const Notifications = ()=>{

   const access_token = useSelector((state) => state.auth.access);
   const userid = useSelector((state) => state.auth.user.userdata.id);

   const body ={
    userID:userid,
    access_token:access_token,
    };

    const {data, isSuccess } = useGetEventNotificationsQuery(body);
    // console.log("Event Notification:",data);

    return (
        <div>
            <p></p>
          {isSuccess && 
          <div>
              { data.map((itm, index)=>{
                  return(
                      <Notification key={index} pageName={itm.pageName} eventName={itm.eventName}/>
                  )
              })}
          </div>
          }  
        </div>
    )
}


export default Notifications;
