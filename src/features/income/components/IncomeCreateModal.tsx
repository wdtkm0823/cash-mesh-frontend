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

interface IncomeCreateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function IncomeCreateModal({
  open,
  onOpenChange,
  onSuccess,
}: IncomeCreateModalProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const description = formData.get('description');

    const requestData: CreateTransactionRequest = {
      amount: Number(formData.get('amount')),
      transaction_type: 'income',
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
          + 収入を追加
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>収入を登録</DialogTitle>
            <DialogDescription>
              収入の詳細を入力してください
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* 金額入力 */}
            <div className="space-y-2">
              <Label htmlFor="amount">金額</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                placeholder="50000"
                min="0"
                step="0.01"
                required
              />
            </div>

            {/* 日付入力 */}
            <div className="space-y-2">
              <Label htmlFor="date">日付</Label>
              <Input
                id="date"
                name="date"
                type="date"
                required
              />
            </div>

            {/* メモ入力 */}
            <div className="space-y-2">
              <Label htmlFor="description">メモ（任意）</Label>
              <Input
                id="description"
                name="description"
                type="text"
                placeholder="例: 10月分の給料"
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
