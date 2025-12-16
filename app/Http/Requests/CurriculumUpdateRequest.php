<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CurriculumUpdateRequest extends FormRequest
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
            'name'                                          => ['required', 'string', Rule::unique('curricula')->ignore($this->curriculum)],
            'slug'                                          => ['required', 'string', 'max:100', Rule::unique('curricula')->ignore($this->curriculum)],
            'sub_title'                                     => ['required', 'string'],
            'introduction'                                  => ['required', 'string'],
            'body'                                          => ['nullable', 'string'],
            'footer'                                        => ['nullable', 'string'],
            'logo'                                          => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'secondary_logo'                                => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ];
    }

    public function messages()
    {
        return [
            'sub_title.required'                                        => 'Sub Title is Required',
        ];
    }
}
