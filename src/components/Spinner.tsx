import React from "react";
import { BoltIcon } from "@heroicons/react/24/outline";

const Spinner: React.FC = () => (
  <div className="flex items-center justify-center space-x-2">
    <BoltIcon className="h-6 w-6 animate-spin text-blue-100" />
    <span className="font-medium text-blue-100">Loading...</span>
  </div>
);

export default Spinner;
