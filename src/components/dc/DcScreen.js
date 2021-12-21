import { HeroList } from "../hero/HeroList"

export const DcScreen = () => {
    return (
        <div>
            <h1 className="mt-3">DC Screen</h1>
            <hr />

            <HeroList
                publisher="DC Comics"
            />
            
        </div>
    )
}
