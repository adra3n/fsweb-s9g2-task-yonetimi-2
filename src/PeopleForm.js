import React, { useState } from 'react'

const PeopleForm = ({ kisiler, submitFn }) => {
  const [isim, setIsim] = useState('')

  function handleIsimChange(e) {
    setIsim(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    submitFn(isim)
    setIsim('')
  }

  return (
    <form className="taskForm" onSubmit={handleSubmit}>
      <div className="pt-4">
        <label className="text-sm block pb-1.5" htmlFor="title">
          İsim
        </label>
        <input
          className="block w-full border border-solid border-[#ccc] p-1 text-sm rounded-sm"
          id="title"
          name="title"
          type="text"
          onChange={handleIsimChange}
          value={isim}
        />
        {kisiler.includes(isim) && (
          <p className="text-xs pt-1 text-red-600">
            Bu isim daha önce eklenmiş
          </p>
        )}
      </div>

      <div className="pt-4">
        <button
          className="block w-full border-none px-3 py-4 bg-[#fecc91] text-black cursor-pointer rounded shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none "
          type="submit"
          disabled={isim.length === 0 || kisiler.includes(isim)}
        >
          Ekle
        </button>
      </div>
    </form>
  )
}

export default PeopleForm
