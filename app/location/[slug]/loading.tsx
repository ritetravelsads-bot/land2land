export default function LocationDetailLoading() {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      {/* Hero banner */}
      <div className="h-56 bg-muted" />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb + title */}
        <div className="space-y-2 mb-6">
          <div className="h-4 bg-muted rounded w-40" />
          <div className="h-7 bg-muted rounded w-56" />
          <div className="h-4 bg-muted rounded w-72" />
        </div>

        {/* Stats chips */}
        <div className="flex flex-wrap gap-3 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-7 bg-muted rounded-full w-24" />
          ))}
        </div>

        {/* About section */}
        <div className="mb-8 space-y-2">
          <div className="h-5 bg-muted rounded w-20 mb-3" />
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-5/6" />
          <div className="h-4 bg-muted rounded w-4/6" />
        </div>

        {/* Properties heading */}
        <div className="h-5 bg-muted rounded w-48 mb-4" />

        {/* Properties grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="h-44 bg-muted" />
              <div className="p-3 space-y-2">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
                <div className="flex gap-2">
                  <div className="h-5 bg-muted rounded w-12" />
                  <div className="h-5 bg-muted rounded w-16" />
                </div>
                <div className="pt-2 border-t border-border">
                  <div className="h-4 bg-muted rounded w-1/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
