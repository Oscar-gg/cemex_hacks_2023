import Nav from "~/components/Nav/Nav"
import Description from "~/components/general/description"
import Title from "~/components/general/title"


const Comparativa = () => {
    return (
        <>
            <Nav />
            <div className="container min-w-full min-h-screen flex flex-col bg-gradient-radial from-sky-100/90 to-white pt-24 px-10">
                <Title title="Compartiva de oficinas" />
                <Description description="Compara los gastos de las oficinas" />
                <Description description="La oficina 1 ahorra 20% más de energía" />
            </div>
        </>
    )
}

export default Comparativa