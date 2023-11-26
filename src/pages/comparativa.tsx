import Nav from "~/components/Nav/Nav";
import Description from "~/components/general/description";
import Title from "~/components/general/title";
import { CompareCard } from "~/components/card/Compare";

const Comparativa = () => {
  return (
    <>
      <Nav />
      <div className="bg-gradient-radial container flex min-h-screen min-w-full flex-col from-sky-100/90 to-white px-10 pt-24">
        <Title title="Compartiva de oficinas" />
        <Description description="Compara los gastos de las oficinas seleccionadas." />
        <div className="my-6 flex flex-row flex-wrap justify-around gap-x-5">
          <CompareCard
            data={[
              { energyConsumption: 20, lightLevel: 400, temperature: 25 },
              { energyConsumption: 25, lightLevel: 400, temperature: 18 },
              { energyConsumption: 20, lightLevel: 400, temperature: 31 },
              { energyConsumption: 20, lightLevel: 400, temperature: 24 },
            ]}
            officeName="Oficina A"
            time={"Sun Nov 26 2023 09:47:20 GMT-0600 (Central Standard Time)"}
          />
          <CompareCard
            data={[
              { energyConsumption: 20, lightLevel: 400, temperature: 25 },
              { energyConsumption: 34, lightLevel: 400, temperature: 18 },
              { energyConsumption: 24, lightLevel: 400, temperature: 31 },
              { energyConsumption: 30, lightLevel: 400, temperature: 24 },
            ]}
            officeName="Oficina B (con SRM)"
            time={"Sun Nov 26 2023 09:47:20 GMT-0600 (Central Standard Time)"}
          />
        </div>
        <Description description="La oficina 1 ahorra 20% más de energía, " />
      </div>
    </>
  );
};

export default Comparativa;
