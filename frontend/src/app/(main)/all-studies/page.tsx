async function getAllStudies() {
  const res = await fetch("http://localhost:3000/all-studies", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

interface Study {
  id: number;
  title: string;
  thumbnail_url?: string;
}

export default async function AllStudiesPage() {
  const studies: Study[] = await getAllStudies();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>전체 스터디 목록</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        {studies.map((study) => (
          <div
            key={study.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            {study.thumbnail_url ? (
              <img
                src={study.thumbnail_url}
                alt={study.title}
                style={{
                  width: "100%",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "120px",
                  backgroundColor: "#f0f0f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "4px",
                  color: "#aaa"
                }}
              >
                No Image
              </div>
            )}
            <h3 style={{ marginTop: "0.5rem", fontSize: "1.1rem" }}>
              {study.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
} 