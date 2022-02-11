
import Card from '@/components/UI/Card';
import Link from 'next/dist/client/link';

import router from 'next/router';

export default function Page(props){


    return(

        <div className="card mt-5">
            <div className="card-body">
                <h5 className="card-title"> <Link href={`/allpages/${props.pageName}`}>
                                            <a style={{color: "black", textDecoration: 'none'}}><h1 >{props.pageName}</h1></a>
                                        </Link> 
                </h5>

                <p className="card-text">{props.pageDescription}</p>
                <p className="card-text">Contact : {props.pageEmail}</p>

            { props.userid === props.pageAuthor &&
                <ListGroup.Item>
                <Button variant='danger' onClick={handleDeletePost}>
                    <FontAwesomeIcon icon={faTimes}/>
                </Button>
                </ListGroup.Item>
            }
                
            </div>
        </div>
 
    );

};

