<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CompetitionStoreRequest extends FormRequest
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
            'name'                                          => ['required', 'string', Rule::unique('competitions')],
            'slug'                                          => ['required', 'string', 'max:100', Rule::unique('competitions')],
            'introduction'                                  => ['required', 'string'],
            'body'                                          => ['nullable', 'string'],
            'footer'                                        => ['nullable', 'string'],
            'website_url'                                   => ['nullable', 'string'],
            'banner'                                        => ['required', 'file', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'social_media_banner'                           => ['required', 'file', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'competition_photo'                             => ['required', 'array', 'min:4'],
            'competition_photo.*.title'                     => ['required', 'string'],
            'competition_photo.*.image'                     => ['required', 'file', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ];
    }

    public function messages()
    {
        return [
            'competition_photo.required'                                 => 'You Need to add at least 4 Competition Photo',
            'competition_photo.*.title.required'                         => 'Competition Photo Title is required',
            'competition_photo.*.image.required'                         => 'Competition Photo is required',
        ];
    }
}
