"use client";

import { useState } from "react";

export default function CreateStudyPage() {
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
      setPreviewUrl(URL.createObjectURL(file)); // ✅ 미리보기 URL 생성
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    await fetch("/api/study", {
      method: "POST",
      body: formData,
    });

    alert("스터디가 생성되었습니다!");
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md border border-gray-200 p-8">
        <h4 className="text-base font-medium mb-4 text-gray-800">
          스터디 생성
        </h4>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block mb-1">스터디 제목</label>
            <input
              type="text"
              name="title"
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1">스터디 설명</label>
            <textarea
              name="description"
              rows={3}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md resize-none"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1">시작일자</label>
              <input
                type="date"
                name="startDate"
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md"
                value={form.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1">종료일자</label>
              <input
                type="date"
                name="endDate"
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md"
                value={form.endDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1">주간 인증 빈도</label>
            <select
              name="frequency"
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md"
              value={form.frequency}
              onChange={handleChange}>
              <option value="1">주 1회</option>
              <option value="3">주 3회</option>
              <option value="5">주 5회</option>
              <option value="7">매일</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">벌금 금액 (원)</label>
            <input
              type="number"
              name="penalty"
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md"
              placeholder="예: 5000"
              value={form.penalty}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block mb-1">썸네일 이미지</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-sm w-full"
            />
            {previewUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt="썸네일 미리보기"
                className="mt-4 w-48 h-auto rounded border"
              />
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition">
              스터디 생성
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
