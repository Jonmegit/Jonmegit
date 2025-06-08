# BOE Administradores Concursales ETL

Este proyecto contiene un pequeño ejemplo de ETL para localizar los edictos de nombramiento de administrador concursal publicados en el BOE. Extrae los datos básicos y crea oportunidades en Odoo mediante XML-RPC.

## Instalación

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## Uso

```
python etl.py
```

El script lee la URL del feed desde la variable de entorno `BOE_FEED_URL` y las credenciales de Odoo desde `ODOO_URL`, `ODOO_DB`, `ODOO_USER` y `ODOO_PASSWORD`.

## Cron

Para programar la ejecución diaria se puede añadir una entrada en `crontab`:

```
0 7 * * * /ruta/a/venv/bin/python /ruta/al/proyecto/edictos/etl.py >> /var/log/boe_etl.log 2>&1
```


