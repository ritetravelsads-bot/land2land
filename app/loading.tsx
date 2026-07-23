export default function Loading() {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      {/* Hero banner */}
      <div className="h-[55vh] bg-muted" />

      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="h-7 bg-muted rounded w-48 mb-2" />
        <div className="h-4 bg-muted rounded w-72 mb-8" />

        {/* Property cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
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
