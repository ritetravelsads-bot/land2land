"use client"

import type React from "react"
import { Download, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AgreementLayoutProps {
  title: string
  effectiveDate: string
  lastUpdated: string
  children: React.ReactNode
  documentId: string
}

export function AgreementLayout({
  title,
  effectiveDate,
  lastUpdated,
  children,
  documentId,
}: AgreementLayoutProps) {
  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    const element = document.getElementById(documentId)
    if (element) {
      const printWindow = window.open("", "", "width=900,height=600")
      if (printWindow) {
        printWindow.document.write(element.innerHTML)
        printWindow.document.close()
        printWindow.print()
      }
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="flex items-center gap-2"
            >
              <Printer size={16} />
              <span className="hidden sm:inline">Print</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="flex items-center gap-2"
            >
              <Download size={16} />
              <span className="hidden sm:inline">Download</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Meta Info */}
        <div className="mb-8 pb-8 border-b border-border">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Effective Date</p>
              <p className="font-semibold text-foreground">{effectiveDate}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Last Updated</p>
              <p className="font-semibold text-foreground">{lastUpdated}</p>
            </div>
          </div>
        </div>

        {/* Document Content */}
        <div
          id={documentId}
          className="prose prose-sm max-w-none dark:prose-invert
            prose-headings:text-foreground prose-headings:font-bold
            prose-p:text-foreground prose-p:leading-relaxed
            prose-li:text-foreground
            prose-strong:text-foreground
            prose-em:text-foreground
          "
        >
          {children}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-border text-center text-xs text-muted-foreground">
          <p>
            This agreement is made under the provisions of the Indian Contract Act, 1872, RERA 2016, Transfer
            of Property Act, 1882, and Income Tax Act, 1961.
          </p>
          <p className="mt-4">Land2Land © 2024. All rights reserved.</p>
        </div>
      </main>
    </div>
  )
}
