<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up() {
        Schema::create('leads', function (Blueprint $table) {
           $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->string('stage')->nullable();
            $table->string('assigned_agent')->nullable();
            $table->string('tag')->nullable();
            $table->string('deals')->nullable();
            $table->string('source')->nullable();
            $table->timestamp('last_communication')->nullable();
            $table->timestamps();// This adds 'created_at' and 'updated_at'
            
        });
    }

    public function down() {
        Schema::dropIfExists('leads');
    }
};
