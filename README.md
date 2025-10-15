# Quantity Count Link

A full-stack app for managing item quantities, built with React (Vite) frontend and Spring Boot backend (H2 embedded DB). Both services run in Docker via Docker Compose.

## Features
- Add, edit, delete, and list items (article, SKU, price, quantity)
- Increment/decrement item quantity
- Export items to Excel
- Modern React UI
- RESTful Spring Boot backend

## API Endpoints

Base path: `/api/link`

| Method   | Endpoint                      | Description                       | Request Body / Params         |
|----------|-------------------------------|-----------------------------------|------------------------------|
| GET      | `/api/link/`                  | List all items                    | —                            |
| GET      | `/api/link/{sku}`             | Get item by SKU                   | Path: sku (int)              |
| POST     | `/api/link/`                  | Create new item                   | JSON: article, sku, price, quantity |
| PUT      | `/api/link/{sku}`             | Update item                       | Path: sku, JSON: article, price, quantity |
| DELETE   | `/api/link/{sku}`             | Delete item                       | Path: sku                    |
| PATCH    | `/api/link/{sku}/increment`   | Increment item quantity           | Path: sku                    |
| PATCH    | `/api/link/{sku}/decrement`   | Decrement item quantity           | Path: sku                    |
| GET      | `/api/link/export`            | Export all items to Excel         | —                            |

## Frontend Usage

- **List Items:** Fetches all items from `/api/link/`
- **Add Item:** POST to `/api/link/` with item data
- **Edit Item:** PUT to `/api/link/{sku}` with updated data
- **Delete Item:** DELETE `/api/link/{sku}`
- **Increment/Decrement:** PATCH `/api/link/{sku}/increment` or `/decrement`
- **Export:** GET `/api/link/export` (downloads Excel file)

## Project Structure

```
quantity-count-link/
├── backend/
│   └── quantity-store-link/
│       ├── src/main/java/com/damjan/quantity_store_link/
│       ├── src/main/resources/
│       ├── Dockerfile
│       └── ...
├── frontend/
│   └── quantity-count-link/
│       ├── src/
│       ├── public/
│       ├── Dockerfile
│       └── ...
├── docker-compose.yml
```

## Running with Docker Compose

```sh
docker-compose up --build
```
- Frontend: [http://localhost](http://localhost)
- Backend API: [http://localhost:8080/api](http://localhost:8080/api)

## Local Development

### Backend
```sh
cd backend/quantity-store-link
./mvnw spring-boot:run
```

### Frontend
```sh
cd frontend/quantity-count-link
npm install
npm run dev
```

## Configuration

- **CORS:** Allows all origins for Docker networking.
- **Database:** Embedded H2 (no setup required).
- **API URL:** Frontend uses `http://backend:8080/api/link` in Docker.

## Troubleshooting

- If POST/PUT/PATCH/DELETE fail, check CORS and API URLs.
- For missing TypeScript/React types, run:
  ```sh
  npm install react react-dom react-router-dom
  npm install --save-dev @types/react @types/react-dom @types/react-router-dom
  npm install --save-dev typescript @types/vite/client
  ```

## License

MIT
