const KanbanCard = ({ ticket }) => {
    const { title, description, status, priority, userName } = ticket;
  
    return (
      <div className="kanban-card">
        <h3>{title}</h3>
        <p>{description}</p>
        <p>Status: {status}</p>
        <p>Priority: {priority}</p>
        <p>Assigned to: {userName}</p>
      </div>
    );
  };
  
  export default KanbanCard;
  