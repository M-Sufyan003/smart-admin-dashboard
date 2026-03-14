import { useEffect, useRef } from "react";
import {
  RiUserLine,
  RiTaskLine,
  RiMoneyDollarCircleLine,
  RiCheckboxCircleLine,
  RiArrowUpLine,
  RiArrowDownLine,
} from "react-icons/ri";
import ScrollReveal from "scrollreveal";
import styles from "./SummaryCards.module.css";

function SummaryCards({ totalUsers }) {
  const cardsRef = useRef([]);

  const cards = [
    {
      label: "Total Users",
      value: totalUsers,
      change: "+12.5%",
      up: true,
      icon: RiUserLine,
      color: "amber",
      sub: "vs last month",
    },
    {
      label: "Active Tasks",
      value: "148",
      change: "+4.2%",
      up: true,
      icon: RiTaskLine,
      color: "teal",
      sub: "in progress",
    },
    {
      label: "Pending Revenue",
      value: "$34,290",
      change: "-2.1%",
      up: false,
      icon: RiMoneyDollarCircleLine,
      color: "rust",
      sub: "awaiting clearance",
    },
    {
      label: "Completed Tasks",
      value: "1,024",
      change: "+18.7%",
      up: true,
      icon: RiCheckboxCircleLine,
      color: "blue",
      sub: "this quarter",
    },
  ];

  useEffect(() => {
    const sr = ScrollReveal({ reset: false, distance: "30px", duration: 600 });
    cardsRef.current.forEach((el, i) => {
      if (el)
        sr.reveal(el, {
          delay: i * 100,
          origin: "bottom",
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        });
    });
    return () => sr.destroy();
  }, []);

  return (
    <div className={styles.grid}>
      {cards.map((card, i) => (
        <div
          key={card.label}
          className={`${styles.card} ${styles[card.color]}`}
          ref={(el) => (cardsRef.current[i] = el)}
        >
          <div className={styles.cardHeader}>
            <span className={styles.label}>{card.label}</span>
            <div className={styles.iconWrap}>
              <card.icon />
            </div>
          </div>
          <div className={styles.value}>{card.value}</div>
          <div className={styles.cardFooter}>
            <span
              className={`${styles.change} ${card.up ? styles.up : styles.down}`}
            >
              {card.up ? <RiArrowUpLine /> : <RiArrowDownLine />}
              {card.change}
            </span>
            <span className={styles.sub}>{card.sub}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SummaryCards;
