- [frontend gotchas](#frontend-gotchas)
    - [NextJS routing, Link component, and redux state unique behavior](#nextjs-routing-link-component-and-redux-state-unique-behavior)

# frontend gotchas

### NextJS routing, Link component, and redux state unique behavior

When using a Redux store, you have to avoid full page reloads when you need redux state data available persistently accross the site.
  - when using useRouter() hook from react-router, you need to call operations in a shallow manner. You can do this by accessing the optional keyword arguments of the userouter hook, as shown below.
    ```javascript
      import { useRouter } from "next/router";
      // ....
      const router = useRouter()
      // ....
      router.push("someRoute", undefined, { shallow: true})
    ``` 
  - when using the Link component from NextJS, you need to be careful of starting href links with a leading /, *except* for the home base url. Examples below:
    ```javascript
    import Link from "next/dist/client/link";
    // ...
    // This link will force a full page refresh
    <Link href="/someRoute">redirect</Link>
    // This link will persist redux store
    <Link href="/someRoute">redirect</Link>
    // base url homepage/index exception:
    <Link href="/">redirect</Link>

    ```