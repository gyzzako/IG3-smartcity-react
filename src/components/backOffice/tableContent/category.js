export function tableBodyMapper(rowObject){
    return (
        <>
            <td>{rowObject.id}</td>
            <td>{rowObject.name}</td>
        </>
    );
}
