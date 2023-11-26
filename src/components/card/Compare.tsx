interface datos {
  temperature: number;
  lightLevel: number;
  energyConsumption: number;
}

export const CompareCard = ({
  officeName,
  data,
  time,
}: {
  officeName: string;
  data: datos[];
  time: string;
}) => {
  return (
    <div className="max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
      <h1 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
        {officeName}
      </h1>

      {data.length === 0 ? (
        <p>No hay datos por desplegar</p>
      ) : (
        data.map((week, index) => (
          <div className="my-2 p-2" key={week.lightLevel + " " + index}>
            <p>Semana {index + 1}: </p>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Temperatura promedio: {week.temperature} °C
            </p>

            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Nivel de luz: {week.lightLevel} (0-1024)
            </p>
            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
              Consumo de Luz (kwh): {week.energyConsumption}
            </p>
          </div>
        ))
      )}

      <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
        Ultima hora de actividad: {time}
      </p>
    </div>
  );
};
