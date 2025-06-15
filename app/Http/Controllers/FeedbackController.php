<?php

namespace App\Http\Controllers;

use App\Http\Resources\FeedbackResource;
use App\Models\Feedback;
use App\Models\Order;
use App\Http\Requests\StoreFeedbackRequest;
use App\Http\Requests\UpdateFeedbackRequest;

class FeedbackController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
      $feedbacks = Feedback::with(['user' , 'order'])->orderBy('id' , 'desc' )->get();
      return FeedbackResource::collection($feedbacks);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFeedbackRequest $request)
    {
        if (!auth()->check()) {
            return response()->json(['error' => 'Unauthenticated.'], 401);
        }
    
        // Validate the request data
        $data = $request->validated();
    
        $order = Order::find(id: $data['order_id']);
        if (!$order || $order->user_id !== auth()->id()) {
            return response()->json(['error' => 'You do not have permission to create feedback for this order.'], 403);
        }
    
        // Check if feedback already exists for this order
        $existingFeedback = Feedback::where('order_id', $data['order_id'])
                                    ->where('user_id', auth()->id())
                                    ->first();
        if ($existingFeedback) {
            return response()->json(['error' => 'You have already submitted feedback for this order.'], 422);
        }
    
        $data['user_id'] = auth()->id();
    
        $feedback = Feedback::create($data);
    
        return new FeedbackResource($feedback);
    }
    /**
     * Display the specified resource.
     */
    public function show(Feedback $feedback)
    {
      $feedback->load(['order','user']);
      
      return new FeedbackResource($feedback);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFeedbackRequest $request, Feedback $feedback)
    {
      $data = $request->validated();
      $data['user_id'] = auth()->id();
      $feedback->update($data);
      return new FeedbackResource($feedback);
      
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Feedback $feedback)
    {
      $feedback->delete();
      return response()->noContent();
    }
}
