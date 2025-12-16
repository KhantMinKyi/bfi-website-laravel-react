<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CurriculumStoreRequest extends FormRequest
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
            'name'                                          => ['required', 'string', Rule::unique('curricula')],
            'slug'                                          => ['required', 'string', 'max:100', Rule::unique('curricula')],
            'sub_title'                                     => ['required', 'string'],
            'introduction'                                  => ['required', 'string'],
            'body'                                          => ['nullable', 'string'],
            'footer'                                        => ['nullable', 'string'],
            'logo'                                          => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'secondary_logo'                                => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'curriculum_photo'                              => ['required', 'array', 'min:3'],
            'curriculum_photo.*.title'                      => ['required', 'string'],
            'curriculum_photo.*.image'                      => ['required', 'file', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ];
    }

    public function messages()
    {
        return [
            'sub_title.required'                                        => 'Sub Title is Required',
            'curriculum_photo.required'                                 => 'You Need to add at least 3 Curriculum Photo',
            'curriculum_photo.*.title.required'                         => 'Curriculum Photo Title is required',
            'curriculum_photo.*.image.required'                         => 'Currriculum Photo is required',
        ];
    }
}
