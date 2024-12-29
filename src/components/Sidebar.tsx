import { sidebarData } from "@/staticData";

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
          {sidebarData.location && (
            <p className="sidebar__inner__heading__location sidebar__text--transparent">
              <LocationIcon />
              {sidebarData.location}
            </p>
          )}
        </div>
        {sidebarData.tagline && (
          <p className="sidebar__text--transparent sidebar__text--italic">{sidebarData.tagline}</p>
        )}
        {sidebarData.cta.text && (
          <p>
            <strong>
              {sidebarData.cta.number} {sidebarData.cta.text}{" "}
              <Link href={sidebarData.cta.linkURL}>{sidebarData.cta.linkText}</Link>
            </strong>
          </p>
        )}
        {sidebarData.aboutText && <p className="sidebar__text--transparent">{sidebarData.aboutText}</p>}
        <div className="sidebar__search">
          <div className="sidebar__search__input">
            <input className="sidebar__search__input__inner" type="text" placeholder="Your Email" />
          </div>
          <div className="sidebar__search__button button">Subscribe</div>
        </div>
        <div className="sidebar__social__wrapper">
          {sidebarData.socialLinks.facebook && (
            <Link href={sidebarData.socialLinks.facebook} className="sidebar__social__wrapper__link">
              <FacebookIcon />
            </Link>
          )}
          {sidebarData.socialLinks.youtube && (
            <Link href={sidebarData.socialLinks.youtube} className="sidebar__social__wrapper__link">
              <YoutubeIcon />
            </Link>
          )}
          {sidebarData.socialLinks.github && (
            <Link href={sidebarData.socialLinks.github} className="sidebar__social__wrapper__link">
              <GithubIcon />
            </Link>
          )}
          {sidebarData.socialLinks.linkedin && (
            <Link href={sidebarData.socialLinks.linkedin} className="sidebar__social__wrapper__link">
              <LinkedinIcon />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
