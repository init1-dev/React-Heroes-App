import { HeroList } from "../hero/HeroList"

export const MarvelScreen = () => {
    return (
        <div>
            <h1 className="mt-3">Marvel Screen</h1>
            <hr />

            <HeroList
                publisher="Marvel Comics"
            />
            
        </div>
    )
}
