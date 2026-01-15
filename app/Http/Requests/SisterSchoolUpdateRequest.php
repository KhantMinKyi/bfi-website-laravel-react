<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SisterSchoolUpdateRequest extends FormRequest
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
            'name'                                          => ['required', 'string', Rule::unique('sister_schools')->ignore($this->sister_school)],
            'short_name'                                    => ['required', 'string', Rule::unique('sister_schools')->ignore($this->sister_school)],
            'slug'                                          => ['required', 'string', 'max:100', Rule::unique('sister_schools')->ignore($this->sister_school)],
            'address'                                       => ['required', 'string'],
            'email'                                         => ['required', 'email'],
            'phone'                                         => ['required', 'string'],
            'website_url'                                   => ['required', 'string'],
            'introduction'                                  => ['required', 'string'],
            'description'                                   => ['required', 'string'],
            'hos_message'                                   => ['nullable', 'string'],
            'hos_name'                                      => ['nullable', 'string'],
            'logo'                                          => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'logo_b'                                        => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'hos_image'                                     => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ];
    }

    public function messages()
    {
        return [
            'short_name.required'                                       => 'School`s short name is Required',
            'website_url.required'                                      => 'Please add school website address',
            'hos_message.required'                                      => 'Head of school message is Required',
            'hos_name.required'                                         => 'Head of school name is Required',
        ];
    }
}
