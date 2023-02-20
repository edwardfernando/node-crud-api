PG_DB?=node_live_app
PG_USER?=edward
PG_PASSWORD?=12345
PG_HOST?=localhost

setup:
	npm install

run:
	PG_DB=$(PG_DB) PG_USER=$(PG_USER) PG_PASSWORD=$(PG_PASSWORD) PG_HOST=$(PG_HOST) node index.js

test:
	npm test

docker.start:
	docker compose up -d node_app

docker.start.db:
	docker compose up -d node_db

docker.stop:
	docker compose down
