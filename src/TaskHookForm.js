import React from 'react'
import { useForm } from 'react-hook-form'
import { nanoid } from 'nanoid'
import { toast } from 'react-toastify'

export default function TaskHookForm({ kisiler, submitFn }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' })

  function mySubmit(data) {
    submitFn({
      ...data,
      id: nanoid(5),
      status: 'yapılacak',
    })
    toast.success(data.title + ' başarıyla eklendi')
    reset({
      title: '',
      description: '',
      deadline: '',
    })
  }

  return (
    <form className="taskForm" onSubmit={handleSubmit(mySubmit)}>
      <div className="pt-4">
        <label className="text-sm block pb-1.5" htmlFor="title">
          Başlık
        </label>
        <input
          className="block w-full border border-solid border-[#ccc] p-1 text-sm rounded-sm"
          {...register('title', { required: 'Task başlığı yazmalısınız' })}
          id="title"
          name="title"
          type="text"
        />
        {errors.title && (
          <p className="text-xs pt-1 text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div className="pt-4">
        <label className="text-sm block pb-1.5" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="block w-full border border-solid border-[#ccc] p-1 text-sm rounded-sm"
          {...register('description', {
            required: 'Task açıklaması yazmalısınız',
            minLength: {
              value: 10,
              message: 'Task açıklaması en az 10 karakter içermelidir',
            },
          })}
          rows="3"
          id="description"
          name="description"
        ></textarea>
        {errors.description && (
          <p className="text-xs pt-1 text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="pt-4">
        <label className="text-sm block pb-1.5">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label
              className="text-md pt-1.5 pb-1.5 pr-2 pl-1.5 rounded-md border border-solid border-[#ccc] mr-2 mb-2 inline-flex items-center cursor-pointer"
              key={p}
            >
              <input
                {...register('people', {
                  required: 'Lütfen en az 1 kişi seçin',
                  validate: {
                    maxKisi: (value) =>
                      value.length < 3 || 'En fazla 3 kişi seçebilirsiniz',
                  },
                })}
                type="checkbox"
                name="people"
                value={p}
              />
              {p}
            </label>
          ))}
        </div>
        {errors.people && (
          <p className="text-xs text-red-600-600 pt-1">
            {errors.people.message}
          </p>
        )}
      </div>

      <div className="pt-4">
        <label className="text-sm block pb-1.5" htmlFor="deadline">
          Son teslim
        </label>
        <input
          className="block w-full border border-solid border-[#ccc] p-1 text-sm rounded-sm"
          {...register('deadline', {
            required: 'Son teslim tarihi seçmelisiniz',
          })}
          id="deadline"
          name="deadline"
          type="date"
          min="2023-01-25"
        />
        {errors.deadline && (
          <p className="text-xs pt-1 text-red-600">{errors.deadline.message}</p>
        )}
      </div>

      <div className="pt-4">
        <button
          className="block w-full border-none px-3 py-4 bg-[#fecc91] text-black cursor-pointer rounded shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none "
          type="submit"
          disabled={!isValid}
        >
          Kaydet
        </button>
      </div>
    </form>
  )
}
