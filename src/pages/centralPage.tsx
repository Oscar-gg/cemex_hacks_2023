
export default function CenterPage() {
    return (
        <>
        <nav className = "flex flex-row py-5 bg-sky-900/80">
        <h1 className="text-white font-extrabold px-8 text-2xl">CEMEX</h1>
        </nav>
        <div className="container min-w-full min-h-screen flex flex-col bg-sky-100">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam esse ducimus, voluptatum omnis illo expedita facilis adipisci dignissimos enim recusandae architecto veritatis commodi quibusdam, nihil delectus, quam reprehenderit. Ea, magni!</p>
            <div className="flex flex-row items-center justify-center min-w-full gap-10 px-10 py-20">
                <Card />
                <Card />
                <Card />
            </div>
        </div>
        </>
    );
}

function Card() {
    return (
        <>
        <div className="bg-sky-600/70 px-4 py-4 h-40 w-80 rounded-xl shadow-xl hover:shadow-2xl">
            <h2 className="text-white font-bold px-2 py-2 text-xl text-center align-middle">Monitoreo de Energía</h2>
        </div>
        </>
    );
}