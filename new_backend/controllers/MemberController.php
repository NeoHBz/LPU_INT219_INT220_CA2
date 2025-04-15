<?php

namespace App\Controllers;

use App\Models\Member;
use App\Utils\Response;
use App\Auth\JWT;

class MemberController {
    private $membersModel;
    
    public function __construct() {
        $this->membersModel = new Member();
    }
    
    public function listAll(): array {
        $members = $this->membersModel->findAll();
        return Response::json([
            'status' => 'success',
            'data' => $members
        ]);
    }

    public function create(array $data): array {
        $member = $this->membersModel->create($data);
        return Response::json([
            'status' => 'success',
            'data' => $member
        ]);
    }
}