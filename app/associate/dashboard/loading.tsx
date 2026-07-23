export default function AssociateDashboardLoading() {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Greeting */}
        <div className="space-y-2 mb-8">
          <div className="h-6 bg-muted rounded w-52" />
          <div className="h-4 bg-muted rounded w-36" />
        </div>

        {/* Stats cards row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-4 space-y-2">
              <div className="h-6 bg-muted rounded w-10" />
              <div className="h-3 bg-muted rounded w-20" />
            </div>
          ))}
        </div>

        {/* Two column layout: listings + activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Listings */}
          <div>
            <div className="h-5 bg-muted rounded w-36 mb-4" />
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-3 flex gap-3">
                  <div className="w-16 h-16 bg-muted rounded-lg shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                    <div className="h-3 bg-muted rounded w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent leads */}
          <div>
            <div className="h-5 bg-muted rounded w-28 mb-4" />
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted shrink-0" />
                  <div className="flex-1 space-y-1">
                    <div className="h-4 bg-muted rounded w-2/3" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                  <div className="h-6 bg-muted rounded-full w-16" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
