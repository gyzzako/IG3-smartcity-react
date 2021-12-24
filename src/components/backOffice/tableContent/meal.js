export function tableBodyMapper(rowObject){
    return (
        <>
            <td>{rowObject.id}</td>
            <td>{rowObject.name}</td>
            <td>{rowObject.description}</td>
            <td>{rowObject.portion_number}</td>
            <td>{rowObject.publication_date}</td>
            <td>{rowObject.user.username}</td>
            <td>{rowObject.category.name}</td>
            <td>{rowObject.order_fk}</td>
            <td><img loading="lazy" width="150" height="150" src={`http://localhost:3001/mealimages/${rowObject.image}`} alt="meal"></img></td>
        </>
    );
}
