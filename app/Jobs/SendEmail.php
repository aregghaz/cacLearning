<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->emailAddress = $emailAddress;
        $this->messageText = $messageText;
        $this->subject = $subject;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $mail = new PHPMailer\PHPMailer(true);
        try{
           $mail->isSMTP();
           $mail->SMTPDebug = 0;
           $mail->SMTPAuth = true;
           $mail->SMTPSecure = env('MAIL_ENCRYPTION');
           $mail->Host = env('MAIL_HOST');
           $mail->Port = env('MAIL_PORT');
           $mail->Username = env('MAIL_USERNAME');
           $mail->Password = env('MAIL_PASSWORD');
           $mail->Subject = $this->subject;
           $mail->SetFrom(env('MAIL_USERNAME'), ." LAO");
           $mail->IsHTML(true);
           $mail->MsgHTML("$this->emailAddress"."</br>".$this->messageText);
           $mail->AddAddress(env('MAIL_ADDRESS'));
           $mail->CharSet = 'UTF-8';
           if(!$mail->Send()){
               return 0;
           }
           return 1;
        }catch(PHPMailer\Exception $e){
            dd($e);
        }
    }
}
