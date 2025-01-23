import React, { useReducer, useState } from 'react'

const UseReducer = () => {
    const initalValue = []
    const reducer = (state, action) => {
        switch (action.type) {
            case 'ADD_DATA': return [...state, { id: Date.now(), text: action.payload.text , textDesc : action.payload.textDesc }]
            
            case 'EDIT' : return state.map((todo)=> todo.id === action.payload.id ? {...todo, text : action.payload.text, textDesc : action.payload.textDesc} : todo)

            case 'Delete'  : return state.filter((todo)=>todo.id !== action.payload)
            default: return state;
        }
        
    }

    const [input, setInput] = useState({text :'',textDesc :''})
    const [editId,setEditId] = useState(null)
    const [todo, dispatch] = useReducer(reducer, initalValue)

    const adddata = () => {
        if (input.text.trim() !== '' && input.textDesc.trim() !== '') {
            if(editId){
                dispatch({type : 'EDIT' , payload:{id :editId, text :input.text, textDesc : input.textDesc}})
                setEditId(null)
            }else{
                dispatch({ type: 'ADD_DATA', payload: input })
            }
            
            setInput({text :'',textDesc :''})
        }else{
        alert('Field is Mandatory')
        }
    }
    const editData =(item)=>{
        setInput({text : item.text ,textDesc : item.textDesc})
        setEditId(item.id)
    }
    const deleteData =(item)=>{
        dispatch({type : 'Delete',payload:item.id})
    }
   
    return (
        <div>
            <div className='bg-dark p-3'>
                <div className='w-50 mx-auto mt-3 '>
                    <input className='form-control' placeholder='Enter Name' value={input.text} onChange={(e)=>setInput({...input,text : e.target.value})}></input>


                    <input className='form-control mt-3' placeholder='Enter Desc' value={input.textDesc} onChange={(e)=>setInput({...input , textDesc :e.target.value})}></input>
                </div>
                <div>
                    <button className='btn btn-success mt-4' onClick={adddata}>{editId ? 'Update' :'ADD'}</button>
                </div>
                
            </div>
            <table className='table table-dark'>
                    <thead>
                        <tr>
                            <th>Sr.No</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Desc</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todo.map((item,index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.id}</td>
                                        <td>{item.text}</td>
                                        <td>{item.textDesc}</td>
                                        <td>
                                            <button className='btn btn-primary me-2' onClick={()=>editData(item)}>Edit</button>
                                            <button className='btn btn-danger' onClick={()=>deleteData(item)}>Delete</button>
                                            </td>
                                    </tr>
                                )

                            })
                        }
                    </tbody>
                </table>
        </div>

    )
}

export default UseReducer;