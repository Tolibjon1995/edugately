<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Application;
use App\Models\University;
use App\Models\Document;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RolesAndPermissionsSeeder::class,
            UniversitySeeder::class,
        ]);

        $password = Hash::make('password');

        // 1. Admin
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => $password,
        ]);
        $admin->assignRole('admin');

        // 2. Accountant
        $accountant = User::create([
            'name' => 'Accountant User',
            'email' => 'accountant@example.com',
            'password' => $password,
        ]);
        $accountant->assignRole('accountant');

        // 3. Super Manager
        $superManager = User::create([
            'name' => 'Super Manager',
            'email' => 'supermanager@example.com',
            'password' => $password,
        ]);
        $superManager->assignRole('super_manager');

        // 4. Notary
        $notary = User::create([
            'name' => 'Notary User',
            'email' => 'notary@example.com',
            'password' => $password,
        ]);
        $notary->assignRole('notary');

        // 5. Manager 1
        $manager1 = User::create([
            'name' => 'Manager One',
            'email' => 'manager1@example.com',
            'password' => $password,
        ]);
        $manager1->assignRole('manager');

        // 6. Student Pending (Just registered and applied)
        $studentPending = User::create([
            'name' => 'Student Pending',
            'email' => 'student.pending@example.com',
            'password' => $password,
        ]);
        $studentPending->assignRole('student');

        $uni = University::first();

        $appPending = Application::create([
            'user_id' => $studentPending->id,
            'university_id' => $uni->id,
            'status' => 'pending',
        ]);

        // Add initial documents
        Document::create([
            'application_id' => $appPending->id,
            'type' => 'passport',
            'file_path' => 'documents/passport_pending.pdf',
            'status' => 'pending',
        ]);

        // 7. Student Paid (Service fee paid and approved)
        $studentPaid = User::create([
            'name' => 'Student Paid',
            'email' => 'student.paid@example.com',
            'password' => $password,
        ]);
        $studentPaid->assignRole('student');

        $appPaid = Application::create([
            'user_id' => $studentPaid->id,
            'university_id' => $uni->id,
            'status' => 'payment_approved', // Accountant approved
            'is_service_fee_paid' => true,
        ]);

        // Documents for paid student
        Document::create([
            'application_id' => $appPaid->id,
            'type' => 'passport',
            'file_path' => 'documents/passport_paid.pdf',
            'status' => 'approved',
        ]);
        Document::create([
            'application_id' => $appPaid->id,
            'type' => 'check_service',
            'file_path' => 'documents/check_service_paid.pdf',
            'status' => 'approved',
        ]);

        // 8. Student Enrolled (Full flow)
        $studentEnrolled = User::create([
            'name' => 'Student Enrolled',
            'email' => 'student.enrolled@example.com',
            'password' => $password,
        ]);
        $studentEnrolled->assignRole('student');

        $appEnrolled = Application::create([
            'user_id' => $studentEnrolled->id,
            'university_id' => $uni->id,
            'manager_id' => $manager1->id,
            'status' => 'enrolled',
            'is_service_fee_paid' => true,
            'is_contract_fee_paid' => true,
        ]);

        // Add all docs
        Document::create([
            'application_id' => $appEnrolled->id,
            'type' => 'contract',
            'file_path' => 'documents/contract_enrolled.pdf',
            'status' => 'approved',
        ]);
    }
}
