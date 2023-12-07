<?php

namespace App\Http\Controllers;

use App\Models\post;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia('PostList', [
            'posts' => post::latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia('ImageUpload');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $inputField = $request->validate([
            'title' => ['required', Rule::unique('posts', 'title')],
            'content' => ['required'],
            'img' => ['required']
        ]);

        if ($request->hasFile('img')) {
            // $inputField['img'] = $request->file('img')->store('posts', 'public');
            $response = Cloudinary::upload($request->file('img')->getRealPath())->getSecurePath();
            $inputField['img'] = $response;
        }
        post::create($inputField);
    }

    /**
     * Display the specified resource.
     */
    public function show(post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(post $post)
    {
        //
    }
}
