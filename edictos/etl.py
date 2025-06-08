import logging
from datetime import datetime
from .boe_parser import get_feed_url, download_feed, parse_feed
from .odoo_client import OdooClient

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def main() -> None:
    url = get_feed_url()
    logger.info("Descargando feed %s", url)
    try:
        xml_bytes = download_feed(url)
    except Exception as exc:
        logger.error("Error descargando feed: %s", exc)
        return

    entries = parse_feed(xml_bytes)
    if not entries:
        logger.info("No se encontraron nombramientos de AC")
        return

    odoo = None
    try:
        odoo = OdooClient()
    except Exception as exc:
        logger.error("No se pudo conectar con Odoo: %s", exc)
        return

    for entry in entries:
        values = {
            "name": f"Nombramiento AC - {entry['title']}",
            "description": entry['summary'],
        }
        try:
            lead_id = odoo.create_lead(values)
            logger.info("Creado lead %s", lead_id)
        except Exception as exc:
            logger.error("Error creando lead en Odoo: %s", exc)


if __name__ == "__main__":
    main()
