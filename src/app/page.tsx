'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api/client';
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
  const [transactions, setTransactions] = useState([]);

  // 収入データを取得
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await apiClient.get('/api/v1/transactions/', {
          params: { transaction_type: 'income' },
        });
        console.log('✅ 取得成功:', response.data);
        setTransactions(response.data);
      } catch (error) {
        console.error('❌ 取得失敗:', error);
      }
    };

    fetchTransactions();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // APIリクエスト用にデータを整形
    const requestData = {
      amount: Number(formData.get('amount')),
      transaction_type: 'income' as const,
      transaction_date: formData.get('date') as string,
      description: formData.get('description') as string || null,
    };

    try {
      const response = await apiClient.post('/api/v1/transactions/', requestData);
      console.log('✅ 登録成功:', response.data);
      setOpen(false);

      // データを再取得
      const listResponse = await apiClient.get('/api/v1/transactions/', {
        params: { transaction_type: 'income' },
      });
      setTransactions(listResponse.data);
    } catch (error) {
      console.error('❌ 登録失敗:', error);
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
        </div>

        {/* 収入一覧 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            収入一覧
          </h2>

          {transactions.length === 0 ? (
            <p className="text-zinc-500 dark:text-zinc-400">
              まだ収入が登録されていません
            </p>
          ) : (
            <div className="grid gap-4">
              {transactions.map((transaction: any) => (
                <Card key={transaction.id}>
                  <CardHeader>
                    <CardTitle>¥{transaction.amount.toLocaleString()}</CardTitle>
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
