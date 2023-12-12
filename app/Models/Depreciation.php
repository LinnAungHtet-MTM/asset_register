<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\OfficeAsset;

class Depreciation extends Model
{
    use HasFactory;
    protected $primaryKey = 'depreciation_id'; // Set the primary key

    public function officeAsset()
    {
        return $this->belongsTo(OfficeAsset::class, 'office_asset_id', 'office_asset_id');
    }
}
