import { useEffect, useState } from "react";
import styles from "./ContentNav.module.css";

const ContentNav = () => {
  const [contentLinks, setContentLinks] = useState([]);

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll("h2"));
    setContentLinks(headings);

    const parentWrapper = document.querySelector("#wrapper");
    const childElements = parentWrapper.children;

    //iterating over wrapper`s child nodes and giving them a data-attribute to emulate div blocks
    //since the table content menu is focusing H2 Headings
    let counter = 0;
    Array.from(childElements).forEach((item) => {
      item.setAttribute("data-navigation-id", `id_${counter}`);
      if (item.nodeName === "H2") {
        counter++;
        item.setAttribute("data-navigation-id", `id_${counter}`);
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const activeID = Number(
              entry.target.dataset.navigationId.split("_")[1]
            );
            console.log(activeID);

            document
              .querySelectorAll("#navPanel ul li")
              .forEach((link) => link.classList.remove(styles.active));

            if (activeID <= 0) {
              document
                .querySelectorAll("#navPanel ul li")[0]
                .classList.add(styles.active);
            }
            if (activeID) {
              document
                .querySelectorAll("#navPanel ul li")
                [activeID - 1].classList.add(styles.active);
            }

            entry.target.style.color = "orangered";
          } else {
            entry.target.style.color = "royalblue";
          }
        });
      },
      {
        // rootMargin: "-20px 0px -50px 0px",
        threshold: 0.25,
      }
    );

    Array.from(childElements)?.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div id="navPanel" className={styles.navBody}>
      <ul>
        {contentLinks.map((elem, index) => (
          <li key={index}>{elem.textContent}</li>
        ))}
      </ul>
    </div>
  );
};

export default ContentNav;
