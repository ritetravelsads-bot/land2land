export default function RegisterLoading() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm animate-pulse">
        {/* Header */}
        <div className="space-y-2 text-center mb-6">
          <div className="h-7 bg-muted rounded w-36 mx-auto" />
          <div className="h-4 bg-muted rounded w-52 mx-auto" />
        </div>

        {/* Account type toggle */}
        <div className="h-10 bg-muted rounded-lg w-full mb-4" />

        {/* Form fields */}
        <div className="space-y-3">
          {/* Name */}
          <div className="space-y-1">
            <div className="h-3 bg-muted rounded w-20" />
            <div className="h-8 bg-muted rounded-md w-full" />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <div className="h-3 bg-muted rounded w-10" />
            <div className="h-8 bg-muted rounded-md w-full" />
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <div className="h-3 bg-muted rounded w-24" />
            <div className="h-8 bg-muted rounded-md w-full" />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <div className="h-3 bg-muted rounded w-16" />
            <div className="h-8 bg-muted rounded-md w-full" />
          </div>

          {/* Submit button */}
          <div className="h-8 bg-muted rounded-md w-full" />

          {/* Divider */}
          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-muted" />
            <div className="h-3 bg-muted rounded w-20" />
            <div className="flex-1 h-px bg-muted" />
          </div>

          {/* Google button */}
          <div className="h-9 bg-muted rounded-md w-full" />
        </div>

        {/* Footer link */}
        <div className="flex justify-center gap-1 mt-5">
          <div className="h-3 bg-muted rounded w-36" />
          <div className="h-3 bg-muted rounded w-12" />
        </div>
      </div>
    </main>
  )
}
