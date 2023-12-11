<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FixedAsset extends Model
{
    use HasFactory;

    protected $fillable = [
        'asset_name',
        'asset_class',
        'units',
        'code',
         'acquisition_date',
         'acquisition_cost',
         'discount',
        'Net_cost',
        'Dep%',
    ];
}
