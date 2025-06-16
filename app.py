import os
from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)
app.config['DEBUG'] = True

# デバッグ用ルート
@app.route('/test')
def test():
    return "Flask app is working!"

@app.route('/')
def index():
    try:
        return render_template('index.html')
    except Exception as e:
        return f"Error loading template: {str(e)}"

@app.route('/api/generate-image-link', methods=['POST'])
def generate_image_link():
    try:
        data = request.get_json()
        url = data.get('url', '').strip()
        
        if not url:
            return jsonify({'error': '画像URLを入力してください。'}), 400
        
        p1 = '<figure class="wp-block-image size-large"><a href="'
        p2 = '"><img src="'
        p3 = '?w=769" alt="" class="wp-image-10478"/></a></figure>'
        result = p1 + url + p2 + url + p3
        
        return jsonify({'html': result})
    
    except Exception as e:
        return jsonify({'error': f'エラーが発生しました: {str(e)}'}), 500

@app.route('/api/generate-text-link', methods=['POST'])
def generate_text_link():
    try:
        data = request.get_json()
        target = data.get('target', '').strip()
        url = data.get('url', '').strip()
        new_tab = data.get('new_tab', False)
        
        if not target or not url:
            return jsonify({'error': '単語とURLを入力してください。'}), 400
        
        target_attr = ' target="_blank"' if new_tab else ""
        link = f'<a href="{url}"{target_attr}>{target}</a>'
        
        return jsonify({'html': link})
    
    except Exception as e:
        return jsonify({'error': f'エラーが発生しました: {str(e)}'}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    print("Starting Flask app...")
    print(f"Template folder: {app.template_folder}")
    print(f"Static folder: {app.static_folder}")
    app.run(debug=True, host='0.0.0.0', port=port)
