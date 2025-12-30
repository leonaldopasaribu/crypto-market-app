export default function Loading() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-10 w-64 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse mb-2"></div>
          <div className="h-4 w-96 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
        </div>

        {/* Market Summary Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800"
            >
              <div className="h-3 w-24 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse mb-3"></div>
              <div className="h-8 w-32 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Table Skeleton */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <th className="px-4 py-3 text-left">
                    <div className="h-3 w-4 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <div className="h-3 w-16 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
                  </th>
                  <th className="px-4 py-3 text-right">
                    <div className="h-3 w-12 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse ml-auto"></div>
                  </th>
                  <th className="px-4 py-3 text-right">
                    <div className="h-3 w-12 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse ml-auto"></div>
                  </th>
                  <th className="px-4 py-3 text-right hidden sm:table-cell">
                    <div className="h-3 w-20 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse ml-auto"></div>
                  </th>
                  <th className="px-4 py-3 text-right hidden lg:table-cell">
                    <div className="h-3 w-24 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse ml-auto"></div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {[...Array(10)].map((_, i) => (
                  <tr key={i}>
                    <td className="px-4 py-4">
                      <div className="h-4 w-6 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-zinc-200 dark:bg-zinc-800 rounded-full animate-pulse"></div>
                        <div className="flex flex-col gap-2">
                          <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
                          <div className="h-3 w-16 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse"></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-4 w-20 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse ml-auto"></div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-4 w-16 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse ml-auto"></div>
                    </td>
                    <td className="px-4 py-4 hidden sm:table-cell">
                      <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse ml-auto"></div>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse ml-auto"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
