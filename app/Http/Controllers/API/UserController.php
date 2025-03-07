<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function getProfile()
    {
        /** @var User $user */
        $user = Auth::user();

        if ($user) {
            return response()->json([
                'success' => true,
                'data' => [
                    'fullName' => $user->name,
                    'email' => $user->email,
                    'phoneNumber' => $user->phone_number ?? '',
                    'address' => $user->address ?? '',
                    'avatar' => $user->avatar ?? '/default-avatar.png'
                ]
            ]);
        }

        return response()->json(['success' => false, 'message' => 'User not found'], 404);
    }

    public function updateProfile(Request $request)
    {
        /** @var User $user */
        $user = Auth::user();

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 401);
        }

        // 🛠 Updated validation rules to accept image files for avatar
        $validator = Validator::make($request->all(), [
            'fullName' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phoneNumber' => 'nullable|string|max:15',
            'address' => 'nullable|string|max:255',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 422);
        }

        // 🛠 Handle file upload for avatar
        if ($request->hasFile('avatar')) {
            $avatar = $request->file('avatar');
            $avatarName = time() . '.' . $avatar->getClientOriginalExtension();
            $avatar->move(public_path('uploads/avatars'), $avatarName);
            $user->avatar = '/uploads/avatars/' . $avatarName;  // Save path to DB
        }

        // 🛠 Direct assignment to avoid fill() issues
        $user->name = $request->input('fullName');
        $user->email = $request->input('email');
        $user->phone_number = $request->input('phoneNumber');
        $user->address = $request->input('address');
        
        // 🛠 Fix for red line under save()
        if (method_exists($user, 'save')) {
            $user->save();
        } else {
            return response()->json(['success' => false, 'message' => 'Save method not found'], 500);
        }

        return response()->json(['success' => true, 'message' => 'Profile updated successfully!']);
    }
}
