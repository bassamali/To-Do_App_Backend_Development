# API Endpoints Examples

## Base URL: `http://localhost:3000/api`

### GET Requests

#### 1. Get all users
```bash
curl http://localhost:3000/api/users
```

#### 2. Get user by ID
```bash
curl http://localhost:3000/api/users/1
```

### POST Request

#### 3. Create a new user
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice Johnson", "email": "alice@example.com"}'
```

### PUT Request

#### 4. Update a user
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "John Updated", "email": "john.updated@example.com"}'
```

### DELETE Request

#### 5. Delete a user
```bash
curl -X DELETE http://localhost:3000/api/users/1
```

## What each method does:

- **GET**: Retrieve data (read)
- **POST**: Create new data
- **PUT**: Update existing data
- **DELETE**: Remove data

## Testing with Browser:
- GET requests can be tested by visiting the URLs in your browser
- POST, PUT, DELETE need tools like curl, Postman, or Thunder Client 