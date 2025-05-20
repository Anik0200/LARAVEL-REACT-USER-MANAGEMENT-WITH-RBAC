<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        // Create Role
        $role = Role::create(['name' => 'admin']);
        $role = Role::create(['name' => 'operator']);
        $role = Role::create(['name' => 'user']);

        // Create Permission
        $permission = Permission::create(['name' => 'create']);
        $permission = Permission::create(['name' => 'update']);
        $permission = Permission::create(['name' => 'delete']);

        // Assign Permission To Role
        $role = Role::findByName('admin');
        $role->givePermissionTo('create');
        $role->givePermissionTo('update');
        $role->givePermissionTo('delete');

        $role = Role::findByName('operator');
        $role->givePermissionTo('create');
        $role->givePermissionTo('update');

        // Create User With Assign Role
        $userOne = User::factory()->create([
            'name'              => 'Anik',
            'email'             => 'anik@gmail.com',
            'password'          => bcrypt('12345678'),
            'email_verified_at' => now(),
            'remember_token'    => Str::random(10),
        ]);

        $userOne->assignRole('admin');

        $userTwo = User::factory()->create([
            'name'              => 'Nabil',
            'email'             => 'nabil@gmail.com',
            'password'          => bcrypt('12345678'),
            'email_verified_at' => now(),
            'remember_token'    => Str::random(10),
        ]);

        $userTwo->assignRole('operator');

        $userThree = User::factory()->create([
            'name'              => 'Nafiz',
            'email'             => 'nafiz@gmail.com',
            'password'          => bcrypt('12345678'),
            'email_verified_at' => now(),
            'remember_token'    => Str::random(10),
        ]);

        $userThree->assignRole('user');

    }
}
