"use client";
import { Button } from "app/components/ui/button";
import Layout from "app/layout/Layout";

export default function Home() {
  /* Hazme un ejemplo de una función que use un fetch */
  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/1"
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Layout>
        <div className="m-4">
          <h1>Hola mundo</h1>
          <Button onClick={fetchData}>Ratón</Button>
        </div>
      </Layout>
    </>
  );
}
