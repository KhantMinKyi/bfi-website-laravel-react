<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CompetitionPhotoUpdateRequest extends FormRequest
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
            'competition_photo'                              => ['required', 'array', 'min:4'],
            'competition_photo.*.id'                         => ['required'],
            'competition_photo.*.title'                      => ['required', 'string'],
            'competition_photo.*.image'                      => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ];
    }

    public function messages()
    {
        return [
            'competition_photo.required'                      => 'You Need to add at least 1 Banner',
            'competition_photo.*.title.required'              => 'Title cannot be empty',
        ];
    }
}
