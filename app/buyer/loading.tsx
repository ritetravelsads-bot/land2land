export default function BuyerDashboardLoading() {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Greeting */}
        <div className="space-y-2 mb-8">
          <div className="h-6 bg-muted rounded w-48" />
          <div className="h-4 bg-muted rounded w-32" />
        </div>

        {/* Stats cards row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-4 space-y-2">
              <div className="w-8 h-8 bg-muted rounded-lg" />
              <div className="h-6 bg-muted rounded w-10" />
              <div className="h-3 bg-muted rounded w-24" />
            </div>
          ))}
        </div>

        {/* Saved properties section */}
        <div className="h-5 bg-muted rounded w-40 mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="h-40 bg-muted" />
              <div className="p-3 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
                <div className="h-4 bg-muted rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
