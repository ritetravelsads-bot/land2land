"use client"

import { useEffect, useRef, useState } from "react"
import { Phone, Loader2, CheckCircle2, ShieldCheck, RefreshCw } from "lucide-react"
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
      setError("Enter a valid 10-digit mobile number.")
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
      if (res.ok) {
        setStage("code")
        setCode("")
        startCooldown(60)
        toast.success("Verification code sent", {
          description: `We sent a 6-digit code to ${phone}.`,
        })
        if (data.devCode) {
          toast.info("Dev mode", { description: `Your code is ${data.devCode}` })
        }
      } else {
        setError(data.error || "Could not send code.")
        if (data.cooldownMs) startCooldown(Math.ceil(data.cooldownMs / 1000))
      }
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setSending(false)
    }
  }

  const handleVerify = async (value: string) => {
    setError("")
    setVerifying(true)
    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code: value }),
      })
      const data = await res.json()
      if (res.ok && data.token) {
        setStage("verified")
        onVerified(data.token)
        toast.success("Phone verified", {
          description: "Your number has been verified successfully.",
        })
      } else {
        setError(data.error || "Incorrect code.")
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
    setError("")
    onUnverified?.()
  }

  return (
    <div>
      <label className="text-xs font-semibold text-foreground block mb-1.5">
        Phone Number {required && <span className="text-destructive">*</span>}
        {stage === "verified" && (
          <span className="ml-2 inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
            <ShieldCheck className="h-3 w-3" /> Verified
          </span>
        )}
      </label>

      <div className="flex gap-2">
        <div
          className={cn(
            "relative flex-1 rounded-lg transition-all duration-200",
            focused && "ring-2 ring-primary/20"
          )}
        >
          <Phone
            className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors",
              focused ? "text-primary" : "text-muted-foreground"
            )}
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "").slice(0, 10)
              onPhoneChange(val)
              if (stage === "verified") handleEditPhone()
            }}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder="10-digit number"
            required={required}
            pattern="[6-9][0-9]{9}"
            readOnly={stage === "verified"}
            className={cn(
              "w-full pl-10 pr-3 py-3 border border-border rounded-lg bg-background text-sm focus:outline-none focus:border-primary transition-colors",
              stage === "verified" && "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800"
            )}
          />
          {stage === "verified" && (
            <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500" />
          )}
        </div>

        {stage !== "verified" && (
          <button
            type="button"
            onClick={handleSend}
            disabled={!isValidPhone || sending || cooldown > 0}
            className={cn(
              "px-4 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors shrink-0",
              "bg-primary text-primary-foreground hover:bg-primary/90",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {sending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : cooldown > 0 && stage === "code" ? (
              `Resend ${cooldown}s`
            ) : stage === "code" ? (
              "Resend"
            ) : (
              "Verify"
            )}
          </button>
        )}

        {stage === "verified" && (
          <button
            type="button"
            onClick={handleEditPhone}
            className="px-3 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground border border-border transition-colors shrink-0 flex items-center gap-1"
          >
            <RefreshCw className="h-3 w-3" /> Change
          </button>
        )}
      </div>

      {stage === "code" && (
        <div className="mt-3 p-3 bg-primary/5 border border-primary/15 rounded-lg">
          <p className="text-xs text-muted-foreground mb-2">
            Enter the 6-digit code sent to{" "}
            <span className="font-semibold text-foreground">{phone}</span>
          </p>
          <InputOTP
            maxLength={6}
            value={code}
            onChange={(val) => {
              setCode(val)
              setError("")
              if (val.length === 6) handleVerify(val)
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
          {verifying && (
            <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
              <Loader2 className="h-3 w-3 animate-spin" /> Verifying...
            </p>
          )}
        </div>
      )}

      {error && (
        <p className="mt-1.5 text-xs text-destructive flex items-center gap-1">
          <span className="w-1 h-1 bg-destructive rounded-full" />
          {error}
        </p>
      )}
    </div>
  )
}
