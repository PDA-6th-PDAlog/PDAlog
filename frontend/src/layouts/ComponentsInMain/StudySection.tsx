interface StudySectionProps {
  title: string;
  list: Study[];
  fontSize?: string; // 예: '1.5rem', '20px', 'large' 등
}

export default function StudySection({
  title,
  list,
  fontSize = "1.25rem",
}: StudySectionProps) {
  return (
    <div
      style={{
        height: "30vh",
        width: "100vh",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)", // 여기!
      }}
    >
      <h2 style={{ fontSize, marginBottom: "1rem", fontWeight: "bold" }}>
        {title}
      </h2>
      <div style={{ display: "flex", gap: "1rem", overflowX: "auto" }}>
        {list.map((study) => (
          <div
            key={study.id}
            style={{
              width: "20vh",
              height: "20vh",
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              flex: "0 0 auto",
            }}
          >
            {study.imageUrl ? (
              <img
                src="/assets/sh.png"
                alt={study.title || "스터디"}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#aaa",
                  fontSize: "12px",
                }}
              >
                {study.title || "No Title"}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
