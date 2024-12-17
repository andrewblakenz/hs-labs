import "./styles.css";
import Sidebar from "../components/Sidebar";
import ProjectTile from "@/components/ProjectTile";

import dummyData from "../data.json";

const Home = () => {
  return (
    <div className="app-wrapper">
      <Sidebar />
      <div className="content">
        <div className="content__inner">
          <h1 className="content__inner__heading">
            Lorem <span>ipsum dolor</span> <br />
            sit amet.
          </h1>
          <h3 className="content__inner__sub-heading">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi.
          </h3>
          <div className="project-wrapper">
            {dummyData.map((poject, index) => {
              return <ProjectTile project={poject} key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
