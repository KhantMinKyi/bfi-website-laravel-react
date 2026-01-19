<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SisterSchoolRelatedCampusUpdateRequest extends FormRequest
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
            'sister_school_related_campuses'                                   => ['required', 'array', 'min:1'],
            'sister_school_related_campuses.*.id'                              => ['required'],
            'sister_school_related_campuses.*.campus_name'                     => ['required', 'string'],
            'sister_school_related_campuses.*.address'                         => ['required', 'string'],
            'sister_school_related_campuses.*.phone'                           => ['required', 'string'],
            'sister_school_related_campuses.*.website_url'                     => ['required', 'string'],
            'sister_school_related_campuses.*.image'                           => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ];
    }

    public function messages()
    {
        return [
            'sister_school_related_campuses.required'                           => 'You Need to add at least 1 Campus',
            'sister_school_related_campuses.*.campus_name.required'             => 'Name cannot be empty',
            'sister_school_related_campuses.*.address.required'                 => 'Address cannot be empty',
            'sister_school_related_campuses.*.phone.required'                   => 'Phone cannot be empty',
            'sister_school_related_campuses.*.website_url.required'             => 'Website cannot be empty',
        ];
    }
}
