import HashLoader from "react-spinners/HashLoader";

export const LoadingScreen = ({
  pageName = "página",
}: {
  pageName?: string;
}) => {
  return (
    <div className="flex flex-col justify-center align-middle items-center gap-y-8 mt-5 h-full">
      {/* <img src="/Cemex_logo.png" /> */}
      <h1 className="px-16 text-2xl font-extrabold text-[#0000B3]"> Cargando {pageName}</h1>

      <HashLoader
        color={"#0000B3"}
        loading={true}
        // cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};
