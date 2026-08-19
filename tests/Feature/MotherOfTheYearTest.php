<?php

namespace Tests\Feature;

use Database\Seeders\UserSeeder;
use App\Models\User;
use App\Models\Alert;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MotherOfTheYearTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_catalog_is_accessible(): void
    {
        $this->seed(UserSeeder::class);

        $response = $this->get('/');
        $response->assertStatus(200);
    }

    public function test_client_can_register_with_specialist_id(): void
    {
        $response = $this->post('/register', [
            'name' => 'Emma',
            'surname' => 'Watson',
            'email' => 'emma@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'phone_number' => '+44 7911 999888',
            'date_of_birth' => '1991-03-12',
            'billing_address' => '10 Downing St',
            'billing_city' => 'London',
            'billing_country' => 'United Kingdom',
            'billing_postal_code' => 'SW1A 2AA',
            'terms' => true,
            'specialist_id' => 2,
        ]);

        $response->assertRedirect('/dashboard');

        $this->assertDatabaseHas('users', [
            'name' => 'Emma',
            'surname' => 'Watson',
            'email' => 'emma@example.com',
            'specialist_id' => 2,
        ]);
    }

    public function test_telegram_webhook_returns_200_ok_instantly(): void
    {
        $response = $this->postJson('/api/telegram/webhook', [
            'update_id' => 12345678,
            'message' => [
                'chat' => ['id' => 999001],
                'text' => '/start sample_token',
                'from' => ['id' => 999001, 'username' => 'test_mom'],
            ],
        ]);

        $response->assertStatus(200)
            ->assertJson(['status' => 'ok']);
    }

    public function test_authenticated_mother_can_view_dashboard(): void
    {
        $this->seed(UserSeeder::class);

        $user = User::first();

        $response = $this->actingAs($user)->get('/dashboard');
        $response->assertStatus(200);
    }

    public function test_custom_404_error_page_is_rendered(): void
    {
        $response = $this->get('/non-existent-page-url');
        $response->assertStatus(404);
    }
}
