import React from "react";
import Link from "next/link"; // next/link 임포트

type User = {
    id: string | number; // id는 숫자일 수도 있으므로 number 타입도 포함
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
                        <Link
                            href={`/profile/${user.id}`}
                            style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                backgroundColor: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "20px",
                                overflow: "hidden",
                                flexShrink: 0,
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
        </aside>
    );
};

export default PenaltySidebar;
