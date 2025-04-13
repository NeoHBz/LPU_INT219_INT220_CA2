<?php

namespace App\Routing;

class Router {
    private $routes = [
        'GET' => [],
        'POST' => [],
        'PUT' => [],
        'DELETE' => []
    ];
    
    public function get($route, $controller) {
        $this->routes['GET'][$route] = $controller;
        return $this;
    }
    
    public function post($route, $controller) {
        $this->routes['POST'][$route] = $controller;
        return $this;
    }
    
    public function put($uri, $controller) {
        $this->routes['PUT'][$uri] = $controller;
        return $this;
    }
    
    public function delete($uri, $controller) {
        $this->routes['DELETE'][$uri] = $controller;
        return $this;
    }
    
    public function middleware($middleware) {
        // Simple method to support method chaining, but does nothing for simplicity
        return $this;
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