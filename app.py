from flask import Flask, render_template, send_file

app = Flask(__name__)

@app.route('/')
@app.route('/<path:path>')
def index(path=''):
    print(f"Rendering page for path: {path}")
    return render_template('index.html')

@app.route('/pages/<path:path>')
def serve_page(path):
    print(f"Serving page for path: {path}")
    try:
        return render_template(f'pages/{path}.html')
    except FileNotFoundError:
        return "Page not found", 404

if __name__ == '__main__':
    app.run(debug=True, ssl_context='adhoc', host='0.0.0.0', port=5000)