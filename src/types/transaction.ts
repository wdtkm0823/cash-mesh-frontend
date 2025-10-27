export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: number;
  amount: number;
  transaction_type: TransactionType;
  transaction_date: string;
  description: string | null;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface CreateTransactionRequest {
  amount: number;
  transaction_type: TransactionType;
  transaction_date: string;
  description: string | null;
}

export interface UpdateTransactionRequest {
  amount: number;
  transaction_type: TransactionType;
  transaction_date: string;
  description: string | null;
}
