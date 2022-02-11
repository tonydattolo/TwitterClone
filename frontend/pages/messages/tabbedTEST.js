import { useGetAllConversations } from "slices/messagesAPI"
import { Tab, Row, Col, Nav, Spinner, Button, Alert } from "react-bootstrap"
import Link from "next/dist/client/link"

export default function Messages() {

  const {
    data: conversationData,
    error: conversationError,
    loading: conversationLoading,
    isLoading: conversationIsLoading,
    isError: conversationIsError,
    isSuccess: conversationIsSuccess,
    refetch: conversationRefetch,
  } = useGetAllConversations()


  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            {conversationIsLoading && <Spinner animation="border" />}
            {conversationIsError && <Alert variant="danger">{conversationError}</Alert>}
            {conversationIsSuccess && conversationData.length === 0 && <Alert variant="info">No conversations yet</Alert>}
            {conversationData && conversationData.map((conversation) => (
              <Nav.Item key={conversation.id}>
                <Nav.Link eventKey={conversation.id}>
                  {conversation.user1} - {conversation.user2}
                  {/* <Link href="/messages/[conversationId]" as={`/messages/${conversation.id}`}>
                    <a>{conversation.name}</a>
                  </Link> */}
                </Nav.Link>
              </Nav.Item>
            ))}
            <Nav.Item>
              <Nav.Link eventKey="first">Tab 1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Tab 2</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first">
              {/* <Sonnet /> */}
            </Tab.Pane>
            <Tab.Pane eventKey="second">
              {/* <Sonnet /> */}
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  )
}