import dynamic from "next/dynamic";
import config from "../cms/config.js";

const CMS = dynamic(
  (): Promise<any> =>
    import("netlify-cms-app").then((cms: object) => {
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
