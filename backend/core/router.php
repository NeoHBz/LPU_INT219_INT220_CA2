<?php
class Router {
    private array $getRoutes = [];
    private array $postRoutes = [];

    public function get(string $path, callable $callback): void {
        $this->getRoutes[$path] = $callback;
    }

    public function post(string $path, callable $callback): void {
        $this->postRoutes[$path] = $callback;
    }

    public function dispatch(): void {
        $method = $_SERVER['REQUEST_METHOD'];
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

        $routes = match($method) {
            'GET' => $this->getRoutes,
            'POST' => $this->postRoutes,
            default => [],
        };

        if (isset($routes[$uri])) {
            call_user_func($routes[$uri]);
        } else {
            http_response_code(404);
            echo "404 Not Found";
        }
    }
}
// Route all requests to server.php
// if (php_sapi_name() === 'cli-server') {
//     $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
//     $fullPath = __DIR__ . $path;

//     // Serve the file if it exists
//     if (is_file($fullPath)) {
//         return false;
//     }
// }

// require_once __DIR__ . '/server.php';