import Nav from "~/components/Nav/Nav";
import Title from "~/components/general/title";


const Monitoreo = () => {

    const Data = [
        { id: "1", status: "ocupado", luces: "encendido", temperatura: "81" }
    ]

    return (
        <>
            <Nav />
            <div className="w-full h-screen bg-slate-50 p-8 z-20 pt-16">
                <Title title="Monitoreo de Sensores" />

                <div className="mt-10">
                    <table className="border-2 w-full self-start">
                        <thead>
                            <tr className="text-start border-2 bg-slate-200">
                                <th className="text-start">Oficina</th>
                                <th className="text-start">Status</th>
                                <th className="text-start">Luces</th>
                                <th className="text-start">Temperatura</th>
                                <th className="text-start">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Data ? (
                                Data.map((log, key) => (
                                    <tr key={key} className="hover:bg-zinc-200">
                                        <td>{log.id}</td>
                                        <td>{log.status}</td>
                                        <td>{log.luces}</td>
                                        <td>{log.temperatura}</td>
                                    </tr>

                                ))
                            ) : (
                                <tr>
                                    <td>No Data</td>
                                </tr>
                            )}
                        </tbody>

                    </table>
                </div>

            </div>
        </>
    )
}

export default Monitoreo;