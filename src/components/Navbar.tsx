import { Button, Navbar, Dropdown } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../imgs/marhbabik.png";

export function Navbars() {
  const path = useLocation().pathname;

  return (
    <Navbar
      fluid
      className="fixed top-0 left-0 right-0 bg-white bg-opacity-50 backdrop-blur-md shadow-md z-50"
    >
      <Navbar.Brand>
        <Link to="/AdminLogin">
          <img
            src={logo}
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          />
        </Link>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button className="bg-mh-blue">
          <Link to="/signup">Sign up</Link>
        </Button>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/Destinations"} as={"div"}>
          <Link to="/Destinations">Destinations</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/About"} as={"div"}>
          <Dropdown label="About us" inline>
            <Dropdown.Item>
              <Navbar.Link active={path === "/About"} as={Link} to="/About">
                About us
              </Navbar.Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Navbar.Link active={path === "/FAQ"} as={Link} to="/FAQ">
                FAQ
              </Navbar.Link>
            </Dropdown.Item>
          </Dropdown>
        </Navbar.Link>
        <Navbar.Link active={path === "/Join"} as={"div"}>
          <Dropdown label="Join us" inline>
            <Dropdown.Item>
              <Navbar.Link active={path === "/Homeowner"} as={Link} to="/Homeowner">
                Home owner
              </Navbar.Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Navbar.Link active={path === "/Carowner"} as={Link} to="/Carowner">
                Car owner
              </Navbar.Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Navbar.Link active={path === "/Agency"} as={Link} to="/Agency">
                Travelling agency
              </Navbar.Link>
            </Dropdown.Item>
          </Dropdown>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
