<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SisterSchoolBannerUpdateRequest extends FormRequest
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
            'sister_school_banner'                              => ['required', 'array', 'min:1'],
            'sister_school_banner.*.id'                         => ['required'],
            'sister_school_banner.*.top_sub_title'              => ['required', 'string'],
            'sister_school_banner.*.title'                      => ['required', 'string'],
            'sister_school_banner.*.banner_image'               => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'sister_school_banner.*.bottom_sub_title'           => ['required', 'string'],
        ];
    }

    public function messages()
    {
        return [
            'sister_school_banner.required'                      => 'You Need to add at least 1 Banner',
            'sister_school_banner.*.top_sub_title.required'      => 'Top Subtitle cannot be empty',
            'sister_school_banner.*.title.required'              => 'Title cannot be empty',
            'sister_school_banner.*.bottom_sub_title.required'   => 'Bottom Subtitle cannot be empty',
        ];
    }
}
