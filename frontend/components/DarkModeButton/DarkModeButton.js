import { Button } from "react-bootstrap";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import styles from '../DarkModeButton/DarkModeButton.module.scss'

export default function DarkModeButton() {

  const [darkMode, setDarkMode] = useState(false)

  const handleThemeToggle = () => {
    document.body.classList.toggle("dark-mode")
    setDarkMode(!darkMode)
  }

  return (
    <>
        {darkMode ? (
          <>
            <Button
              // variant="outline-dark" 
              onClick={handleThemeToggle}
              className={styles.darkModeButton}
            >
              {/* <span>Dark  </span> */}
              <FontAwesomeIcon icon={faMoon} size={"lg"} className={styles.moonIcon} />
            </Button>
          </>
          ) : (
          <>
            <Button
              // variant="outline-dark" 
              onClick={handleThemeToggle}
              className={styles.lightModeButton}
            >
              {/* <span>Light  </span> */}
              <FontAwesomeIcon icon={faSun} size={"lg"} className={styles.sunIcon} />
            </Button>
          </>
        )}
    </>
  )
}