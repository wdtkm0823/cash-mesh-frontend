'use client';

import { useState } from 'react';
import { apiClient } from '@/lib/api/client';
import { Transaction } from '@/types/transaction';
import { useIncomes } from '../hooks/use-incomes';
import { IncomeCreateModal } from './IncomeCreateModal';
import { IncomeEditModal } from './IncomeEditModal';
import { IncomeCard } from './IncomeCard';

export function IncomeList() {
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

  return (
    <>
      {/* ヘッダーとボタン */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          収入一覧
        </h2>
        <IncomeCreateModal
          open={open}
          onOpenChange={setOpen}
          onSuccess={refetch}
        />
      </div>

      {/* 一覧表示 */}
      <div className="space-y-4">
        {incomes.length === 0 ? (
          <p className="text-zinc-500 dark:text-zinc-400">
            まだ収入が登録されていません
          </p>
        ) : (
          <div className="grid gap-4">
            {incomes.map((transaction) => (
              <IncomeCard
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
      <IncomeEditModal
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
