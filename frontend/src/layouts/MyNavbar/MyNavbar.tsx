"use client";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import "../../assets/styles/font.css";

export default function AppNavbar() {
  return (
    <Navbar collapseOnSelect expand="lg" style={{}}>
      <Container
        className="d-flex justify-content-between align-items-center"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2rem",
        }}
      >
        <Navbar.Brand
          as={Link}
          href="/"
          style={{
            display: "flex",

            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flex: "flex-start" }}>
            <img
              src="/assets/신한투자증권.png"
              alt="logo"
              style={{ width: "20px", height: "20px", marginRight: "10px" }}
            />
            <div
              style={{
                fontFamily: "MyLogoFont",
                color: "#0046ff",
                fontSize: "20px",
              }}
            >
              PDA_LOG
            </div>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <div>
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
        </div>
      </Container>
    </Navbar>
  );
}
