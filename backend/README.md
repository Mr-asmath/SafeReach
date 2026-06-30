# SafeReach Backend

Flask backend foundation for SafeReach. This backend is designed to support the existing Next.js frontend through WebSocket-first realtime events plus minimal HTTP fallback endpoints for health and bootstrap checks.

## Setup

```powershell
cd E:\Projects\Live\SafeReach\backend
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
copy .env.example .env
```

Fill `backend\.env` with the real values. Do not commit `.env`.

Optional venv setup:

```powershell
python -m venv .venv
$env:USE_BACKEND_VENV="true"
.\scripts\run-dev.ps1 -Install
```

## Run

Recommended local Windows run:

```powershell
.\scripts\run-dev.ps1
```

This starts with normal `python`, skips dependency reinstall for faster startup, and automatically stops any old process already using port `5000`.

Install or reinstall dependencies only when needed:

```powershell
.\scripts\run-dev.ps1 -Install
```

Manual run:

```powershell
python scripts/migrate.py all
python scripts/seed.py
python scripts/mirror_db1_to_db2.py
python run.py
```

`python run.py` keeps Flask debug mode enabled in development but disables the Windows watchdog reloader by default. This avoids repeated reloads from unrelated files inside Python `site-packages`. To enable auto-reload intentionally:

```powershell
$env:SAFE_REACH_RELOAD="true"
python run.py
```

If you run the backend with global Python and see a `RequestsDependencyWarning`, repair that Python environment with:

```powershell
python -m pip install --upgrade --force-reinstall requests==2.32.5 urllib3==2.5.0 charset-normalizer==3.4.4 chardet==5.2.0
```

Backend URL:

```text
http://localhost:5000
ws://localhost:5000/socket.io/
```

## Connection Checks

```powershell
python scripts/test_connections.py
```

Expected local checks:

- Supabase DB-1 and DB-2 connect.
- Redis / Upstash connects.
- Google Sheets is reachable when the service account has access.
- Twilio account lookup works when credentials are valid.
- HTTP `/health`, `/api/v1/bootstrap`, and `/api/v1/auth/login` return `200`.

For MongoDB Atlas, add your current public IP in Atlas Network Access. If Python reports `TLSV1_ALERT_INTERNAL_ERROR` or `ServerSelectionTimeoutError` while the URI is correct, confirm the IP allowlist first, then prefer Python 3.11+ if the local Python/OpenSSL build is old.

## WebSocket Events

Incoming events:

- `auth.login`
- `data.bootstrap`
- `student.ready_to_school`
- `attendance.submit`
- `travel.go_out`
- `parent.reached_home`
- `timetable.break.move`

Outgoing events:

- `safe.connected`
- `auth.login.success`
- `data.bootstrap.success`
- `student.status.changed`
- `attendance.marked`
- `timetable.updated`
- `safe.error`

## Database Plan

- DB-1: editable Supabase/PostgreSQL operational store.
- DB-2: protected Supabase/PostgreSQL mirror of the DB-1 table structure. Inserts are allowed for backup/sync, while update/delete operations are blocked by DB-2 triggers.
- DB-3: MongoDB realtime/event/log store, configured by `MONGODB_URI`.
- Redis: cache/session/rate-limit/queue store, configured by `REDIS_URL` or Upstash REST variables.

## Google Sheets Schema Export

```powershell
python scripts/export_google_sheet_schema.py
python scripts/export_google_sheet_data.py
```

This updates:

- `sheet-1` and `sheet-1.x` DB-1 tables
- `sheet-2` and `sheet-2.x` DB-2 mirror tables
- `sheet-3` and `sheet-3.x` DB-3 realtime collections

with table names, keys, and attributes.
