import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

const DashboardChart = ({
    title,
    type,
    data,
    dataKeys = [],
    COLORS = [],
    lineNames = [],
    lineColors = [],
    height = 300,
    colSpan = 1,
}) => {
    return (
        <Card
            className={`border-0 bg-gradient-to-br from-slate-800 to-slate-800/50 shadow-xl ${colSpan > 1 ? `lg:col-span-${colSpan}` : ''}`}
        >
            <CardHeader>
                <CardTitle className="text-white">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={height}>
                    {type === 'line' ? (
                        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="date" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1e293b',
                                    border: '1px solid #475569',
                                    borderRadius: '8px'
                                }}
                                labelStyle={{ color: '#e2e8f0' }}
                            />
                            <Legend wrapperStyle={{ paddingTop: '20px' }} />
                            {dataKeys.map((key, i) => (
                                <Line
                                    key={key}
                                    type="monotone"
                                    dataKey={key}
                                    name={lineNames[i] || key}
                                    stroke={lineColors[i] || '#3b82f6'}
                                    strokeWidth={2}
                                    dot={{ fill: lineColors[i] || '#3b82f6', r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                            ))}
                        </LineChart>
                    ) : (
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label={{ fill: '#e2e8f0', fontSize: 12 }}
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#1e293b',
                                    border: '1px solid #475569',
                                    borderRadius: '8px'
                                }}
                                labelStyle={{ color: '#e2e8f0' }}
                            />
                        </PieChart>
                    )}
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default DashboardChart;