import dynamic from "next/dynamic";
import config from "../cms/config.js";
import {Loading} from "../components/Loading.js"

interface cmsObject {
  [init: string]: any
}

const CMS = dynamic(
  (): Promise<any> =>
    import("netlify-cms-app").then((cms: cmsObject) => {
      cms.init({ config });
    }),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

const AdminPage: React.FC = () => {
  return <CMS />;
};

export default AdminPage;
