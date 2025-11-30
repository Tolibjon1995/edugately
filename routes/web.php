<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UniversityController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\AccountantController;
use App\Http\Controllers\ManagerController;
use App\Http\Controllers\NotaryController;
use App\Http\Controllers\StudentController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Public Routes
Route::get('/', function () {
    return view('welcome'); // or redirect to universities
});

Route::get('/universities', [UniversityController::class, 'index'])->name('universities.index');
Route::get('/universities/{id}', [UniversityController::class, 'show'])->name('universities.show');

// Registration Flow
Route::get('/signup', [RegistrationController::class, 'showRegistrationForm'])->name('signup.form');
Route::post('/signup', [RegistrationController::class, 'register'])->name('signup.submit');
Route::get('/signup/payment', [RegistrationController::class, 'paymentStep'])->name('signup.payment');

// Protected Routes
Route::middleware(['auth'])->group(function () {

    // Student Routes
    Route::middleware(['role:student'])->prefix('student')->name('student.')->group(function () {
        Route::get('/dashboard', [StudentController::class, 'dashboard'])->name('dashboard');
        Route::get('/timeline', [StudentController::class, 'timeline'])->name('timeline');
        Route::post('/upload-receipt', [StudentController::class, 'uploadReceipt'])->name('uploadReceipt'); // Service Fee
        Route::post('/upload-tuition', [StudentController::class, 'uploadTuitionReceipt'])->name('uploadTuition'); // Tuition Fee
    });

    // Accountant Routes
    Route::middleware(['role:accountant'])->prefix('accountant')->name('accountant.')->group(function () {
        Route::get('/payments', [AccountantController::class, 'approvedPayments'])->name('payments'); // View lists
        Route::post('/verify-payment/{applicationId}', [AccountantController::class, 'verifyPayment'])->name('verifyPayment');
        Route::post('/verify-tuition/{applicationId}', [AccountantController::class, 'verifyTuition'])->name('verifyTuition');
    });

    // Manager & SuperManager Routes
    // Assuming SuperManager can access Manager routes + more
    Route::middleware(['role:manager|super_manager'])->prefix('manager')->name('manager.')->group(function () {
        Route::get('/students', [ManagerController::class, 'studentsList'])->name('students');
        Route::get('/student/{id}', [ManagerController::class, 'studentDetail'])->name('student.detail');
        // SuperManager specific
        Route::post('/assign-manager', [ManagerController::class, 'assignManager'])->name('assignManager')->middleware('role:super_manager');
        Route::post('/send-to-notary', [ManagerController::class, 'sendToNotary'])->name('sendToNotary');
        Route::post('/submit-university', [ManagerController::class, 'submitToUniversity'])->name('submitToUniversity');
        Route::post('/upload-contract', [ManagerController::class, 'uploadContract'])->name('uploadContract');
    });

    // Notary Routes
    Route::middleware(['role:notary'])->prefix('notary')->name('notary.')->group(function () {
        Route::get('/dashboard', [NotaryController::class, 'dashboard'])->name('dashboard');
        Route::post('/upload-translation/{applicationId}', [NotaryController::class, 'uploadTranslation'])->name('uploadTranslation');
    });

});
