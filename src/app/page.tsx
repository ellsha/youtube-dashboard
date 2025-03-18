import Dashboard from "@/components/Dashboard";
import data from "../../data/data.json";

const Home = () => <Dashboard videos={data.items} />;

export default Home;
