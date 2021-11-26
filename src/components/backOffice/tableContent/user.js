export function tableBodyMapper(rowObject){
    return (
        <>
            <td>{rowObject.id}</td>
            <td>{rowObject.firstname}</td>
            <td>{rowObject.lastname}</td>
            <td>{rowObject.phone_number}</td>
            <td>{rowObject.username}</td>
            <td>{rowObject.isadmin ? 'Oui' : 'Non'}</td>
            <td>{rowObject.province}</td>
            <td>{rowObject.city}</td>
            <td>{rowObject.street_and_number}</td>
        </>
    );
}
