# VSPMS – User Management (Spring Boot + MySQL)

Owner: **MTN Marasingha (IT24103037)**

## Modules
- `backend/` – Spring Boot service (JWT auth, RBAC)
- `frontend/` – Web UI (to add later)
- `db/migrations/` – MySQL schema & seed SQL
- `infra/` – docker-compose, local dev infra

## Quick Start (planned)
1. Install Java 17+, Maven, MySQL or Docker.
2. Create `.env` (or use `application.yml`) with DB creds.
3. Run migration `db/migrations/001_init.sql`.
4. Start backend: `mvn spring-boot:run`.

## CI
- GitHub Actions workflow in `.github/workflows/ci.yml` to build on push.
