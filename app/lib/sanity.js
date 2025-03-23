import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'rfus35mi', // lấy từ sanity.json
  dataset: 'production',
  apiVersion: '2023-05-03', // sử dụng phiên bản API hiện tại
  useCdn: false, // Tắt CDN để kiểm tra vấn đề xác thực
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN, // Thêm token nếu dataset không public
  ignoreBrowserTokenWarning: true
})