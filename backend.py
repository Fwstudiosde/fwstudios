#!/usr/bin/env python3
"""
FWStudios Backend API
Handles persistent storage for leads and customers
"""

from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import json
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Data file paths
DATA_DIR = 'data'
LEADS_FILE = os.path.join(DATA_DIR, 'leads.json')
CUSTOMERS_FILE = os.path.join(DATA_DIR, 'customers.json')
SETTINGS_FILE = os.path.join(DATA_DIR, 'settings.json')
LEGAL_FILE = os.path.join(DATA_DIR, 'legal.json')

# Ensure data directory exists
os.makedirs(DATA_DIR, exist_ok=True)

# Default settings
DEFAULT_SETTINGS = {
    "chatbot": {
        "monthly": {
            "price": 299,
            "setupFee": 499,
            "features": [
                "Unbegrenzte Nachrichten",
                "Website-Integration",
                "Training auf kompletten Website-Daten",
                "Backend-Datenintegration möglich",
                "Email-Flow-Trigger",
                "Alle Sprachen",
                "Analytics Dashboard",
                "Lead-Generierung",
                "Priority Support",
                "Monatlich kündbar"
            ]
        },
        "yearly": {
            "price": 250,
            "setupFee": 499,
            "totalYearly": 2500,
            "savings": 500,
            "features": [
                "Unbegrenzte Nachrichten",
                "Website-Integration",
                "Training auf kompletten Website-Daten",
                "Backend-Datenintegration möglich",
                "Email-Flow-Trigger",
                "Alle Sprachen",
                "Analytics Dashboard",
                "Lead-Generierung",
                "Priority Support",
                "2 Monate geschenkt"
            ]
        }
    },
    "sale": {
        "active": False,
        "bannerText": "Black Friday Sale",
        "bannerColor": "#ff0000",
        "discount": 0,
        "originalMonthlyPrice": 299,
        "originalYearlyPrice": 250
    }
}

# Default legal pages content
DEFAULT_LEGAL = {
    "impressum": {
        "title": "Impressum",
        "content": """<h2>Angaben gemäß § 5 TMG</h2>
<p>FWStudios<br>
Musterstraße 123<br>
12345 Musterstadt</p>

<h3>Vertreten durch:</h3>
<p>Max Mustermann</p>

<h3>Kontakt:</h3>
<p>Telefon: +49 (0) 123 456789<br>
E-Mail: info@fwstudios.de</p>

<h3>Umsatzsteuer-ID:</h3>
<p>Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br>
DE123456789</p>

<h3>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</h3>
<p>Max Mustermann<br>
Musterstraße 123<br>
12345 Musterstadt</p>"""
    },
    "datenschutz": {
        "title": "Datenschutzerklärung",
        "content": """<h2>1. Datenschutz auf einen Blick</h2>

<h3>Allgemeine Hinweise</h3>
<p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.</p>

<h3>Datenerfassung auf dieser Website</h3>
<p><strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong></p>
<p>Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.</p>

<p><strong>Wie erfassen wir Ihre Daten?</strong></p>
<p>Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.</p>

<h2>2. Hosting</h2>
<p>Wir hosten die Inhalte unserer Website bei folgendem Anbieter:</p>
<p>Externer Hosting-Anbieter<br>
Anbieterstraße 123<br>
12345 Stadt</p>

<h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>

<h3>Datenschutz</h3>
<p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>"""
    },
    "agb": {
        "title": "Allgemeine Geschäftsbedingungen",
        "content": """<h2>§ 1 Geltungsbereich</h2>
<p>Für die Geschäftsbeziehung zwischen FWStudios (nachfolgend „Anbieter") und dem Kunden gelten ausschließlich die nachfolgenden Allgemeinen Geschäftsbedingungen in ihrer zum Zeitpunkt der Bestellung gültigen Fassung.</p>

<h2>§ 2 Vertragsschluss</h2>
<p>Die Präsentation der Waren im Online-Shop stellt kein rechtlich bindendes Angebot, sondern einen unverbindlichen Online-Katalog dar. Durch Anklicken des Buttons „Kaufen" bzw. „Bestellen" geben Sie eine verbindliche Bestellung der auf der Bestellseite aufgelisteten Waren ab.</p>

<h2>§ 3 Preise und Versandkosten</h2>
<p>Alle Preise, die auf der Website angegeben sind, verstehen sich inklusive der gesetzlichen Mehrwertsteuer. Zusätzlich zu den angegebenen Preisen berechnen wir für die Lieferung Versandkosten.</p>

<h2>§ 4 Lieferung</h2>
<p>Die Lieferung erfolgt nur innerhalb Deutschlands. Die Lieferzeit beträgt, soweit nicht anders angegeben, bis zu 5 Werktage.</p>

<h2>§ 5 Zahlung</h2>
<p>Die Zahlung erfolgt wahlweise per Vorkasse, Kreditkarte oder PayPal. Bei Auswahl der Zahlungsart Vorkasse nennen wir Ihnen unsere Bankverbindung in gesonderter E-Mail und liefern die Ware nach Zahlungseingang.</p>

<h2>§ 6 Eigentumsvorbehalt</h2>
<p>Die Ware bleibt bis zur vollständigen Bezahlung unser Eigentum.</p>"""
    },
    "widerruf": {
        "title": "Widerrufsrecht",
        "content": """<h2>Widerrufsbelehrung</h2>

<h3>Widerrufsrecht</h3>
<p>Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.</p>

<p>Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat.</p>

<p>Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (FWStudios, Musterstraße 123, 12345 Musterstadt, E-Mail: info@fwstudios.de) mittels einer eindeutigen Erklärung (z.B. ein mit der Post versandter Brief oder E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.</p>

<h3>Folgen des Widerrufs</h3>
<p>Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist.</p>

<p>Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.</p>

<h3>Muster-Widerrufsformular</h3>
<p>(Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.)</p>

<p>An FWStudios<br>
Musterstraße 123<br>
12345 Musterstadt<br>
E-Mail: info@fwstudios.de</p>

<p>Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der folgenden Waren (*)/die Erbringung der folgenden Dienstleistung (*)</p>

<p>Bestellt am (*)/erhalten am (*)<br>
Name des/der Verbraucher(s)<br>
Anschrift des/der Verbraucher(s)<br>
Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)<br>
Datum</p>

<p>(*) Unzutreffendes streichen.</p>"""
    }
}

# Initialize data files if they don't exist
def init_data_files():
    if not os.path.exists(LEADS_FILE):
        with open(LEADS_FILE, 'w') as f:
            json.dump([], f)
    if not os.path.exists(CUSTOMERS_FILE):
        with open(CUSTOMERS_FILE, 'w') as f:
            json.dump([], f)
    if not os.path.exists(SETTINGS_FILE):
        with open(SETTINGS_FILE, 'w') as f:
            json.dump(DEFAULT_SETTINGS, f, indent=2)
    if not os.path.exists(LEGAL_FILE):
        with open(LEGAL_FILE, 'w') as f:
            json.dump(DEFAULT_LEGAL, f, indent=2)

init_data_files()

# Helper functions
def read_json_file(filepath):
    try:
        with open(filepath, 'r') as f:
            return json.load(f)
    except:
        return []

def write_json_file(filepath, data):
    with open(filepath, 'w') as f:
        json.dump(data, f, indent=2)

# ============= LEADS API =============

@app.route('/api/leads', methods=['GET'])
def get_leads():
    """Get all leads"""
    leads = read_json_file(LEADS_FILE)
    return jsonify(leads)

@app.route('/api/leads', methods=['POST'])
def create_lead():
    """Create a new lead"""
    lead_data = request.json
    leads = read_json_file(LEADS_FILE)

    # Add timestamp if not present
    if 'timestamp' not in lead_data:
        lead_data['timestamp'] = int(datetime.now().timestamp() * 1000)

    leads.append(lead_data)
    write_json_file(LEADS_FILE, leads)

    return jsonify(lead_data), 201

@app.route('/api/leads/<int:timestamp>', methods=['PUT'])
def update_lead(timestamp):
    """Update a lead by timestamp"""
    lead_data = request.json
    leads = read_json_file(LEADS_FILE)

    for i, lead in enumerate(leads):
        if lead.get('timestamp') == timestamp:
            leads[i] = lead_data
            write_json_file(LEADS_FILE, leads)
            return jsonify(lead_data)

    return jsonify({'error': 'Lead not found'}), 404

@app.route('/api/leads/<int:timestamp>', methods=['DELETE'])
def delete_lead(timestamp):
    """Delete a lead by timestamp"""
    leads = read_json_file(LEADS_FILE)
    leads = [lead for lead in leads if lead.get('timestamp') != timestamp]
    write_json_file(LEADS_FILE, leads)

    return jsonify({'success': True})

@app.route('/api/leads/clear', methods=['DELETE'])
def clear_all_leads():
    """Delete all leads"""
    write_json_file(LEADS_FILE, [])
    return jsonify({'success': True})

# ============= CUSTOMERS API =============

@app.route('/api/customers', methods=['GET'])
def get_customers():
    """Get all customers"""
    customers = read_json_file(CUSTOMERS_FILE)
    return jsonify(customers)

@app.route('/api/customers', methods=['POST'])
def create_customer():
    """Create a new customer"""
    customer_data = request.json
    customers = read_json_file(CUSTOMERS_FILE)

    # Add ID if not present
    if 'id' not in customer_data:
        customer_data['id'] = int(datetime.now().timestamp() * 1000)

    customers.append(customer_data)
    write_json_file(CUSTOMERS_FILE, customers)

    return jsonify(customer_data), 201

@app.route('/api/customers/<int:customer_id>', methods=['PUT'])
def update_customer(customer_id):
    """Update a customer by ID"""
    customer_data = request.json
    customers = read_json_file(CUSTOMERS_FILE)

    for i, customer in enumerate(customers):
        if customer.get('id') == customer_id:
            customers[i] = customer_data
            write_json_file(CUSTOMERS_FILE, customers)
            return jsonify(customer_data)

    return jsonify({'error': 'Customer not found'}), 404

@app.route('/api/customers/<int:customer_id>', methods=['DELETE'])
def delete_customer(customer_id):
    """Delete a customer by ID"""
    customers = read_json_file(CUSTOMERS_FILE)
    customers = [customer for customer in customers if customer.get('id') != customer_id]
    write_json_file(CUSTOMERS_FILE, customers)

    return jsonify({'success': True})

# ============= SETTINGS API =============

@app.route('/api/settings', methods=['GET'])
def get_settings():
    """Get all settings"""
    settings = read_json_file(SETTINGS_FILE)
    return jsonify(settings)

@app.route('/api/settings', methods=['PUT'])
def update_settings():
    """Update settings"""
    settings_data = request.json
    write_json_file(SETTINGS_FILE, settings_data)
    return jsonify(settings_data)

@app.route('/api/settings/reset', methods=['POST'])
def reset_settings():
    """Reset settings to default"""
    write_json_file(SETTINGS_FILE, DEFAULT_SETTINGS)
    return jsonify(DEFAULT_SETTINGS)

# ============= LEGAL PAGES API =============

@app.route('/api/legal', methods=['GET'])
def get_legal():
    """Get all legal pages content"""
    legal = read_json_file(LEGAL_FILE)
    if not legal:
        legal = DEFAULT_LEGAL
    return jsonify(legal)

@app.route('/api/legal/<page>', methods=['GET'])
def get_legal_page(page):
    """Get specific legal page content"""
    legal = read_json_file(LEGAL_FILE)
    if not legal:
        legal = DEFAULT_LEGAL
    if page in legal:
        return jsonify(legal[page])
    return jsonify({'error': 'Page not found'}), 404

@app.route('/api/legal/<page>', methods=['PUT'])
def update_legal_page(page):
    """Update specific legal page content"""
    legal = read_json_file(LEGAL_FILE)
    if not legal:
        legal = DEFAULT_LEGAL

    page_data = request.json
    legal[page] = page_data
    write_json_file(LEGAL_FILE, legal)
    return jsonify(page_data)

@app.route('/api/legal/reset', methods=['POST'])
def reset_legal():
    """Reset legal pages to default"""
    write_json_file(LEGAL_FILE, DEFAULT_LEGAL)
    return jsonify(DEFAULT_LEGAL)

# ============= STATIC FILES =============

@app.route('/')
def index():
    return send_from_directory('.', 'fwstudios-website.html')

@app.route('/<path:path>')
def serve_file(path):
    # If path doesn't have extension, try .html
    if '.' not in path:
        html_path = path + '.html'
        if os.path.exists(html_path):
            return send_from_directory('.', html_path)

    # Otherwise serve as-is
    if os.path.exists(path):
        return send_from_directory('.', path)

    return "Not found", 404

if __name__ == '__main__':
    print("=" * 60)
    print("FWStudios Backend Server")
    print("=" * 60)
    print(f"Server running at: http://localhost:5001")
    print(f"API endpoints:")
    print(f"  - GET    /api/leads")
    print(f"  - POST   /api/leads")
    print(f"  - PUT    /api/leads/<timestamp>")
    print(f"  - DELETE /api/leads/<timestamp>")
    print(f"  - DELETE /api/leads/clear")
    print(f"  - GET    /api/customers")
    print(f"  - POST   /api/customers")
    print(f"  - PUT    /api/customers/<id>")
    print(f"  - DELETE /api/customers/<id>")
    print("=" * 60)
    print("Press Ctrl+C to stop the server")
    print("=" * 60)

    app.run(host='0.0.0.0', port=5001, debug=True)
