import dynamic from "next/dynamic";
import config from "../cms/config.js";

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
    loading: () => <h3>Loading...</h3>,
  }
);

const AdminPage: React.FC = () => {
  return <CMS />;
};

export default AdminPage;
