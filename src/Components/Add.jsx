import { useEffect, useState } from "react";


export default function Add({ editModalData, setEditModalData, setEditData }) {

    const [balance, setBalance] = useState(null);



    const save = _ => {
        setEditData({...editModalData, id: editModalData.id});
        setEditModalData(0);
    }


    useEffect(() => {
        if (null === editModalData) {
            return;
        }
        setBalance(editModalData.balance)
    }, [editModalData]
    )



    if (null === editModalData) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-dialog  modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title red-color">Pridėti lėšų</h5>
                        <button type="button" className=" btn-del btn-close" onClick={_ => setEditModalData(null)}></button>
                    </div>
                    <div className="input-group mb-3">
                        <input type="number" className="form-control" id="amount"/>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn" onClick={save}>Pridėti</button>
                    </div>
                </div>
            </div>
        </div>
    );
}