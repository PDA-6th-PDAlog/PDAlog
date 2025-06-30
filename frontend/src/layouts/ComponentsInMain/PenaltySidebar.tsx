import React from "react";
import Link from "next/link";

type User = {
    id: string | number;
    name: string;
    amount?: number;
    profileImage?: string;
};

interface PenaltySidebarProps {
    users: User[];
}

const PenaltySidebar = ({ users }: PenaltySidebarProps) => {
    return (
        <aside
            style={{
                width: "40vh",
                height: "100vh",
                padding: "1rem",
                borderRight: "1px solid #ccc",
            }}>
            <h3 style={{
                    fontSize: "1.4rem",
                    fontWeight: "bold",
                    marginBottom: "1.5rem",
                    textAlign: "center",
                    color: "#333",
                    borderBottom: "2px solid #ddd",
                    paddingBottom: "0.5rem",
                    letterSpacing: "1px",
                }}>
                 Penalty Rank
            </h3>
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
                        <Link
                            href={`/profile/${user.id}`}
                            style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                overflow: "hidden",
                                flexShrink: 0,
                                display: "inline-block",
                            }}
                        >
                            <div
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "50%",
                                    backgroundColor: "white",
                                    border: "2px solid #ccc",
                                    transition: "transform 0.3s ease",
                                }}
                                className="hover-profile-img"
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
                                        className="hover-profile-img"
                                    />
                                ) : (
                                    <span
                                        role="img"
                                        aria-label="profile"
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: "100%",
                                            height: "100%",
                                        }}
                                    >
                    👤
                  </span>
                                )}
                            </div>
                        </Link>

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

            {/* 🔽 추가 CSS (전역 스타일로 넣거나 컴포넌트 상단에 className 적용해도 됨) */}
            <style jsx>{`
        .hover-profile-img:hover {
          transform: scale(1.4);
          z-index: 10;
        }
      `}</style>
        </aside>
    );
};

export default PenaltySidebar;
