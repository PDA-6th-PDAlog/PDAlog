"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import "../../assets/styles/font.css";
import { useEffect, useState, useRef } from "react";

export default function AppNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("http://localhost:3001/login/protected", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isLoggedIn) {
          setIsLoggedIn(true);
          setUserInfo(data.user);
        } else {
          setIsLoggedIn(false);
          setUserInfo(null);
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
        setUserInfo(null);
      });
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:3001/login/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        setIsLoggedIn(false);
        setUserInfo(null);
        setDropdownOpen(false);
        alert("로그아웃 되었습니다.");
        window.location.href = "/";
      } else {
        alert("로그아웃 실패");
      }
    } catch (error) {
      alert("로그아웃 중 오류가 발생했습니다.");
      console.error(error);
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg">
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
          style={{ display: "flex", alignItems: "center" }}
        >
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
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <div style={{ position: "relative" }} ref={dropdownRef}>
          {isLoggedIn && userInfo ? (
            <>
              <div
                onClick={toggleDropdown}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  userSelect: "none",
                  gap: "10px",
                }}
              >
                <img
                  src={userInfo.profile_image}
                  alt="프로필 이미지"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "1.5px solid #007bff",
                  }}
                />
                <span
                  style={{
                    fontWeight: "600",
                    color: "#333",
                    whiteSpace: "nowrap",
                  }}
                >
                  {userInfo.username}
                </span>
              </div>

              {dropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    marginTop: "8px",
                    background: "white",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    padding: "8px 12px",
                    zIndex: 1000,
                    minWidth: "120px",
                  }}
                >
                  <button
                    onClick={handleLogout}
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "none",
                      background: "#dc3545",
                      color: "white",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                    type="button"
                  >
                    로그아웃
                  </button>
                </div>
              )}
            </>
          ) : (
            <div style={{ display: "flex", gap: "10px" }}>
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
          )}
        </div>
      </Container>
    </Navbar>
  );
}
