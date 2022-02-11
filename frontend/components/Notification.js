import React from "react";
import Link from "next/dist/client/link";

const Notification = (props) => {
  return (
    <div className="mb-3">
      
      <Link href={`/allpages/event/${props.eventName}/`}>
      <p style={{"textDecoration":"underline"}}>{`${props.pageName} posted new event ${props.eventName}`}</p>
      </Link>
    </div>
  );
};

export default Notification;
