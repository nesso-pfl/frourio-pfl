## Components

### DefList

- 主にエンティティの情報を入れる
- 1 カラムか 2 カラムのページで違和感ない表示ができる

### InfoCard

- DefList をカードコンポーネントに収める
- ヘッダーにタイトルとボタンが入ることがある
- ボディには DefList が入る想定

### Table

- エンティティの情報をテーブルコンポーネントに収める
- 右端にボタンが入ることがある

### QueryForm

- 検索絞り込みフォーム
- テーブル用/カードに入る用がある

## Commands

### create

- サービスのエンティティ作成ファイルを prisma テンプレートで作成
- ```
  mkdir -p server/services/${service_name}
  cp server/services/${service_name}/create${service_name}.ts
  touch server/services/${service_name}/index.ts
  echo "import { create${sevice_name} } from ''"
  ```
