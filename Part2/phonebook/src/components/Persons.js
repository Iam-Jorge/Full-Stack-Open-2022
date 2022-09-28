const Persons = ({personsToShow, deletePerson}) => {
    return (
        <div>
            { personsToShow.map(p => 
                <div key={p.id}>{p.name} {p.number} {' '}
                    <button onClick={() => deletePerson(p.id, p.name)}>
                        delete
                    </button>
                </div>)
            }
        </div>
    )
}

export default Persons