<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class JobPostStoreUpdateRequest extends FormRequest
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
            'title'                             => ['required', 'string', 'max:255'],
            'campus'                            => ['required', 'string', 'max:200'],
            'function'                          => ['required', 'string', 'max:100'],
            'sub_function'                      => ['required', 'string', 'max:100'],
            'gender'                            => ['required', 'in:Male,Female,Both'],
            'experience_level'                  => ['required', 'in:Entry Level,Experienced Non-Manager,Manager,Director and Above'],
            'education_level'                   => ['required', 'in:High School Diploma,Associate Degree,Bachelor`s Degree,Master`s Degree,Doctorate (Ph.D.)'],
            'number_of_post'                    => ['required', 'integer', 'min:1'],
            'type'                              => ['required', 'in:Full Time,Part Time,Temp/Contract,Voluntary,Internship,Project Specific'],
            'computer_skill'                    => ['required', 'in:Beginner,Intermediate,Advanced'],
            'industry'                          => ['required', 'string'],
            'maximun_salary'                    => ['required', 'numeric', 'min:0'],
            'is_hide_salary'                    => ['required', 'boolean'],
            'employee_type'                     => ['required', 'in:Local,Foreigner,Both'],
            'email'                             => ['required', 'email', 'max:255'],
            'description'                       => ['required', 'string'],
            'requirement'                       => ['required', 'string'],
            'benefits'                          => ['required', 'string'],
            'highlights'                        => ['required', 'string'],
            'career_growth'                     => ['required', 'string'],
            'is_active'                         => ['required', 'boolean'],
        ];
    }
}
