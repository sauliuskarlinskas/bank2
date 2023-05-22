import { useRef } from "react";

export default function MoneyBalance({ setEditData, account, msg }) {

    const moneyFlow = useRef(0);

    const plus = event => {
        event.preventDefault();
        const money = parseFloat(moneyFlow.current.value);
        // Data validation
        if (money === undefined || money === null) { 
            setEditData({ ...account, Balance: account.Balance });
            msg('Įveskite sumą!', 'info');

        } else if (isNaN(money) || money <= 0) { 
            setEditData({ ...account, Balance: account.Balance });
            msg('Įveskite tinkamą teigiamą sumą!', 'info');

        } else if (!/^\d+(\.\d{1,2})?$/.test(money)) { 
            setEditData({ ...account, Balance: account.Balance });
            msg('Įveskite teigiamą sumą iki dviejų skaičių po kablelio!', 'info');

        } else { 
            const newBalancePlus = account.Balance + money;
            setEditData({ ...account, Balance: newBalancePlus });
            msg('Pinigai buvo pridėti į sąskaitą!', 'info');
            moneyFlow.current.value = null;
        }
    };

    const minus = event => {
        event.preventDefault();
        const money = parseFloat(moneyFlow.current.value);
        // Data validation
        if (money === undefined || money === null) {
            setEditData({ ...account, Balance: account.Balance });
            msg('Įveskite sumą!', 'info');
            
        } else if (isNaN(money) || money <= 0) {
            setEditData({ ...account, Balance: account.Balance });
            msg('Įveskite tinkamą teigiamą sumą!', 'info');
            
        } else if (!/^\d+(\.\d{1,2})?$/.test(money)) {
            setEditData({ ...account, Balance: account.Balance });
            msg('Įveskite teigiamą sumą iki dviejų skaičių po kablelio!', 'info');
            
        } else if (money > account.Balance) {
            setEditData({ ...account, Balance: account.Balance });
            msg('Negalite atsiimti daugiau nei jūsų likutis!', 'info');
            
        } else {
            const newBalanceMinus = account.Balance - money;
            setEditData({ ...account, Balance: newBalanceMinus });
            msg('Pinigai buvo nuimti iš sąskaitos!', 'info');
            moneyFlow.current.value = null;
        }
    };

    return (
        <form>
            <fieldset className="fieldset">
                <label htmlFor="moneyFlow" style={{ display: 'none' }}></label>
                <input ref={moneyFlow} type="text" id="moneyFlow" className="fieldset-input-money" placeholder="Įveskite sumą" />
                <div className="fieldset-buttons">
                    <button className="button" onClick={plus}>Pridėti</button>
                    <button className="button" onClick={minus}>Išsiimti</button>
                </div>
            </fieldset>
        </form>
    )
}