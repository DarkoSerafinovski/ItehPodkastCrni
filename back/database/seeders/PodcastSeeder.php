<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Podcast;
use App\Models\User;

class PodcastSeeder extends Seeder
{
    public function run()
    {
        Podcast::factory()->count(10)->create();
        $users = User::all();
        $users->each(function ($user) {
            
            $podkasti = Podcast::inRandomOrder()->take(3)->pluck('id');
            $user->listaOmiljenihPodkasta()->attach($podkasti);
            $podkasti = Podcast::inRandomOrder()->take(3)->pluck('id');
            $user->mojiPodkasti()->attach($podkasti);
        });
    }
}
