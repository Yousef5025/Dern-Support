<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => 1, // Assuming a user with ID 1 exists
            'device_name' => $this->faker->word(),
            'description' => $this->faker->sentence(8),
            'statues' => 'pending',
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
