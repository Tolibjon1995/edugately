<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\University;
use Illuminate\Support\Facades\File;

class UniversitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $jsonPath = base_path('src/containers/web/json/data.json');

        if (File::exists($jsonPath)) {
            $json = File::get($jsonPath);
            $data = json_decode($json, true);

            foreach ($data as $item) {
                University::create([
                    'name' => $item['univer'] ?? 'Unknown University',
                    'city' => $item['shahar'] ?? null,
                    'description' => $item['hobbi'] ?? null, // Mapping 'hobbi' to description as per prompt hint or just extra data
                    'country' => 'Uzbekistan', // Defaulting based on context of cities
                ]);
            }
        } else {
            // Fallback if file not found
            University::create([
                'name' => 'Default University',
                'city' => 'Tashkent',
                'country' => 'Uzbekistan'
            ]);
        }
    }
}
