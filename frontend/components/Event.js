import React from "react";
import Link from "next/dist/client/link";

const Event = (props) => {
  return (
    <div className="card mt-5">
      <div className="card-body">
        <h2 className="card-title">
          {" "}
          <Link href={`/allpages/event/${props.eventName}`}>
            <a style={{ color: "black", textDecoration: "none" }}>
              <h2>{props.eventName}</h2>
            </a>
          </Link>
        </h2>

        <p className="card-text">{props.eventDescription}</p>
        <p className="card-text">Time: {props.eventTime}</p>
        <p className="card-text">Date: {props.eventDate}</p>
        <p className="card-text">Location : {props.location}</p>
        

        {/* { props.userid === props.pageAuthor &&
                <ListGroup.Item>
                <Button variant='danger' onClick={handleDeletePost}>
                    <FontAwesomeIcon icon={faTimes}/>
                </Button>
                </ListGroup.Item>
            } */}
      </div>
    </div>
  );
};

export default Event;
