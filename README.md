# CachingProxy

A Node.js-based HTTP caching proxy server. This project allows you to cache HTTP responses to improve performance and reduce backend load.

## Features

- HTTP proxy with caching
- Configurable cache duration
- Easy to extend and customize

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/rohit/CachingProxy.git
cd CachingProxy
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configuration

Edit the `.env` file to set the cache TTL and server port.  
Example:
```
PORT=3000
CACHE_TTL=60
```

### 4. Run the Proxy Server

```bash
npm start
```

The server will start on the port specified in your `.env` file.

## Usage

Configure your HTTP client or browser to use the proxy server.  
All requests will be cached according to the configured policy.

## Testing

### Using Postman

1. Import the provided Postman collection from `tests/CachingProxy.postman_collection.json`.
2. Set the proxy settings in Postman to point to `localhost:<proxy-port>` (the port you set in `.env`).
3. The collection contains 4 HTTP requests to test the proxy:
   - **Access URL (GET):**  
     Sends a GET request to `http://localhost:3000/api/?url=`.  
     - Set the `url` query parameter to the target URL you want to access through the proxy.
   - **View Logs (GET):**  
     Sends a GET request to view proxy logs (endpoint will be auto-filled in the collection).
   - **List Blacklisted websites (GET):**  
     Sends a GET request to list all blacklisted websites.
   - **Blacklist Website (POST):**  
     Sends a POST request to `http://localhost:3000/api/blacklist` with a JSON body:  
     ```json
     {
         "url": "<website-to-blacklist>"
     }
     ```
4. To run all 4 requests:
   - Open the collection in Postman.
   - Click the "Run" button or use the Collection Runner.
   - Select all 4 requests and click "Run" to execute them in sequence.
   - Fill in any required parameters (such as the `url` for Access URL and Blacklist Website).
   - Review the responses to verify caching and proxy behavior.

#### Example Postman Proxy Settings

- **Proxy Server:** `localhost`
- **Port:** `3000` (or your configured port)

## Project Structure

```
CachingProxy/
├── src/                # Source code
├── tests/              # Postman collections
├── package.json
├── README.md
└── ...
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Create a new Pull Request

## License

MIT License

---

For questions or support, please open an issue on GitHub.
