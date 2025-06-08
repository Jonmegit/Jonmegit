from typing import Dict, Any
import os
import xmlrpc.client


class OdooClient:
    def __init__(self):
        url = os.getenv("ODOO_URL")
        db = os.getenv("ODOO_DB")
        user = os.getenv("ODOO_USER")
        password = os.getenv("ODOO_PASSWORD")
        if not all([url, db, user, password]):
            raise ValueError("Missing Odoo configuration")
        self.common = xmlrpc.client.ServerProxy(f"{url}/xmlrpc/2/common")
        uid = self.common.authenticate(db, user, password, {})
        self.models = xmlrpc.client.ServerProxy(f"{url}/xmlrpc/2/object")
        self.db = db
        self.uid = uid
        self.password = password

    def create_lead(self, values: Dict[str, Any]) -> int:
        return self.models.execute_kw(
            self.db,
            self.uid,
            self.password,
            "crm.lead",
            "create",
            [values],
        )
