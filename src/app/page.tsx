'use client';

import { useState } from 'react';
import { apiClient } from '@/lib/api/client';
import { useIncomes } from '@/hooks/use-incomes';
import { Transaction, CreateTransactionRequest, UpdateTransactionRequest } from '@/types/transaction';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const { incomes, refetch } = useIncomes();

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setEditOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await apiClient.delete(`/api/v1/transactions/${id}/`);
      refetch();
    } catch (error) {
      console.error('削除失敗:', error);
    }
  };

  const handleUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editingTransaction) return;

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
        `/api/v1/transactions/${editingTransaction.id}/`,
        requestData
      );
      setEditOpen(false);
      setEditingTransaction(null);
      refetch();
    } catch (error) {
      console.error('更新失敗:', error);
    }
  };

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
      setOpen(false);
      refetch();
    } catch (error) {
      console.error('登録失敗:', error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* ヘッダー */}
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
            Cash Mesh
          </h1>

          {/* 収入登録モーダル */}
          <Dialog open={open} onOpenChange={setOpen}>
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

          {/* 編集モーダル */}
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogContent>
              <form onSubmit={handleUpdateSubmit}>
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
                      defaultValue={editingTransaction?.amount}
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
                      defaultValue={editingTransaction?.transaction_date}
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
                      defaultValue={editingTransaction?.description || ''}
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
        </div>

        {/* 収入一覧 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            収入一覧
          </h2>

          {incomes.length === 0 ? (
            <p className="text-zinc-500 dark:text-zinc-400">
              まだ収入が登録されていません
            </p>
          ) : (
            <div className="grid gap-4">
              {incomes.map((transaction) => (
                <Card key={transaction.id}>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>¥{transaction.amount.toLocaleString()}</CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(transaction)}
                      >
                        編集
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(transaction.id)}
                      >
                        削除
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      日付: {transaction.transaction_date}
                    </p>
                    {transaction.description && (
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                        メモ: {transaction.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
