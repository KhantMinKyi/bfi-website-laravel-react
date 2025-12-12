<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FaqStoreRequest extends FormRequest
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
            'faq'                               => ['required', 'array', 'min:1'],
            'faq.*.question'                    => ['required', 'string'],
            'faq.*.answer'                      => ['required', 'string'],

        ];
    }

    public function messages()
    {
        return [
            'faq.required'                          => 'You Need to add at least 1 Banner',
            'faq.*.question.required'               => 'Question cannot be empty',
            'faq.*.answer.required'                 => 'Answer cannot be empty',
        ];
    }
}
