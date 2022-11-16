import { useEffect, useRef, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import 'chart.js/auto';
import { Chart, ChartProps } from 'react-chartjs-2';
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
    const [last30minute, setLast30] = useState([...new Array(7).keys()].map(a => 0))
    const [last7day, setLast7] = useState([...new Array(7).keys()].map(a => 0))
    const [all, setAll] = useState([])
    const chartRef = useRef(null);
    const load30min = async () => {
        const data = await (await dip!.on()).post('/api/v1/admin/transaction/last30minute')
        if (data) {
            const d = data.map((a: any) => new Date(a.timestamp)) as Date[]
            setLast30(
                [...new Array(7).keys()].map(a => {
                    const i = (6 - a) * 5
                    const end = Date.now() - i * a_minute
                    const start = Date.now() - (i + 5) * a_minute
                    return d.filter(a => {
                        return a >= new Date(start) && a < new Date(end)
                    }).length
                })
            )
        }
    }

    const load7day = async () => {
        const data = await (await dip!.on()).post('/api/v1/admin/transaction/last7day')
        if (data) {
            const d = data.map((a: any) => new Date(a.timestamp)) as Date[]
            setLast7(
                [...new Array(7).keys()].map(a => {
                    const i = (6 - a)
                    const start = Date.now() - (i + 1) * a_day
                    const end = Date.now() - i * a_day
                    return d.filter(a => {
                        return a >= new Date(start) && a < new Date(end)
                    }).length
                })
            )
        }
    }

    const loadAll = async () => {
        const data = await (await dip!.on()).post('/api/v1/admin/transaction/history', {
            body: JSON.stringify({
                'take': 20
            })
        })
        if (data) {
            data.reverse()
            setAll(data)
        }
    }

    useEffect(() => {
        if(dip){
            load30min()
            load7day()
            loadAll()
        }
        const i = setInterval(() => {
            if(dip){
                load30min()
                load7day()
                loadAll()
            }
        }, 1000)
        return () => clearInterval(i)
    }, [])
    return (
        <div className="flex flex-col h-full">
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
                                            tooltip.querySelector('.tooltip-label').textContent = new Date(Date.now() - (6 - model.tooltip.dataPoints[0].dataIndex) * a_day).toDateString();
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
            <div className="h-full pt-3 flex flex-col">
                <div className="text-xl mb-2">Transaction</div>
                <div className="rounded-lg shadow-1 w-full h-full flex flex-col">
                    <div className="grid grid-cols-6 border-b px-6">
                        <div className="col-span-2 px-12 py-3">DATE</div>
                        <div className="py-3">ID</div>
                        <div className="col-span-2 py-3">NAME</div>
                        <div className="py-3">VALUE</div>
                    </div>
                    <div className="w-full h-[480px] overflow-y-scroll p-4">
                        <div>
                            {
                                all.map((a: any) => {
                                    return (
                                        <div key={JSON.stringify(a)} className="grid grid-cols-6 mx-2 px-2 rounded-2xl cursor-pointer opacity-80 hover:bg-[#F1F3F4] hover:opacity-100">
                                            <div className="col-span-2 py-3 pl-2">{new Date(a.timestamp).toISOString()}</div>
                                            <div className="py-3">#{a.transaction_id}</div>
                                            <div className="col-span-2 py-3">{a.user_id}</div>
                                            <div className="py-3 text-end">
                                                {
                                                    a.send ? (
                                                        <div className="text-rose-500">-{a.send.amount}฿</div>
                                                    ) : (
                                                        <div className="text-black/80">{a.receive.amount}฿</div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}