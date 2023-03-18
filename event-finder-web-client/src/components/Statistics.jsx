import { statistics } from "../constants";
import styles from "../style";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 

const Statistics = () => (
  <section className={`${styles.flexCenter} flex-row flex-wrap sm:mb-20 mb-6 space-x-20 md:my-6`}>
    {statistics.map((stat) => (
      <div key={stat.id} className={`${styles.flexCenter} items-center m-3`} >
        <span className={`font-poppins font-semibold xs:text-[40px] text-[30px] xs:leading-[53px] leading-[43px] text-white text-center`}>
            <FontAwesomeIcon icon={stat.icon} bounce={stat.bounce} fade={stat.fade} beat={stat.beat}></FontAwesomeIcon> {stat.value}
        </span>
        <span className={`font-poppins font-normal xs:text-[20px] text-[15px] xs:leading-[26px] leading-[21px] text-gradient uppercase ml-3 text-center`}>
          {stat.title}
        </span>
      </div>
    ))}
  </section>
);

export default Statistics;
