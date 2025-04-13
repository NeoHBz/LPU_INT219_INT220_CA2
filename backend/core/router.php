<?php
class Router {
    private array $getRoutes = [];
    private array $postRoutes = [];

    public function get(string $route, callable $callback): void {
        $this->getRoutes[$route] = $callback;
    }

    public function post(string $route, callable $callback): void {
        $this->postRoutes[$route] = $callback;
    }

    public function dispatch(): void {
        $method = $_SERVER['REQUEST_METHOD'];
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

        // First check for exact route matches
        $routes = match($method) {
            'GET' => $this->getRoutes,
            'POST' => $this->postRoutes,
            default => [],
        };

        // Try to match exact routes first
        foreach ($routes as $route => $callback) {
            // Convert route pattern to regex
            $pattern = preg_quote($route, '/');
            // Replace {param} with a regex capture group
            $pattern = preg_replace('/\\\{([^\/]+)\\\}/', '(?P<$1>[^\/]+)', $pattern);
            $pattern = '/^' . $pattern . '$/';
            
            if (preg_match($pattern, $uri, $matches)) {
                // Filter out numeric keys
                $params = array_filter($matches, function($key) {
                    return !is_numeric($key);
                }, ARRAY_FILTER_USE_KEY);
                
                call_user_func_array($callback, $params);
                return; // Exit after handling the route
            }
        }

        // If no exact match, try to parse modular routes like /module/action
        if (preg_match('~^/([^/]+)(?:/([^/]+))?$~', $uri, $matches)) {
            $module = $matches[1];
            $action = $matches[2] ?? '';
            
            $modulePath = __DIR__ . "/../routes/{$module}.php";
            
            if (file_exists($modulePath)) {
                // Set route parameter for module handlers to use
                $_GET['route'] = $action;
                
                // Include the module file
                require_once $modulePath;
                return;
            }
        }

        // No route matched
        http_response_code(404);
        echo "404 Not Found";
    }
}
?>