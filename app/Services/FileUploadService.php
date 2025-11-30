<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileUploadService
{
    /**
     * Upload a file with secure renaming.
     *
     * @param UploadedFile $file
     * @param string $directory
     * @param array $allowedExtensions
     * @return string
     * @throws \Exception
     */
    public function upload(UploadedFile $file, string $directory = 'uploads', array $allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png']): string
    {
        $extension = $file->getClientOriginalExtension();

        if (!in_array(strtolower($extension), $allowedExtensions)) {
            throw new \Exception("Invalid file type. Allowed: " . implode(', ', $allowedExtensions));
        }

        $hashName = Str::random(40) . '.' . $extension;

        // Store the file
        $path = $file->storeAs($directory, $hashName);

        return $path;
    }
}
