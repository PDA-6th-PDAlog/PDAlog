"use client";

export default function Page() {
  const studyData = [
    {
      name: "알고리즘 스터디",
      dates: ["O", "O", "X", "O", "O"],
      progress: { completed: 4, total: 5 },
    },
    {
      name: "React 심화 스터디",
      dates: ["O", "X", "O", "O", "X"],
      progress: { completed: 3, total: 5 },
    },
    {
      name: "디자인 패턴 스터디",
      dates: ["X", "O", "O", "O", "O"],
      progress: { completed: 4, total: 5 },
    },
    {
      name: "영어 회화 스터디",
      dates: ["O", "O", "O", "X", "O"],
      progress: { completed: 4, total: 5 },
    },
  ];

  const dateHeaders = ["6/3", "6/4", "6/5", "6/6", "6/7"];

  const getProgressPercentage = (completed: number, total: number) => {
    return (completed / total) * 100;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Profile Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border-0">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl font-bold">홍</span>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">홍길동</h1>
              <p className="text-gray-500 text-sm">hong.gildong@example.com</p>
            </div>
          </div>
        </div>

        {/* Study Dashboard */}
        <div className="bg-white rounded-2xl shadow-sm border-0 overflow-hidden">
          <div className="p-6 pb-4">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              참여중인 스터디
            </h2>
          </div>

          {/* Desktop View */}
          <div className="hidden lg:block">
            <div className="px-6">
              <div className="grid grid-cols-8 gap-4 pb-4 border-b border-gray-100">
                <div className="col-span-2 text-sm font-medium text-gray-600">
                  스터디명
                </div>
                {dateHeaders.map((date) => (
                  <div
                    key={date}
                    className="text-center text-sm font-medium text-gray-600"
                  >
                    {date}
                  </div>
                ))}
                <div className="text-center text-sm font-medium text-gray-600">
                  진행률
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-50">
              {studyData.map((study, index) => (
                <div
                  key={index}
                  className="px-6 py-5 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="grid grid-cols-8 gap-4 items-center">
                    <div className="col-span-2">
                      <span className="font-medium text-gray-900">
                        {study.name}
                      </span>
                    </div>
                    {study.dates.map((value, dateIndex) => (
                      <div key={dateIndex} className="flex justify-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            value === "O"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {value}
                        </div>
                      </div>
                    ))}
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-full max-w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${getProgressPercentage(
                              study.progress.completed,
                              study.progress.total
                            )}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-600">
                        {study.progress.completed}/{study.progress.total}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile View */}
          <div className="lg:hidden divide-y divide-gray-50">
            {studyData.map((study, index) => (
              <div key={index} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">{study.name}</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${getProgressPercentage(
                            study.progress.completed,
                            study.progress.total
                          )}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-600 min-w-8">
                      {study.progress.completed}/{study.progress.total}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-3">
                  {dateHeaders.map((date, dateIndex) => (
                    <div key={dateIndex} className="text-center">
                      <div className="text-xs text-gray-500 mb-2">{date}</div>
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-medium mx-auto ${
                          study.dates[dateIndex] === "O"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {study.dates[dateIndex]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border-0">
            <div className="text-2xl font-bold text-gray-900 mb-1">4</div>
            <div className="text-sm text-gray-500">참여중인 스터디</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border-0">
            <div className="text-2xl font-bold text-blue-600 mb-1">75%</div>
            <div className="text-sm text-gray-500">평균 참여율</div>
          </div>
        </div>
      </div>
    </div>
  );
}
