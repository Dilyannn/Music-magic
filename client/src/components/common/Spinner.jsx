import { Bars } from "react-loader-spinner";

export default function Spinner({
  styles,
}) {
  return (
    <div className={styles ? styles : "flex flex-col text-xl leading-tight mb-6 justify-center items-center h-screen text-white"}>
      <Bars
        height="60"
        width="60"
        color="oklch(62.7% 0.265 303.9)"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      {!styles && <h1>Loading...</h1>}
    </div>
  );
}
