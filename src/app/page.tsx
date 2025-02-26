import { Button } from "app/components/ui/button";
import Layout from "app/layout/Layout";

export default function Home() {
  return (
    <>
      <Layout>
        <div className="m-4">
          <h1>Hola mundo</h1>
          <Button>Ratón</Button>
        </div>
      </Layout>
    </>
  );
}
