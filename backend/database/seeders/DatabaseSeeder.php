<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('admins')->insert([
            'name' => 'geefiw',
            'email' => 'geefiw@gmail.com',
            'password' => bcrypt('123456')
        ]);

        /*DB::table('templates')->insert([
            [
                'mockup_front' => 'aaa.png',
                'mockup_back' => 'bbb.png',
                'name' => 'Tradicional feminina'
            ], 
        ]);*/
    }
}
