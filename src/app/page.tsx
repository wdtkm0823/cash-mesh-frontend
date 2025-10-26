'use client';

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

export default function Home() {

  return (
    <div className="flex min-h-screen items-center justify-center">
          {/* 収入登録モーダル */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" size="lg">
                + 収入を追加
              </Button>
            </DialogTrigger>
            <DialogContent>
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
                    type="number"
                    placeholder="50000"
                    min="0"
                    step="0.01"
                  />
                </div>

                {/* 日付入力 */}
                <div className="space-y-2">
                  <Label htmlFor="date">日付</Label>
                  <Input
                    id="date"
                    type="date"
                  />
                </div>

                {/* メモ入力 */}
                <div className="space-y-2">
                  <Label htmlFor="description">メモ（任意）</Label>
                  <Input
                    id="description"
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
            </DialogContent>
          </Dialog>
      </div>
  );
}
