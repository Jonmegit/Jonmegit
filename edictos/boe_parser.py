import os
from typing import List, Dict
import feedparser
import requests
from lxml import etree


def download_feed(url: str) -> bytes:
    """Download the XML feed from BOE."""
    resp = requests.get(url, timeout=30)
    resp.raise_for_status()
    return resp.content


def parse_feed(xml_bytes: bytes) -> List[Dict[str, str]]:
    """Parse the RSS feed and extract entries about administradores concursales."""
    feed = feedparser.parse(xml_bytes)
    results = []
    for entry in feed.entries:
        title = entry.get("title", "")
        if "administrador concursal" not in title.lower():
            continue
        link = entry.get("link", "")
        summary = entry.get("summary", "")
        results.append({"title": title, "link": link, "summary": summary})
    return results


def get_feed_url() -> str:
    return os.getenv("BOE_FEED_URL", "https://www.boe.es/rss/BOE-S-0100.xml")


__all__ = ["download_feed", "parse_feed", "get_feed_url"]
