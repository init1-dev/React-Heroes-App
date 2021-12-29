import { Link } from 'react-router-dom';
import { heroImgs } from '../../helpers/heroImages';

export const HeroCard = ({
    id,
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters
}) => {

    const imgPath = heroImgs(`./${id}.jpg`);

    return (
        <Link className='cards-link' to={`/hero/${id}`}>
            <div className="col animate__animated animate__fadeIn mt-3" >
                <div className="card">

                    <div className="row no-gutters">
                        <div className="col-4">
                            <img src={ imgPath } className="card-img" alt={ superhero } />
                        </div>
                        <div className="col-8">
                            <div className="card-body">
                                <h5 className="card-title">{ superhero }</h5>
                                <p className="card-text">{ alter_ego }</p>

                                {/* {
                                    ( alter_ego !== characters )
                                        && <p className="text-muted">{ characters }</p>
                                } */}

                                <p className='card-text'>
                                    <small className='text-muted'>{ first_appearance }</small>
                                </p>

                                <p>Click para ver más</p>
                                
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </Link>
    )
}
