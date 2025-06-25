"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function AppNavbar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} href="/">
          <Image
            src="/assets/신한투자증권.jpg"
            alt="로고"
            width={120}
            height={40}
            style={{ objectFit: "contain" }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-3 d-flex gap-2">
            <Nav.Link
              as={Link}
              href="/login"
              style={{
                backgroundColor: "#007bff",
                color: "white",
                borderRadius: "8px",
                padding: "6px 12px",
              }}
            >
              로그인
            </Nav.Link>
            <Nav.Link
              as={Link}
              href="/signup"
              style={{
                backgroundColor: "#007bff",
                color: "white",
                borderRadius: "8px",
                padding: "6px 12px",
              }}
            >
              회원가입
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
