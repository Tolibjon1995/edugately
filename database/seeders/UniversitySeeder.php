<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\University;

class UniversitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $universities = [
            [
                'name' => 'Harvard University',
                'country' => 'USA',
                'logo' => 'harvard_logo.png',
                'description' => 'A prestigious university in Cambridge, Massachusetts.',
            ],
            [
                'name' => 'University of Oxford',
                'country' => 'UK',
                'logo' => 'oxford_logo.png',
                'description' => 'A collegiate research university in Oxford, England.',
            ],
            [
                'name' => 'Tashkent State University of Economics',
                'country' => 'Uzbekistan',
                'logo' => 'tsue_logo.png',
                'description' => 'Leading economic university in Central Asia.',
            ],
        ];

        foreach ($universities as $uni) {
            University::create($uni);
        }
    }
}
