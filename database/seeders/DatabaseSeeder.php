<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        User::factory()->create([
            'name' => 'Admin',
            'username' => 'app.developer',
            'email' => 'app.developer@bfi-edu.com',
            'password' => bcrypt('123123123'),
            'gender' => 'male',
            'phone' => '+095025363',
        ]);
    }
}
