import React from 'react'
import {Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useEditPageMutation,} from "slices/pageApi"
import Link from 'next/dist/client/link';


const edit = () => {
    const dispatch = useDispatch();
    const router = useRouter(); 
    const { editPage } = router.query;
    const access_token = useSelector((state) => state.auth.access);
    const currentUser = useSelector((state) => state.auth.user);
    const currPageEmail = useSelector((state)=>state.page.currPageDetails.pageEmail);
    const currPageDescription = useSelector((state)=>state.page.currPageDetails.pageDescription);
    const currPageName = useSelector((state)=>state.page.currPageDetails.pageName);

    
    const [editPageM, {isSuccess}] = useEditPageMutation();

    // const [pageName, setPageName] = useState(currPageName);
    const [pageEmail, setPageEmail] = useState(currPageEmail);
    const [pageDescription, setPageDescription] = useState(currPageDescription);

    
    const handlePageEmailFormChange = (e) => {
    setPageEmail(e.target.value);
    };

    const handlePageDescriptionFormChange = (e) => {
    setPageDescription(e.target.value);
    };

    // const handlePageNameFormChange=(e)=>{
    //     setPageName(e.target.value);

    // }

    useEffect(() => {
        if (isSuccess === true) {
          // router.replace(`/profile/${email}`, undefined, { shallow: true})
          router.replace(`/allpages/${editPage}/`, undefined, { shallow: true})
        }
      }, [isSuccess])

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const body = {
            pageName : editPage,
            access_token : access_token,
            pageEmail : pageEmail,
            pageDescription:pageDescription
        }

        await editPageM(body);
       
    }


    return (
        <div>
            <Form className="mt-5">
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Page Name</Form.Label>
                    <Form.Control type="text"  value={editPage} readOnly />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="Text"  onChange={handlePageDescriptionFormChange} value={pageDescription}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Contact Email</Form.Label>
                    <Form.Control type="Text" onChange={handlePageEmailFormChange}  value={pageEmail} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default edit;