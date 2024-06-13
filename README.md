# 多言語プロジェクト（BTC6）

<p>
<img src="https://img.shields.io/badge/Spring Boot-black.svg?logo=springBoot&style=for-the-badge">
<img src="https://img.shields.io/badge/Kotlin-gray.svg?logo=Kotlin&style=for-the-badge">
<img src="https://img.shields.io/badge/postgresql-white.svg?logo=postgresql&style=for-the-badge">
</p>
<p>
  <img src="https://img.shields.io/badge/react-blue.svg?logo=react&style=for-the-badge">
  <img src="https://img.shields.io/badge/TypeScript-white.svg?logo=TypeScript&style=for-the-badge">
  <img src="https://img.shields.io/badge/vite-yellow.svg?logo=vite&style=for-the-badge">
  <img src="https://img.shields.io/badge/mantine-white.svg?logo=mantine&style=for-the-badge">
</p>

## できること

勤務時間を記録する。

※未実装の機能多数あります。

## 導入方法(ローカル)

**1.ローカルにリポジトリをインストールする**

<br>

**2.DB 作成**

```bash
createdb spring_boot_db
```

<br>

**3.環境変数の設定**

`./src/main/resources/application.properties`ファイルを開く

```properties
spring.application.name=Multilingual-Projects
spring.datasource.url=jdbc:postgresql://localhost/spring_boot_db
spring.datasource.username=user
spring.datasource.password=
spring.datasource.driverClassName=org.postgresql.Driver
```

下記部分を自身の環境に合わせて編集

```properties
spring.datasource.username=user
spring.datasource.password=
```

<br>

**4.サーバーを起動する**

ターミナルにて下記コマンドを実行

```bash
./gradlew build
./gradlew bootrun
```

<br>

**5.フロントエンドのセットアップ**

ターミナルにて、下記コマンドを実行

```
cd frontend
npm install
npm run dev
```

<br>

**6.local サーバーを開く**

`http://localhost:8080/`を開く

<br>

**6.スマホ用画面サイズに変更**

スマホ用サイトのため、PC の場合は、デベロッパーツールでスマホサイズにする。

↓↓ もしくは、chrome 拡張機能を入れると見た目が良い感じになる ↓↓

[モバイルシュミレーター](https://chromewebstore.google.com/detail/%E3%83%A2%E3%83%90%E3%82%A4%E3%83%AB%E3%82%B7%E3%83%9F%E3%83%A5%E3%83%AC%E3%83%BC%E3%82%BF%E3%83%BC-%E3%83%AC%E3%82%B9%E3%83%9D%E3%83%B3%E3%82%B7%E3%83%96%E3%83%86%E3%82%B9%E3%83%88%E3%83%84%E3%83%BC%E3%83%AB/ckejmhbmlajgoklhgbapkiccekfoccmk?hl=ja)

<br>

## frontend 一部コマンド

| コマンド      | 実行される処理           |
| ------------- | ------------------------ |
| npm run dev   | フロントエンド起動(vite) |
| npm run build | ビルド(vite)             |

<br>

## 使用している主な技術

バックエンド

- Spring Boot
- Kotlin
- postgreSQL

<br>

フロントエンド

- React
- TypeScript
- VITE
- Mantine
- React-router-dom
- React-icons
- Styled-components
