import { useExampleData } from "./services/use-get-cards";

const Carts = () => {
  const { data } = useExampleData();

  console.log("data", data);

  return (
    <div>
      <h1>All carts</h1>
    </div>
  );
};

export default Carts;
