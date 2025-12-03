<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PostStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'post_type_id'                      => ['required', 'integer', Rule::exists('post_types', 'id'),],
            'title'                             => ['required', 'string'],
            'subtitle'                          => 'nullable',
            'description'                       => ['required', 'string'],
            'footer_description'                => ['nullable', 'string'],
            'banner_img'                        => ['required', 'string'],
            'images'                            => ['nullable', 'string'],
            'start_date'                        => ['nullable', 'date'],
            'end_date'                          => ['nullable', 'date'],
            'registration_fee'                  => ['nullable', 'string'],
            'award_description'                 => ['nullable', 'string'],
            'video_url'                         => ['nullable', 'string'],
            'location'                          => ['nullable', 'string'],
            'created_user_id'                   => ['required', 'string', Rule::exists('users', 'id')],
            'updated_user_id'                   => ['nullable', 'string', Rule::exists('users', 'id')],

        ];
    }
}
