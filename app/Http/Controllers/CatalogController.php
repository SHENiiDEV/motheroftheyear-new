<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CatalogController extends Controller
{
    public function index(): Response
    {
        $doctors = [
            User::getSpecialistConfig(1),
            User::getSpecialistConfig(2),
            User::getSpecialistConfig(3),
            User::getSpecialistConfig(4),
            User::getSpecialistConfig(5),
        ];

        $botUsername = env('TELEGRAM_BOT_USERNAME', 'MotherOfTheYearBot');

        return Inertia::render('Catalog', [
            'doctors' => $doctors,
            'botUsername' => $botUsername,
        ]);
    }
}
