import React from 'react'

const AddPrisoner = () => {
  return (
    <form>
      <input name='name' placeholder='Name' />
      <label class="container">Gender</label>
      <label class="container">Male
        <input type="checkbox" />
        <span class="checkmark"></span>
      </label>
      <label class="container">Female
        <input type="checkbox" />
        <span class="checkmark"></span>
      </label>
      <label class="container">Can Have Outside Clearence:
        <input type="checkbox" />
        <span class="checkmark"></span>
      </label>
      <input name='skills' placeholder='Skills' />
      <button>Add Prisoner</button>
    </form>
  )
}

export default AddPrisoner