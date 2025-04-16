<?php

namespace App\Routes;

class Router {
    private $routes = [
        'GET' => [],
        'POST' => [],
        'PUT' => [],
        'DELETE' => []
    ];
    
    private $middlewares = [];
    private $middlewareAliases = [
        'auth' => 'App\\Middleware\\Auth'
    ];
    private $currentRoute = null;
    
    public function get($route, $controller) {
        $this->routes['GET'][$route] = $controller;
        $this->currentRoute = ['method' => 'GET', 'route' => $route];
        return $this;
    }
    
    public function post($route, $controller) {
        $this->routes['POST'][$route] = $controller;
        $this->currentRoute = ['method' => 'POST', 'route' => $route];
        return $this;
    }
    
    public function put($uri, $controller) {
        $this->routes['PUT'][$uri] = $controller;
        $this->currentRoute = ['method' => 'PUT', 'route' => $uri];
        return $this;
    }
    
    public function delete($uri, $controller) {
        $this->routes['DELETE'][$uri] = $controller;
        $this->currentRoute = ['method' => 'DELETE', 'route' => $uri];
        return $this;
    }
    
    public function middleware($middleware) {
        if ($this->currentRoute) {
            $method = $this->currentRoute['method'];
            $route = $this->currentRoute['route'];
            
            if (!isset($this->middlewares[$method][$route])) {
                $this->middlewares[$method][$route] = [];
            }
            
            if (is_array($middleware)) {
                $this->middlewares[$method][$route] = array_merge($this->middlewares[$method][$route], $middleware);
            } else {
                $this->middlewares[$method][$route][] = $middleware;
            }
        }
        
        return $this;
    }
    
    private function resolveMiddlewareClass($middleware) {
        // Check if the middleware is an alias, and resolve it
        if (is_string($middleware) && isset($this->middlewareAliases[$middleware])) {
            return $this->middlewareAliases[$middleware];
        }
        
        return $middleware;
    }
    
    private function runMiddlewares($method, $path) {
        if (isset($this->middlewares[$method][$path])) {
            foreach ($this->middlewares[$method][$path] as $middleware) {
                $middleware = $this->resolveMiddlewareClass($middleware);
                
                if (is_string($middleware)) {
                    $middleware = new $middleware();
                }
                
                if (method_exists($middleware, 'handle')) {
                    $response = $middleware->handle();
                    
                    // If middleware returns false, stop execution
                    if ($response === false) {
                        header("HTTP/1.0 403 Forbidden");
                        echo json_encode(['status' => 'error', 'message' => 'Forbidden']);
                        exit;
                    }
                    
                    // If middleware returns an array, it's an error response
                    if (is_array($response)) {
                        echo json_encode($response);
                        exit;
                    }
                }
            }
        }
    }
    
    public function resolve() {
        $method = $_SERVER['REQUEST_METHOD'];
        $path = $_SERVER['PATH_INFO'] ?? '/';
        $callback = null;
        $params = [];
        $matchedRoutePath = null; // Keep track of the matched route path for middleware

        if (isset($this->routes[$method])) {
            foreach ($this->routes[$method] as $routePath => $routeCallback) {
                // Convert route path to regex: /trainers/{id} -> #^/trainers/(\w+)$#
                $pattern = preg_replace('/\{(\w+)\}/', '([^/]+)', $routePath); // Use [^/]+ to match more than just \w
                $pattern = '#^' . $pattern . '$#';

                if (preg_match($pattern, $path, $matches)) {
                    // Remove the full match ($matches[0])
                    array_shift($matches);
                    $params = $matches; // Extracted parameters (e.g., ['1'])
                    $callback = $routeCallback;
                    $matchedRoutePath = $routePath; // Store the original route path
                    break; // Found a match, stop searching
                }
            }
        }


        if (!$callback) {
            // Try finding an exact match if no pattern matched (for routes without params)
            $callback = $this->routes[$method][$path] ?? false;
             if ($callback) {
                 $matchedRoutePath = $path; // Store the exact path if matched
             } else {
                header("HTTP/1.0 404 Not Found");
                // Use a standard JSON response utility if available
                echo json_encode(['status' => 'error', 'message' => 'Not Found']);
                exit;
            }
        }

        // Run middleware associated with the matched route path
        if ($matchedRoutePath) {
            $this->runMiddlewares($method, $matchedRoutePath);
        }

        $response = null; // Variable to hold the response from the controller/callback

        if (is_array($callback)) {
            $controller = new $callback[0]();
            $controllerMethod = $callback[1];
            // Call the controller method with extracted parameters
            $response = call_user_func_array([$controller, $controllerMethod], $params);
        } elseif (is_callable($callback)) {
             // Call the closure with extracted parameters
            $response = call_user_func_array($callback, $params);
        } else {
             // Handle cases where callback is not valid (optional, but good practice)
             header("HTTP/1.0 500 Internal Server Error");
             echo json_encode(['status' => 'error', 'message' => 'Invalid route configuration']);
             exit;
        }

        // --- New Part: Echo the response ---
        if ($response !== null) {
            // Assuming the controller returns an array (prepared by Response::json)
            // If headers are not already sent (Response::json sends them), send default JSON header
            if (!headers_sent()) {
                 header('Content-Type: application/json');
            }
            echo json_encode($response);
        }
        // If $response is null, it means the controller handled output itself or there was nothing to output.
    }
}