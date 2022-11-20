import { memo, useEffect, useRef, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import 'chart.js/auto';
import { Chart, ChartProps } from 'react-chartjs-2';
import TableHelper from "../../components/TableHelper";
import { TransactionResValidator, TransactionValidator } from "../../validators/transaction.validator";
import Modal from "../../components/Modal";
import FieldHelper from "../../components/FieldHelper";
import Validator from "../../utils/Validator";
import Selection from '../../components/Selection'
import { toast } from "react-toastify";
const a_second = 1000
const a_minute = 60 * a_second
const a_hour = 60 * a_minute
const a_day = 24 * a_hour

function joinDate(t: Date, a: Intl.DateTimeFormatOptions[], s: string = ' ') {
    function format(m: Intl.DateTimeFormatOptions) {
        let f = new Intl.DateTimeFormat('en', m);
        return f.format(t);
    }
    return a.map(format).join(s);
}

const formatDate: Intl.DateTimeFormatOptions[] = [{ 'weekday': 'short' }, { 'day': '2-digit' }]

const options: ChartProps["options"] = {
    responsive: true,
    maintainAspectRatio: true,
    animation: {
        easing: 'easeInOutQuad',
        duration: 520
    },
    scales: {
        x: {
            grid: {
                display: false,
            }
        },
        y: {
            grid: {
                color: 'rgba(200, 200, 200, 0.2)'
            },
            ticks: {
                min: 0,
                stepSize: 1,
                max: 4
            },
            beginAtZero: true
        }
    },
    elements: {
        line: {
            tension: 0.1
        }
    },
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            enabled: false,
            intersect: false,
            mode: 'index',
            position: 'nearest'
        }
    }
} as any

export default () => {
    const { dip } = useAuth()
    const ref = useRef<HTMLCanvasElement>(document.createElement('canvas'))
    const [value, setValue] = useState<any>()
    const [last30minute, setLast30] = useState([...new Array(7).keys()].map(a => 0))
    const [last7day, setLast7] = useState([...new Array(7).keys()].map(a => 0))
    const [all, setAll] = useState([])
    const chartRef = useRef(null);

    const [users, setUsers] = useState<string[]>([]);
    const init = async () => {
        const data = await dip?.fetch('/api/admin/account/users', 'POST')

        if (data) setUsers(data.map((a: any) => a.user_id))
    }


    const load30min = async () => {
        const data = await dip?.fetch('/api/admin/transaction/last30minute', 'POST')
        if (data) {
            const d = data.map((a: any) => new Date(a.timestamp)) as Date[]
            const date = Date.now() - Date.now() % (a_minute*5)
            setLast30(
                [...new Array(7).keys()].map(a => {
                    const i = (6 - a) * 5
                    const start = date - i * a_minute
                    const end = date - (i - 5) * a_minute
                    return d.filter(a => {
                        return a >= new Date(start) && a < new Date(end)
                    }).length
                })
            )
        }
    }

    const load7day = async () => {
        const data = await dip?.fetch('/api/admin/transaction/last7day', 'POST')
        if (data) {
            const d = data.map((a: any) => new Date(a.timestamp)) as Date[]
            const date = Date.now() - Date.now() % a_day
            setLast7(
                [...new Array(7).keys()].map(a => {
                    const i = (6 - a)
                    const start = date - i * a_day
                    const end = date - (i - 1) * a_day
                    return d.filter(a => {
                        return a >= new Date(start) && a < new Date(end)
                    }).length
                })
            )
        }
    }

    const loadAll = async () => {
        const data = await dip?.fetch('/api/admin/transaction/history', 'POST', {
            data: {
                'take': 20
            }
        })
        if (data) {
            setAll(data)
        }
    }

    useEffect(() => {
        if (dip) {
            load30min()
            load7day()
            loadAll()
            init()
        }
        const i = setInterval(() => {
            if (dip) {
                load30min()
                load7day()
                loadAll()
            }
        }, 1000)
        return () => clearInterval(i)
    }, [])

    const onClick = async (data: any) => {
        const { validate, errors } = await Validator(TransactionValidator, data)
        console.log(errors)
        if (validate) {
            const res = await await dip?.fetch('/api/admin/transaction/create', 'POST', {
                data
            })
            if (res) {
                if (res.code == 200) {
                    toast.success(`🍌 ${res.message}`, {
                        position: "top-center",
                        theme: 'dark',
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    toast.error(`🍌 ${res.message}`, {
                        position: "top-center",
                        theme: 'dark',
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            }
        }
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-end w-full space-x-3 pb-4">
                <div>
                    <Modal name="Create Transation">
                        <div className="text-2xl mb-4">Create Transation</div>
                        <div className="w-full flex flex-col items-center">
                            <FieldHelper
                                onChange={setValue}
                                type={'fill'}
                                validator={TransactionValidator}
                                replace={{
                                    'sender_id':
                                        ({ value, onChange, name, values }) => {
                                            return <Selection onChange={onChange} value={value} name={name} showName options={users.filter(a => a != values.receiver_id)} ></Selection>
                                        },
                                    'receiver_id':
                                        ({ value, onChange, name, values }) => {
                                            return <Selection onChange={onChange} value={value} name={name} showName options={users.filter(a => a != values.sender_id)} ></Selection>
                                        },
                                }}
                            ></FieldHelper>
                            <div className="w-full max-w-sm">
                                <button onClick={() => { onClick(value) }} className='w-[100%] my-10 py-2 bg-blue-500 hover:bg-blue-800 text-white shadow-sm shadow-gray-500/80 rounded-lg'>Create</button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
            <div className="flex space-x-4 w-full">
                <div className="basis-3/6 shadow-1 p-4 rounded-xl">
                    <div>
                        TRANSITIONS IN LAST 30 MINUTES
                    </div>
                    <div className="relative">
                        <Chart
                            ref={chartRef}
                            type='line'
                            options={{
                                ...options,
                                plugins: {
                                    ...options?.plugins,
                                    tooltip: {
                                        ...options?.plugins?.tooltip,
                                        external: (model) => {
                                            const tooltip = document.getElementById('tooltip') as any;
                                            if (model.tooltip.opacity === 0) {
                                                tooltip.style.opacity = 0;
                                                return;
                                            } else {
                                                tooltip.style.opacity = 1;
                                            }
                                            const { offsetLeft: positionX, offsetTop: positionY, height } = model.chart.canvas;
                                            tooltip.style.left = (model.tooltip.caretX) + positionX + 20 + 'px';
                                            tooltip.style.top = height / 2 - 20 + 'px';
                                            tooltip.style.display = 'block';
                                            const date = new Date(Date.now() - Date.now() % (5 * a_minute) - parseInt(model.tooltip.dataPoints[0].label) * a_minute)
                                            tooltip.querySelector('.tooltip-label').textContent = joinDate(date, [{ 'weekday': 'short' }, { 'day': '2-digit' }]) + '   AT ' + `${date.getHours()}:${date.getMinutes()}`;
                                            tooltip.querySelector('.tooltip-value .value').textContent = model.tooltip.dataPoints[0].raw;
                                        }
                                    }
                                }
                            }}
                            data={{
                                labels: [...new Array(7).keys()].map(a => (6 - a) * 5),
                                datasets: [
                                    {
                                        label: 'transaction',
                                        data: last30minute,
                                    }
                                ]
                            }}
                        />
                        <div id="tooltip" className="absolute bg-white shadow-1 p-2 rounded-xl pointer-events-none w-[150px] opacity-0 z-10">
                            <div className="tooltip-label text-xs"></div>
                            <div className="tooltip-value">
                                <span className="color-circle"></span>
                                <span className="value"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="basis-3/6 shadow-1 p-4 rounded-xl">
                    <div>
                        TRANSITIONS IN LAST 7 DAYS
                    </div>
                    <div className="relative">
                        <Chart
                            ref={chartRef}
                            type='line'
                            options={{
                                ...options,
                                plugins: {
                                    ...options?.plugins,
                                    tooltip: {
                                        ...options?.plugins?.tooltip,
                                        external: (model) => {
                                            const tooltip = document.getElementById('tooltip2') as any;
                                            if (model.tooltip.opacity === 0) {
                                                tooltip.style.opacity = 0;
                                                return;
                                            } else {
                                                tooltip.style.opacity = 1;
                                            }
                                            const { offsetLeft: positionX, offsetTop: positionY, height } = model.chart.canvas;
                                            tooltip.style.left = (model.tooltip.caretX) + positionX + 20 + 'px';
                                            tooltip.style.top = height / 2 - 20 + 'px';
                                            tooltip.style.display = 'block';
                                            tooltip.querySelector('.tooltip-label').textContent = new Date(Date.now() - (7 - model.tooltip.dataPoints[0].dataIndex) * a_day).toDateString();
                                            tooltip.querySelector('.tooltip-value .value').textContent = model.tooltip.dataPoints[0].raw;
                                        }
                                    }
                                }
                            }}
                            data={{
                                labels: [...new Array(7).keys()].map(a => joinDate(new Date(Date.now() - (6 - a) * a_day), formatDate)),
                                datasets: [
                                    {
                                        label: 'transaction',
                                        data: last7day,
                                    }
                                ]
                            }}
                        />
                        <div id="tooltip2" className="absolute bg-white shadow-1 p-2 rounded-xl pointer-events-none w-[150px] opacity-0 z-10">
                            <div className="tooltip-label text-xs"></div>
                            <div className="tooltip-value">
                                <span className="color-circle"></span>
                                <span className="value"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-full pt-3 flex flex-col w-full">
                <div className="text-xl mb-2">Transaction</div>
                <TableHelper
                    asKey={'transaction_id'}
                    validator={TransactionResValidator}
                    value={all as any[]}
                    CustomItem={MemoCustomItem}
                    ignore={['setting', 'expense']}
                ></TableHelper>
            </div>
        </div>
    )
}

const Custom = ({ value }: { value: any }) => {
    return <tr>
        <td className="px-4 py-2 whitespace-nowrap">{new Date(value.timestamp).toISOString()}</td>
        <td className="px-4 py-2 text-end">#{value.transaction_id}</td>
        <td className="px-4 py-2 whitespace-nowrap">{value.type == 'SEND' ? value.sender.firstname + ' ' + value.sender.lastname : value.receiver.firstname + ' ' + value.receiver.lastname}</td>
        <td className="px-4 py-2">{value.status}</td>
        <td className="px-4 py-2 text-end">
            {
                value.type == 'SEND' ? (
                    <div className="text-rose-500">-{value.amount}฿</div>
                ) : (
                    <div className="text-black/80">{value.amount}฿</div>
                )
            }
        </td>
    </tr>
}

export const MemoCustomItem = memo(Custom)