import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import useDetailContext from "../hooks/useDetail.js";

function PieGraph() {

    //const COLORS = ['#0088FE', '#00C49F'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const { dataRaw } = useDetailContext();

    const resolvedCount = dataRaw.filter(cart => cart.resolved === true).length;
    const notResolvedCount = dataRaw.length - resolvedCount;

    // const data = [
    //     { name: 'Resolved', value: 5 },
    //     { name: 'Not Resolved', value: 6 },
    // ];
    //https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj'
    const chartData = [
        { name: "Solved", value: resolvedCount },
        { name: "Unsolved", value: notResolvedCount },
    ];
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    return (
        <div style={{ height: "400px" }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    {/* <Legend />
                    <Tooltip /> */}
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
    // return (
    //     <ResponsiveContainer width="500px" height="500px">
    //         <PieChart width={400} height={400}>
    //             <Pie
    //                 data={data}
    //                 cx="50%"
    //                 cy="50%"
    //                 labelLine={false}
    //                 label={renderCustomizedLabel}
    //                 outerRadius={80}
    //                 fill="#8884d8"
    //                 dataKey="value"
    //             >
    //                 {data.map((entry, index) => (
    //                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    //                 ))}
    //             </Pie>
    //         </PieChart>
    //     </ResponsiveContainer>
    // );
}

export default PieGraph;