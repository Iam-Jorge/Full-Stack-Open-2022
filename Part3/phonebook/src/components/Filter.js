
const Filter = ({filter, handleFilter}) => {
    return (
        <div>
          filter shown with: <input value={filter} onChange={e => handleFilter(e)}/>
        </div>
    )
}

export default Filter;