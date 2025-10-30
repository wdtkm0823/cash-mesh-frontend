'use client';

import { apiClient } from '@/lib/api/client';
import { CreateTransactionRequest } from '@/types/transaction';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ExpenseCreateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function ExpenseCreateModal({
  open,
  onOpenChange,
  onSuccess,
}: ExpenseCreateModalProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const description = formData.get('description');

    const requestData: CreateTransactionRequest = {
      amount: Number(formData.get('amount')),
      transaction_type: 'expense',
      transaction_date: formData.get('date') as string,
      description: description ? String(description) : null,
    };

    try {
      await apiClient.post('/api/v1/transactions/', requestData);
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      console.error('登録失敗:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="default" size="lg">
          + 支出を追加
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>支出を登録</DialogTitle>
            <DialogDescription>
              支出の詳細を入力してください
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* 金額入力 */}
            <div className="space-y-2">
              <Label htmlFor="expense-amount">金額</Label>
              <Input
                id="expense-amount"
                name="amount"
                type="number"
                placeholder="3000"
                min="0"
                step="0.01"
                required
              />
            </div>

            {/* 日付入力 */}
            <div className="space-y-2">
              <Label htmlFor="expense-date">日付</Label>
              <Input
                id="expense-date"
                name="date"
                type="date"
                required
              />
            </div>

            {/* メモ入力 */}
            <div className="space-y-2">
              <Label htmlFor="expense-description">メモ（任意）</Label>
              <Input
                id="expense-description"
                name="description"
                type="text"
                placeholder="例: ランチ代"
                maxLength={255}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" variant="default">
              登録
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
