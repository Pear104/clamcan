import { Card } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import gamesData from "./GameData";
import Meta from "antd/es/card/Meta";

function PlayList() {
  const params = useParams();
  const navigate = useNavigate();

  const handleClick = (url, name) => {
    navigate(`/playId?url=${url}&name=${name}`);
  };

  return (
    <>
      <div className="min-h-screen p-4 justify-self-center w-3/4">
        <div className="font-semibold text-2xl mb-4">Game List</div>
        <div className="grid grid-cols-6 grid-flow-row">
          {gamesData.map((game, index) => (
            <Card
              hoverable
              key={index}
              style={{ width: 200 }}
              onClick={() => handleClick(game.url, game.title)}
              cover={<img alt={game.title} src={game.img} style={{ height: "200px" }}/>}
            >
              <Meta className="text-center" title={game.title} />
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

export default PlayList;
