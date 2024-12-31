import "./styles.css";
import Sidebar from "../components/Sidebar";
import ProjectGrid from "@/components/ProjectGrid";
import { mainContentData } from "@/staticData";
import fetchProjects from "@/utils/fetchProjects";

const Home = async () => {
  const projects = await fetchProjects();

  const headingText = (text: string) => {
    const splitText = text.split(/[*]/);

    if (splitText.length >= 2) {
      return (
        <h1 className="content__inner__heading">
          {splitText[0]}
          <span>{splitText[1]}</span> <br />
          {splitText[2] && splitText[2]}
        </h1>
      );
    } else {
      return <h1 className="content__inner__heading">{text}</h1>;
    }
  };

  if (!projects) {
    return <h4>LOADING 2</h4>;
  }

  return (
    <div className="app-wrapper">
      <Sidebar />
      <div className="content">
        <div className="content__inner">
          {headingText(mainContentData.headingText)}
          {mainContentData.subText && <h3 className="content__inner__sub-heading">{mainContentData.subText}</h3>}
          <ProjectGrid projects={projects} />
        </div>
      </div>
    </div>
  );
};

export default Home;
