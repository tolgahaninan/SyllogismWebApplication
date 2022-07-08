<?php

namespace Database\Seeders;

use App\Models\SiteInfo;
use Illuminate\Database\Seeder;

class SiteinfoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        SiteInfo::create([
            'phone' => "0536 637 61 06",
            'email' => "tolgahaninan34@gmail.com",
            'location' => "Gungoren / Istanbul",
        ]);
    }
}
