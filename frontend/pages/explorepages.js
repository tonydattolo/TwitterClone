
import { useGetPageDetailsOfAllPagesQuery } from "slices/pageApi";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import Page from "@/components/Page";

const ExplorePages=()=>{

    const router = useRouter();
    const access_token = useSelector((state) => state.auth.access);
    const userid = useSelector((state) => state.auth.id);

    const body = {
        id: userid,
        access_token: access_token,
      };

      const responseInfo = useGetPageDetailsOfAllPagesQuery(body);

    return(
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
                    userid={body.id}
                  />
                );
              })}
            </ul>
          )}
    
          {responseInfo.status === "fulfilled" && responseInfo.data.length === 0 && (
            <div>
              <h3> There are no pages to show</h3>
            </div>
          )}
        </div>
      
    );
};

export default ExplorePages;