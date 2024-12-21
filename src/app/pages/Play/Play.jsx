import { Card } from "antd";
import { useParams, useSearchParams } from "react-router-dom";
import { Flash } from "react-ruffle";

function Play() {
  const [gameParams, setGameParams] = useSearchParams();
  return (
    <>
      <div className="min-h-screen p-0 flex flex-col justify-start items-center">
        <span className="font-semibold text-2xl py-5">{gameParams.get("name")}</span>
        <Flash src={gameParams.get("url")} width="1000" height="800" />
      </div>
    </>
  );
}

export default Play;
