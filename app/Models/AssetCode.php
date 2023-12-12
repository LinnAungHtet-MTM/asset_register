<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\AssetClass;
use App\Models\OfficeAsset;

class AssetCode extends Model
{
    use HasFactory;

    protected $primaryKey = 'asset_code_id';

    public function assetClass()
    {
        return $this->belongsTo(AssetClass::class, 'asset_class_id');
    }

    public function officeAssets()
    {
        return $this->hasMany(OfficeAsset::class, 'asset_code_id');
    }
}
