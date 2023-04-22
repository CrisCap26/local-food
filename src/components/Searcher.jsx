import React, { useState } from "react";
import './Searcher.css';

function Searcher(props) {
  const [searchText, setSearchText] = useState(props.defaultText ?? '');

  React.useEffect(() => {
    setSearchText(props.defaultText ?? '');
  }, [props.defaultText]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (props.allowEmpty) {
      props.onSearch && props.onSearch(searchText || null);
    } else if (searchText.length > 0 && props.onSearch) props.onSearch(searchText);
  }

  return (
    <form className="buscar" onSubmit={handleSearch} style={props.style || undefined}>
      <input
        type="text"
        className="inicio_hero__barra-busqueda"
        placeholder="¿Qué estás buscando?"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button className="btn-buscar" type='submit' disabled={props.disabled}>Buscar</button>
    </form>
  );
}

export default Searcher;
