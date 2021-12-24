export function tableBodyMapper(rowObject){
    return (
        <>
            <td>{rowObject.id}</td>
            <td>{rowObject.order_date}</td>
            <td>{rowObject.user.username}</td>
        </>
    );
}
