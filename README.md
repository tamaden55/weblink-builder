# HTMLリンク生成ツール

WordPressなどで使用するHTMLリンクを簡単に生成できるWebアプリケーションです。

## 機能

### 1. 画像リンク生成
- 画像URLを入力すると、WordPress形式の画像リンクHTMLを生成
- 自動的に`?w=769`パラメータを追加してサイズ調整
- 生成されたHTMLはクリックでクリップボードにコピー可能

### 2. テキストリンク生成
- 任意のテキストとURLからハイパーリンクHTMLを生成
- 新しいタブで開く(`target="_blank"`)オプション付き
- 生成されたHTMLはクリックでクリップボードにコピー可能

## インストールと実行

### 必要な環境
- Python 3.7以上
- pip

### セットアップ手順

1. リポジトリをクローン
```bash
git clone <repository-url>
cd html-link-generator
```

2. 仮想環境を作成（推奨）
```bash
python -m venv venv
source venv/bin/activate  # Windowsの場合: venv\Scripts\activate
```

3. 依存関係をインストール
```bash
pip install -r requirements.txt
```

4. アプリケーションを実行
```bash
python app.py
```

5. ブラウザで http://localhost:5000 にアクセス

## 使用方法

### 画像リンク生成
1. 「画像リンク生成」タブを選択
2. 画像のURLを入力
3. 「画像リンクを生成」ボタンをクリック
4. 生成されたHTMLをコピーして使用

### テキストリンク生成
1. 「テキストリンク生成」タブを選択
2. リンクを貼る単語を入力
3. リンク先のURLを入力
4. 必要に応じて「新しいタブで開く」をチェック
5. 「テキストリンクを生成」ボタンをクリック
6. 生成されたHTMLをコピーして使用

## 技術仕様

- **バックエンド**: Flask (Python)
- **フロントエンド**: HTML5, CSS3, JavaScript
- **スタイリング**: Bootstrap 5
- **レスポンシブデザイン**: モバイル対応

## ファイル構成

```
html-link-generator/
├── app.py                 # Flaskアプリケーション
├── requirements.txt       # Python依存関係
├── README.md             # このファイル
├── static/
│   ├── style.css         # カスタムCSS
│   └── script.js         # フロントエンドJavaScript
└── templates/
    └── index.html        # メインHTMLテンプレート
```

## API エンドポイント

### POST /api/generate-image-link
画像リンクHTMLを生成

**リクエスト:**
```json
{
  "url": "https://example.com/image.jpg"
}
```

**レスポンス:**
```json
{
  "html": "<figure class=\"wp-block-image size-large\">...</figure>"
}
```

### POST /api/generate-text-link
テキストリンクHTMLを生成

**リクエスト:**
```json
{
  "target": "クリックしてください",
  "url": "https://example.com",
  "new_tab": true
}
```

**レスポンス:**
```json
{
  "html": "<a href=\"https://example.com\" target=\"_blank\">クリックしてください</a>"
}
```

## デプロイメント

### Heroku
1. Herokuアカウントを作成
2. Heroku CLIをインストール
3. 以下のコマンドを実行：

```bash
heroku create your-app-name
git add .
git commit -m "Initial commit"
git push heroku main
```

### その他のプラットフォーム
- **Vercel**: `vercel.json`設定ファイルを追加
- **Railway**: 自動デプロイ設定
- **PythonAnywhere**: ファイルアップロードとWSGI設定

## ライセンス

MIT License

## 貢献

プルリクエストやイシューの報告を歓迎します。

## 更新履歴

- v1.0.0: 初回リリース
  - 画像リンク生成機能
  - テキストリンク生成機能
  - レスポンシブデザイン
  - クリップボードコピー機能
