import { Bars } from "react-loader-spinner";

export default function Spinner({
  small,
  styles,
}) {
  return (
    <div className={styles ? styles : "flex flex-col text-xl leading-tight mb-6 justify-center items-center h-screen text-white"}>
      <Bars
        height={small || "60"}
        width={small || "60"}
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
