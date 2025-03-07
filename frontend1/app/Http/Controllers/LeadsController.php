<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Leads;  // Use the correct model name: Leads
use Illuminate\Support\Facades\Auth;

class LeadsController extends Controller
{
    // 🛠 Fetch only leads that belong to the authenticated user
    public function index() {
        $leads = Leads::where('user_id', Auth::id())->get();
        return response()->json($leads);
    }

    // 🛠 Store leads data and associate it with the logged-in user
    public function store(Request $request) {
        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'email' => 'required|email', 
            'phone' => 'nullable|string|max:20',
            'stage' => 'nullable|string',
            'assigned_agent' => 'nullable|string',
            'tag' => 'nullable|string',
            'deals' => 'nullable|string',
            'source' => 'nullable|string',
            'last_communication' => 'nullable|date',
        ]);

        $leads = new Leads($validatedData);
        $leads->user_id = Auth::id();  // Assign the logged-in user ID
        $leads->save();

        return response()->json(['message' => 'Leads added successfully', 'leads' => $leads], 201);
    }

    // 🛠 Delete a lead by ID
    public function destroy($id)
    {
        // Find the lead that belongs to the authenticated user
        $leads = Leads::where('id', $id)->where('user_id', Auth::id())->first();

        if (!$leads) {
            return response()->json(['message' => 'Leads not found or unauthorized'], 404);
        }

        try {
            $leads->delete();
            return response()->json(['message' => 'Leads deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to delete leads', 'error' => $e->getMessage()], 500);
        }
    }
}
