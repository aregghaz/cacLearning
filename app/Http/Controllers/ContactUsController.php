<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Jobs\SendEmail;

class ContactUsController extends Controller
{
    public function send(Request $request)
    {
        $email = $request->input("email");
        $subject = "";
        if ($request->has("subject")) {
            $subject = $request->input("subject");
        }
        if ($request->has("service")) {
            $subject = $request->input("service");
        }

        $message = $subject
                    ." </br> "
                    .$request->input("fullName")
                    ." </br> "
                    .$request->input("phoneNumber")
                    ." </br> "
                    .$request->input("message");

        $subject. = " - Message from the website";

        $job = new SendEmail($email, $message, $subject);

        $this->dispatch($job);
    }
}
