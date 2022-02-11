import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useGetPageDetailsByUserQuery } from "slices/pageApi";

import Page from "@/components/Page";

const UsersPages = () => {
  const router = useRouter();
  const { id } = router.query;
  const access_token = useSelector((state) => state.auth.access);

  const body = {
    id: id,
    access_token: access_token,
  };

  const responseInfo = useGetPageDetailsByUserQuery(body);


  return (
    <div>
      {responseInfo.status === "fulfilled" && responseInfo.data.length != 0 && (
        <ul>
          {responseInfo.data.map((itm) => {
            return (
              <Page
                key={itm.pageName}
                pageName={itm.pageName}
                pageAuthor={itm.pageAuthor}
                pageDescription={itm.pageDescription}
                pageEmail={itm.pageEmail}
              />
            );
          })}
        </ul>
      )}

      {responseInfo.status === "fulfilled" && responseInfo.data.length === 0 && (
        <div>
          <h3>You have not created any pages</h3>
          <p>
            Maybe Create One??
          </p>
        </div>
      )}
    </div>
  );
};

export default UsersPages;
