const CharacterTable = ({ characters }) => {

  const renderTableData = () => {
    return characters.map((character) => {
      const { name, birth_year, height, mass, homeWorld, species } = character;

      return (
        <tr key={name}>
          <td>{name}</td>
          <td>{birth_year}</td>
          <td>{height}</td>
          <td>{mass}</td>
          <td>{homeWorld}</td>
          <td>{species}</td>
        </tr>
      );
    });
  };

  return (
    <table className="table table-hover table-lg">
      <thead className="thead-light">
        <tr>
          <th>Name</th>
          <th>Birth Date</th>
          <th>Height</th>
          <th>Mass</th>
          <th>HomeWorld</th>
          <th>Species</th>
        </tr>
      </thead>
      <tbody>{renderTableData()}</tbody>
    </table>
  );
};

export default CharacterTable;
