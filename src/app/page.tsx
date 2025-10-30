'use client';

import { IncomeList } from '@/features/income/components/IncomeList';
import { ExpenseList } from '@/features/expense/components/ExpenseList';

export default function Home() {

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* ヘッダー */}
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
          Cash Mesh
        </h1>

        {/* 収入一覧 */}
        <IncomeList />

        {/* 支出一覧 */}
        <ExpenseList />
      </div>
    </div>
  );
}
