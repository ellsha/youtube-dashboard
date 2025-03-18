import { ElementOf } from "ts-essentials";
import data from "../data/data.json";

export type Video = ElementOf<typeof data.items>;
