import Head from "next/head";
import TopNav from "./TopNav";
import LeftSideNav from "./LeftSideNav";
import styles from "./Layout.module.scss";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const siteTitle = "team13socialapp";

const Layout = ({ children, title, content }) => {
  

  return (
    <>
      <Head>
        {/* need to include this link to prevent large icon lazy loading with ssr */}
        <link
          href="https://use.fontawesome.com/releases/v5.15.4/css/svg-with-js.css"
          rel="stylesheet"
        ></link>

        <title>{title}</title>
        <meta name="description" content={content} />

        <link rel="icon" href="/favicon.ico" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta charSet="UTF-8" />
      </Head>

      <TopNav />
      <Container>
        <Row>
          <Col md={4}>
            <LeftSideNav />
          </Col>
          <Col md={8}>
            <main>{children}</main>
          </Col>
        </Row>
      </Container>
    </>
  );
};

Layout.defaultProps = {
  title: "social media",
  description: "mvp v0",
};

export default Layout;
