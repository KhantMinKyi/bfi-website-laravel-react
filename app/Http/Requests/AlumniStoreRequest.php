<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AlumniStoreRequest extends FormRequest
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
            'title'                                         => ['required', 'string', Rule::unique('alumnis')],
            'introduction'                                  => ['required', 'string'],
            'body'                                          => ['nullable', 'string'],
            'footer'                                        => ['nullable', 'string'],
            'website_url'                                   => ['nullable', 'string'],
            'banner'                                        => ['required', 'file', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'alumni_photo'                                  => ['required', 'array', 'min:4'],
            'alumni_photo.*.title'                          => ['required', 'string'],
            'alumni_photo.*.image'                          => ['required', 'file', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ];
    }

    public function messages()
    {
        return [
            'alumni_photo.required'                                 => 'You Need to add at least 4 Alumni Photo',
            'alumni_photo.*.title.required'                         => 'Alumni Photo Title is required',
            'alumni_photo.*.image.required'                         => 'Alumni Photo is required',
        ];
    }
}
