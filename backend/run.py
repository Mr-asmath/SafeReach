import os

from app import create_app, socketio

app = create_app()

if __name__ == "__main__":
    port = int(os.getenv("PORT", "5000"))
    use_reloader = os.getenv("SAFE_REACH_RELOAD", "false").lower() == "true"
    try:
        socketio.run(
            app,
            host="0.0.0.0",
            port=port,
            debug=app.config["DEBUG"],
            use_reloader=use_reloader,
        )
    except OSError as exc:
        if getattr(exc, "winerror", None) == 10048:
            raise SystemExit(
                f"Port {port} is already in use. Stop the old backend process or run: "
                f"powershell -ExecutionPolicy Bypass -File scripts/run-dev.ps1"
            ) from exc
        raise
