<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Run Roles Seeder (Ensure this exists or run logic here)
        $this->call(RolesAndPermissionsSeeder::class);

        // 2. Run University Seeder
        $this->call(UniversitySeeder::class);

        $password = Hash::make('password');

        // 3. Create Users for each role
        $users = [
            ['name' => 'Admin User', 'email' => 'admin@example.com', 'role' => 'admin'],
            ['name' => 'Accountant User', 'email' => 'accountant@example.com', 'role' => 'accountant'],
            ['name' => 'Super Manager', 'email' => 'supermanager@example.com', 'role' => 'super_manager'],
            ['name' => 'Manager User', 'email' => 'manager@example.com', 'role' => 'manager'],
            ['name' => 'Notary User', 'email' => 'notary@example.com', 'role' => 'notary'],
            ['name' => 'Student User', 'email' => 'student@example.com', 'role' => 'student'],
        ];

        foreach ($users as $userData) {
            $user = User::create([
                'name' => $userData['name'],
                'email' => $userData['email'],
                'password' => $password,
            ]);

            $user->assignRole($userData['role']);
        }
    }
}
