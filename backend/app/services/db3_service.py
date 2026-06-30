from __future__ import annotations

from datetime import datetime, timezone
from uuid import uuid4

from flask import current_app
from pymongo import MongoClient
from pymongo.errors import PyMongoError


def _collection(name: str):
    uri = current_app.config.get("MONGODB_URI")
    if not uri:
        return None
    client = MongoClient(uri, serverSelectionTimeoutMS=3000, connectTimeoutMS=3000, socketTimeoutMS=3000)
    return client[current_app.config["MONGODB_DB"]][name]


def write_event(collection: str, payload: dict) -> dict:
    event = {
        "event_id": str(uuid4()),
        "created_at": datetime.now(timezone.utc).isoformat(),
        **payload,
    }
    target = _collection(collection)
    if target is None:
        current_app.logger.warning("MONGODB_URI not configured; DB-3 event skipped: %s", collection)
        return event
    try:
        target.insert_one(event)
    except PyMongoError as exc:
        current_app.logger.warning("DB-3 event skipped for %s: %s", collection, exc.__class__.__name__)
    return event
