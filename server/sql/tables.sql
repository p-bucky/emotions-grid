-- table: user table
CREATE TABLE IF NOT EXISTS "users" (
	id                      bigserial primary key,
	person_id               varchar(100) unique,
    first_name              varchar(100),
    last_name               varchar(100),
    is_active               boolean not null default true,
	created_at              timestamp not null default now(),
    updated_at              timestamp not null default now()
)

-- table: stories
CREATE TABLE IF NOT EXISTS stories (
	id                      bigserial primary key,
	person_id               varchar(100),
    story              		varchar(1000),
    city               		varchar(40),
    country               	varchar(40),
    creator_emotion			varchar(40),
    reader_emotion			varchar(40) DEFAULT NULL,
    is_active               boolean not null default true,
	created_at              timestamp not null default now(),
    updated_at              timestamp not null default now()
);

-- table: user_sessions
CREATE TABLE "user_sessions" (
    "sid" varchar NOT NULL,
    "sess" json NOT NULL,
    "expire" timestamp NOT NULL,
    PRIMARY KEY ("sid")
);