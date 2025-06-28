"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateStudyPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    frequency: "3",
    penalty: "",
    thumbnail: null as File | null,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({ ...prev, thumbnail: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Number(form.penalty) < 500 || Number(form.penalty) > 5000) {
      alert("⚠️ 벌금은 최소 500원, 최대 5000원까지만 설정할 수 있어요!");
      return;
    }

    // 날짜 유효성 검사
    const start = new Date(form.startDate);
    const end = new Date(form.endDate);
    if (start > end) {
      alert("⚠️ 종료일자는 시작일자보다 빠를 수 없어요!");
      return;
    }

    try {
      let thumbnailUrl = null;

      if (form.thumbnail) {
        const imageForm = new FormData();
        imageForm.append("file", form.thumbnail);

        const uploadRes = await fetch("http://localhost:3001/test/upload", {
          method: "POST",
          body: imageForm,
        });

        const uploadData = await uploadRes.json();
        thumbnailUrl = uploadData.url; // <- 정상 시 URL 저장
      }

      // 2. 스터디룸 생성 요청
      const payload = {
        title: form.title,
        description: form.description,
        start_date: form.startDate,
        end_date: form.endDate,
        penalty_amount: Number(form.penalty),
        host_id: 1,
        weekly_required_count: Number(form.frequency),
        thumbnail_url: thumbnailUrl,
      };

      const studyRes = await fetch("http://localhost:3001/study-rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!studyRes.ok) throw new Error("스터디 생성 실패");

      alert("🎉 스터디가 생성되었습니다!");
      router.push("/");
    } catch (err) {
      console.error("❌ 오류 발생:", err);
      alert("😢 오류가 발생했어요. 다시 시도해 주세요.");
    }
  };

  // 날짜 차이 계산 함수
  const getTotalDays = (start: string, end: string) => {
    if (!start || !end) return null;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diff = endDate.getTime() - startDate.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
    return days > 0 ? days : null;
  };

  return (
    <main className="container py-5">
      <div
        className="mx-auto p-4 border rounded-4 shadow-sm bg-light-subtle"
        style={{ maxWidth: "700px" }}>
        <h4 className="mb-4 text-center fw-semibold text-dark">
          🌱 스터디 생성
        </h4>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">스터디 제목</label>
            <input
              type="text"
              name="title"
              className="form-control rounded-3"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">스터디 설명</label>
            <textarea
              name="description"
              className="form-control rounded-3"
              rows={3}
              value={form.description}
              onChange={handleChange}
              required></textarea>
          </div>

          <div className="row g-3 mb-3">
            <div className="col">
              <label className="form-label">시작일자</label>
              <input
                type="date"
                name="startDate"
                className="form-control rounded-3"
                value={form.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col">
              <label className="form-label">종료일자</label>
              <input
                type="date"
                name="endDate"
                className="form-control rounded-3"
                value={form.endDate}
                onChange={handleChange}
                required
              />
            </div>
            {form.startDate &&
              form.endDate &&
              getTotalDays(form.startDate, form.endDate) && (
                <div className="text-muted small mt-1">
                  총 {getTotalDays(form.startDate, form.endDate)}일간
                  진행됩니다.
                </div>
              )}
          </div>

          <div className="mb-3">
            <label className="form-label">주간 인증 빈도</label>
            <select
              name="frequency"
              className="form-select w-auto rounded-3"
              value={form.frequency}
              onChange={handleChange}>
              <option value="1">주 1회</option>
              <option value="3">주 3회</option>
              <option value="5">주 5회</option>
              <option value="7">매일</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">💸 벌금 금액 (원)</label>
            <input
              type="number"
              name="penalty"
              className="form-control rounded-3 w-50"
              placeholder="예: 5000"
              value={form.penalty}
              onChange={handleChange}
              min="500"
              max="5000"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">썸네일 이미지</label>
            <input
              type="file"
              accept="image/*"
              className="form-control rounded-3"
              onChange={handleFileChange}
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="썸네일 미리보기"
                className="mt-3 img-thumbnail rounded-4 border border-secondary"
                style={{ width: "200px", height: "auto" }}
              />
            )}
          </div>

          <div className="text-end mt-4">
            <button
              type="submit"
              className="btn btn-outline-primary rounded-pill px-4 py-2 fw-bold shadow-sm">
              스터디 생성하기
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
