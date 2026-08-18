<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class LegalController extends Controller
{
    public function privacyPolicy(): Response
    {
        return Inertia::render('Legal/PrivacyPolicy');
    }

    public function termsOfService(): Response
    {
        return Inertia::render('Legal/TermsOfService');
    }

    public function medicalDisclaimer(): Response
    {
        return Inertia::render('Legal/MedicalDisclaimer');
    }
}
