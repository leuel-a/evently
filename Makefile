.PHONY: dev-db

COMPOSE_FILE = ./docker-compose.development.yml

dev-db:
	docker compose --file $(COMPOSE_FILE) up --detach
