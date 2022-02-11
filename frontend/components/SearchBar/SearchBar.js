import { Form, FormControl, Button, FormGroup } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react"
import { useRouter } from "next/dist/client/router"

export default function SearchBar() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchTermChange = (e) => {
    // console.log(searchTerm)
    e.preventDefault()
    setSearchTerm(e.target.value)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    router.push(`/search/${searchTerm}`, undefined, { shallow: true })
  }

  return (
    <>
      <Form className="d-flex">
        <Form.Control
          type="text"
          placeholder={"Search.."}
          className="me-2"
          value={searchTerm}
          onChange={handleSearchTermChange}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch(e)
            }
          }}
        >
          {/* <FontAwesomeIcon icon={faSearch} /> */}
        </Form.Control>
      </Form>
    </>
  )
}

