import { useState } from 'react'
import './app.css'
import Task from './Task'
import TaskHookForm from './TaskHookForm'
import PeopleForm from './PeopleForm'
import { initialTasks, initialTeam } from './data'
import { toast } from 'react-toastify'

function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [team, setTeam] = useState(initialTeam)

  function handleTaskSubmit(yeniTask) {
    setTasks([yeniTask, ...tasks])
  }

  function handlePeopleSubmit(yeniKisi) {
    setTeam([...team, yeniKisi])
  }

  function handleComplete(id) {
    const tasksCopy = [...tasks]
    const ilgiliTask = tasksCopy.filter((t) => t.id === id)[0]
    ilgiliTask.status = 'yapıldı'
    setTasks(tasksCopy)
    toast.success(`Tebrikler! "${ilgiliTask.title}" tamamlandı!`)
  }

  return (
    <div className="h-screen flex">
      <div className="bg-white flex-shrink-0 flex-none border-r-2 border-solid border-[#f3d4b0] overflow-auto">
        <div className="form-container">
          <h2>Yeni Task</h2>
          <TaskHookForm kisiler={team} submitFn={handleTaskSubmit} />
        </div>

        <div className="form-container">
          <h2>Yeni Kişi</h2>
          <PeopleForm kisiler={team} submitFn={handlePeopleSubmit} />
        </div>
      </div>
      <div className="flex-1 flex justify-center flex-wrap gap-8 pt-8 pr-8 pb-6 overflow-auto">
        <div className="flex-1 min-w-[240px] max-w-[360px]">
          <h2 className="text-2xl pl-3">Yapılacaklar</h2>
          <div className="column-list">
            {tasks
              .filter((t) => t.status === 'yapılacak')
              .map((t) => (
                <Task key={t.id} taskObj={t} onComplete={handleComplete} />
              ))}
          </div>
        </div>
        <div className="flex-1 min-w-[240px] max-w-[360px]">
          <h2 className="text-2xl pl-3">Tamamlananlar</h2>
          <div className="column-list">
            {tasks
              .filter((t) => t.status === 'yapıldı')
              .map((t) => (
                <Task key={t.id} taskObj={t} />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
