import { useSelector, useDispatch } from "react-redux";

import { Form, Button, Spinner, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";

import { useCreatePageMutation} from "slices/pageApi";

import { pageActions } from "slices/pageSlice";
import { useRouter } from "next/router";

const NewPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [createPage, {isSuccess,isError,isUninitialized, isLoading, error}] = useCreatePageMutation();
  

  const currentUser = useSelector((state) => state.auth.user);
  const access_token = useSelector((state) => state.auth.access);

  const [pageName, setPageName] = useState("");
  const [pageEmail, setPageEmail] = useState("");
  const [pageDescription, setPageDescription] = useState("");

  const handlePageNameFormChange = (e) => {
    setPageName(e.target.value);
  };

  const handlePageEmailFormChange = (e) => {
    setPageEmail(e.target.value);
  };

  const handlePageDescriptionFormChange = (e) => {
    setPageDescription(e.target.value);
  };

  const handleCreateNewPageSubmit = async (event) => {
    event.preventDefault();
    const body = {
      pageName: pageName,
      pageAuthor: currentUser.userdata.id,
      pageEmail: pageEmail,
      pageDescription: pageDescription,
      access_token: access_token,
    };

    try {
      await createPage(body);
    } catch (error) {
      console.log(error);
    }

  };

  const redirectHandle = (e) =>{
    e.preventDefault();
    router.push("/", undefined, { shallow: true });
  }
  
  useEffect(()=>{

    if(isSuccess===true){

      console.log("Inside isSuccess IF")

      router.replace(`/allpages/${pageName}`, undefined, { shallow: true})
    }

  },[isSuccess])

  return (
    <div>
      {isLoading && <Spinner animation="border" variant="primary" />}
      {isError && <Alert variant="danger">{error.data.status ?? ""}, {error.data.message ?? "error creating page"}</Alert>}

        <div>
          <h3>Create New Page</h3>

          <Form>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Page Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Page Name"
                name="Text"
                onChange={handlePageNameFormChange}
                value={pageName}
              />
            </Form.Group>

            <Form.Group  className="mb-3" controlId="formBasicEmail">
              <Form.Label>Page Contact Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                name="email"
                onChange={handlePageEmailFormChange}
                value={pageEmail}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Page Description</Form.Label>
              <Form.Control
                type="test"
                placeholder="Enter Description"
                name="description"
                onChange={handlePageDescriptionFormChange}
                value={pageDescription}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              // onSubmit={handleSignupSubmit}
              onClick={handleCreateNewPageSubmit}
            >
              Submit
            </Button>
          </Form>
        </div>
      

      {/* {isError && (
        <div>
          
          {error.status} : {JSON.stringify(error.data)}
        </div>
      )} */}

    </div>
  );
};

export default NewPage;
