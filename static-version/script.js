// DOM要素の取得
const imageForm = document.getElementById('imageForm');
const textForm = document.getElementById('textForm');
const alertContainer = document.getElementById('alertContainer');

// フォームイベントリスナー
imageForm.addEventListener('submit', handleImageForm);
textForm.addEventListener('submit', handleTextForm);

// 画像リンク生成フォームの処理
function handleImageForm(e) {
    e.preventDefault();
    
    const url = document.getElementById('imageUrl').value.trim();
    
    if (!url) {
        showAlert('画像URLを入力してください。', 'warning');
        return;
    }
    
    try {
        // Flask APIの代わりに直接HTML生成
        const p1 = '<figure class="wp-block-image size-large"><a href="';
        const p2 = '"><img src="';
        const p3 = '?w=769" alt="" class="wp-image-10478"/></a></figure>';
        const result = p1 + url + p2 + url + p3;
        
        document.getElementById('imageOutput').value = result;
        document.getElementById('imageResult').style.display = 'block';
        document.getElementById('imageResult').classList.add('fade-in');
        showAlert('画像リンクHTMLが生成されました！', 'success');
        
    } catch (error) {
        showAlert('エラーが発生しました。', 'danger');
        console.error('Error:', error);
    }
}

// テキストリンク生成フォームの処理
function handleTextForm(e) {
    e.preventDefault();
    
    const target = document.getElementById('targetText').value.trim();
    const url = document.getElementById('targetUrl').value.trim();
    const newTab = document.getElementById('newTab').checked;
    
    if (!target || !url) {
        showAlert('単語とURLを入力してください。', 'warning');
        return;
    }
    
    try {
        // Flask APIの代わりに直接HTML生成
        const targetAttr = newTab ? ' target="_blank"' : '';
        const link = `<a href="${url}"${targetAttr}>${target}</a>`;
        
        document.getElementById('textOutput').value = link;
        document.getElementById('textResult').style.display = 'block';
        document.getElementById('textResult').classList.add('fade-in');
        showAlert('テキストリンクが生成されました！', 'success');
        
    } catch (error) {
        showAlert('エラーが発生しました。', 'danger');
        console.error('Error:', error);
    }
}

// クリップボードにコピー
async function copyToClipboard(textareaId) {
    const textarea = document.getElementById(textareaId);
    const text = textarea.value;
    
    try {
        await navigator.clipboard.writeText(text);
        showAlert('クリップボードにコピーしました！', 'success');
    } catch (err) {
        // フォールバック: 古いブラウザ対応
        textarea.select();
        document.execCommand('copy');
        showAlert('クリップボードにコピーしました！', 'success');
    }
}

// アラート表示
function showAlert(message, type) {
    // 既存のアラートを削除
    alertContainer.innerHTML = '';
    
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    alertContainer.appendChild(alertDiv);
    
    // 3秒後に自動で消去
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 3000);
}

// フォームリセット時に結果エリアを隠す
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('[data-bs-toggle="tab"]');
    
    tabButtons.forEach(button => {
        button.addEventListener('shown.bs.tab', function() {
            // タブ切り替え時にアラートをクリア
            alertContainer.innerHTML = '';
        });
    });
});
