<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EmailSubscription;

class EmailSubscriptionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $email_subscriptions = EmailSubscription::get();
        return response()->json($email_subscriptions);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $email_subscription = EmailSubscription::find($id);
        $email_subscription->delete();

        return response()->json('1', 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function save(Request $request)
    {
        $email_subscription = new EmailSubscription();
        $email_subscription->email = $request->input("email");
        $email_subscription->save();
        return response()->json('1', 200);
    }
}
