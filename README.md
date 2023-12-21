# Message Board API

This is a simple Message Board API implemented in Go using the Gorilla Mux router.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Run the Application](#run-the-application)
  - [API Endpoints](#api-endpoints)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

- Go installed on your machine
- [Gorilla Mux](https://github.com/gorilla/mux) package for routing
- [rs/cors](https://github.com/rs/cors) package for handling CORS

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/shivam3746/chaintraced-go-backend
   cd chaintraced-go-backend

2. Install the Dependencies

   ```bash
   go get -u github.com/gorilla/mux
   go get -u github.com/rs/cors

## Usage

### Run Application

   ```bash
   go run main.go
  ```
   The application will start on port 8080 by default.

### API Endpoints

- **GET /messages**: Retrieve all messages
- **POST /messages**: Create a new message
- **POST /messages/{id}/reply**: Reply to a specific message
- **DELETE /messages/{id}**: Delete a specific message
- **PUT /messages/{id}**: Edit a specific message

### Examples

## Examples

- **Create a Message:**

  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"text":"Hello, World!", "author": "John Doe"}' http://localhost:8080/messages

- **Get all Messages:**

  ```bash
  curl http://localhost:8080/messages

- **Reply to a Message:**

  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"text":"Reply text", "author": "Reply Author"}' http://localhost:8080/messages/1/reply

- **Delete a Message:**

  ```bash
  curl -X DELETE http://localhost:8080/messages/2

- **Edit a Message:**

  ```bash
  curl -X PUT -H "Content-Type: application/json" -d '{"text":"Updated text", "author": "Updated Author"}' http://localhost:8080/messages/3
