<?php

namespace App\Controllers;

use App\Models\Memberships;
use App\Utils\Response;
use App\Auth\JWT;

class MembershipsController {
    private $membersModel;
    
    public function __construct() {
        $this->membersModel = new Memberships();
    }
    
    public function listAll(): array {
        $members = $this->membersModel->findAll();
        return Response::json([
            'status' => 'success',
            'data' => $members
        ]);
    }
}