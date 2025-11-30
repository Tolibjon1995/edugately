# Study Abroad Agency - CRM Platform

Ushbu loyiha React.js frontendidan Laravel 10 monolit arxitekturasiga o'tkazilgan CRM tizimidir.

## O'rnatish va Ishga tushirish

1. **Repozitoriyni klonlash:**
   ```bash
   git clone <repo_url>
   cd <project_folder>
   ```

2. **Kutubxonalarni o'rnatish:**
   ```bash
   composer install
   npm install && npm run build
   ```

3. **Muhitni sozlash (.env):**
   `.env.example` faylidan nusxa oling va `.env` yarating. Ma'lumotlar bazasi sozlamalarini kiriting.
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Migratsiya va Seederlarni ishga tushirish (MUHIM):**
   Ma'lumotlar bazasini yaratish va boshlang'ich ma'lumotlarni (universitetlar, foydalanuvchilar, rollar) yuklash uchun:
   ```bash
   php artisan migrate:fresh --seed
   ```
   *Eslatma: Bu buyruq `UniversitySeeder` orqali `data.json` faylidan universitetlarni yuklaydi va barcha rollar uchun test foydalanuvchilarini yaratadi.*

## Tizimga Kirish (Login Credentials)

Barcha foydalanuvchilar uchun parol: `password`

- **Admin:** `admin@example.com`
- **Hisobchi (Accountant):** `accountant@example.com`
    - *Vazifasi:* To'lovlarni tasdiqlash (`service_fee_paid`).
- **Super Manager:** `supermanager@example.com`
    - *Vazifasi:* Menejerlarni tayinlash.
- **Manager:** `manager@example.com`
- **Notarius (Notary):** `notary@example.com`
    - *Vazifasi:* Hujjatlarni tarjima qilib yuklash (`translated`).
- **Talaba (Student):** `student@example.com`
    - *Vazifasi:* Hujjat topshirish va kvitansiya yuklash.

## Strukturaviy O'zgarishlar (Laravel 10 Strict)

- **Kernel:** `app/Http/Kernel.php` orqali middleware (`role`) ro'yxatdan o'tkazildi.
- **File Upload Service:** `app/Services/FileUploadService.php` barcha fayl yuklash jarayonlarini xavfsiz boshqaradi.
- **Seeder:** `UniversitySeeder` React loyihasidagi `data.json` faylidan ma'lumot oladi.

Muammolar bo'lsa, tizim loglarini tekshiring (`storage/logs/laravel.log`).
