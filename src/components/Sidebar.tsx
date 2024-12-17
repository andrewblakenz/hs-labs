import LocationIcon from "./icons/LocationIcon";
import FacebookIcon from "./icons/FacebookIcon";
import YoutubeIcon from "./icons/YoutubeIcon";
import GithubIcon from "./icons/GithubIcon";
import LinkedinIcon from "./icons/LinkedinIcon";

import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__inner">
        <div className="sidebar__inner__heading">
          <h2 className="sidebar__inner__heading__logo-text ">
            <span>.</span>HS
            <br />
            LABS
          </h2>
          <p className="sidebar__inner__heading__location sidebar__text--transparent">
            <LocationIcon />
            New Zealand
          </p>
        </div>
        <p className="sidebar__text--transparent sidebar__text--italic">
          We need an appropriate zinger, got any suggestions for us?
        </p>
        <p>
          <strong>
            19,823 Subscribers love our <Link href={"#"}>free ebook</Link>
          </strong>
        </p>
        <p className="sidebar__text--transparent">
          We don’t know what we are doing yet, but neither do you, so thats okay!
        </p>
        <div className="sidebar__search">
          <div className="sidebar__search__input">
            <input className="sidebar__search__input__inner" type="text" placeholder="Your Email" />
          </div>
          <div className="sidebar__search__button button">Subscribe</div>
        </div>
        <div className="sidebar__social__wrapper">
          <Link href="#" className="sidebar__social__wrapper__link">
            <FacebookIcon />
          </Link>
          <Link href="#" className="sidebar__social__wrapper__link">
            <YoutubeIcon />
          </Link>
          <Link href="#" className="sidebar__social__wrapper__link">
            <GithubIcon />
          </Link>
          <Link href="#" className="sidebar__social__wrapper__link">
            <LinkedinIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
