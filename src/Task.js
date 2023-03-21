import React from 'react'
import differenceInDays from 'date-fns/differenceInDays'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import tr from 'date-fns/locale/tr'

const Task = ({ taskObj, onComplete }) => {
  const deadlineDistance = formatDistanceToNow(new Date(taskObj.deadline), {
    addSuffix: true,
    locale: tr,
  })
  const dayDifference = differenceInDays(new Date(taskObj.deadline), new Date())

  return (
    <div className="p-6 bg-[#fff] rounded-md leading-relaxed mt-4 shadow-md">
      <h3 className="text-xl text-[#c8781a]">{taskObj.title}</h3>
      <div className="flex items-center justify-between text-sm font-medium text-[#444] mt-2">
        <span>son teslim:</span>
        <span
          className={
            dayDifference > 3
              ? 'normal bg-[#d4d7ff] rounded px-2'
              : 'urgent bg-[#ffd9d4] rounded px-2'
          }
        >
          {deadlineDistance}
        </span>
      </div>
      <p className="text-[#444] text-base leading-7 mt-2">
        {taskObj.description}
      </p>
      <div className="mt-3">
        {taskObj.people.map((p) => (
          <span
            className="inline-block border border-solid border-[#ccc] rounded-full px-3 py-[5px] text-sm font-semibold text-[#444] mr-1 mb-1.5"
            key={p}
          >
            {p}
          </span>
        ))}
      </div>
      {onComplete && (
        <button
          className="block mt-4 ml-auto bg-[#fecc91] px-4 py-2 rounded-full shadow-md"
          onClick={() => onComplete(taskObj.id)}
        >
          Tamamlandı
        </button>
      )}
    </div>
  )
}

export default Task
