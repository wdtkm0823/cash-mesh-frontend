'use client';

import { useState } from 'react';
import { apiClient } from '@/lib/api/client';
import { Transaction } from '@/types/transaction';
import { useExpenses } from '../hooks/use-expenses';
import { ExpenseCreateModal } from './ExpenseCreateModal';
import { ExpenseEditModal } from './ExpenseEditModal';
import { ExpenseCard } from './ExpenseCard';

export function ExpenseList() {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const { expenses, refetch } = useExpenses();

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

  return (
    <>
      {/* ヘッダーとボタン */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          支出一覧
        </h2>
        <ExpenseCreateModal
          open={open}
          onOpenChange={setOpen}
          onSuccess={refetch}
        />
      </div>

      {/* 一覧表示 */}
      <div className="space-y-4">
        {expenses.length === 0 ? (
          <p className="text-zinc-500 dark:text-zinc-400">
            まだ支出が登録されていません
          </p>
        ) : (
          <div className="grid gap-4">
            {expenses.map((transaction) => (
              <ExpenseCard
                key={transaction.id}
                transaction={transaction}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {/* 編集モーダル */}
      <ExpenseEditModal
        open={editOpen}
        onOpenChange={setEditOpen}
        transaction={editingTransaction}
        onSuccess={() => {
          refetch();
          setEditingTransaction(null);
        }}
      />
    </>
  );
}
