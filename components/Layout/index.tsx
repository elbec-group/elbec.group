import Head from "next/head";
import Navigation from "../Navigation";

type Props = {
  children: React.ReactNode,
};

export default function Layout({ children }: Props) {
  return (
    <div className="root">
      <nav>
        <Navigation />
      </nav>
      <main>{children}</main>
    </div>
  );
}
