import { Card } from "react-bootstrap"
import Link from "next/dist/client/link"

export default function ExploreProfileCard({ profile }) {
  return (
    <Card style={{ width: '18rem', }}>
      <Card.Body>
        <Card.Title>{profile.display_name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{profile.email}</Card.Subtitle>
        <Card.Text>
          {profile.bio}
        </Card.Text>
        <Link href={`/profile/${profile.email}`} passHref>
          <Card.Link>Visit</Card.Link>
        </Link>
        <Link href={`/messages/direct/${profile.email}`} passHref>
          <Card.Link>Message</Card.Link>
        </Link>
      </Card.Body>
    </Card>
  )
}