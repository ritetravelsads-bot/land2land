import {
  Clock,
  Search,
  FileWarning,
  Upload,
  Loader2,
  CheckCircle2,
  XCircle,
} from "lucide-react"
import { RERA_STATUS_LABELS, type ReraRequestStatus } from "@/lib/models"

export const RERA_STATUS_STYLES: Record<
  ReraRequestStatus,
  { cls: string; Icon: typeof Clock }
> = {
  submitted: { cls: "bg-blue-100 text-blue-700", Icon: Clock },
  under_review: { cls: "bg-amber-100 text-amber-700", Icon: Search },
  documents_requested: { cls: "bg-orange-100 text-orange-700", Icon: FileWarning },
  documents_submitted: { cls: "bg-indigo-100 text-indigo-700", Icon: Upload },
  processing: { cls: "bg-purple-100 text-purple-700", Icon: Loader2 },
  approved: { cls: "bg-green-100 text-green-700", Icon: CheckCircle2 },
  rejected: { cls: "bg-red-100 text-red-700", Icon: XCircle },
}

export default function ReraStatusBadge({
  status,
  className = "",
}: {
  status: ReraRequestStatus
  className?: string
}) {
  const meta = RERA_STATUS_STYLES[status] || RERA_STATUS_STYLES.submitted
  const Icon = meta.Icon
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${meta.cls} ${className}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {RERA_STATUS_LABELS[status] || status}
    </span>
  )
}
