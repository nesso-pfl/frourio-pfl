import { defineController } from './$relay'

export default defineController(() => ({
  // 具体的なログイン処理は cookie を操作する都合上 hooks に記述してある
  post: () => ({ status: 204 }),
}))
