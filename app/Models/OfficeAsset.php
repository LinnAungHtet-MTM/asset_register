<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Depreciation;

class OfficeAsset extends Model
{
    use HasFactory;
    protected $primaryKey = 'office_asset_id'; // Set the primary key

    public function depreciation()
    {
        return $this->hasOne(Depreciation::class, 'office_asset_id', 'office_asset_id');
    }

    public function assetCode()
    {
        return $this->belongsTo(AssetCode::class, 'asset_code_id');
    }
}
