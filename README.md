# Steuer-Assistenz Österreich – Flask + Groq + Railway (Diagnose-Version v3)

Diese Version erweitert `/health` zusätzlich um:
- `test_value` (liest `TEST_VALUE`)
- `port_present`
- `railway_env_present`
- `railway_service_present`

## Test in Railway

1. Setze im Service `web` zusätzlich:
   - `TEST_VALUE=abc123`
2. Deploye neu.
3. Rufe `/health` auf.

Wenn `test_value` leer bleibt, kommen benutzerdefinierte Variablen generell nicht in der Runtime an.
