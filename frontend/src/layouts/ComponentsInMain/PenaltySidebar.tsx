// components/PenaltySidebar.tsx
import React from "react";

type User = {
  id: string; // 이메일을 ID로 사용
  name: string;
  amount?: number; // 벌금 금액이 없을 수도 있음
  profileImage?: string; // 프로필 이미지 URL, 없을 수도 있음
};

interface PenaltySidebarProps {
  users: User[];
}

const PenaltySidebar = ({ users }: PenaltySidebarProps) => {
  return (
    <aside
      style={{
        width: "30vh",
        backgroundColor: "#f8f8f8",
        padding: "1rem",
        borderRight: "1px solid #ccc",
      }}
    >
      <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>벌금순위</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.map((user) => (
          <li
            key={user.id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
              gap: "0.5rem",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                color: "#fff",
                overflow: "hidden",
              }}
            >
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <span role="img" aria-label="profile">
                  👤
                </span>
              )}
            </div>
            <div style={{ flexGrow: 1 }}>
              <div style={{ fontWeight: 500 }}>{user.name}</div>
              {user.amount !== undefined && (
                <div style={{ fontSize: "12px", color: "#777" }}>
                  {user.amount.toLocaleString()}원
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default PenaltySidebar;
