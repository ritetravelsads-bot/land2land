"use client"

import { useEffect, useRef, useState } from "react"
import { Phone, Loader2, CheckCircle2, ShieldCheck, RefreshCw, ArrowRight, PhoneCall } from "lucide-react"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface PhoneVerificationProps {
  phone: string
  onPhoneChange: (phone: string) => void
  /** Called with the signed verification token once the phone is verified. */
  onVerified: (token: string) => void
  /** Called when the verified phone is edited, invalidating a prior token. */
  onUnverified?: () => void
  focused?: boolean
  onFocus?: () => void
  onBlur?: () => void
  required?: boolean
}

type Stage = "input" | "code" | "verified"

export function PhoneVerification({
  phone,
  onPhoneChange,
  onVerified,
  onUnverified,
  focused,
  onFocus,
  onBlur,
  required = true,
}: PhoneVerificationProps) {
  const [stage, setStage] = useState<Stage>("input")
  const [code, setCode] = useState("")
  const [sessionId, setSessionId] = useState("")
  const [sending, setSending] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [error, setError] = useState("")
  const [cooldown, setCooldown] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const isValidPhone = /^[6-9]\d{9}$/.test(phone.replace(/\D/g, ""))

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const startCooldown = (seconds: number) => {
    setCooldown(seconds)
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCooldown((c) => {
        if (c <= 1) {
          if (timerRef.current) clearInterval(timerRef.current)
          return 0
        }
        return c - 1
      })
    }, 1000)
  }

  const handleSend = async () => {
    if (!isValidPhone) {
      setError("Enter a valid 10-digit mobile number starting with 6-9.")
      return
    }
    setError("")
    setSending(true)
    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      })
      const data = await res.json()

      if (res.ok && data.sessionId) {
        setSessionId(data.sessionId)
        setStage("code")
        setCode("")
        startCooldown(60)
        toast.success("Verification call initiated", {
          description: `You will receive a call on +91 ${phone} with your OTP code.`,
        })
      } else {
        setError(data.error || "Could not send code. Please try again.")
      }
    } catch {
      setError("Network error. Please check your connection and try again.")
    } finally {
      setSending(false)
    }
  }

  const handleVerify = async (value?: string) => {
    const otp = (value ?? code).replace(/\D/g, "")
    if (otp.length !== 6) {
      setError("Please enter the complete 6-digit code.")
      return
    }
    setError("")
    setVerifying(true)
    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code: otp, sessionId }),
      })
      const data = await res.json()
      if (res.ok && data.token) {
        setStage("verified")
        onVerified(data.token)
        toast.success("Phone verified successfully", {
          description: "Your number has been verified via call.",
        })
      } else {
        setError(data.error || "Incorrect code. Please try again.")
        setCode("")
      }
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setVerifying(false)
    }
  }

  const handleEditPhone = () => {
    setStage("input")
    setCode("")
    setSessionId("")
    setError("")
    if (timerRef.current) clearInterval(timerRef.current)
    setCooldown(0)
    onUnverified?.()
  }

  return (
    <div className="space-y-2">
      {/* Label */}
      <label className="text-xs font-semibold text-foreground block">
        Phone Number {required && <span className="text-destructive">*</span>}
        {stage === "verified" && (
          <span className="ml-2 inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
            <ShieldCheck className="h-3 w-3" /> Verified
          </span>
        )}
      </label>

      {/* Phone input row */}
      <div className="flex gap-2">
        <div
          className={cn(
            "relative flex-1 rounded-lg transition-all duration-200",
            focused && "ring-2 ring-primary/20"
          )}
        >
          <Phone
            className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors pointer-events-none",
              focused ? "text-primary" : "text-muted-foreground"
            )}
          />
          <input
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "").slice(0, 10)
              onPhoneChange(val)
              if (stage !== "input") handleEditPhone()
            }}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder="10-digit mobile number"
            required={required}
            pattern="[6-9][0-9]{9}"
            readOnly={stage === "verified"}
            className={cn(
              "w-full pl-10 pr-3 py-3 border border-border rounded-lg bg-background text-sm focus:outline-none focus:border-primary transition-colors",
              stage === "verified" && "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800"
            )}
          />
          {stage === "verified" && (
            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500 pointer-events-none" />
          )}
        </div>

        {/* Send / Resend button */}
        {stage !== "verified" && (
          <button
            type="button"
            onClick={handleSend}
            disabled={!isValidPhone || sending || (stage === "input" && false) || (cooldown > 0 && stage === "input")}
            className={cn(
              "px-4 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors shrink-0 min-h-[46px]",
              "bg-primary text-primary-foreground hover:bg-primary/90",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {sending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : stage === "code" && cooldown > 0 ? (
              `Recall in ${cooldown}s`
            ) : stage === "code" ? (
              <><RefreshCw className="h-3 w-3 inline mr-1" />Recall</>
            ) : (
              <><PhoneCall className="h-3 w-3 inline mr-1" />Call Me</>
            )}
          </button>
        )}

        {/* Change button after verified */}
        {stage === "verified" && (
          <button
            type="button"
            onClick={handleEditPhone}
            className="px-3 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground border border-border transition-colors shrink-0 flex items-center gap-1 min-h-[46px]"
          >
            <RefreshCw className="h-3 w-3" /> Change
          </button>
        )}
      </div>

      {/* OTP entry panel — shown when stage is "code" */}
      {stage === "code" && (
        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 space-y-3">
          <div className="flex items-start gap-2">
            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-[10px] font-bold text-primary-foreground">2</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">Enter the 6-digit OTP from your call</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                You will receive a call on <span className="font-semibold text-foreground">+91 {phone}</span>. Listen carefully and enter the code below.
              </p>
            </div>
          </div>

          {/* OTP slots */}
          <InputOTP
            maxLength={6}
            value={code}
            onChange={(val) => {
              setCode(val)
              setError("")
            }}
            disabled={verifying}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          {/* Manual verify button — clearly visible */}
          <button
            type="button"
            onClick={() => handleVerify()}
            disabled={code.length !== 6 || verifying}
            className={cn(
              "w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-colors",
              "bg-primary text-primary-foreground hover:bg-primary/90",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {verifying ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Verifying...</>
            ) : (
              <><ShieldCheck className="h-4 w-4" /> Verify OTP <ArrowRight className="h-4 w-4" /></>
            )}
          </button>
        </div>
      )}

      {/* Inline error */}
      {error && (
        <p className="text-xs text-destructive flex items-center gap-1.5">
          <span className="w-1 h-1 bg-destructive rounded-full shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}
