import { useGetConversationDetailQuery, useSendMessageMutation } from "slices/messagesAPI";
import { Alert, Spinner, Button, Form, ListGroup, InputGroup, FormControl } from "react-bootstrap";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function DirectMessage() {
  
  const currentUser = useSelector(state => state.auth.user)
  const access_token = useSelector(state => state.auth.access)
  const router = useRouter();
  const { displayName } = router.query;

  const [message, setMessage] = useState("");

  const {
    data: conversationData,
    loading: conversationLoading,
    error: conversationError,
    isLoading: conversationIsLoading,
    isError: conversationIsError,
    isFetching: conversationIsFetching,
    refetch: conversationRefetch,
  } = useGetConversationDetailQuery({ displayName, access_token})

  const [
    sendMessage, {
      loading: sendMessageLoading,
      error: sendMessageError,
      isSuccess: sendMessageIsSuccess,
      isLoading: sendMessageIsLoading,
      isError: sendMessageIsError,
      isFetching: sendMessageIsFetching,
      data: sendMessageData,
    }
  ] = useSendMessageMutation()

  const handleSendMessage = async () => {
    let conversation_id = conversationData.conversation.id
    const receiver = displayName
    if (message.length > 0) {
      try {
        await sendMessage({ 
          message, 
          conversation_id,
          receiver,
          access_token })
        setMessage("")
      } catch (error) {
        console.log(`error in handleSendMessage: ${error}`)
      }
    } else {
      console.log("blank message not allowed")
    }
  }

  useEffect(() => {
    if (!sendMessageIsLoading || sendMessageIsSuccess) {
      setMessage("")
    }
  }, [sendMessageIsLoading, sendMessageIsSuccess])

  return (
    <>
      <h5>Direct Message</h5>
      {conversationIsLoading || conversationIsFetching ? (
        <>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </>
      ) : conversationIsError ? (
        <Alert variant="danger">{conversationIsError.status}, {conversationIsError.message}</Alert>
      ) : conversationData ? (
        <>
          <p>convo between: {conversationData.conversation.user1_display_name} and {conversationData.conversation.user2_display_name}</p>
          <ListGroup>
            {conversationData.messages.map(message => (
              <ListGroup.Item
                as="li"
                key={message.id}
                eventKey={message.id}
                variant={message.sender === currentUser.userdata.email ? "primary" : "secondary"}
                // className={
                //   message.sender === currentUser.userdata.email ? (
                //     "d-flex justify-content-between align-items-end"
                //   ) : (
                //     "d-flex justify-content-between align-items-end"
                //   )}
                
              >
                <div 
                  style={
                    message.sender === currentUser.userdata.email ? (
                    {textAlign: "left"}
                  ) : (
                    {textAlign: "right"}
                  )}
                >
                  {message.message}
                </div>
              </ListGroup.Item>
            ))}

          </ListGroup>
        </>
      ) : (
        <p>No messages yet</p>
      )}

        {/* <Form>
          <Form.Group controlId="sendNewMessageForm">
            <Form.Control
              as="textarea"
              rows="1"
              placeholder="Type your message here"
              onChange={(e) => setMessage(e.target.value)}
            />
          </Form.Group>
          <Button
            variant="primary"
            onClick={handleSendMessage}
            disabled={sendMessageIsLoading || sendMessageIsFetching}
          >
            Send
          </Button>
        </Form> */}

        <InputGroup className="mb-3">
          <FormControl
            value={message}
            as="textarea"
            rows="1"
            placeholder="Type your message here"
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button 
            variant="primary"
            onClick={handleSendMessage}
            disabled={sendMessageIsLoading || sendMessageIsFetching}
          >
            Send
          </Button>
        </InputGroup>



    </>
  )
}