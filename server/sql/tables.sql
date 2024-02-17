-- table: user table
CREATE TABLE IF NOT EXISTS "users"(
	id                      bigserial primary key,
	person_id               varchar(100) unique,
    first_name              varchar(100),
    last_name               varchar(100),
    is_active               boolean not null default true,
	created_at              timestamp not null default now(),
    updated_at              timestamp not null default now()
)

-- table: user_sessions
CREATE TABLE "grid"."user_sessions" (
    "sid" varchar NOT NULL,
    "sess" json NOT NULL,
    "expire" timestamp NOT NULL,
    PRIMARY KEY ("sid")
);