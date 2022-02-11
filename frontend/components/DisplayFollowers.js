import React from 'react'
import Link from 'next/dist/client/link'

const DisplayFollowers = (props) => {
    // console.log("Printing from displayfollower component",props.name)
    
    return (
        
        <div className="card mt-5">
             <div className="card-body">
                <Link href={`/profile/${props.name.user_email}`}><a style={{color: "black", textDecoration: 'none'}}><h5 className="card-title">{props.name.user_email}</h5></a></Link>

                 {/* <p className="card-text">Dummy Description</p> */}
                
             </div>
        
        </div>
    )
}
export default DisplayFollowers