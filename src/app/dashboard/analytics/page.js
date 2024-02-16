/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import useDiscussData from '@/app/hooks/useDiscussData';
import useHackathonData from '@/app/hooks/useHackathonData';
// import useMyBlog from '@/app/hooks/useMyBlog';
import usePaymentData from '@/app/hooks/usePaymentData';
// import { useEffect, useState } from 'react';
// import { FaBook, FaDollarSign, FaUsers } from 'react-icons/fa';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Legend, PieChart, Pie } from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Page = () => {
    const [allhackathon] = useHackathonData()
    const [payment] = usePaymentData()
    const [discuss] = useDiscussData()

    

    const data = [
        {
            name: 'Posts',
            uv: discuss.length,
        },
        {
            name: 'Hackathon',
            uv: allhackathon.length,
        },
        {
            name: 'Payments',
            uv: payment.length,
        },
    ];

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;
        const getPath = (x, y, width, height) => {
            return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
                ${x + width / 2}, ${y}
                C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
                Z`;
        };

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const pieChartData = data.map((item) => ({ name: item.name, value: item.uv }));

    return (
        <div>
            <h2 className="text-3xl">
                <span>Hi, Welcome </span>
            </h2>
            <div className="flex" style={{ width: '100%', height: '76%', marginTop: '121px' }}>
                <div className="w-1/2">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Bar
                            dataKey="uv"
                            fill="#8884d8"
                            shape={<TriangleBar />}
                            label={{ position: 'top' }}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
                <div className="w-1/2">
                    <PieChart width={400} height={400}>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend />
                    </PieChart>
                </div>
                
            </div>
        </div>
    );
};

export default Page;
