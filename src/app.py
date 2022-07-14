from quart import Quart

app = Quart(__name__)


@app.route("/")
async def test():
    return "test!"


if __name__ == "__main__":
    app.run(debug=True)
