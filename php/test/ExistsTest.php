<?php
declare(strict_types=1);

// StarWars SDK exists test

require_once __DIR__ . '/../starwars_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = StarWarsSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
