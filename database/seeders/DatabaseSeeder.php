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
        User::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin',
            'username' => 'admin123',
            'email' => 'admin@gmail.com',
            'password'=>bcrypt('123123123'),
            'gender' => 'male',
            'phone' => '+959123123123',
        ]);
    }
}
