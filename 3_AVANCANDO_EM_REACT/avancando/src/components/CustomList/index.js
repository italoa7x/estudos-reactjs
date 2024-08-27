const CustomList = ({ dataList }) => {
  return (
    dataList && (
      <ul>
        {dataList &&
          dataList.map((value, index) => (
            <li key={`${value}__${index}`}>{value}</li>
          ))}
      </ul>
    )
  );
};

export default CustomList;
