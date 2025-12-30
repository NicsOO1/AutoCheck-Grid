import React, { useEffect, useState } from "react";

const App = () => {
  const allBoxes = [
    { id: 1, check: false },
    { id: 2, check: false },
    { id: 3, check: false },
    { id: 4, check: false },
    { id: 5, check: false },
    { id: 6, check: false },
    { id: 7, check: false },
    { id: 8, check: false },
    { id: 9, check: false },
  ];

  const [boxes, setBoxes] = useState(allBoxes);
  const [stack, setStack] = useState([]);

  const handleCheck = (id) => {
    setBoxes((prev) =>
      prev.map((box) => (box.id === id ? { ...box, check: !box.check } : box))
    );

    setStack((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setStack((prevStack) => {
        if (prevStack.length === 0) return prevStack;

        const lastId = prevStack[prevStack.length - 1];

        setBoxes((prev) =>
          prev.map((box) =>
            box.id === lastId ? { ...box, check: false } : box
          )
        );

        return prevStack.slice(0, -1);
      });
    }, 750);

    return () => clearInterval(interval);
  }, [stack]);

  return (
    <div className="container">
      <h1>Checker game</h1>
      <div className="grid">
        {boxes.map((box) => (
          <div
            key={box.id}
            onClick={() => handleCheck(box.id)}
            className={`box ${box.check && "red"}`}
          ></div>
        ))}
      </div>

      <p>
        This is a small React app I built to practice useState and useEffect.
        When a box is clicked, it blinks then auto-unchecks in a LIFO order
      </p>
    </div>
  );
};

export default App;
