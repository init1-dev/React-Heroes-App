import { useNavigate, useLocation } from "react-router-dom";
import { useMemo } from "react";
import queryString from "query-string";

import { useForm } from "../../hooks/useForm";
import { getHeroesByName } from "../../selectors/getHeroesByName";
import { HeroCard } from "../hero/HeroCard";

export const SearchScreen = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const { q = '' } = queryString.parse(location.search);

    const [ formValues, handleInputChange ] = useForm({
        searchText: q
    });

    const { searchText } = formValues;
    
    const heroesFiltered = useMemo( () => getHeroesByName(q), [q] );

    const handleSearch = (e) => {
        e.preventDefault();

        navigate(`?q=${ searchText }`);
    };

    return (
        <>
            <h1 className="mt-3">Search</h1>
            <hr />

            <div className="row">

                <div className="col-5">
                    {/* <h4>Buscar</h4>
                    <hr /> */}

                    <form onSubmit={ handleSearch }>
                        <input 
                            type="text" 
                            className="form-control"
                            name="searchText"
                            placeholder="Buscar un Héroe"
                            autoComplete="off"
                            value={ searchText }
                            onChange={ handleInputChange }
                        />

                        <button 
                            className="btn btn-outline-primary mt-1"
                            type="submit"
                        >
                            Buscar
                        </button>

                    </form>
                </div>

                <div className="col-7 mb-3">

                    {
                        (q.length === 0 )
                            ? <div className="alert alert-info"> Introduce un héroe a buscar </div>
                            : ( heroesFiltered.length === 0 )
                                && <div className="alert alert-danger"> No hay resultados para: { q } </div>
                    }

                    {
                        ( heroesFiltered.length > 0 )
                            && (<>
                                    <h4>Resultados</h4>
                                    <hr /> 
                                </>)
                    }

                    {
                        heroesFiltered.map( hero => (
                            <HeroCard 
                                key={ hero.id }
                                {...hero}
                            />
                        ))
                    }
                </div>

            </div>
        </>
    )
}
