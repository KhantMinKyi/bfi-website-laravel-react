<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SisterSchoolStoreRequest extends FormRequest
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
            'name'                                          => ['required', 'string', Rule::unique('sister_schools')],
            'short_name'                                    => ['required', 'string', Rule::unique('sister_schools')],
            'slug'                                          => ['required', 'string', 'max:100', Rule::unique('sister_schools')],
            'address'                                       => ['required', 'string'],
            'email'                                         => ['required', 'email'],
            'phone'                                         => ['required', 'string'],
            'website_url'                                   => ['required', 'string'],
            'introduction'                                  => ['required', 'string'],
            'description'                                   => ['required', 'string'],
            'hos_message'                                   => ['required', 'string'],
            'hos_name'                                      => ['required', 'string'],
            'logo'                                          => ['required', 'file', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'logo_b'                                        => ['required', 'file', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'hos_image'                                     => ['required', 'file', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'sister_school_banner'                          => ['required', 'array', 'min:1'],
            'sister_school_banner.*.title'                  => ['required', 'string'],
            'sister_school_banner.*.top_sub_title'          => ['required', 'string'],
            'sister_school_banner.*.bottom_sub_title'       => ['required', 'string'],
            'sister_school_banner.*.banner_image'           => ['required', 'file', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'sister_school_leadership'                      => ['required', 'array', 'min:1'],
            'sister_school_leadership.*.name'               => ['required', 'string'],
            'sister_school_leadership.*.position'           => ['required', 'string'],
            'sister_school_leadership.*.image'              => ['required', 'file', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ];
    }

    public function messages()
    {
        return [
            'short_name.required'                                       => 'School`s short name is Required',
            'website_url.required'                                      => 'Please add school website address',
            'hos_message.required'                                      => 'Head of school message is Required',
            'hos_name.required'                                         => 'Head of school name is Required',
            'hos_image.required'                                        => 'Head of school image is Required',
            'sister_school_banner.required'                             => 'You Need to add at least 1 Banner',
            'sister_school_banner.*.title.required'                     => 'Banner Title is required',
            'sister_school_banner.*.top_sub_title.required'             => 'Banner Top Title is required',
            'sister_school_banner.*.bottom_sub_title.required'          => 'Banner Bottom Title is required',
            'sister_school_banner.*.banner_image.required'              => 'Banner Title is required',
            'sister_school_leadership.required'                         => 'You Need to add at least 1 Leadership',
            'sister_school_leadership.*.name.required'                  => 'Leadership Name is required',
            'sister_school_leadership.*.position.required'              => 'Leadership Position is required',
            'sister_school_leadership.*.image.required'                 => 'Leadership Image is required',
        ];
    }
}
