<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Http\Resources\OrderResource;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use GuzzleHttp\Psr7\Response;

class OrderController extends Controller
{
  /**
   * Display a listing of the resource.
   */
  public function index()
  {
    if(auth()->user()->role === 'customer'){
      $orders = Order::with('user')
      ->where('user_id', auth()->user()->id) // Corrected comparison
      ->orderBy('id', 'desc')
      ->get();
    }else if (auth()->user()->role === 'admin'){
      $orders = Order::with('user')->get();
    }
    return OrderResource::collection($orders);
  }


  /**
   * Store a newly created resource in storage.
   */
  public function store(StoreOrderRequest $request)
  {
      $data = $request->validated();
      $data['user_id'] = auth()->id();
      $order = Order::create($data);
      return response(new OrderResource($order), 201); 
  }

  /**
   * Display the specified resource.
   */
  public function show(Order $order)
  {
    $order->load('user');
    return new OrderResource($order);
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(UpdateOrderRequest $request, Order $order)
  {
    $this->authorize('update', $order); // Check if the user is authorized
    $data = $request->validated();
    $order->update($data);
    return new OrderResource($order);
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Order $order)
  {
      $order->delete();
      return response()->noContent();
  }
}
