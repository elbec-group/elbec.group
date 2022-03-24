import Link from "next/link";
import { useRouter } from "next/router";
// import Burger from "./Burger";
import { useState } from "react";

export default function Navigation() {
  const router = useRouter();
  const [active, setActive] = useState(false);
  return (
    <>
      {/* <Burger active={active} onClick={() => setActive(!active)} /> */}
      <div className={"container " + (active ? "active" : "")}>
        <ul>
          <li>
            <Link href="/">
              <a className={router.pathname === "/" ? "active" : ""}>about</a>
            </Link>
          </li>
          <li>
            <Link href="/projects">
              <a
                className={
                  router.pathname.startsWith("/projects") ? "active" : ""
                }
              >
                Projects
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
