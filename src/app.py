from quart import Quart, request, jsonify

app = Quart(__name__)


@app.route("/")
async def test():
    return jsonify({"response": "Hello"})


@app.route("/args")
async def args():
    args = request.args
    return jsonify({"response": args})


if __name__ == "__main__":
    app.run(debug=True)
