import React, { useEffect, useState } from 'react';
import './App.css';
import KanbanBoard from './component/KanbanBoard';
import SelectBar from './component/SelectBar';

const App = () => {
  const [grouping, setGrouping] = useState(localStorage.getItem("grouping") || "Status");
  const [ordering, setOrdering] = useState(localStorage.getItem("ordering") || "Title");

  const priorityScores = [4, 3, 2, 1, 0];

  useEffect(() => {
    setOrdering(localStorage.getItem("ordering") || "Title");
    localStorage.setItem("ordering", localStorage.getItem("ordering") || "Title");

    setGrouping(localStorage.getItem("grouping") || "Status");
    localStorage.setItem("grouping", localStorage.getItem("grouping") || "Status");
  }, []);

  return (
    <div className="App">
      <SelectBar setGrouping={setGrouping} setOrdering={setOrdering} />
      <KanbanBoard
        priorityScores={priorityScores}
        grouping={grouping}
        ordering={ordering}
      />
    </div>
  );
};
export default App;
