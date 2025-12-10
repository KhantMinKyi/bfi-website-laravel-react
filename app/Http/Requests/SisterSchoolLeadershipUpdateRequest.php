<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SisterSchoolLeadershipUpdateRequest extends FormRequest
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
            'sister_school_leadership'                                   => ['required', 'array', 'min:1'],
            'sister_school_leadership.*.id'                              => ['required'],
            'sister_school_leadership.*.name'                            => ['required', 'string'],
            'sister_school_leadership.*.position'                        => ['required', 'string'],
            'sister_school_leadership.*.image'                           => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ];
    }

    public function messages()
    {
        return [
            'sister_school_leadership.required'                          => 'You Need to add at least 1 leadeship',
            'sister_school_leadership.*.name.required'                   => 'Top Subtitle cannot be empty',
            'sister_school_leadership.*.position.required'               => 'Title cannot be empty',
        ];
    }
}
