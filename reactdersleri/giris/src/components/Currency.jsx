import React, { useState } from 'react'
import '../css/Currency.css'
import { PiArrowFatLineRightFill } from "react-icons/pi";
import axios from 'axios';

let BASE_URL = "https://api.freecurrencyapi.com/v1/latest";
let API_KEY = "fca_live_Uaaod5sgjCTnzkIsIhj1QWIDyxxeKkuRBtPeDf8d";

function Currency() {
    const [amount, setAmount] = useState("");
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("TRY");
    const [result, setResult] = useState("");

    const exchange = async () => {
        if (!amount) {
            alert("Lütfen bir miktar girin!");
            return;
        }

        try {
            const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurrency}`);
            if (response.data && response.data.data[toCurrency]) {
                const calculatedResult = (response.data.data[toCurrency] * parseFloat(amount)).toFixed(2);
                setResult(calculatedResult);
            } else {
                alert("Döviz kuru alınamadı, lütfen daha sonra tekrar deneyin.");
            }
        } catch (error) {
            console.error("API Hatası:", error);
            alert("Döviz kuru alınırken hata oluştu.");
        }
    }

    return (
        <div className='currency-div'>
            <div>
                <h3>DÖVİZ KURU UYGULAMASI</h3>
            </div>

            <div>
                <input 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    type="number" 
                    className='amount' 
                />

                <select 
                    value={fromCurrency} 
                    onChange={(e) => setFromCurrency(e.target.value)} 
                    className='from-currency-option'
                >
                    <option>USD</option>
                    <option>EUR</option>
                    <option>TRY</option>
                </select>

                <PiArrowFatLineRightFill style={{ fontSize: '25px', marginRight: '10px' }} />

                <select 
                    value={toCurrency} 
                    onChange={(e) => setToCurrency(e.target.value)} 
                    className='to-currency-option'
                >
                    <option>TRY</option>
                    <option>USD</option>
                    <option>EUR</option>
                </select>

                <input 
                    value={result} 
                    readOnly 
                    type="text" 
                    className='result' 
                />
            </div>

            <div>
                <button onClick={exchange} style={{ marginTop: '20px' }} className='exchange-button'>
                    ÇEVİR
                </button>
            </div>
        </div>
    );
}

export default Currency;
