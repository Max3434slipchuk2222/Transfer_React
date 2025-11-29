import React from 'react';
import {type UseFormReturn, Controller } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';
import type {ICityForm} from './validation';
import type { ICountry } from '../../Interfaces/ICountry';

interface CityFormProps {
    form: UseFormReturn<ICityForm>;
    onSubmit: (data: ICityForm) => void;
    countries: ICountry[];
    isLoading: boolean;
}

export const CityForm: React.FC<CityFormProps> = ({ form, onSubmit, countries, isLoading }) => {
    const { register, control, formState: { errors } } = form;

    const inputClass = (hasError: boolean) =>
        `block w-full px-3 py-2 border ${hasError ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`;

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            <div>
                <label className="block text-sm font-medium text-gray-700">Назва міста</label>
                <div className="mt-1">
                    <input type="text" {...register('name')} className={inputClass(!!errors.name)}/>
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Slug</label>
                <div className="mt-1">
                    <input type="text" {...register('slug')} className={inputClass(!!errors.slug)}/>
                    {errors.slug && <p className="mt-1 text-xs text-red-500">{errors.slug.message}</p>}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Країна</label>
                <div className="mt-1">
                    <select {...register('countryId')} className={inputClass(!!errors.countryId)}>
                        <option value="">Оберіть країну...</option>
                        {countries.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    {errors.countryId && <p className="mt-1 text-xs text-red-500">{errors.countryId.message}</p>}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Фото</label>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-md px-6 pt-5 pb-6 flex justify-center">
                    <div className="text-center">
                        <label className="cursor-pointer text-blue-600 hover:text-blue-500">
                            <span>Завантажити файл</span>
                            <input type="file" className="sr-only" accept="image/*" {...register('image')} />
                        </label>
                    </div>
                </div>
                {errors.image && <p className="mt-1 text-xs text-red-500">{errors.image.message}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Опис</label>
                <Controller
                    name="description"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Editor
                            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                            value={value}
                            init={{
                                height: 300,
                                menubar: false,
                                plugins: ['lists link image code'],
                                toolbar: 'undo redo | bold italic | alignleft aligncenter | bullist numlist',
                            }}
                            onEditorChange={onChange}
                        />
                    )}
                />
                {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>}
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none disabled:bg-gray-400"
            >
                {isLoading ? 'Створення...' : 'Створити місто'}
            </button>
        </form>
    );
};