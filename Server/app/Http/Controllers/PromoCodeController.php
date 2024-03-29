<?php

namespace App\Http\Controllers;

use App\Http\Resources\AppliedPromoCodesResource;
use App\Http\Resources\EffectPromoCodesResource;
use App\Http\Resources\EligibilityPromoCodesResource;
use App\Models\PromoCode;
use App\Http\Resources\PromoCodeResource;
use App\Models\AppliedPromoCodes;
use App\Models\EffectPromoCodes;
use App\Models\EligibilityPromoCodes;
use App\Models\RoomType;
use App\Models\User;
use App\Models\UserType;
use App\Models\Room;
use App\Http\Resources\UserResource;
use App\Http\Resources\RoomResource;
use App\Http\Resources\RoomTypeResource;
use App\Http\Resources\UserTypeResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PHPUnit\Logging\Exception;

class PromoCodeController extends Controller
{
    protected $resource = PromoCodeResource::class;
    protected $model = PromoCode::class;
    protected $model_name = 'Promo_Codes';
    protected $options = [

        'change' => 'required|numeric',
        'code' => 'required|string|unique:Promo_Codes',
        'start_date' => 'required|date',
        'end_date' => 'required|date',
    ];

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return indexTemplate($this->model, $this->resource, [
            EligibilityPromoCodes::class => EligibilityPromoCodesResource::class,
            AppliedPromoCodes::class => AppliedPromoCodesResource::class,
            EffectPromoCodes::class => EffectPromoCodesResource::class
        ]);
    }

    public function full_index()
    {
        return indexTemplate($this->model, $this->resource, [
            EligibilityPromoCodes::class => EligibilityPromoCodesResource::class,
            AppliedPromoCodes::class => AppliedPromoCodesResource::class,
            EffectPromoCodes::class => EffectPromoCodesResource::class,
            User::class => UserResource::class,
            Room::class => RoomResource::class,
            RoomType::class => RoomTypeResource::class,
            UserType::class => UserTypeResource::class
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $response = storeTemplate($request, $this->model, $this->resource, $this->options);
        $promo_code_id = (string)json_encode($response->original['data']->id);

        $ids = EffectPromoCodes::all()->where('promo_id', $promo_code_id)->pluck('id');
        EffectPromoCodes::destroy($ids);
        $ids = EligibilityPromoCodes::all()->where('promo_id', $promo_code_id)->pluck('id');
        EligibilityPromoCodes::destroy($ids);

        if ($request->concerned_everyone) {

            EligibilityPromoCodes::create([

                'promo_id' => $promo_code_id,
                'effect_id' => 0,
                'type' => 3

            ]);
        }
        if ($request->concerned_everything) {

            EffectPromoCodes::create([

                'promo_id' => $promo_code_id,
                'effect_id' => 0,
                'type' => 2

            ]);
        }

        foreach ($request->concerned_users as $id) {

            EligibilityPromoCodes::create([

                'promo_id' => $promo_code_id,
                'effect_id' => $id,
                'type' => 0

            ]);
        }
        foreach ($request->concerned_user_types as $id) {

            EligibilityPromoCodes::create([

                'promo_id' => $promo_code_id,
                'effect_id' => $id,
                'type' => 1

            ]);
        }
        foreach ($request->concerned_rooms as $id) {

            EffectPromoCodes::create([

                'promo_id' => $promo_code_id,
                'effect_id' => $id,
                'type' => 0

            ]);
        }
        foreach ($request->concerned_room_types as $id) {

            EffectPromoCodes::create([

                'promo_id' => $promo_code_id,
                'effect_id' => $id,
                'type' => 1

            ]);
        }

        return $response;
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {

        return showTemplate($this->model, $this->resource, $id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $promo_code_id)
    {
        $ids = EffectPromoCodes::all()->where('promo_id', $promo_code_id)->pluck('id');
        EffectPromoCodes::destroy($ids);
        $ids = EligibilityPromoCodes::all()->where('promo_id', $promo_code_id)->pluck('id');
        EligibilityPromoCodes::destroy($ids);

        if ($request->concerned_everyone) {

            EligibilityPromoCodes::create([

                'promo_id' => $promo_code_id,
                'effect_id' => 0,
                'type' => 3

            ]);
        }
        if ($request->concerned_everything) {

            EffectPromoCodes::create([

                'promo_id' => $promo_code_id,
                'effect_id' => 0,
                'type' => 2

            ]);
        }

        foreach ($request->concerned_users as $id) {

            EligibilityPromoCodes::create([

                'promo_id' => $promo_code_id,
                'effect_id' => $id,
                'type' => 0

            ]);
        }
        foreach ($request->concerned_user_types as $id) {

            EligibilityPromoCodes::create([

                'promo_id' => $promo_code_id,
                'effect_id' => $id,
                'type' => 1

            ]);
        }
        foreach ($request->concerned_rooms as $id) {

            EffectPromoCodes::create([

                'promo_id' => $promo_code_id,
                'effect_id' => $id,
                'type' => 0

            ]);
        }
        foreach ($request->concerned_room_types as $id) {

            EffectPromoCodes::create([

                'promo_id' => $promo_code_id,
                'effect_id' => $id,
                'type' => 1

            ]);
        }

        return updateTemplate($request, $this->model, $promo_code_id, $this->resource, $this->options, $this->model_name);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {

        return destroyTemplate($this->model, $id);
    }

    public function applyPromo(string $id)
    {

        $user = Auth::user();

        if (!$user) {

            return generateResponse(200, 403);
        } else if (AppliedPromoCodes::all()->where('exhausted', false)->firstWhere('user_id', $user->id)) {

            return generateResponse(200, 400);
        } else {

            $promo = PromoCode::all()
                ->where('code', $id)
                ->first();

            if ($promo) {


                $promo_id = $promo->id;



                $existing_application  = AppliedPromoCodes::all()
                    ->where('promo_id', $promo_id)
                    ->where('user_id', $user->id)
                    ->first();



                if ($existing_application) {

                    return generateResponse(200, 200);
                } else {

                    $eligibility_array = EligibilityPromoCodes::all()
                        ->where('promo_id', $promo_id);

                    $eligibility = false;

                    foreach ($eligibility_array as $key => $value) {

                        switch ($value->type) {


                            case 0:

                                if ($user->id == $value->effect_id) {

                                    $eligibility = true;
                                }
                                break;

                            case 1:

                                if ($user->type == $value->effect_id) {

                                    $eligibility = true;
                                }
                                break;

                            case 2:

                                if ($user->tier == $value->effect_id) {

                                    $eligibility = true;
                                }
                                break;

                            case 3:

                                $eligibility = true;
                                break;

                            default:

                                throw new Exception('Invalid Type');
                        }
                    }

                    if ($eligibility) {

                        $data = AppliedPromoCodes::create([

                            'user_id' => $user->id,
                            'promo_id' => $promo_id,
                            'exhausted' => false

                        ]);

                        return generateResponse(201, 201, $data);
                    } else {

                        return generateResponse(200, 404);
                    }
                }
            } else {

                return generateResponse(200, 404);
            }
        }
    }

    public function isAlreadyApplied(string $user_id)
    {

        $existing_application = AppliedPromoCodes::all()
            ->where('user_id', $user_id);

        $promo_ids = [];

        foreach ($existing_application as $key => $value) {

            $promo_ids[] = $value->promo_id;
        }

        $existing_application = PromoCode::all()->whereIn('id', $promo_ids);

        if (sizeof($existing_application)) {

            if ($existing_application) {

                return generateResponse(200, PromoCodeResource::collection($existing_application));
            }
        } else {


            return generateResponse(200, []);
        }
    }
}
