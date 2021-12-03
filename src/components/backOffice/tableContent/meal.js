export function tableBodyMapper(rowObject){
    let imageLink;
    if(rowObject.image !== null){ //TODO: à enlever plus tard -> remplir la db de base avec des images pour les plats déjà présent
        imageLink = `http://localhost:3001/mealimages/${rowObject.image}`;
    }
    return (
        <>
            <td>{rowObject.id}</td>
            <td>{rowObject.name}</td>
            <td>{rowObject.description}</td>
            <td>{rowObject.portion_number}</td>
            <td>{rowObject.publication_date}</td>
            <td>{rowObject.user_fk}</td>
            <td>{rowObject.category.name}</td>
            <td>{rowObject.order_fk}</td>
            <td><img loading="lazy" width="150" height="150" src={imageLink} alt="meal"></img></td>
        </>
    );
}
