const TemplateExpression = ({ name }) => {
  return (
    <div>
      <span>Olá, {name || "usuário"}</span>
    </div>
  );
};

export default TemplateExpression;
