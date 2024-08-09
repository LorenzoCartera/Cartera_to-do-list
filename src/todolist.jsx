import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css'
import moment from 'moment'
import './todolist.css'
import { ButtonGroup, ButtonToolbar } from 'react-bootstrap'

function AddModal() {
  
  const [tasks, setTasks] = useState(localStorage.getItem('myList') ? JSON.parse(localStorage.getItem('myList')) : [])
  const [task, setTask] = useState({
    id:0,
    name:"",
    dueDate:"",
    dueTime:"",
    createDateTime:"",
    done:false
  })

  // add functions
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () =>{
    var listArray = localStorage.getItem('myList') ? JSON.parse(localStorage.getItem('myList')) : []
    setTask(a => ({
        id: listArray.length,
        name:"",
        dueDate:new moment().format("yyyy-MM-DD").toString(),
        dueTime:new moment().format("hh:mm").toString(),
        createDateTime:moment().format("yyyy-MM-DD | hh:mm").toString(),
        done:false
      }))
    setShow(true)
  }
  const handleInput = e => {
    const { name, value } = e.target
    setTask(prevState => ({
        ...prevState,
        [name]: value
    }));
  }
  function handleSubmit() {
    if (task.name.trim() === "") {
      alert("Enter a name for the task")
      return
    }
    var listArray = localStorage.getItem('myList') ? JSON.parse(localStorage.getItem('myList')) : []
    setTask(b => ({ createDateTime: moment().format("yyyy-MM-DD | hh:mm").toString() }))

    if (task.id >= listArray.length) {
      listArray.push(task)
    } else {
      listArray[task.id] = task
    }

    localStorage.setItem('myList', JSON.stringify(listArray))
    setTasks(listArray)
    setTask(c => ({
        name:"",
        dueDate:new moment().format("yyyy-MM-DD").toString(),
        dueTime:new moment().format("hh:mm").toString(),
        createDateTime:moment().format("yyyy-MM-DD | hh:mm").toString(),
        done:false
      }))
    setShow(false)
  }

  // delete all functions
  const [showDeleteAll, setShowDeleteAll] = useState(false)
  const handleCloseDeleteAll = () => setShowDeleteAll(false)
  const handleShowDeleteAll = () => setShowDeleteAll(true)
  function handleDeleteAll() {
    localStorage.clear()
    setTasks([])
    setShowDeleteAll(false)
  }
  // done/undo all functions
  function handleToggleAllDone() {
    const allDone = tasks.every(t => t.done)
    const updatedTasks = tasks.map(task => ({
      ...task,
      done: !allDone
    }))
  
    setTasks(updatedTasks)
    localStorage.setItem('myList', JSON.stringify(updatedTasks))
  }
  // done functions
  function handleDone(index) {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        task.done = !task.done
      }
      return task
    })
    
    setTasks(updatedTasks)
    localStorage.setItem('myList', JSON.stringify(updatedTasks))
  }
  
  // edit functions
  function handleShowEdit(index) {
    const taskToEdit = tasks[index]
    setTask({ ...taskToEdit })
    setShow(true)
  }
  function handleEdit(index) {
    const updatedTasks = tasks.map((task, i) => (i === index ? task : task))
    localStorage.setItem('myList', JSON.stringify(updatedTasks))
    setTasks(updatedTasks)
    setShow(false)
  }

  // delete functions
  const [showDelete, setShowDelete] = useState(false)
  const [taskIndex, setTaskIndex] = useState(null)
  const handleCloseDelete = () => setShowDelete(false)
  function handleShowDelete(index) {
    setShowDelete(true)
    setTaskIndex(index)
  }
  function handleDelete() {
    const updatedTasks = tasks.filter((_, i) => i !== taskIndex)
    setTasks(updatedTasks)
    localStorage.setItem('myList', JSON.stringify(updatedTasks))
    setShowDelete(false)
  }

  

  return (
    <div className="container">
      <Button className="button1" onClick={handleShow}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard2-plus-fill" viewBox="0 0 16 16">
        <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5"/>
        <path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585q.084.236.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5q.001-.264.085-.5M8.5 6.5V8H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V9H6a.5.5 0 0 1 0-1h1.5V6.5a.5.5 0 0 1 1 0"/>
      </svg><br/>Add task
      </Button>
      <Button className="button1" onClick={handleToggleAllDone}>
        {tasks.every(t => t.done) ? <>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-square-fill" viewBox="0 0 16 16">
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708"/>
            </svg><br/>Undo all
          </> : <>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square-fill" viewBox="0 0 16 16">
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
            </svg><br/> Done all
          </>}
      </Button>
      <Button className="button1" onClick={handleShowDeleteAll}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
      </svg><br/>Delete all
      </Button>
      
      
      {/* task cards */}
      {tasks.map((t)=>{
        return(
          <div className="card">
            <p className={"name" + (t.done ? "True" : "False")}>{t.name}</p>
            <p className="p">Due date: {t.dueDate} | {t.dueTime}</p>
            <p className="p">Date created: {t.createDateTime}</p>
            <ButtonToolbar>
              <ButtonGroup>
                <Button className="button1" onClick={() => handleShowEdit(t.id)}>Edit</Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button className="button1" onClick={() => handleDone(t.id)}>
                  {t.done ? "Undo" : "Done"}
                </Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button className="button1" onClick={() => handleShowDelete(t.id)}>Delete</Button>
              </ButtonGroup>
            </ButtonToolbar><br/>
          </div>
        )
      })}
      
      {/* add task modal */}
      <Modal show={show} onHide={handleClose} backdrop="static" centered>

        <Modal.Header className="modalHeader">
          <Modal.Title>Add a task</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>

            <Form.Group className="mb-3" controlId="taskName">
              <Form.Label>Task name</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={task.name}
                onChange={handleInput}
                name="name"
                style={{color: "#707070"}}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="date">
              <Form.Label>Due date</Form.Label>
              <Form.Control
                type="date"
                value={task.dueDate}
                onChange={handleInput}
                name="dueDate"
                style={{color: "#707070"}}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="time">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                value={task.dueTime}
                onChange={handleInput}
                name="dueTime"
                style={{color: "#707070"}}
              />
            </Form.Group>

          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button className="button1" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
        
      </Modal>

      {/* delete all modal */}
      <Modal show={showDeleteAll} onHide={handleCloseDeleteAll} backdrop="static" centered>
          <Modal.Header className="modalHeader">
              <Modal.Title>Delete all tasks</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <p>Do you want to delete all tasks?</p>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDeleteAll}>
                  Cancel
              </Button>
              <Button className="button1" onClick={handleDeleteAll}>
                  Confirm
              </Button>
          </Modal.Footer>
      </Modal>

      {/* delete modal */}
      <Modal show={showDelete} onHide={handleCloseDelete} backdrop="static" centered>
        <Modal.Header className="modalHeader">
          <Modal.Title>Delete task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Do you want to delete this task?</p>
         </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Cancel
          </Button>
          <Button className="button1" onClick={handleDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddModal;