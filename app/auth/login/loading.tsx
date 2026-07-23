export default function LoginLoading() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm animate-pulse">
        {/* Header */}
        <div className="space-y-2 text-center mb-6">
          <div className="h-7 bg-muted rounded w-40 mx-auto" />
          <div className="h-4 bg-muted rounded w-56 mx-auto" />
        </div>

        {/* Form fields */}
        <div className="space-y-3">
          {/* Email */}
          <div className="space-y-1">
            <div className="h-3 bg-muted rounded w-10" />
            <div className="h-8 bg-muted rounded-md w-full" />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <div className="h-3 bg-muted rounded w-16" />
            <div className="h-8 bg-muted rounded-md w-full" />
          </div>

          {/* Forgot password link */}
          <div className="flex justify-end">
            <div className="h-3 bg-muted rounded w-28" />
          </div>

          {/* Submit button */}
          <div className="h-8 bg-muted rounded-md w-full" />

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-muted" />
            <div className="h-3 bg-muted rounded w-20" />
            <div className="flex-1 h-px bg-muted" />
          </div>

          {/* Google button */}
          <div className="h-9 bg-muted rounded-md w-full" />
        </div>

        {/* Footer link */}
        <div className="flex justify-center gap-1 mt-5">
          <div className="h-3 bg-muted rounded w-32" />
          <div className="h-3 bg-muted rounded w-16" />
        </div>
      </div>
    </main>
  )
}
