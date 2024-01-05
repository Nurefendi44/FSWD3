<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticatevisitor extends Middleware
{
    protected function authenticate($request, array $guards)
    {

            if ($this->auth->guard('api-visitor')->check()) {
                return $this->auth->shouldUse('api-visitor');
            }
        $this->unauthenticated($request, ['apivisitor']);
    }
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        return $request->expectsJson() ? null : route('visitorlogin');
    }
}
