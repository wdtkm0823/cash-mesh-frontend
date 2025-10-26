'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api/client';

export default function Home() {
  const [healthStatus, setHealthStatus] = useState<string>('確認中...');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // バックエンドのHealth Checkエンドポイントにアクセス
    const checkHealth = async () => {
      try {
        const response = await apiClient.get('/health');
        setHealthStatus(response.data.status);
      } catch (err) {
        setError('バックエンドAPIに接続できません');
        console.error(err);
      }
    };

    checkHealth();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="flex flex-col items-center gap-8 p-8">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
          Cash Mesh
        </h1>

        <div className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-4">
            バックエンドAPI接続状態
          </h2>

          {error ? (
            <p className="text-red-600 dark:text-red-400">{error}</p>
          ) : (
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <p className="text-zinc-600 dark:text-zinc-400">
                ステータス: <span className="font-semibold text-zinc-900 dark:text-zinc-50">{healthStatus}</span>
              </p>
            </div>
          )}
        </div>

        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Phase 0: 環境構築完了
        </p>
      </main>
    </div>
  );
}
