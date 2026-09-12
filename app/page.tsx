'use client'

import { useCallback } from 'react'
import { DONATION_WALLET_ADDRESS } from '@/constants'
import { DonationCard } from '@/components/DonationCard'
import { ErrorMessage } from '@/components/ErrorMessage'
import { FileInfoCard } from '@/components/FileInfoCard'
import { Footer } from '@/components/Footer'
import { FormatSettingsCard } from '@/components/FormatSettingsCard'
import { Header } from '@/components/Header'
import { InfoSection } from '@/components/InfoSection'
import { PreviewCard } from '@/components/PreviewCard'
import { ResultCard } from '@/components/ResultCard'
import { UploadZone } from '@/components/UploadZone'
import { useClipboard } from '@/hooks/useClipboard'
import { useSvgConverter } from '@/hooks/useSvgConverter'

function HomePage() {
  const converter = useSvgConverter()
  const resultClipboard = useClipboard()
  const walletClipboard = useClipboard()

  const handleCopyResult = useCallback(async () => {
    const ok = await resultClipboard.copy(converter.base64Result)
    if (!ok) converter.setError('Error copying to clipboard')
  }, [resultClipboard.copy, converter.base64Result, converter.setError])

  const handleCopyWallet = useCallback(async () => {
    const ok = await walletClipboard.copy(DONATION_WALLET_ADDRESS)
    if (!ok) converter.setError('Error copying wallet address')
  }, [walletClipboard.copy, converter.setError])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-8">
        <Header />

        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {/* Left Column - Upload & Preview */}
          <div className="flex flex-col space-y-6">
            <UploadZone onFileSelect={converter.handleFileSelect} />
            <ErrorMessage message={converter.error} />
            {converter.base64Url && (
              <PreviewCard
                src={converter.base64Url}
                scale={converter.previewScale}
                onZoomChange={converter.setPreviewScale}
              />
            )}
            {converter.svgFile && (
              <FileInfoCard
                file={converter.svgFile}
                onReset={converter.resetConverter}
              />
            )}
          </div>

          {/* Right Column - Result & Settings */}
          <div className="flex flex-col space-y-6">
            <FormatSettingsCard
              minify={converter.minifySvgMarkup}
              onMinifyChange={converter.updateSvgMarkupMinify}
            />
            {converter.base64Result && (
              <ResultCard
                result={converter.base64Result}
                outputFormat={converter.outputFormat}
                copied={resultClipboard.copied}
                onFormatChange={converter.handleFormatChange}
                onCopy={handleCopyResult}
                onDownload={converter.downloadResult}
              />
            )}
            <InfoSection />
          </div>
        </div>

        {/* Donation Section - Full Width */}
        <DonationCard
          walletCopied={walletClipboard.copied}
          onCopyWallet={handleCopyWallet}
        />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}

export default HomePage
