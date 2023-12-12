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
        'net_cost',
        'dep',
        'month',
        'Opening_Accumulate_at_April-23',
        'disposal',
    ];
}
