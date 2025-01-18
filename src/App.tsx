import { usePrice } from "@/hooks/usePrice";
import { usePositionConstraints } from "@/hooks/usePositionConstraints";
import { DraggablePrice } from "@/components/DraggablePrice";
import "@/App.css";
import dog from "@/assets/dogwifhat_sticker.webp";
import Draggable from "@/components/Draggable";

function App() {
  const { price, bgColor } = usePrice();
  const { elementRef, position, setPosition } = usePositionConstraints();

  return (
    <div className="App" style={{ backgroundColor: bgColor, transition: "background-color 0.3s" }}>
      <Draggable>
        <img src={dog} alt="dog" style={{ width: "100px", height: "100px", pointerEvents: "none" }} />
      </Draggable>
      <DraggablePrice price={price} elementRef={elementRef} position={position} setPosition={setPosition} />
    </div>
  );
}

export default App;
