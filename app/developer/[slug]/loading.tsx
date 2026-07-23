export default function DeveloperDetailLoading() {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      {/* Cover + avatar hero */}
      <div className="relative h-48 bg-muted">
        <div className="absolute -bottom-8 left-4 w-20 h-20 rounded-full border-4 border-background bg-muted/60" />
      </div>

      <div className="max-w-5xl mx-auto px-4 pt-12 pb-8">
        {/* Name / tagline */}
        <div className="space-y-2 mb-6">
          <div className="h-6 bg-muted rounded w-48" />
          <div className="h-4 bg-muted rounded w-32" />
        </div>

        {/* Stats row */}
        <div className="flex gap-6 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-1">
              <div className="h-5 bg-muted rounded w-10" />
              <div className="h-3 bg-muted rounded w-16" />
            </div>
          ))}
        </div>

        {/* About section */}
        <div className="mb-8 space-y-2">
          <div className="h-5 bg-muted rounded w-24 mb-3" />
          <div className="h-4 bg-muted rounded w-full" />
          <div className="h-4 bg-muted rounded w-5/6" />
          <div className="h-4 bg-muted rounded w-4/6" />
        </div>

        {/* Properties heading */}
        <div className="h-5 bg-muted rounded w-40 mb-4" />

        {/* Properties grid */}
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
