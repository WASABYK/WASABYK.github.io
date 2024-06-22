from flask import Flask, request, jsonify

app = Flask(__name__)

# Роут для подсчета участников
@app.route('/count', methods=['GET'])
def count_members():
    param1 = request.args.get('param1', '')
    param2 = request.args.get('param2', '')

    # Пример простой логики подсчета (замените на свою)
    count = len(param1 + param2)

    return jsonify({'count': count})

if __name__ == '__main__':
    app.run(debug=True)
