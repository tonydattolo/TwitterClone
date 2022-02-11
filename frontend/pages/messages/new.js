import { Form, Button, Spinner, Alert } from 'react-bootstrap';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { useGetAllProfilesQuery } from 'slices/profileAPI';
import { useCreateNewDMMutation } from 'slices/messagesAPI';

export default function NewMessage() {

  const currentUser = useSelector(state => state.auth.user)
  const access_token = useSelector(state => state.auth.access)

  const router = useRouter()

  const {
    data: allProfilesData,
    loading: allProfilesLoading,
    error: allProfilesError,
    isLoading: allProfilesIsLoading,
    isError: allProfilesIsError,
    isSuccess: allProfilesIsSuccess,
  } = useGetAllProfilesQuery()

  const [
    createNewDM, {
      loading: sendMessageLoading,
      error: sendMessageError,
      data: sendMessageData,
      isLoading: sendMessageIsLoading,
      isSuccess: sendMessageIsSuccess,
      isError: sendMessageIsError,
    }
  ] = useCreateNewDMMutation()

  useEffect(() => {
    if (currentUser === null) {
      router.push('/login', undefined, { shallow: true })
    }
  }, [currentUser])

  const [newMessageForm, setNewMessageForm] = useState({
    message: '',
    receiver: '',
  })
  const {
    message,
    receiver,
  } = newMessageForm
  const handleNewMessageFormChange = (e) => {
    setNewMessageForm({
      ...newMessageForm,
      [e.target.name]: e.target.value,
    })
  }

  const handleNewMessageSend = async () => {
    try {
      await createNewDM({ message, receiver, access_token })
      router.push('/messages',undefined, { shallow: true })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (sendMessageIsSuccess) {
      router.push('/messages', undefined, { shallow: true })
    }
  }, [sendMessageIsSuccess])

  return (
    <>
      {sendMessageIsError && (
        <Alert variant="danger">
          {sendMessageError.status ?? ""}, {sendMessageError.message ?? "error"}
        </Alert>
      )}

      {currentUser && (
        
      <Form>

        <Form.Group className="mb-3" controlId="newMessageFormSender">
          <Form.Label>Sender:</Form.Label>
          <Form.Control 
            type="email" 
            placeholder={`${currentUser.userdata.email}`}
            readOnly
            plaintext
            />
        </Form.Group>

        <Form.Group className="mb-3" controlId="newMessageFormReceiver">
          <Form.Label>Receiver:</Form.Label>
          
            {allProfilesLoading && (
              <Spinner animation="border" variant="primary" />
            )}
            {allProfilesIsError && (
              <Alert variant="danger">
                {allProfilesError}
              </Alert>
            )}
            {allProfilesIsSuccess && (
              <Form.Control
                as="select"
                type="email"
                placeholder="Enter receiver's email"
                name="receiver"
                value={receiver}
                onChange={handleNewMessageFormChange}
              >
                <option value="">Select receiver</option>
                {allProfilesData && allProfilesData.profiles.length === 0 && (
                  <option>No profiles found</option>
                )}
                {allProfilesData && allProfilesData.profiles.map(profile => (
                    <option key={profile.id} value={profile.email}>
                      {profile.display_name} : {profile.email}
                    </option>
                ))}

              </Form.Control>
            )}

        </Form.Group>

        <Form.Group className="mb-3" controlId="newMessageFormMessage">
          <Form.Label>Message:</Form.Label>
          <Form.Control 
            placeholder='send a message' 
            as="textarea" 
            rows={3}
            onChange={handleNewMessageFormChange}
            name="message"
            value={message}
            type="text"
            style={{ resize: "none", height: "100px" }}
            />
        </Form.Group>

        {sendMessageIsLoading ? (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
          ) : (
          <Button 
            variant="success" 
            onClick={() => handleNewMessageSend()}
            >
            Send
          </Button>

          )}
      </Form>
      )}
    </>
  )
}