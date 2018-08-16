import React from 'react';

import {
  // PieChart, Pie, Legend, Cell, Tooltip, ResponsiveContainer,
  Sector,
  // Label, LabelList,
} from 'recharts';

export const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">
        {`Count ${payload.count}`}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(percent: ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export const userOptions = [
  { key: 'normal', text: '普通用户', value: 'normal' },
  { key: 'operator', text: '运营', value: 'operator' },
  { key: 'vicePresident', text: '副总', value: 'vicePresident' },
  { key: 'admin', text: '管理员', value: 'admin' },
];

export const arrayClassify = (arr, sort) => {
  const originData = JSON.parse(JSON.stringify(arr));
  const obj = {};
  originData.map((item, index) => {
    if (!obj[item[sort]]) {
      obj[item[sort]] = new Array();
    }
    obj[item[sort]].push(item);
  });
  return obj;
};

export const handleDatStatisticsData = (arr) => {
  let newArr = JSON.parse(JSON.stringify(arr));
  newArr.map((item) => { item.date = new Date(item.date).toLocaleDateString(); });
  newArr.map((item) => { item.time = new Date(item.hourDate).getTime(); });
  newArr.map((item) => { item.hourDate = new Date(item.hourDate).getHours().toLocaleString('chinese', { hour12: false }); });
  newArr.sort((a, b) => a.time - b.time);
  newArr = arrayClassify(newArr, 'date');
  return newArr;
};

export const mapData = (arr, variableNames, variableFuns) => {
  const newArr = arr.map((item) => {
    const newItem = {};
    variableNames.map((ele) => {
      newItem[ele] = variableFuns[ele](item);
      return true;
    });
    const result = {
      ...newItem,
      ...item,
    };
    return result;
  });
  return newArr;
};


export const testMapData = () => {
  const a = [
    {
      w: 1,
      h: 2,
    },
    {
      w: 1,
      h: 2,
    },
    {
      w: 1,
      h: 2,
    },
    {
      w: 1,
      h: 2,
    },
  ];

  const b = mapData(a, ['plus', 'minus'], {
    plus: param => param.w + param.h,
    minus: param => param.w - param.h,
  });

  console.log(b, '==================');
};

