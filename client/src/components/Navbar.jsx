import { Navbar } from "flowbite-react";

export function VisitorNavbar() {
  return (
    <Navbar fluid className="p-5 rounded-md shadow-sm">
      <Navbar.Brand href="#">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Visitor management
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="#" active>
          visiteurs
        </Navbar.Link>
        <Navbar.Link href="#">A propos</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
