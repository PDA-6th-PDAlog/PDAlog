// 'use client';
// import Link from 'next/link';
// import Router from 'next/navigation';
// export default function MyNavbar() {
// 	return (
// 		<div className="bg-blue-200">
// 			<ul className="flex justify-center gap-4 items-center">
// 				<li>
// 					<Link href="/">Home</Link>
// 				</li>
// 				<li>
// 					<Link href="/portfolio">포트폴리오</Link>
// 				</li>
// 				{/* <div><button></button>onClick=(() => {
//                     Router.push("/portfolio")})포트폴리오
//                     </div> */}
// 				<li>
// 					<Link href="/posts">Posts</Link>
// 				</li>
// 			</ul>
// 		</div>
// 	);
// }

"use client";
// import Link from "next/link";
// import Router from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
// import NavDropdown from "react-bootstrap/NavDropdown";

function CollapsibleExample() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">프로젝트</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="posts">Posts</Nav.Link>
            <Nav.Link href="client-albums">Client-albums</Nav.Link>
            <Nav.Link href="boards">Boards</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
