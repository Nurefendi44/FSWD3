<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::factory()->create([
            'first_name'       => 'ADS',
            'last_name'       => 'Store',
            'name'       => 'Admin',
            'email' => 'adsstore@gmail.com',
            'password' => bcrypt('adsstore_123')
        ]);
    }
}
