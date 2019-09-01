import React, {useState} from 'react'

const AddPrisoner = () => {
  const [prisonerInfo, setPrisonerInfo] = useState(
    {
      name: '',
      gender: '',
      canHaveOutsideClearence: '',
      skills: ''
    }
  )

  const onChangeHandler = event => {
    setPrisonerInfo(
      {
        ...prisonerInfo,
        [event.target.name]: event.target.value
      }
    )
  }

  const onSubmitHandler = event => {
    event.preventDefault()
    console.log(prisonerInfo)
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <input name='name' value={prisonerInfo.name} onChange={onChangeHandler} placeholder='Name' />
      <p><strong>Select Gender:</strong></p>
      <select name='gender' value={prisonerInfo.gender} onChange={onChangeHandler}>
          <option value="male">Male</option>
          <option value="female">Female</option>
      </select>
      <p><strong>Can Have Work Leave:</strong></p>
      <select name='canHaveOutsideClearence' value={prisonerInfo.canHaveOutsideClearence} onChange={onChangeHandler}>
          <option value="yes">Yes</option>
          <option value="no">No</option>
      </select>
      <input name='skills' value={prisonerInfo.skills} onChange={onChangeHandler} placeholder='Skills' />
      <button>Add Prisoner</button>
    </form>
  )
}

export default AddPrisoner