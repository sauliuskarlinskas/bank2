import { useState } from 'react';

export default function AddNewAccount({ setCreateData, msg }) {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');

  const save = (event) => {
    event.preventDefault();
    // Data validation
    if (/^[A-Za-z]+$/.test(name) && /^[A-Za-z]+$/.test(lastName)) { // Characters used must be letters 
      setCreateData({
        Name: name,
        LastName: lastName,
        Balance: 0,
      });
      setName(''); // Clean the window after submit
      setLastName(''); // Clean the window after submit

    } else {
      msg('Prašome užpildyti laukus. Naudojami simboliai turi būti raidės.');
    }
  };

  return (
    <div className="card m-5">
      <h2 className="card-header">Sukurti naują sąskaitą</h2>
      <div className='card-body'>
        <form className='card-body'>
          <fieldset className="fieldset-add-new">
            <label htmlFor="name" style={{ display: 'none' }}></label>
            <input className="fieldset-input" type="text" id="name" placeholder="Vardas" required value={name} onChange={e => setName(e.target.value)} />
            <label htmlFor="lastName" style={{ display: 'none' }}></label>
            <input value={lastName} onChange={e => setLastName(e.target.value)} className="fieldset-input" type="text" id="lastName" placeholder="Pavardė" required />
          </fieldset>
        </form>
        <button className="button" onClick={save}>Sukurti sąskaitą</button>
      </div>
    </div>
  )
}