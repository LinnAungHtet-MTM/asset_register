<?php

use App\Http\Controllers\FixedAssetController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Models\Depreciation;
use App\Models\OfficeAsset;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/office-assets', function () {
    return Inertia('Dashboard', [
        'datas' => Depreciation::with('officeAsset.assetCode.assetClass')->get()
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboard', [FixedAssetController::class, 'create'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/dashboard', [FixedAssetController::class, 'store']);
    Route::get('/officeAsset', [FixedAssetController::class, 'index']);
    Route::get('/file-upload', [PostController::class, 'create']);
    Route::get('/posts', [PostController::class, 'index']);
    Route::post('/file-upload', [PostController::class, 'store']);
    Route::put('/dashboard/edit/{id}', [FixedAssetController::class, 'update']);
});

require __DIR__ . '/auth.php';
