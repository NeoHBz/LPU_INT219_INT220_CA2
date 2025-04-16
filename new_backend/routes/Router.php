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
    
    // Unified method for registering routes
    private function addRoute($method, $route, $controller) {
        $this->routes[$method][$route] = $controller;
        $this->currentRoute = ['method' => $method, 'route' => $route];
        return $this;
    }
    
    public function get($route, $controller) {
        return $this->addRoute('GET', $route, $controller);
    }
    
    public function post($route, $controller) {
        return $this->addRoute('POST', $route, $controller);
    }
    
    public function put($route, $controller) {
        return $this->addRoute('PUT', $route, $controller);
    }
    
    public function delete($route, $controller) {
        return $this->addRoute('DELETE', $route, $controller);
    }
    
    public function middleware($middleware) {
        if (!$this->currentRoute) {
            return $this;
        }
        
        $method = $this->currentRoute['method'];
        $route = $this->currentRoute['route'];
        
        if (!isset($this->middlewares[$method][$route])) {
            $this->middlewares[$method][$route] = [];
        }
        
        $middlewares = is_array($middleware) ? $middleware : [$middleware];
        $this->middlewares[$method][$route] = array_merge(
            $this->middlewares[$method][$route], 
            $middlewares
        );
        
        return $this;
    }
    
    private function resolveMiddleware($middleware) {
        return isset($this->middlewareAliases[$middleware]) 
            ? $this->middlewareAliases[$middleware] 
            : $middleware;
    }
    
    private function handleMiddlewares($method, $path) {
        if (!isset($this->middlewares[$method][$path])) {
            return true;
        }
        
        foreach ($this->middlewares[$method][$path] as $middleware) {
            $middleware = $this->resolveMiddleware($middleware);
            
            if (is_string($middleware)) {
                $middleware = new $middleware();
            }
            
            if (!method_exists($middleware, 'handle')) {
                continue;
            }
            
            $response = $middleware->handle();
            
            if ($response === false) {
                $this->sendJsonResponse(['status' => 'error', 'message' => 'Forbidden'], 403);
                return false;
            }
            
            if (is_array($response)) {
                $this->sendJsonResponse($response);
                return false;
            }
        }
        
        return true;
    }
    
    private function findRoute($method, $path) {
        if (!isset($this->routes[$method])) {
            return [null, null, null];
        }
        
        // First try exact match
        if (isset($this->routes[$method][$path])) {
            return [$this->routes[$method][$path], [], $path];
        }
        
        // Then try pattern matching
        foreach ($this->routes[$method] as $routePath => $callback) {
            $pattern = preg_replace('/\{(\w+)\}/', '([^/]+)', $routePath);
            $pattern = '#^' . $pattern . '$#';
            
            if (preg_match($pattern, $path, $matches)) {
                array_shift($matches);
                return [$callback, $matches, $routePath];
            }
        }
        
        return [null, null, null];
    }
    
    private function sendJsonResponse($data, $statusCode = 200) {
        http_response_code($statusCode);
        if (!headers_sent()) {
            header('Content-Type: application/json');
        }
        echo json_encode($data);
        exit;
    }
    
    public function resolve() {
        $method = $_SERVER['REQUEST_METHOD'];
        $path = $_SERVER['PATH_INFO'] ?? '/';
        
        [$callback, $params, $routePath] = $this->findRoute($method, $path);
        
        if (!$callback) {
            $this->sendJsonResponse(['status' => 'error', 'message' => 'Not Found'], 404);
        }
        
        if (!$this->handleMiddlewares($method, $routePath)) {
            return; // Middleware handled the response
        }
        
        $response = null;
        
        if (is_array($callback)) {
            $controller = new $callback[0]();
            $response = call_user_func_array([$controller, $callback[1]], $params);
        } elseif (is_callable($callback)) {
            $response = call_user_func_array($callback, $params);
        } else {
            $this->sendJsonResponse(['status' => 'error', 'message' => 'Invalid route configuration'], 500);
        }
        
        if ($response !== null) {
            $this->sendJsonResponse($response);
        }
    }
}