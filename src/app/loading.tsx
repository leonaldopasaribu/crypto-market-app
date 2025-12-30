export default function Loading() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="mb-2 h-10 w-64 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800"></div>
          <div className="h-4 w-96 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"></div>
        </div>

        {/* Market Summary Skeleton */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="mb-3 h-3 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"></div>
              <div className="h-8 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"></div>
            </div>
          ))}
        </div>

        {/* Table Skeleton */}
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <th className="px-4 py-3 text-left">
                    <div className="h-3 w-4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"></div>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <div className="h-3 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"></div>
                  </th>
                  <th className="px-4 py-3 text-right">
                    <div className="ml-auto h-3 w-12 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"></div>
                  </th>
                  <th className="px-4 py-3 text-right">
                    <div className="ml-auto h-3 w-12 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"></div>
                  </th>
                  <th className="hidden px-4 py-3 text-right sm:table-cell">
                    <div className="ml-auto h-3 w-20 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"></div>
                  </th>
                  <th className="hidden px-4 py-3 text-right lg:table-cell">
                    <div className="ml-auto h-3 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"></div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {[...Array(10)].map((_, i) => (
                  <tr key={i}>
                    <td className="px-4 py-4">
                      <div className="h-4 w-6 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"></div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-800"></div>
                        <div className="flex flex-col gap-2">
                          <div className="h-4 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"></div>
                          <div className="h-3 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="ml-auto h-4 w-20 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"></div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="ml-auto h-4 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"></div>
                    </td>
                    <td className="hidden px-4 py-4 sm:table-cell">
                      <div className="ml-auto h-4 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"></div>
                    </td>
                    <td className="hidden px-4 py-4 lg:table-cell">
                      <div className="ml-auto h-4 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800"></div>
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
