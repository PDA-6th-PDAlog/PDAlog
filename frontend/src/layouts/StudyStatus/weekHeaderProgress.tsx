export default function WeekHeader() {
  return (
    <div className="flex items-center">
      <h1 className="text-xl font-semibold">1주차</h1>
      <div className="flex gap-2 pl-10">
        <button className="px-2 py-1 border rounded w-10 h-10">⭕</button>
        <button className="px-2 py-1 border rounded w-10 h-10">⭕</button>
        <button className="px-2 py-1 border rounded w-10 h-10">⭕</button>
        <button className="px-2 py-1 border rounded w-10 h-10">-</button>
        <button className="px-2 py-1 border rounded w-10 h-10">-</button>
      </div>
    </div>
  );
}
