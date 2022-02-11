import { useGetAllConversationsQuery } from "slices/messagesAPI"
import { Nav, Spinner, Button, Alert, ListGroup, Row, Col, Container } from "react-bootstrap"
import Link from "next/dist/client/link"
import { useSelector } from "react-redux"
import { selectCurrentUser } from "slices/authSlice"
import { useEffect } from "react"
import { useRouter } from "next/router"

export default function Messages() {

  const currentUser = useSelector(state => state.auth.user)
  const access_token = useSelector(state => state.auth.access)

  const router = useRouter()

  const {
    data: conversationData,
    error: conversationError,
    loading: conversationLoading,
    isLoading: conversationIsLoading,
    isError: conversationIsError,
    isSuccess: conversationIsSuccess,
  } = useGetAllConversationsQuery({ access_token })

  useEffect(() => {
    if (conversationIsError) {
      console.log(`conversationError: ${conversationError}`)
    }
  }, [conversationIsError])


  return (
    <>
      <Container>
        <Row>
          <Col>
            <h3>Messages</h3>
          </Col>
          <Col>
            <Link href="/messages/new">
              <Button 
                variant="primary"
                onClick={() => {
                  router.push("/messages/new", undefined, { shallow: true })
                }}
              >
                  New Message
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
        

        {/* {conversationIsLoading || conversationData === undefined && (
          <Spinner animation="border" variant="primary" />
        )} */}
        {conversationIsLoading || conversationData === undefined ? (
          <Spinner animation="border" variant="primary" />
        ) : conversationIsError ? (
          <Alert variant="danger">Status:{conversationError.status}, {conversationError.data.message}</Alert>
        ) : conversationIsSuccess && !conversationIsError && conversationData.conversations.length > 0 ? (
          <ListGroup>
                {/* {conversationData !== undefined && conversationData.conversations.map(conversation => ( */}
                {conversationData.conversations.map(conversation => (
                  <ListGroup.Item key={conversation.id}>
                    {conversation.user1 === currentUser.userdata.email ? (
                      <Link href={`/messages/direct/${conversation.user2}`} passHref>
                        <a>{conversation.user2_display_name}</a>
                      </Link>
                    ) : (
                      <Link href={`/messages/direct/${conversation.user1}`} passHref>
                        <a>{conversation.user1_display_name}</a>
                      </Link>
                    )}
                      
                  </ListGroup.Item>
                ))}
              </ListGroup>
        ) : (
          <Alert variant="primary">No messages found</Alert>
        )}

        {/* {conversationIsError && <Alert variant="danger">Status:{conversationError.status}, {conversationError.data.message}</Alert>} */}

        {/* {conversationIsSuccess && !conversationIsError && conversationData.conversations.length > 0 ? (
          <>
            {conversationData && conversationData.conversations.length === 0 && (
              <Alert variant="info">
                You have no messages.
              </Alert>
            )}
          </>
          ) : (
            <>
              <ListGroup>
                {conversationData.conversations.map(conversation => (
                  <ListGroup.Item key={conversation.id}>
                    {conversation.user1 === currentUser.userdata.email ? (
                      <Link href={`/messages/direct/${conversation.user2}`} passHref>
                        <a>{conversation.user1_display_name} - {conversation.user2_display_name}</a>
                      </Link>
                    ) : (
                      <Link href={`/messages/direct/${conversation.user1}`} passHref>
                        <a>{conversation.user2} - {conversation.user1}</a>
                      </Link>
                    )}
                      
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )} */}

    </>
  )
}