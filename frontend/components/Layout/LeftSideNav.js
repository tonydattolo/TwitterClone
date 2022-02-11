import { Nav, Button } from 'react-bootstrap'
// import { Nav } from 'react-bootstrap'
// import styles from 'styles/modules/'
import Link from "next/dist/client/link";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook, faAt, faGem, faHome, faUser, faUsers, faSearch, faEnvelope, faNewspaper } from '@fortawesome/free-solid-svg-icons'

import styles from './LeftSideNav.module.scss'
import { useRouter } from 'next/dist/client/router';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function LeftSideNav() {

  const router = useRouter();

  const user = useSelector(state => state.auth.user)

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  const authLinks = () => (
    <>
      <Nav.Item as="li" className={styles.sidenavItem}>
        <Link href="/" passHref>
          <Nav.Link href="#" className={router.pathname === '/' ? ` ${styles.navLink} ${styles.activeNavLink}` : `${styles.navLink}`}>
            <div className={styles.navIconContainer}>
              <FontAwesomeIcon icon={faHome} />
            </div>
            <span className={styles.linkText}>Home</span>
          </Nav.Link>
        </Link>
      </Nav.Item>
      
      <Nav.Item as="li" className={styles.sidenavItem}>
        <Link href={`/profile/${user.userdata.email}`} passHref>
          <Nav.Link className={styles.navLink}>
            <div className={styles.navIconContainer}>
              <FontAwesomeIcon icon={faUser} />
            </div>
            <span className={styles.linkText}>Profile</span>
          </Nav.Link>
        </Link>
      </Nav.Item>

      <Nav.Item as="li" className={styles.sidenavItem}>
        <Link href={`/mypages/${user.userdata.id}`} passHref>
          <Nav.Link className={styles.navLink}>
            <div className={styles.navIconContainer}>
              <FontAwesomeIcon icon={faNewspaper} />
            </div>
            <span className={styles.linkText}>My Pages</span>
          </Nav.Link>
        </Link>
      </Nav.Item>

      <Nav.Item as="li" className={styles.sidenavItem}>
        <Link href='/explorepages' passHref>
          <Nav.Link className={styles.navLink}>
            <div className={styles.navIconContainer}>
              <FontAwesomeIcon icon={faNewspaper} />
            </div>
            <span className={styles.linkText}>Explore Pages</span>
          </Nav.Link>
        </Link>
      </Nav.Item>

      {/* <Nav.Item as="li" className={styles.sidenavItem}>
        <Link href="/" passHref>
          <Nav.Link href="#" className={styles.navLink}>
            <div className={styles.navIconContainer}>
              <FontAwesomeIcon icon={faUsers} />
            </div>
            <span className={styles.linkText}>feature2</span>
          </Nav.Link>
        </Link>
      </Nav.Item> */}
      
      <Nav.Item as="li" className={styles.sidenavItem}>
        <Link href="/notifications" passHref>
          <Nav.Link href="#" className={styles.navLink}>
            <div className={styles.navIconContainer}>
              <FontAwesomeIcon icon={faAt} />
            </div>
            <span className={styles.linkText}>Notifications</span>
          </Nav.Link>
        </Link>
      </Nav.Item>
      
      <Nav.Item as="li" className={styles.sidenavItem}>
        <Link href="/explore" passHref>
          <Nav.Link href="#" className={styles.navLink}>
            <div className={styles.navIconContainer}>
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <span className={styles.linkText}>Explore</span>
          </Nav.Link>
        </Link>
      </Nav.Item>
      
      <Nav.Item as="li" className={styles.sidenavItem}>
        <Link href="/messages" passHref>
          <Nav.Link href="#" className={styles.navLink}>
            <div className={styles.navIconContainer}>
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <span className={styles.linkText}>Messages</span>
          </Nav.Link>
        </Link>
      </Nav.Item>
      <Link href="/newpost" passHref>
        <Button size='lg' className={styles.postButton}>
          Post
        </Button>
      </Link>
      <Link href="/newpage" passHref>
        <Button size='lg' className={styles.createPageButton}>
          Create Page
        </Button>
      </Link>
    </>
  )
  const guestLinks = () => (
    // <>
      <Nav.Item as="li" className={styles.sidenavItem}>
        <Link href='login' passHref>
          <Nav.Link href="#" className={styles.navLink}>
            <div className={styles.navIconContainer}>
              <FontAwesomeIcon icon={faUser} />
            </div>
            <span className={styles.linkText}>Login to View</span>
          </Nav.Link>
        </Link>
      </Nav.Item>
    // </>
  )

  return (
    <Nav defaultActiveKey="/home" className={`flex-column ${styles.nav}`}>
      {user !== null && isAuthenticated !== false ? authLinks() : guestLinks()}
      
      {/* <Nav.Item as="li" className={styles.sidenavItem}>
        <Link href="/" passHref>
          <Nav.Link href="#" className={styles.navLink}>
            <div className={styles.navIconContainer}>
              <FontAwesomeIcon icon={faAddressBook} />
            </div>
            <span className={styles.linkText}>example</span>
          </Nav.Link>
        </Link>
      </Nav.Item> */}

    </Nav>
  );
}
