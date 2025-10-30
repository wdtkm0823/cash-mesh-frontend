'use client';

import { apiClient } from '@/lib/api/client';
import { Transaction, UpdateTransactionRequest } from '@/types/transaction';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface IncomeEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: Transaction | null;
  onSuccess: () => void;
}

export function IncomeEditModal({
  open,
  onOpenChange,
  transaction,
  onSuccess,
}: IncomeEditModalProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!transaction) return;

    const formData = new FormData(e.currentTarget);
    const description = formData.get('description');

    const requestData: UpdateTransactionRequest = {
      amount: Number(formData.get('amount')),
      transaction_type: 'income',
      transaction_date: formData.get('date') as string,
      description: description ? String(description) : null,
    };

    try {
      await apiClient.put(
        `/api/v1/transactions/${transaction.id}/`,
        requestData
      );
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      console.error('更新失敗:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>収入を編集</DialogTitle>
            <DialogDescription>
              収入の詳細を編集してください
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* 金額入力 */}
            <div className="space-y-2">
              <Label htmlFor="edit-amount">金額</Label>
              <Input
                id="edit-amount"
                name="amount"
                type="number"
                placeholder="50000"
                min="0"
                step="0.01"
                defaultValue={transaction?.amount}
                required
              />
            </div>

            {/* 日付入力 */}
            <div className="space-y-2">
              <Label htmlFor="edit-date">日付</Label>
              <Input
                id="edit-date"
                name="date"
                type="date"
                defaultValue={transaction?.transaction_date}
                required
              />
            </div>

            {/* メモ入力 */}
            <div className="space-y-2">
              <Label htmlFor="edit-description">メモ（任意）</Label>
              <Input
                id="edit-description"
                name="description"
                type="text"
                placeholder="例: 10月分の給料"
                maxLength={255}
                defaultValue={transaction?.description || ''}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" variant="default">
              更新
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
