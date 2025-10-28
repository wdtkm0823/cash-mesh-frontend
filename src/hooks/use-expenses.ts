import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api/client';
import { Transaction } from '@/types/transaction';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Transaction[]>([]);

  const fetchExpenses = async () => {
    try {
      const response = await apiClient.get('/api/v1/transactions/', {
        params: { transaction_type: 'expense' },
      });
      setExpenses(response.data);
    } catch (err) {
      console.error('取得失敗:', err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return {
    expenses,
    refetch: fetchExpenses,
  };
};
