<?php

namespace App\Http\Controllers;

use App\Models\Technical;
use App\Http\Requests\StoreTechnicalRequest;
use App\Http\Requests\UpdateTechnicalRequest;
use App\Http\Resources\TechnicalResource;

class TechnicalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      return TechnicalResource::collection(
        Technical::query()->orderBy('id','desc')->get()
      );
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTechnicalRequest $request)
    {
      $data = $request->validated();
      $data['password'] = bcrypt($data['password']);
      $technical = Technical::create($data);
      return response(new TechnicalResource($technical),201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Technical $technical)
    {
      return new TechnicalResource($technical);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTechnicalRequest $request, Technical $technical)
    {
      $data = $request->validated();
      if(isset($data['password'])){
          $data['password'] = bcrypt($data['password']);
      }
      $technical->update($data);
      return new TechnicalResource($technical);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Technical $technical)
    {
      $technical->delete();

      return response('',204);
    }
}
