<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\AssetCode;

class AssetClass extends Model
{
    use HasFactory;

    protected $primaryKey = 'asset_class_id';

    public function assetCodes()
    {
        return $this->hasMany(AssetCode::class, 'asset_class_id');
    }
}
