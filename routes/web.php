<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Staff\AccountantController;
use App\Http\Controllers\Staff\NotaryController;
use App\Http\Controllers\Student\ApplicationController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Auth Routes (Scaffolding usually provides these, but for now we assume they exist or we use basic)
// Route::auth();

Route::middleware(['auth'])->group(function () {

    // Student Routes
    Route::group(['middleware' => ['role:student'], 'prefix' => 'student', 'as' => 'student.'], function () {
        Route::get('/dashboard', [ApplicationController::class, 'dashboard'])->name('dashboard'); // Assuming dashboard method exists or added
        Route::post('/upload-receipt', [ApplicationController::class, 'uploadReceipt'])->name('uploadReceipt');
    });

    // Accountant Routes
    Route::group(['middleware' => ['role:accountant'], 'prefix' => 'staff/accountant', 'as' => 'accountant.'], function () {
        Route::get('/dashboard', [AccountantController::class, 'dashboard'])->name('dashboard');
        Route::post('/approve-payment/{applicationId}', [AccountantController::class, 'approvePayment'])->name('approvePayment');
    });

    // Notary Routes
    Route::group(['middleware' => ['role:notary'], 'prefix' => 'staff/notary', 'as' => 'notary.'], function () {
        Route::get('/dashboard', [NotaryController::class, 'dashboard'])->name('dashboard');
        Route::post('/upload-translation', [NotaryController::class, 'uploadTranslation'])->name('uploadTranslation');
    });

    // Super Manager Routes
    Route::group(['middleware' => ['role:super_manager'], 'prefix' => 'staff/super-manager', 'as' => 'super_manager.'], function () {
        Route::get('/dashboard', [\App\Http\Controllers\Staff\SuperManagerController::class, 'dashboard'])->name('dashboard');
        Route::post('/assign-manager', [\App\Http\Controllers\Staff\SuperManagerController::class, 'assignManager'])->name('assignManager');
    });

    // Manager Routes (Placeholder for future logic)
    Route::group(['middleware' => ['role:manager'], 'prefix' => 'staff/manager', 'as' => 'manager.'], function () {
         // Route::get('/dashboard', ...);
    });

});
