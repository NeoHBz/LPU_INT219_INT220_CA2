<?php
class EnvParser {
    private $envVars = [];
    private $requiredVars = [];
    private $missingVars = [];
    
    /**
     * Constructor initializes with required variable categories
     * 
     * @param array $requiredVars Multidimensional array of required env variables
     */
    public function __construct(array $requiredVars = []) {
        $this->requiredVars = $requiredVars;
    }
    
    /**
     * Parse environment variables from .env file
     * 
     * @param string $envFilePath Path to .env file
     * @return bool True if parsing was successful, false otherwise
     */
    public function parse(string $envFilePath = ".env"): bool {
        $env = [];
        $envFile = @fopen($envFilePath, "r");
        
        if (!$envFile) {
            return false;
        }
        
        while (($line = fgets($envFile)) !== false) {
            // Skip comments and empty lines
            if (trim($line) === "" || strpos(trim($line), "#") === 0 || strpos(trim($line), "//") === 0) {
                continue;
            }
            
            // Split the line into key and value
            list($key, $value) = explode("=", trim($line), 2);
            // Strip quotes from value
            $value = trim($value, '"\'');
            $env[trim($key)] = $value;
        }
        
        fclose($envFile);
        
        // Store the parsed variables
        $this->envVars = $env;
        
        // Check required variables
        $this->checkRequiredVars();
        
        return true;
    }
    
    /**
     * Check if all required environment variables are set
     */
    private function checkRequiredVars(): void {
        $this->missingVars = [];
        
        foreach ($this->requiredVars as $category => $vars) {
            foreach ($vars as $var) {
                if (!isset($this->envVars[$var])) {
                    $this->missingVars[] = $var;
                }
            }
        }
    }
    
    /**
     * Get all environment variables
     * 
     * @return array All parsed environment variables
     */
    public function getAll(): array {
        return $this->envVars;
    }
    
    /**
     * Get a specific environment variable
     * 
     * @param string $name Variable name
     * @param mixed $default Default value if variable not found
     * @return mixed Variable value or default if not found
     */
    public function get(string $name, $default = null) {
        return isset($this->envVars[$name]) ? $this->envVars[$name] : $default;
    }
    
    /**
     * Get all missing required variables
     * 
     * @return array List of missing variable names
     */
    public function getMissingVars(): array {
        return $this->missingVars;
    }
    
    /**
     * Check if all required variables are set
     * 
     * @return bool True if all required variables are set, false otherwise
     */
    public function isValid(): bool {
        return count($this->missingVars) === 0;
    }
    
    /**
     * Print all environment variables
     * 
     * @return string Formatted environment variables string
     */
    public function printVars(bool $showSecrets): string {
        $output = "\n";
        foreach ($this->requiredVars as $category => $vars) {
            foreach ($vars as $var) {
                if (isset($this->envVars[$var])) {
                    $output .= "$var: " . ($showSecrets ? $this->envVars[$var] : str_repeat('*', strlen($this->envVars[$var]))) . "\n";
                } else {
                    $output .= "$var: Not set\n";
                }
            }
        }
        
        if (count($this->missingVars) > 0) {
            $output .= "Error: Missing environment variables: " . implode(", ", $this->missingVars) . "\n";
        }
        
        return $output;
    }
    
    /**
     * Export variables to global scope if needed
     */
    public function exportToGlobals(): void {
        foreach ($this->envVars as $key => $value) {
            $GLOBALS[$key] = $value;
        }
    }
}
?>