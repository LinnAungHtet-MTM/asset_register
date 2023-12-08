<?php

namespace App\Http\Controllers;

use App\Models\FixedAsset;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class FixedAssetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia('OfficeAsset');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia('Dashboard', [
            'datas' => FixedAsset::latest()->paginate(5)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // $inputField = $request->validate([
        //     'code' => ['required', Rule::unique('fixed_assets', 'code')],
        //     'asset_name' => ['required'],
        //     'Net_cost' => [],
        //     'Dep%' => [],
        //     'per_month' => []
        // ]);
        $inputField = [
            'asset_name' => $request->asset_name,
            'asset_class' => $request->asset_class,
            'units' => $request->units,
            'code' => $request->code,
            'acquisition_date' => $request->acquisition_date,
            'acquisition_cost' => $request->acquisition_cost,
            'discount' => $request->discount,
            'Net_cost' => $request->net_cost,
            'Dep%' => $request->dep
        ];
        FixedAsset::create($inputField);
    }

    /**
     * Display the specified resource.
     */
    public function show(FixedAsset $fixedAsset)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(FixedAsset $id)
    {
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, FixedAsset $id)
    {
        $inputField = $request->validate([
            'code' => ['required'],
            'asset_name' => ['required']
        ]);
        $id->update($inputField);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(FixedAsset $fixedAsset)
    {
        //
    }
}
