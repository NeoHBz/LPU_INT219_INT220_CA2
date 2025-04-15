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

        $callback = $this->routes[$method][$path] ?? false;

        if (!$callback) {
            header("HTTP/1.0 404 Not Found");
            echo json_encode(['status' => 'error', 'message' => 'Not Found']);
            exit;
        }

        // Run middlewares for this route
        $this->runMiddlewares($method, $path);

        if (is_array($callback)) {
            $controller = new $callback[0]();
            $method = $callback[1];
            
            $response = $controller->$method();
            echo json_encode($response);
            return;
        }
        
        // If $callback is a closure/function
        if (is_callable($callback)) {
            echo call_user_func($callback);
        }
    }
}