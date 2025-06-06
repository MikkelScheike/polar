import { useTransactionsSummary } from '@/hooks/queries'
import { Skeleton } from '@mui/material'
import { schemas } from '@polar-sh/client'
import Button from '@polar-sh/ui/components/atoms/Button'
import { ShadowBoxOnMd } from '@polar-sh/ui/components/atoms/ShadowBox'
import { formatCurrencyAndAmount } from '@polar-sh/ui/lib/money'
import React, { useCallback, useState } from 'react'
import WithdrawModal from './WithdrawModal'

interface AccountBalanceProps {
  account: schemas['Account']
  onWithdrawSuccess?: (payoutId: string) => void
}

const AccountBalance: React.FC<AccountBalanceProps> = ({
  account,
  onWithdrawSuccess: _onWithdrawSuccess,
}) => {
  const {
    data: summary,
    refetch: refetchBalance,
    isLoading,
  } = useTransactionsSummary(account.id)
  const canWithdraw =
    account.status === 'active' &&
    summary?.balance?.amount &&
    summary.balance.amount > 1000

  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const onWithdraw = useCallback(() => {
    setShowConfirmModal(true)
  }, [])

  const onWithdrawSuccess = useCallback(
    (payoutId: string) => {
      refetchBalance()
      setShowConfirmModal(false)
      if (_onWithdrawSuccess) {
        _onWithdrawSuccess(payoutId)
      }
    },
    [_onWithdrawSuccess, refetchBalance],
  )

  return (
    <>
      <ShadowBoxOnMd>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h2 className="text-lg font-medium capitalize">Balance</h2>
            <div className="text-4xl">
              {isLoading ? (
                <Skeleton />
              ) : (
                <>
                  {formatCurrencyAndAmount(
                    summary?.balance.amount ?? 0,
                    summary?.balance.currency,
                  )}
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button onClick={onWithdraw} disabled={!canWithdraw}>
              Withdraw
            </Button>
            <p className="dark:text-polar-500 text-xs text-gray-500">
              Minimum {formatCurrencyAndAmount(1000, 'usd', 0)}
            </p>
          </div>
        </div>
      </ShadowBoxOnMd>
      <WithdrawModal
        account={account}
        isShown={showConfirmModal}
        hide={() => setShowConfirmModal(false)}
        onSuccess={onWithdrawSuccess}
      />
    </>
  )
}

export default AccountBalance
