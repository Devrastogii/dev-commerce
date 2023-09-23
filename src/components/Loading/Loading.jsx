import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";

function Loading() {

  const colors = ['red', 'blue'];
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [color, setColor] = useState(colors[currentColorIndex]);

  useEffect(() => {    
    const intervalId = setInterval(() => {
    
      const nextColorIndex = (currentColorIndex + 1) % colors.length;
      setCurrentColorIndex(nextColorIndex);
          
      setColor(colors[nextColorIndex]);
    }, 500);
    
    return () => {
        clearInterval(intervalId);
    }}, [currentColorIndex]);

  return (
    <div className="sweet-loading flex w-screen h-screen justify-center items-center">      
      <InfinitySpin 
        width='200'
        color={color}
    />
    </div>
  );
}

export default Loading;