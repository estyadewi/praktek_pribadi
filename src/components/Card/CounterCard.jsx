"use client";

import { useEffect } from "react";
import { Card, CardBody } from "@nextui-org/react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

const Counter = ({ value }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, value, { duration: 2 });
    return controls.stop;
  }, [value]);

  return <motion.span>{rounded}</motion.span>;
};

const CounterCard = ({ icon: Icon, title, value }) => {
  return (
    <Card radius="sm" className="p-4">
      <CardBody className="flex flex-col justify-center items-start">
        <div className="bg-[#EEF3FF] p-2 rounded mb-4">
          <Icon className="text-3xl text-slate-400" />
        </div>
        <p className="text-[#676767] text-sm font-normal">{title}</p>
        <p className="text-2xl font-bold text-[#0F172A] mt-1">
          <Counter value={value} />
        </p>
      </CardBody>
    </Card>
  );
};

export default CounterCard;