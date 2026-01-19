<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AlumniPhotoUpdateRequest extends FormRequest
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
            'alumni_photo'                              => ['required', 'array', 'min:4'],
            'alumni_photo.*.id'                         => ['required'],
            'alumni_photo.*.title'                      => ['required', 'string'],
            'alumni_photo.*.image'                      => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ];
    }

    public function messages()
    {
        return [
            'alumni_photo.required'                      => 'You Need to add at least 1 Banner',
            'alumni_photo.*.title.required'              => 'Title cannot be empty',
        ];
    }
}
