import Nav from "~/components/Nav/Nav";
import Title from "~/components/general/title";


const Movilidad = () => {

    const Data = [
        { id: "1", status: "ocupado", luces: "encendido", temperatura: "81" }
    ]

    return (
        <>
            <Nav />
            <div className="w-full h-screen bg-slate-50 p-8 z-20 pt-16">
                <Title title="Movilidad y rutas" />



            </div>
        </>
    )
}

export default Movilidad;