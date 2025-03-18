# Cloud Functions for Firebase向け

このプロジェクトは、Firebase Cloud Functionsを使用して実装されたバックエンド機能を提供します。

## 主な機能

### ユーザー管理機能
- ユーザーロールの設定（admin/company/engineer）

## 開発環境のセットアップ

1. 必要なツールのインストール
   - Node.js (v20以上)
   - Firebase CLI (`npm install -g firebase-tools`)

2. 依存パッケージのインストール
   ```bash
   cd functions
   npm install
   ```
3. .firebasercにプロジェクトIDを記載
   ```json
   {
    "projects": {
     "default": "your-project-id"
    }
   }
   ```

4. ローカルでの開発
   ```bash
   npm run serve
   ```

## デプロイ手順

1. Firebaseへのログイン
   ```bash
   firebase login
   ```

2. プロジェクトの選択
   ```bash
   firebase use [プロジェクトID]
   ```

3. デプロイの実行
   ```bash
   firebase deploy --only functions
   ```

## プロジェクト構造

```
functions/
├── src/          # ソースコード
├── lib/          # コンパイル後のコード
├── package.json  # 依存関係の定義
└── tsconfig.json # TypeScript設定
```

## 注意事項

- デプロイ前に必ずローカルでのテストを実施してください
- 環境変数は`.env`ファイルで管理し、GitHubにはコミットしないでください
- 本番環境へのデプロイは慎重に行ってください

## ライセンス

MIT License
