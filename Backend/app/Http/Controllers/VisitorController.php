<?php

namespace App\Http\Controllers;

use App\Models\Visitor;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class VisitorController extends Controller
{

    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api-visitor', ['except' => ['register','login']]);
    }
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(){
        $validator = Validator::make(request()->all(),[
            'first_name' => 'required',
            'last_name' => 'required',
            'name' => 'required',
            'email' => 'required|email|unique:visitor',
            'password' => 'required',
        ]);
        if($validator->fails()){
            return response()->json($validator->messages(), 422);
        }
        $visitor = Visitor::create([
            'first_name' => request('first_name'),
            'last_name' => request('last_name'),
            'name' => request('name'),
            'email' => request('email'),
            'password' => Hash::make(request('password')),

        ]);
        if($visitor){
            return response()->json(['message' => 'Succesfully Registered Visitor!']);
        }else{
            return response()->json(['message' => 'Failed Registered Visitor!']);
        }
    }
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth()->guard('api-visitor')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
                'expires_in' => auth('api-visitor')->factory()->getTTL() * 60
        ]);
    }
     /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->guard('api-visitor')->user());
    }
     /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully Visitor LogedOut!']);
    }
     /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api-visitor')->factory()->getTTL() * 60
        ]);
    }
}
