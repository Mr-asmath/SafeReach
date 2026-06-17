import os

from app import create_app, socketio

app = create_app()

if __name__ == "__main__":
    port = int(os.getenv("PORT", "5000"))
    use_reloader = os.getenv("SAFE_REACH_RELOAD", "false").lower() == "true"
    socketio.run(
        app,
        host="0.0.0.0",
        port=port,
        debug=app.config["DEBUG"],
        use_reloader=use_reloader,
    )
