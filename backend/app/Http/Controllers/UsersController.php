<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class UsersController extends Controller
{
    public function index()
    {
        $users = User::whereDoesntHave('roles', function ($query) {$query->where('name', 'admin');})
            ->with(['roles', 'permissions'])
            ->paginate(3);

        return response()->json([
            'status' => true,
            'users'  => $users,
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make(request()->all(),
            [
                'name'  => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'image' => 'nullable|mimes:jpeg,png,jpg,gif|max:2048',
                'role'  => 'required',
            ],
            [
                'name.required'  => 'Name is required',
                'email.required' => 'Email is required',
                'image.mimes'    => 'Image must be a valid image type',
                'image.max'      => 'Image must be less than 2MB',
                'role.required'  => 'Role is required',
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'error'  => $validator->errors(),
            ]);
        }

        if ($request->hasFile('image')) {
            $image     = $request->file('image');
            $imageName = time() . '-' . 'userProfile' . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('storage/userProfile'), $imageName);
        } else {
            $imageName = null;
        }

        if ($request->role) {
            $user = User::create([
                'name'              => $request->name,
                'email'             => $request->email,
                'image'             => $imageName,
                'password'          => bcrypt('12345678'),

                'email_verified_at' => now(),
                'remember_token'    => Str::random(10),
            ]);

            $user->assignRole($request->role);
        } else {
            return response()->json([
                'status'  => false,
                'message' => 'Role is required',
            ]);
        }

        return response()->json([
            'status'  => true,
            'message' => 'User Created!',
        ]);
    }

    public function usersUpdate(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status'  => false,
                'message' => 'User not found',
            ]);
        }

        $validator = Validator::make(request()->all(),
            [
                'name'  => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
                'image' => 'nullable|mimes:jpeg,png,jpg,gif|max:2048',
                'role'  => 'required',
            ],
            [
                'name.required'  => 'Name is required',
                'email.required' => 'Email is required',
                'image.mimes'    => 'Image must be a valid image type',
                'image.max'      => 'Image must be less than 2MB',
                'role.required'  => 'Role is required',
            ]
        );

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'error'  => $validator->errors(),
            ]);
        }

        // // Check And Update Image
        if ($request->hasFile('image')) {

            // Delete Old Image
            if (File::exists(public_path('storage/userProfile/' . $user->image))) {
                File::delete(public_path('storage/userProfile/' . $user->image));
            }

            //Upload New Image
            $image     = $request->file('image');
            $imageName = time() . '-' . 'userProfile' . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('storage/userProfile'), $imageName);
        } else {
            $imageName = $user->image ?? null;
        }

        $user->update([
            'name'  => $request->name,
            'email' => $request->email,
            'image' => $imageName,
        ]);

        $user->syncRoles($request->role);

        return response()->json([
            'status'  => true,
            'message' => 'User Updated!',
        ]);
    }

    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status'  => false,
                'message' => 'User not found',
            ]);
        }

        if (File::exists(public_path('storage/userProfile/' . $user->image))) {
            File::delete(public_path('storage/userProfile/' . $user->image));
        }

        $user->delete();

        return response()->json([
            'status'  => true,
            'message' => 'User Deleted!',
        ]);
    }

    public function roles()
    {
        $roles = Role::whereNot('name', 'admin')->get();

        return response()->json([
            'status' => true,
            'roles'  => $roles,
        ]);
    }
}
