function Table(props) {
  const {
    data,
    tableElements,
    handleEdit,
    handleDetails,
    handleDelete,
    detailsButtonVisibility,
  } = props;

  const handleEditRow = (id) => {
    handleEdit(id);
    console.log("Edit button clicked for id: ", id);
  };

  const handleDeleteRow = (id) => {
    console.log("Delete button clicked");
    handleDelete(id);
  };

  const handleShowDetails = (id) => {
    console.log("Event target > ", id);
    handleDetails(id);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {tableElements?.map((element, index) => {
              return (
                <th scope="col" className="px-6 py-3" key={index}>
                  {element.value}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {/*<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">*/}
          {/*  Apple MacBook Pro 17"*/}
          {/*</th>*/}
          {data?.map((dataElement, dataIndex) => {
            return (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                {tableElements.map((tableElement, tableIndex) => {
                  return (
                    <td key={dataIndex + "-" + tableIndex}>
                      {dataElement[tableElement.key] == undefined && (
                      <div>
                          {detailsButtonVisibility && (
                            <button style={{ marginRight: "5px"}}
                              className="px-4 py-2 text-gray-800 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:border-gray-300"
                              onClick={() => handleShowDetails(dataElement.id)}
                                          style={{ marginRight: "1%" }}
                            >
                              Detalji
                            </button>
                          )}
                          <button
                            className="px-4 py-2 text-gray-800 bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
                            onClick={() => handleDeleteRow(dataElement.id)}
                                      style={{ marginRight: "1%" }}
                          >
                            Obriši
                          </button>
                          <button
                            className="px-4 py-2 text-gray-800 bg-blue-200 rounded-md hover:bg-blue-300 focus:outline-none focus:ring focus:border-blue-300"
                            onClick={() => handleEditRow(dataElement.id)}
                          >
                            Uredi
                          </button>
                        </div>
                      )}
                      {dataElement[tableElement.key] &&
                      dataElement[tableElement.key].name
                        ? dataElement[tableElement.key].name
                        : dataElement[tableElement.key]}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
