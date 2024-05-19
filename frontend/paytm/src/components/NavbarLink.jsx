import { Link } from "react-router-dom";

export default function NavbarLink({class_names, id, to, text_of_link, stateing}) {
    console.log(stateing, to );
    return <div>
        <Link className={class_names} id={id} to={to} state={stateing}>{text_of_link}</Link>
    </div>
}