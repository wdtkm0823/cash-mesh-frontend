import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api/client';
import { Transaction } from '@/types/transaction';

export const useIncomes = () => {
  const [incomes, setIncomes] = useState<Transaction[]>([]);

  const fetchIncomes = async () => {
    try {
      const response = await apiClient.get('/api/v1/transactions/', {
        params: { transaction_type: 'income' },
      });
      setIncomes(response.data);
    } catch (err) {
      console.error('取得失敗:', err);
    }
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  return {
    incomes,
    refetch: fetchIncomes,
  };
};
