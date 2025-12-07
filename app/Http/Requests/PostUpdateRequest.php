<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PostUpdateRequest extends FormRequest
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
            'post_type_id'                      => ['required', 'integer', Rule::exists('post_types', 'id'),],
            'post_type_is_activity'             => ['required', 'integer'],
            'category_tag_ids'                  => ['required', 'string'],
            'title'                             => ['required', 'string', 'max:100'],
            'subtitle'                          => ['nullable', 'string'],
            'description'                       => ['required', 'string'],
            'footer_description'                => ['nullable', 'string'],
            'video_url'                         => ['nullable', 'string'],
            'start_date'                        => [Rule::requiredIf($this->post_type_is_activity == 1), 'date'],
            'end_date'                          => [Rule::requiredIf($this->post_type_is_activity == 1), 'date'],
            'registration_fee'                  => [Rule::requiredIf($this->post_type_is_activity == 1), 'string'],
            'award_description'                 => ['nullable', 'string'],
            'location'                          => [Rule::requiredIf($this->post_type_is_activity == 1), 'string'],
            'banner_img'                        => ['nullable', 'file', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'images'                            => ['nullable', 'array'],
            'images.*'                          => ['file', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ];
    }
}
