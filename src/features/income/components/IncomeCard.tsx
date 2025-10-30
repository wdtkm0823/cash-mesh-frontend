'use client';

import { Transaction } from '@/types/transaction';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface IncomeCardProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: number) => void;
}

export function IncomeCard({ transaction, onEdit, onDelete }: IncomeCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>¥{transaction.amount.toLocaleString()}</CardTitle>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(transaction)}
          >
            編集
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(transaction.id)}
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
  );
}
