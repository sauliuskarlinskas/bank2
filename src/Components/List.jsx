import MoneyBalance from './Balance';

export default function ListOfAccounts({ accounts, setDeleteModalData, setEditData, msg }) {

    const destroy = c => setDeleteModalData(c);

    return (
        <>
            <div className="card m-5">
                <h2 className="card-header list-header">Sąskaitos</h2>
                <div className="card-body">
                    <ul className=" list-group">
                        {
                            accounts
                                ? accounts.length
                                    ? accounts.map(c => (
                                        <li key={c.id} className="list-group-item">
                                            
                                                <div className="account-data">
                                                    <p className="account-data-details">{c.Name}</p>
                                                    <p className="account-data-details">{c.LastName}</p>
                                                    <p className="account-data-details-money">{c.Balance}<span> €</span></p>
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', alignItems: 'center' }}>
                                                    <div>
                                                        <MoneyBalance
                                                            account={c}
                                                            setEditData={setEditData}
                                                            msg={msg} />
                                                   
                                                        <button className="button-del" onClick={_ => destroy(c)}>Ištrinti sąskaitą</button>
                                                    </div>
                                                </div>
                                            
                                        </li>))
                                    : 'Dar nėra sąskaitų'
                                : '...kraunasi'
                        }

                    </ul>
                </div>
            </div>
        </>
    )
}