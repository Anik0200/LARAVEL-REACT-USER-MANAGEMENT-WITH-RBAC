<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

class AuthenticationController extends Controller
{

    /**
     * Authenticate the user
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function authenticate(Request $request)
    {
        // Validate the request
        $validator = Validator::make(request()->all(),
            [
                'email'    => 'required',
                'password' => 'required',
            ],
            [
                'email.required'    => 'Email is required',
                'password.required' => 'Password is required',
            ]
        );

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'error'  => $validator->errors(),
            ]);
        }

        // Check if the user exists
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user  = Auth::user();
            $token = $user->createToken('token')->plainTextToken;

            $role = $user->getRoleNames()->first();

            

            return response()->json([
                'status'  => true,
                'id'      => Auth::user()->id,
                'role'    => $role,
                'token'   => $token,
                'message' => 'Login successfully',
            ]);
        } else {
            return response()->json([
                'status'  => false,
                'message' => 'Login failed',
            ]);
        }
    }

    /**
     * Check if the user is authenticated
     *
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function roleCheck($id)
    {
        // Check if the user exists
        $user = User::with(['roles', 'permissions'])->find($id);

        if (!$user) {
            return response()->json([
                'status'  => false,
                'message' => 'User not found',
            ]);
        }

        return response()->json([
            'status' => true,
            'user'   => [
                'id'          => $user->id,
                'name'        => $user->name,
                'email'       => $user->email,
                'role_names'  => $user->getRoleNames(),
                'permissions' => $user->getAllPermissions()->pluck('name'),
            ],
        ]);

    }

    /**
     * Check if the user has permission
     *
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function permissionCheck()
    {
        // Check if the user exists
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'status'  => false,
                'message' => 'User Not Authorized!',
            ]);
        }

        return response()->json([
            'status' => true,
            'user'   => [
                'permission_name' => $user->getAllPermissions()->pluck('name'),
            ],
        ]);
    }

    /**
     * Get the user
     *
     * @param int $id
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function user($id)
    {
        $user = User::with(['roles', 'permissions'])->where('id', $id)->first();

        if (!$user) {
            return response()->json([
                'status'  => false,
                'message' => 'User not found!',
            ]);
        }

        return response()->json([
            'status' => true,
            'user'   => [
                'id'    => $user->id,
                'name'  => $user->name,
                'email' => $user->email,
                'image' => $user->image,
                'role'  => $user->getRoleNames(),
            ],
        ]);
    }

    /**
     * Update the user
     *
     * @param \Illuminate\Http\Request $request
     * @param int                      $id
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function userUpdate(Request $request, $id)
    {

        // user check
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'status'  => false,
                'message' => 'User not found',
            ]);
        }

        // Validate the request
        $validator = Validator::make(request()->all(),
            [
                'name'     => 'required|max:50',
                'email'    => 'required|email|max:200',
                'password' => 'nullable|min:8|max:20',
                'image'    => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ],

            [
                'name.required'  => 'Name is required',
                'name.max'       => 'Name must be less than 50 characters',
                'email.required' => 'Email is required',
                'email.email'    => 'Email must be a valid email address',
                'email.max'      => 'Email must be less than 200 characters',
                'password.min'   => 'Password must be at least 8 characters',
                'password.max'   => 'Password must be less than 20 characters',
            ]
        );

        // Check if validation fails
        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'error'  => $validator->errors(),
            ]);
        }

        // Check And Update Image
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

        // Update User
        $user->update([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => $request->password ? bcrypt($request->password) : $user->password,
            'image'    => $imageName,
        ]);

        return response()->json([
            'status'  => true,
            'message' => 'User updated!',
        ]);
    }

    /**
     * Logout the user (Invalidate the token)
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function logout()
    {
        // user logout
        $user = User::find(Auth::user()->id);
        $user->tokens()->delete();

        return response()->json([
            'status' => true,
        ]);
    }
}
