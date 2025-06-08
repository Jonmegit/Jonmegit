import os
from edictos.boe_parser import parse_feed


def test_parse_feed():
    path = os.path.join(os.path.dirname(__file__), "..", "sample_rss.xml")
    with open(path, "rb") as f:
        xml = f.read()
    items = parse_feed(xml)
    assert len(items) == 1
    assert items[0]["title"].startswith("Nombramiento de")
