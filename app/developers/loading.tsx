export default function DevelopersLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero banner */}
      <div className="h-48 bg-muted animate-pulse" />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page heading */}
        <div className="text-center mb-8 space-y-2">
          <div className="h-7 bg-muted rounded w-48 mx-auto animate-pulse" />
          <div className="h-4 bg-muted rounded w-64 mx-auto animate-pulse" />
        </div>

        {/* Developer cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-card border border-border rounded-xl overflow-hidden animate-pulse">
              {/* Cover image */}
              <div className="h-32 bg-muted" />
              <div className="p-4 space-y-3">
                {/* Avatar + name row */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-muted shrink-0" />
                  <div className="space-y-1 flex-1">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                </div>
                {/* Stats row */}
                <div className="flex gap-4">
                  <div className="h-3 bg-muted rounded w-16" />
                  <div className="h-3 bg-muted rounded w-20" />
                </div>
                {/* CTA */}
                <div className="h-8 bg-muted rounded-lg w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
