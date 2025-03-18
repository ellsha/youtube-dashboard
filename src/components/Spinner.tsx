import React from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

const Spinner: React.FC = () => (
  <div className="flex items-center justify-center">
    <ArrowPathIcon className="h-16 w-16 animate-spin text-gray-200" />
  </div>
);

export default Spinner;
