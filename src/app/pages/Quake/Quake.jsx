import { useEffect } from "react";

function Quake() {
  return (
      <iframe
  src="http://localhost:8000/ioquake3.html"
  title="quake3"
  // width="1200"
  // height="800"
  className="w-screen h-screen">
</iframe>
  );
}

export default Quake;
