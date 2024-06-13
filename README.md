# 多言語プロジェクト（BTC6）

<p>
<img src="https://img.shields.io/badge/react-blue.svg?logo=react&style=for-the-badge">
<img src="https://img.shields.io/badge/Kotlin-gray.svg?logo=Kotlin&style=for-the-badge">
<img src="https://img.shields.io/badge/postgresql-white.svg?logo=postgresql&style=for-the-badge">
<img src="https://img.shields.io/badge/vite-yellow.svg?logo=vite&style=for-the-badge">
</p>
<p>
<img src="https://img.shields.io/badge/mantine-white.svg?logo=mantine&style=for-the-badge">
</p>

## 使用している主な技術

## できること

働いた時間を記録する。

## 導入方法(ローカル)

```bash
npm install
```

環境変数 (.env ファイル)

```properties
spring.application.name=Multilingual-Projects
spring.datasource.url=jdbc:postgresql://localhost/spring_boot_db
spring.datasource.username=user
spring.datasource.password=
spring.datasource.driverClassName=org.postgresql.Driver
```

## コマンド一覧

| コマンド | 実行される処理           |
| -------- | ------------------------ |
| start    | サーバー起動(nodemon)    |
| dev      | フロントエンド起動(vite) |
| migrate  | migrate の実行           |
| seed     | seed の実行              |
| render   | render デプロイ用        |

db 作成
createdb spring_boot_db

./src/main/resources/application.properties
↑ ファイルを開く

自信の環境に合わせて編集する
spring.datasource.username=user
spring.datasource.password=
