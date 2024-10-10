import React from "react";
import { Card, CardBody } from "@nextui-org/react";

export const LayananCard = ({ icon: Icon, title, description, isBlue }) => (
  <Card
    className={`w-full ${
      isBlue ? "bg-blue-600" : "bg-white border border-gray-200"
    }`}
  >
    <CardBody>
      <div className="flex flex-col justify-start items-start h-full">
        <div className="bg-[#E6F5FC] w-12 h-12 sm:w-16 sm:h-16 rounded-full flex justify-center items-center mb-4">
          <Icon className="text-2xl sm:text-4xl text-blue-500" />
        </div>
        <h2
          className={`text-lg sm:text-xl font-bold mb-2 ${
            isBlue ? "text-white" : "text-slate-700"
          }`}
        >
          {title}
        </h2>
        <p className={`text-sm ${isBlue ? "text-white" : "text-slate-600"}`}>
          {description}
        </p>
      </div>
    </CardBody>
  </Card>
);
