// components/PenaltySidebar.tsx

type User = {
  id: number;
  name: string;
  amount?: number; // 벌금 금액 없을 수도 있음
  profileImage?: string; // optional
};

export const userList = [
  { id: 1, name: "김혜윤", amount: 3000 },
  { id: 2, name: "전은서", amount: 2000 },
  { id: 3, name: "조정현" }, // 금액 없음
  { id: 4, name: "소유진" },
];

interface PenaltySidebarProps {
  title: string;
  users: User[];
}

export default function PenaltySidebar({ title, users }: PenaltySidebarProps) {
  return (
    <aside
      style={{
        width: "250px",
        backgroundColor: "#f8f8f8",
        padding: "1rem",
        borderRight: "1px solid #ccc",
      }}
    >
      <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>{title}</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {userList.map((user) => (
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
                backgroundColor: "#4caf50",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                color: "#fff",
              }}
            >
              👤
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
}
