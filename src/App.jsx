
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import './buttons.scss';
import { useEffect, useState } from 'react';
import { crudCreate, crudDelete, crudEdit, crudRead } from './Functions/localStorageCrud';
import ListOfAccounts from './Components/List';
import AddNewAccount from './Components/Create';
import DeleteAccount from './Components/Delete';
import Messages from './Components/Messages';
import { v4 as uuidv4 } from 'uuid';

const KEY = 'myAccounts';

function App() {

  const [listUpdate, setListUpdate] = useState(Date.now());
  const [createData, setCreateData] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [deleteModalData, setDeleteModalData] = useState(null);
  const [editData, setEditData] = useState(null);
  const [messages, setMessages] = useState([]);

  //R read
  useEffect(_ => {
    setAccounts(crudRead(KEY).map((c, i) => ({ ...c, row: i, show: true })));
  }, [listUpdate]);


  //C create
  useEffect(_ => {
    if (null === createData) {
      return;
    }
    crudCreate(KEY, createData);
    setListUpdate(Date.now());
    msg('Sukurta nauja sąskaita!', 'info');
  }, [createData]);

  //U update
  useEffect(_ => {
    if (null === editData) {
      return;
    }
    crudEdit(KEY, editData, editData.id);
    setListUpdate(Date.now());
  }, [editData]);

  //D deleate
  useEffect(_ => {
    if (null === deleteData) {
      return;
    }
    crudDelete(KEY, deleteData.id);
    setListUpdate(Date.now());
    msg('Sąskaita buvo ištrinta!', 'info');
  }, [deleteData]);



  // Messages
  const msg = (text, type) => {
    const id = uuidv4();
    const message = {
      id,
      text,
      type
    }
    setMessages(m => [...m, message]);
    setTimeout(_ => setMessages(m => m.filter(m => m.id !== id)), 5000);
  }

  return (
    <div className="App">
      <main className="App-main">
        <div className="container">
          <div className="row">

            
            <div className="col-4">
              <AddNewAccount
                setCreateData={setCreateData}
                msg={msg} />
            </div>

            <div className="col-8">
              <ListOfAccounts
                accounts={accounts}
                setEditData={setEditData}
                setDeleteModalData={setDeleteModalData}
                msg={msg}
              />
            </div>

          </div>
        </div>
        <DeleteAccount
          deleteModalData={deleteModalData}
          setDeleteModalData={setDeleteModalData}
          setDeleteData={setDeleteData}
        />
        <Messages messages={messages} />
      </main>

    </div >
  );
}

export default App;