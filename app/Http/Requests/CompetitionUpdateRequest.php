<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CompetitionUpdateRequest extends FormRequest
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
            'name'                                          => ['required', 'string', Rule::unique('competitions')->ignore($this->competition)],
            'slug'                                          => ['required', 'string', 'max:100', Rule::unique('competitions')->ignore($this->competition)],
            'introduction'                                  => ['required', 'string'],
            'body'                                          => ['nullable', 'string'],
            'footer'                                        => ['nullable', 'string'],
            'website_url'                                   => ['nullable', 'string'],
            'banner'                                        => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'social_media_banner'                           => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ];
    }

    public function messages()
    {
        return [
            'sub_title.required'                                        => 'Sub Title is Required',
        ];
    }
}
