import React from 'react';
import { Card, CardBody, Skeleton } from "@nextui-org/react";

const SkeletonCounterCard = () => {
  return (
    <Card radius="sm" className="p-4">
      <CardBody className="flex flex-col justify-center items-start">
        <Skeleton className="rounded-lg">
          <div className="w-10 h-10 rounded bg-default-300"></div>
        </Skeleton>
        <Skeleton className="rounded-lg mt-4">
          <div className="h-4 w-24 rounded bg-default-200"></div>
        </Skeleton>
        <Skeleton className="rounded-lg mt-2">
          <div className="h-8 w-16 rounded bg-default-300"></div>
        </Skeleton>
      </CardBody>
    </Card>
  );
};

export default SkeletonCounterCard; 