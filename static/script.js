// DOM要素の取得
const imageForm = document.getElementById('imageForm');
const textForm = document.getElementById('textForm');
const alertContainer = document.getElementById('alertContainer');

// フォームイベントリスナー
imageForm.addEventListener('submit', handleImageForm);
textForm.addEventListener('submit', handleTextForm);

// 画像リンク生成フォームの処理
async function handleImageForm(e) {
    e.preventDefault();
    
    const url = document.getElementById('imageUrl').value.trim();
    
    if (!url) {
        showAlert('画像URLを入力してください。', 'warning');
        return;
    }
    
    try {
        const response = await fetch('/api/generate-image-link', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: url })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('imageOutput').value = data.html;
            document.getElementById('imageResult').style.display = 'block';
            document.getElementById('imageResult').classList.add('fade-in');
            showAlert('画像リンクHTMLが生成されました！', 'success');
        } else {
            showAlert(data.error || 'エラーが発生しました。', 'danger');
        }
    } catch (error) {
        showAlert('ネットワークエラーが発生しました。', 'danger');
        console.error('Error:', error);
    }
}

// テキストリンク生成フォームの処理
async function handleTextForm(e) {
    e.preventDefault();
    
    const target = document.getElementById('targetText').value.trim();
    const url = document.getElementById('targetUrl').value.trim();
    const newTab = document.getElementById('newTab').checked;
    
    if (!target || !url) {
        showAlert('単語とURLを入力してください。', 'warning');
        return;
    }
    
    try {
        const response = await fetch('/api/generate-text-link', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                target: target, 
                url: url, 
                new_tab: newTab 
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('textOutput').value = data.html;
            document.getElementById('textResult').style.display = 'block';
            document.getElementById('textResult').classList.add('fade-in');
            showAlert('テキストリンクが生成されました！', 'success');
        } else {
            showAlert(data.error || 'エラーが発生しました。', 'danger');
        }
    } catch (error) {
        showAlert('ネットワークエラーが発生しました。', 'danger');
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
