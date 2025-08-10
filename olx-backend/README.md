# OLX Backend Starter (UserEntity-aligned)

**Run (dev / H2):**
```bash
./mvnw spring-boot:run   # if you add Maven Wrapper
# or
mvn spring-boot:run
```

**Endpoints:**
- POST `/auth/register`
- POST `/auth/login`

**Profiles:**
- Default: H2 in-memory (Flyway creates `users`)
- `prod`: MySQL (set credentials in `application.yml`)

**JWT Secret:**
- Change `jwt.secret` in `application.yml` to a long random string (>=32 bytes).
