import { Link } from 'react-router-dom'


export const StayPreview = ({ stay }) => {
    return <section className="stay-preview">
        <Link to={`/stay/${stay._id}`}>
            <div className="img-container">


            <img src={require(`../assets/Images/${stay.imgUrls[0]}`)} alt="" />
            </div>
            {/* <button aria-label="Add listing to a list" type="button" class="b1lx45fx v1qb14d3 dir dir-ltr"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style="display: block; fill: rgba(0, 0, 0, 0.5); height: 24px; width: 24px; stroke: var(--f-mkcy-f); stroke-width: 2; overflow: visible;"><path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path></svg></button> */}

            <div className="txt-container">
                <div className="flex space-between">
                    <div>{stay.loc.city}<span>,{stay.loc.country}</span></div>
                    <div>{stay.reviewScores.rating}</div>
                </div>
                <div>{stay.name}</div>
                <div>{stay.type}</div>
                <div>${stay.price} night</div>

            </div>
        </Link>
    </section>
}