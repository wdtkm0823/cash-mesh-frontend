import axios from 'axios';

// 環境変数からAPIのベースURLを取得
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Axiosインスタンスを作成
export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// レスポンスのエラーハンドリング
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // TODO: エラーハンドリングの改善
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
