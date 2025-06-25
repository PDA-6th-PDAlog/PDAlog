

export default function ProgressBarComponent({ progress, total }: { progress: number; total: number }) {
    const percent = (progress / total) * 100;
    return (
        <div className="w-full h-4 bg-gray-200 rounded overflow-hidden">
            <div className="h-4 bg-blue-500 text-xs text-white pl-1" style={{ width: `${percent}%` }}>
                {progress}/{total}
            </div>
        </div>
    );
}
