// CurrencyConverter.js
import { useEffect, useState } from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import { HiSwitchHorizontal } from 'react-icons/hi';
import 'react-dropdown/style.css';
import './CurrencyConverter.css';

function CurrencyConverter() {

    // 初始化所有的 state 变量
    const [info, setInfo] = useState([]);
    const [input, setInput] = useState(0);
    const [from, setFrom] = useState("usd");
    const [to, setTo] = useState("inr");
    const [options, setOptions] = useState([]);
    const [output, setOutput] = useState(0);

    // 使用 ExchangeRate-API 获取汇率数据
    useEffect(() => {
        Axios.get(
            `https://v6.exchangerate-api.com/v6/afac83a1502f7ef55764ebc2/latest/${from}`
        )
        .then((res) => {
            setInfo(res.data.conversion_rates);
        })
        .catch((error) => {
            console.error("Error fetching currency data:", error);
            alert("无法获取汇率数据，请稍后再试！");
        });
    }, [from]);

    // 每当 info 更新时，更新选项并进行货币转换
    useEffect(() => {
        setOptions(Object.keys(info));
        convert();
    }, [info]);

    // 货币转换函数
    function convert() {
        var rate = info[to];
        setOutput(input * rate);
    }

    // 交换货币函数
    function flip() {
        var temp = from;
        setFrom(to);
        setTo(temp);
    }

    return (
        <div className="App">
            <div className="heading">
                <h1>Currency Converter</h1>
            </div>
            <div className="container">
                <div className="left">
                    <h3>Amount</h3>
                    <input
                        type="number"
                        placeholder="Enter the amount"
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>
                <div className="middle">
                    <h3>From</h3>
                    <Dropdown
                        options={options}
                        onChange={(e) => { setFrom(e.value) }}
                        value={from}
                        placeholder="From"
                    />
                </div>
                <div className="switch">
                    <HiSwitchHorizontal size="30px" onClick={() => { flip() }} />
                </div>
                <div className="right">
                    <h3>To</h3>
                    <Dropdown
                        options={options}
                        onChange={(e) => { setTo(e.value) }}
                        value={to}
                        placeholder="To"
                    />
                </div>
            </div>
            <div className="result">
                <button onClick={() => { convert() }}>Convert</button>
                <h2>Converted Amount:</h2>
                <p>{input + " " + from + " = " + output.toFixed(2) + " " + to}</p>
            </div>
        </div>
    );
}

export default CurrencyConverter;
