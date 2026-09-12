'use client'

import { DONATION_WALLET_ADDRESS } from '../constants'
import { IconCopy } from './icons'

interface DonationCardProps {
  walletCopied: boolean
  onCopyWallet: () => void
}

export function DonationCard({ walletCopied, onCopyWallet }: DonationCardProps) {
  return (
    <div className="mt-8 max-w-7xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center border border-purple-100 dark:border-purple-900/40 relative overflow-hidden">
        <div
          className="absolute -top-10 -right-10 w-40 h-40 bg-purple-100 dark:bg-purple-900/40 rounded-full blur-3xl"
          aria-hidden="true"
        />
        <div className="relative">
          <div className="text-4xl mb-3 animate-pulse">
            <span role="img" aria-label="heart">💜</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            Enjoying this tool?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm mb-4">
            This SVG converter is free and will always stay free. If it saved you
            some time, consider buying me a coffee — every little bit keeps
            this project running and improving. ☕
          </p>
          <p className="text-gray-500 dark:text-gray-400 text-xs mb-2">
            USDT (TRC-20) wallet address
          </p>
          <div className="flex items-center justify-center gap-2 flex-wrap mb-4">
            <code className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-xs text-gray-700 dark:text-gray-300 font-mono select-all break-all">
              {DONATION_WALLET_ADDRESS}
            </code>
            <button
              onClick={onCopyWallet}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-2 text-xs cursor-pointer ${
                walletCopied
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}
            >
              <IconCopy />
              {walletCopied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-xs">
            Thank you with all my heart{' '}
            <span className="text-red-500" role="img" aria-label="heart">❤️</span>
          </p>
        </div>
      </div>
    </div>
  )
}